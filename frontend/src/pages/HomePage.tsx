import { useRef } from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const departmentsRef = useRef<HTMLDivElement>(null);

  const scrollToDepartments = () => {
    departmentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const departments = [
    { id: 1, name: 'מחלקת תרבות', description: 'אחראית על אירועי תרבות ובידור לסטודנטים' },
    { id: 2, name: 'מחלקת ספורט', description: 'מקדמת פעילות ספורט ואורח חיים בריא' },
    { id: 3, name: 'מחלקת חברה', description: 'מטפלת ברווחה וצרכים חברתיים של הסטודנטים' },
  ];

  const news = [
    { id: 1, title: 'אירוע פתיחת שנה', date: '2025-10-01', content: 'אירוע פתיחת שנת הלימודים' },
    { id: 2, title: 'יום ספורט', date: '2025-10-15', content: 'יום הספורט השנתי' },
    { id: 3, title: 'הנחות חדשות', date: '2025-11-01', content: 'הנחות חדשות לסטודנטים' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-br from-primary-400 via-primary-600 to-primary-800 overflow-hidden">
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              ברוכים הבאים לאגודת הסטודנטים
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              האגודה שלך, הקול שלך - פועלים למען הסטודנטים בכל יום
            </p>
            <button
              onClick={scrollToDepartments}
              className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              גלה עוד
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
              <div className="text-gray-600">סטודנטים פעילים</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">אירועים בשנה</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">מחויבות להצלחתכם</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">חדשות ועדכונים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString('he-IL')}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={departmentsRef} className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">המחלקות שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">{dept.name}</h3>
                <p className="text-gray-600 mb-6">{dept.description}</p>
                <Link
                  to="/about"
                  className="text-primary-600 font-semibold hover:text-primary-700"
                >
                  קרא עוד
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
