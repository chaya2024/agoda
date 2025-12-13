import { Calendar, Users, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      id: 1,
      title: 'אירועים',
      description: 'גלו את האירועים המרגשים שלנו והצטרפו לחוויה בלתי נשכחת',
      icon: Calendar,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      title: 'הטבות',
      description: 'תהנו מהטבות בלעדית ועסקים כרחבי הארץ',
      icon: Gift,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 3,
      title: 'חדשות',
      description: 'התעדכנו בכל מה שקורה באגודה ובקמפוס',
      icon: Users,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-lg md:text-xl text-white/90 mb-4">
            לחצים לרווחת חלק מהקהילה
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-relaxed">
            הצטרפו לאגודת הסטודנטים עוד היום ותהנו מכל היתרונות
          </h1>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            הצטרפו עכשיו
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            ברוכים הבאים לאגודת הסטודנטים
          </h2>
          <p className="text-center text-gray-700 text-lg max-w-4xl mx-auto mb-12 leading-relaxed">
            אנחנו כאן כדי להפוך את חווית הלימודים שלכם למעשירה, מהנה ובלתי נשכחת. מאירועים מרתקים ועד
            הטבות בלעדית - הכל במקום אחד
          </p>
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all"
            >
              גלו עוד
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all"
            >
              צור קשר
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Calendar className="w-10 h-10 mx-auto mb-4 text-blue-600" />
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">אירועים בשנה</div>
            </div>
            <div className="text-center">
              <Users className="w-10 h-10 mx-auto mb-4 text-blue-600" />
              <div className="text-4xl font-bold text-gray-900 mb-2">8,000+</div>
              <div className="text-gray-600">סטודנטים פעילים</div>
            </div>
            <div className="text-center">
              <Gift className="w-10 h-10 mx-auto mb-4 text-blue-600" />
              <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">הטבות בלעירית</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
