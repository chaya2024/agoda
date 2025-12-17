import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AccessibilityPanel from './components/AccessibilityPanel';
import ContactPanel from './components/ContactPanel';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import StorePage from './pages/StorePage';
import RightsPage from './pages/RightsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AccessibilityProvider>
          <div className="min-h-screen bg-white">
            <Navigation />
            <div className="h-20"></div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/rights" element={<RightsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Footer />
            <AccessibilityPanel />
            <ContactPanel />
          </div>
        </AccessibilityProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
