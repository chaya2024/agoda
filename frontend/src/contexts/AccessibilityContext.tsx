import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: 'normal' | 'large' | 'larger';
  contrast: 'normal' | 'high';
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  setContrast: (contrast: 'normal' | 'high') => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'larger'>('normal');
  const [contrast, setContrastState] = useState<'normal' | 'high'>('normal');

  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility-fontSize') as 'normal' | 'large' | 'larger' | null;
    const savedContrast = localStorage.getItem('accessibility-contrast') as 'normal' | 'high' | null;

    if (savedFontSize) setFontSizeState(savedFontSize);
    if (savedContrast) setContrastState(savedContrast);
  }, []);

  useEffect(() => {
    document.body.className = '';
    if (fontSize === 'large') {
      document.body.classList.add('large-text');
    } else if (fontSize === 'larger') {
      document.body.classList.add('larger-text');
    }

    if (contrast === 'high') {
      document.body.classList.add('high-contrast');
    }
  }, [fontSize, contrast]);

  const setFontSize = (size: 'normal' | 'large' | 'larger') => {
    setFontSizeState(size);
    localStorage.setItem('accessibility-fontSize', size);
  };

  const setContrast = (contrastValue: 'normal' | 'high') => {
    setContrastState(contrastValue);
    localStorage.setItem('accessibility-contrast', contrastValue);
  };

  const resetAccessibility = () => {
    setFontSize('normal');
    setContrast('normal');
  };

  return (
    <AccessibilityContext.Provider
      value={{ fontSize, contrast, setFontSize, setContrast, resetAccessibility }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
