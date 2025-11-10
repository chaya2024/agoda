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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">א</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                אגודת הסטודנטים
              </h1>
              <p className="text-xs text-gray-600">האגודה שלך, הקול שלך</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {user ? (
              <div className="flex items-center gap-2 mr-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user.full_name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="mr-4 flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">התחברות</span>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.full_name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">התנתקות</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg shadow-md"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">התחברות</span>
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
