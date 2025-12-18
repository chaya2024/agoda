import { useState } from 'react';
import { Accessibility, ZoomIn, ZoomOut, Palette, Contrast, Sun, Link, Type, RotateCcw, X } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
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
  } = useAccessibility();

  const accessibilityOptions = [
    { label: 'הגדל טקסט', icon: ZoomIn, action: increaseFontSize, active: false },
    { label: 'הקטן טקסט', icon: ZoomOut, action: decreaseFontSize, active: false },
    { label: 'מונו אפור', icon: Palette, action: toggleGrayscale, active: grayscale },
    { label: 'ניגודיות גבוהה', icon: Contrast, action: toggleHighContrast, active: highContrast },
    { label: 'ניגודיות הפוכה', icon: Contrast, action: toggleInvertColors, active: invertColors },
    { label: 'רקע בהיר', icon: Sun, action: toggleLightBackground, active: lightBackground },
    { label: 'הדגשת קישורים', icon: Link, action: toggleHighlightLinks, active: highlightLinks },
    { label: 'פונט קריא', icon: Type, action: toggleReadableFont, active: readableFont },
    { label: 'איפוס', icon: RotateCcw, action: resetAccessibility, active: false },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-l-xl shadow-lg transition-all duration-300 hover:pl-6 group"
        aria-label="פתח תפריט נגישות"
      >
        <Accessibility className="w-6 h-6" />
        <span className="absolute left-full ml-2 bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          נגישות
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm m-4 animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                כלי נגישות
              </h2>
            </div>

            <div className="p-4">
              <div className="space-y-1">
                {accessibilityOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      console.log('Button clicked:', option.label);
                      option.action();
                    }}
                    className={`w-full flex items-center justify-end gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-right ${
                      option.active
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-300'
                        : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                    }`}
                  >
                    <span className="font-medium text-base">{option.label}</span>
                    <option.icon className={`w-5 h-5 flex-shrink-0 ${option.active ? 'text-blue-600' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                ניתן להשתמש במקלדת לניווט באתר באמצעות מקש Tab
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;
