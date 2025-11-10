import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import Navigation from './components/Navigation';
import ContactPanel from './components/ContactPanel';
import AccessibilityPanel from './components/AccessibilityPanel';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import StorePage from './pages/StorePage';
import RightsPage from './pages/RightsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'store':
        return <StorePage />;
      case 'rights':
        return <RightsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AccessibilityProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white" dir="rtl">
          <Navigation
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onOpenAuth={() => setAuthModalOpen(true)}
          />

          <main className="pt-20">
            {renderPage()}
          </main>

          <ContactPanel />
          <AccessibilityPanel />

          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />

          <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-right">
                  <h3 className="text-xl font-bold mb-4">אגודת הסטודנטים</h3>
                  <p className="text-gray-300 leading-relaxed">
                    האגודה שלך, הקול שלך - פועלים למען הסטודנטים מזה 20 שנה
                  </p>
                </div>

                <div className="text-right">
                  <h3 className="text-xl font-bold mb-4">קישורים מהירים</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <button
                        onClick={() => setCurrentPage('home')}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        ראשי
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setCurrentPage('about')}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        אודות
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setCurrentPage('rights')}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        זכויות
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="text-right">
                  <h3 className="text-xl font-bold mb-4">יצירת קשר</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>טלפון: 03-1234567</li>
                    <li>אימייל: info@union.ac.il</li>
                    <li>כתובת: קמפוס האוניברסיטה, בניין 3, קומה 2</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} אגודת הסטודנטים. כל הזכויות שמורות.</p>
              </div>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;
