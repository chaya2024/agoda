import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: number;
  grayscale: boolean;
  highContrast: boolean;
  invertColors: boolean;
  lightBackground: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleGrayscale: () => void;
  toggleHighContrast: () => void;
  toggleInvertColors: () => void;
  toggleLightBackground: () => void;
  toggleHighlightLinks: () => void;
  toggleReadableFont: () => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(100);
  const [grayscale, setGrayscale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [lightBackground, setLightBackground] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readableFont, setReadableFont] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize || 100);
      setGrayscale(settings.grayscale || false);
      setHighContrast(settings.highContrast || false);
      setInvertColors(settings.invertColors || false);
      setLightBackground(settings.lightBackground || false);
      setHighlightLinks(settings.highlightLinks || false);
      setReadableFont(settings.readableFont || false);
    }
  }, []);

  useEffect(() => {
    const settings = {
      fontSize,
      grayscale,
      highContrast,
      invertColors,
      lightBackground,
      highlightLinks,
      readableFont,
    };
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));

    const classList = document.documentElement.classList;
    classList.remove('grayscale', 'high-contrast', 'invert-colors', 'light-background', 'highlight-links', 'readable-font');

    document.documentElement.style.fontSize = `${fontSize}%`;

    if (grayscale) {
      classList.add('grayscale');
      console.log('Grayscale enabled');
    }
    if (highContrast) {
      classList.add('high-contrast');
      console.log('High contrast enabled');
    }
    if (invertColors) {
      classList.add('invert-colors');
      console.log('Invert colors enabled');
    }
    if (lightBackground) {
      classList.add('light-background');
      console.log('Light background enabled');
    }
    if (highlightLinks) {
      classList.add('highlight-links');
      console.log('Highlight links enabled');
    }
    if (readableFont) {
      classList.add('readable-font');
      console.log('Readable font enabled');
    }

    console.log('Font size:', fontSize + '%');
    console.log('HTML classes:', document.documentElement.className);
  }, [fontSize, grayscale, highContrast, invertColors, lightBackground, highlightLinks, readableFont]);

  const increaseFontSize = () => {
    console.log('Increasing font size');
    setFontSize(prev => {
      const newSize = Math.min(prev + 10, 150);
      console.log('New font size:', newSize);
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    console.log('Decreasing font size');
    setFontSize(prev => {
      const newSize = Math.max(prev - 10, 80);
      console.log('New font size:', newSize);
      return newSize;
    });
  };

  const toggleGrayscale = () => {
    console.log('Toggling grayscale');
    setGrayscale(prev => !prev);
  };

  const toggleHighContrast = () => {
    console.log('Toggling high contrast');
    setHighContrast(prev => !prev);
  };

  const toggleInvertColors = () => {
    console.log('Toggling invert colors');
    setInvertColors(prev => !prev);
  };

  const toggleLightBackground = () => {
    console.log('Toggling light background');
    setLightBackground(prev => !prev);
  };

  const toggleHighlightLinks = () => {
    console.log('Toggling highlight links');
    setHighlightLinks(prev => !prev);
  };

  const toggleReadableFont = () => {
    console.log('Toggling readable font');
    setReadableFont(prev => !prev);
  };

  const resetAccessibility = () => {
    setFontSize(100);
    setGrayscale(false);
    setHighContrast(false);
    setInvertColors(false);
    setLightBackground(false);
    setHighlightLinks(false);
    setReadableFont(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        grayscale,
        highContrast,
        invertColors,
        lightBackground,
        highlightLinks,
        readableFont,
        increaseFontSize,
        decreaseFontSize,
        toggleGrayscale,
        toggleHighContrast,
        toggleInvertColors,
        toggleLightBackground,
        toggleHighlightLinks,
        toggleReadableFont,
        resetAccessibility,
      }}
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
