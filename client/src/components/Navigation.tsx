import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type NavigationProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAuth: () => void;
};

export default function Navigation({ currentPage, onNavigate, onOpenAuth }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { id: 'home', label: 'ראשי' },
    { id: 'about', label: 'אודות' },
    { id: 'gallery', label: 'גלריה' },
    { id: 'store', label: 'חנות האגודה' },
    { id: 'rights', label: 'זכויות' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-900">אגודת הסטודנטים</h1>
              <p className="text-xs text-gray-600">האגודה שלך, הקול שלך</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-base font-medium transition-all duration-300 hover:text-cyan-600 relative pb-1 ${
                  currentPage === item.id
                    ? 'text-cyan-600'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                <LogOut className="w-4 h-4" />
                יציאה
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                התחברות
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-cyan-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-right px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-200">
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  יציאה
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium"
                >
                  התחברות
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
