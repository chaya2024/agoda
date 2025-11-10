import { useState } from 'react';
import { MessageCircle, X, Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 bottom-8 z-40 bg-secondary-500 hover:bg-secondary-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="פתח פאנל יצירת קשר"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          צור קשר
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md sm:m-4 animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-secondary-500" />
                צור קשר
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <a
                  href="mailto:info@studentunion.ac.il"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-primary-100 text-primary-600 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">דוא"ל</p>
                    <p className="text-sm text-gray-600">info@studentunion.ac.il</p>
                  </div>
                </a>

                <a
                  href="tel:03-1234567"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-secondary-100 text-secondary-600 rounded-lg group-hover:bg-secondary-200 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">טלפון</p>
                    <p className="text-sm text-gray-600">03-1234567</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">כתובת</p>
                    <p className="text-sm text-gray-600">קמפוס האוניברסיטה, בניין 1</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    דוא"ל
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200 ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>נשלח בהצלחה!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>שלח הודעה</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPanel;
