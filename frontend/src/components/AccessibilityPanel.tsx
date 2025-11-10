import { useState } from 'react';
import { Accessibility, Type, Contrast, RotateCcw, X } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, contrast, setFontSize, setContrast, resetAccessibility } = useAccessibility();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-r-xl shadow-lg transition-all duration-300 hover:pr-6 group"
        aria-label="פתח תפריט נגישות"
      >
        <Accessibility className="w-6 h-6" />
        <span className="absolute right-full mr-2 bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          נגישות
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Accessibility className="w-6 h-6 text-primary-600" />
                הגדרות נגישות
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-5 h-5 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">גודל טקסט</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      fontSize === 'normal'
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    רגיל
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      fontSize === 'large'
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    גדול
                  </button>
                  <button
                    onClick={() => setFontSize('larger')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      fontSize === 'larger'
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    גדול מאוד
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Contrast className="w-5 h-5 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">ניגודיות</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setContrast('normal')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      contrast === 'normal'
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    רגילה
                  </button>
                  <button
                    onClick={() => setContrast('high')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      contrast === 'high'
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    גבוהה
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  resetAccessibility();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                איפוס להגדרות ברירת מחדל
              </button>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
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
