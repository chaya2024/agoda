import { Accessibility, X, Plus, Minus, RotateCcw, Eye, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    grayscale,
    toggleGrayscale,
    underlineLinks,
    toggleUnderlineLinks,
  } = useAccessibility();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-110 z-50"
        aria-label="פתח תפריט נגישות"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="סגור תפריט נגישות"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-right mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">הגדרות נגישות</h2>
              <p className="text-sm text-gray-600">התאם את האתר לצרכים שלך</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-right">גודל גופן</h3>
                <div className="flex gap-2">
                  <button
                    onClick={decreaseFontSize}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                    הקטן
                  </button>
                  <button
                    onClick={resetFontSize}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    אפס
                  </button>
                  <button
                    onClick={increaseFontSize}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    הגדל
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 text-right">תצוגה</h3>

                <button
                  onClick={toggleHighContrast}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    highContrast
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  <span>ניגודיות גבוהה</span>
                </button>

                <button
                  onClick={toggleGrayscale}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    grayscale
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  <span>גווני אפור</span>
                </button>

                <button
                  onClick={toggleUnderlineLinks}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    underlineLinks
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>הדגש קישורים</span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">ניתן לנווט באתר באמצעות מקלדת</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
