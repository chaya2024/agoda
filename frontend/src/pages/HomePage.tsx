import { ArrowLeft, Calendar, Users, Gift, Music, Briefcase, Heart, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 w-full" dir="rtl">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-7xl md:text-7xl font-light text-gray-900 mb-6">
              ברוכים הבאים לאגודת הסטודנטים
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed mx-auto max-w-7xl">
              אנחנו כאן כדי להפוך את חוויית הלימודים שלכם למעשירה, מהנה ובלתי נשכחת. מאירועים מרגשים ועד הטבות בלעדיות - הכל במקום אחד
            </p>

            {/* Buttons */}
            <div className="flex gap-4 justify-center mb-16 flex-wrap">
              <a
                href="#departments"
                className="bg-blue-600 text-white px-10 py-3.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                גלו עוד
              </a>
              <a
                href="/contact"
                className="bg-white text-gray-700 px-10 py-3.5 rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
              >
                צרו קשר
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
              <div className="text-center min-w-[120px]">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-2xl mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">50+</div>
                <div className="text-sm text-gray-600">אירועים בשנה</div>
              </div>
              <div className="text-center min-w-[120px]">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-2xl mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">8,000+</div>
                <div className="text-sm text-gray-600">סטודנטים פעילים</div>
              </div>
              <div className="text-center min-w-[120px]">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-2xl mb-3">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">100+</div>
                <div className="text-sm text-gray-600">הטבות בלעדיות</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-16 w-full" dir="rtl">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-12">
            מחלקות האגודה
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* מחלקת אירועים */}
            <a href="/departments/events" className="bg-white rounded-2xl p-8 shadow-sm text-center hover:shadow-lg transition-shadow group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 group-hover:bg-blue-100 transition-colors">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">מחלקת אירועים</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                אחראים על כל האירועים והפעילויות בקמפוס
              </p>
            </a>

            {/* מחלקת תרבות */}
            <a href="/departments/culture" className="bg-white rounded-2xl p-8 shadow-sm text-center hover:shadow-lg transition-shadow group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-2xl mb-4 group-hover:bg-purple-100 transition-colors">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">מחלקת תרבות</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                מביאים לכם את התרבות והאמנות לקמפוס
              </p>
            </a>

            {/* מחלקת קשרי חוץ */}
            <a href="/departments/external" className="bg-white rounded-2xl p-8 shadow-sm text-center hover:shadow-lg transition-shadow group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-4 group-hover:bg-green-100 transition-colors">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">מחלקת קשרי חוץ</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                יוצרים הטבות וקשרים עם עסקים ומוסדות
              </p>
            </a>

            {/* מחלקת רווחה */}
            <a href="/departments/welfare" className="bg-white rounded-2xl p-8 shadow-sm text-center hover:shadow-lg transition-shadow group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-50 rounded-2xl mb-4 group-hover:bg-pink-100 transition-colors">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">מחלקת רווחה</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                דואגים לרווחת הסטודנטים בקמפוס
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 w-full" dir="rtl">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              רוצים להיות חלק מהקהילה
            </h2>
            <p className="text-xl mb-8 opacity-90">
              הצטרפו לאגודת הסטודנטים עוד היום ותהנו מכל היתרונות
            </p>
            <a
              href="/register"
              className="inline-block bg-white text-blue-600 px-10 py-3.5 rounded-full font-semibold hover:shadow-xl transition-all"
            >
              הצטרפו עכשיו
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;