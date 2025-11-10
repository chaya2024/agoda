import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError('שם משתמש או סיסמה שגויים');
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">התחברות</h1>
          <p className="text-gray-600">ברוכים השבים לאגודת הסטודנטים</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-primary-600 hover:to-primary-800'
            }`}
          >
            {loading ? 'מתחבר...' : 'התחברות'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            עדיין אין לך חשבון?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              הירשם עכשיו
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
