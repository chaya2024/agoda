import type { ReactNode } from 'react';
import Navigation from './Navigation';
import AccessibilityPanel from './AccessibilityPanel';
import ContactPanel from './ContactPanel';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <div className="h-20"></div>

      <main className="bg-gray-50 min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>

      <AccessibilityPanel />
      <ContactPanel />
    </>
  );
};

export default Layout;
