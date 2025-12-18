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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Accessibility className="w-6 h-6 text-blue-600" />
                הגדרות נגישות
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-end gap-2 mb-3">
                  <h3 className="font-semibold text-gray-900">גודל טקסט</h3>
                  <Type className="w-5 h-5 text-blue-600" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFontSize('larger')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      fontSize === 'larger'
                        ? 'bg-gray-200 text-gray-900 shadow-md border-2 border-gray-400'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    גדול מאוד
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      fontSize === 'large'
                        ? 'bg-gray-200 text-gray-900 shadow-md border-2 border-gray-400'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    גדול
                  </button>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      fontSize === 'normal'
                        ? 'bg-gray-200 text-gray-900 shadow-md border-2 border-gray-400'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    רגיל
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-end gap-2 mb-3">
                  <h3 className="font-semibold text-gray-900">ניגודיות</h3>
                  <Contrast className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setContrast(contrast === 'normal' ? 'high' : 'normal')}
                    className={`py-3 px-8 rounded-lg font-medium transition-all duration-200 ${
                      contrast === 'high'
                        ? 'bg-gray-200 text-gray-900 shadow-md border-2 border-gray-400'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
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
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors border border-gray-300"
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
