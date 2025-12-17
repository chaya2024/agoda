import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Image, ShoppingBag, Scale, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'דף הבית', icon: Home },
    { path: '/about', label: 'אודות', icon: Info },
    { path: '/gallery', label: 'גלריה', icon: Image },
    { path: '/store', label: 'חנות האגודה', icon: ShoppingBag },
    { path: '/rights', label: 'זכויות', icon: Scale },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full h-20 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-white/60 backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">א</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-800">
                אגודת הסטודנטים
              </h1>
              <p className="text-xs text-slate-500">מכללת אונו</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 space-x-reverse">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2 transition-all duration-200 ${isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-700 hover:text-blue-600'
                    }`}
                >
                  <span className="text-lg">{item.label}</span>
                </Link>
              );
            })}

            {user ? (
              <div className="flex items-center gap-2 mr-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-all duration-200"                >
                  <User className="w-4 h-4" />
                  <span className="font-medium text-sm">{user.fullName}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="mr-12 px-5 py-2 text-blue-600 hover:opacity-80 transition-all duration-200"
              >
                <span className="font-semibold text-lg">איזור אישי</span>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-all duration-200 text-center ${isActive
                      ? 'text-blue-600 font-semibold bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-100">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.fullName}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">התנתקות</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all text-center"
                >
                  <span className="font-medium">איזור אישי</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
