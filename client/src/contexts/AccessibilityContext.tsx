import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AccessibilityContextType = {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  grayscale: boolean;
  toggleGrayscale: () => void;
  underlineLinks: boolean;
  toggleUnderlineLinks: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (grayscale) {
      document.documentElement.classList.add('grayscale');
    } else {
      document.documentElement.classList.remove('grayscale');
    }
  }, [grayscale]);

  useEffect(() => {
    if (underlineLinks) {
      document.documentElement.classList.add('underline-links');
    } else {
      document.documentElement.classList.remove('underline-links');
    }
  }, [underlineLinks]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 150));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 80));
  const resetFontSize = () => setFontSize(100);
  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleGrayscale = () => setGrayscale((prev) => !prev);
  const toggleUnderlineLinks = () => setUnderlineLinks((prev) => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        highContrast,
        toggleHighContrast,
        grayscale,
        toggleGrayscale,
        underlineLinks,
        toggleUnderlineLinks,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
