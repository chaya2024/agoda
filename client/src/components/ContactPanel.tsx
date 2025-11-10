import { Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <div className="flex items-center">
        <div className="bg-gradient-to-b from-cyan-500 to-blue-600 text-white p-6 rounded-l-none rounded-r-2xl shadow-2xl w-64">
          <h3 className="text-lg font-bold mb-4 text-right">יצירת קשר</h3>
          <div className="space-y-4">
            <a
              href="tel:03-1234567"
              className="flex items-center gap-3 text-sm hover:text-cyan-100 transition-colors"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="text-right">03-1234567</span>
            </a>
            <a
              href="mailto:info@union.ac.il"
              className="flex items-center gap-3 text-sm hover:text-cyan-100 transition-colors break-all"
            >
              <Mail className="w-5 h-5 flex-shrink-0" />
              <span className="text-right">info@union.ac.il</span>
            </a>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-right">קמפוס האוניברסיטה, בניין 3, קומה 2</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-xs text-right text-cyan-50">שעות פעילות:</p>
            <p className="text-sm text-right font-medium">א׳-ה׳: 9:00-17:00</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-b from-cyan-500 to-blue-600 text-white p-3 rounded-l-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
          aria-label={isOpen ? 'סגור פאנל קשר' : 'פתח פאנל קשר'}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
