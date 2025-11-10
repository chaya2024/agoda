import { X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError('שם משתמש או סיסמה שגויים');
        } else {
          onClose();
          setEmail('');
          setPassword('');
        }
      } else {
        const { error } = await signUp(email, password, fullName, studentId);
        if (error) {
          setError('שגיאה ביצירת חשבון. ייתכן שהאימייל כבר קיים');
        } else {
          onClose();
          setEmail('');
          setPassword('');
          setFullName('');
          setStudentId('');
        }
      }
    } catch (err) {
      setError('אירעה שגיאה. נסה שוב מאוחר יותר');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="סגור"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-right mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'התחברות' : 'הרשמה'}
          </h2>
          <p className="text-sm text-gray-600">
            {isLogin ? 'התחבר לאזור האישי שלך' : 'צור חשבון חדש באגודה'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  שם מלא
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-right"
                  placeholder="הכנס שם מלא"
                />
              </div>
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  תעודת סטודנט
                </label>
                <input
                  id="studentId"
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-right"
                  placeholder="מספר תעודת סטודנט"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              אימייל
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-right"
              placeholder="example@student.ac.il"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              סיסמה
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-right"
              placeholder="הכנס סיסמה"
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-right">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'מעבד...' : isLogin ? 'התחבר' : 'הירשם'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            {isLogin ? 'אין לך חשבון? הירשם כעת' : 'כבר יש לך חשבון? התחבר'}
          </button>
        </div>
      </div>
    </div>
  );
}
