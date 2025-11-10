import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Hash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signUp(email, password, fullName, studentId);

    if (error) {
      setError('שגיאה ברישום. אנא נסה שנית.');
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">הרשמה</h1>
          <p className="text-gray-600">הצטרף לאגודת הסטודנטים</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              שם מלא
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="ישראל ישראלי"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
              תעודת סטודנט (אופציונלי)
            </label>
            <div className="relative">
              <Hash className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="123456789"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              כתובת דוא"ל
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              סיסמה
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-secondary-500 to-secondary-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-secondary-600 hover:to-secondary-800'
            }`}
          >
            {loading ? 'נרשם...' : 'הירשם'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            כבר יש לך חשבון?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              התחבר
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
