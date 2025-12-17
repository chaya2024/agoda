import { ArrowLeft, Calendar, Users, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="pb-[5vh] px-[5vw]">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                ברוכים הבאים לאגודת הסטודנטים
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                אנחנו כאן כדי להפוך את חוויית הלימודים שלכם למעשירה, מהנה ובלתי נשכחת.
                מאירועים מרגשים ועד הטבות בלעדיות - הכל במקום אחד
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/about"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all flex items-center gap-2"
                >
                  גלו עוד
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="bg-white text-slate-700 px-8 py-3 rounded-full border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  צרו קשר
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">50+</div>
                  <div className="text-sm text-slate-600">אירועים בשנה</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">8,000+</div>
                  <div className="text-sm text-slate-600">סטודנטים פעילים</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">100+</div>
                  <div className="text-sm text-slate-600">הטבות בלעדיות</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              to="/about"
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">אירועים</h3>
              <p className="text-slate-600">
                גלו את האירועים המרגשים שלנו והצטרפו לחוויה בלתי נשכחת
              </p>
            </Link>

            <Link
              to="/about"
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">הטבות</h3>
              <p className="text-slate-600">
                תהנו מהטבות בלעדיות במגוון עסקים ברחבי הארץ
              </p>
            </Link>

            <Link
              to="/about"
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">חדשות</h3>
              <p className="text-slate-600">
                התעדכנו בכל מה שקורה באגודה ובקמפוס
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            רוצים להיות חלק מהקהילה?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            הצטרפו לאגודת הסטודנטים עוד היום ותהנו מכל היתרונות
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            הצטרפו עכשיו
          </Link>
        </div>
      </section>
    </div>
  );
}
