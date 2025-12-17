import { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

const RightsPage = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const rights = [
    {
      id: 1,
      title: 'זכות לייצוג',
      description: 'כל סטודנט זכאי לייצוג הולם מול הנהלת המכללה',
      details: 'האגודה מייצגת את הסטודנטים בכל הנושאים האקדמיים והמנהליים, ומבטיחה שקולכם נשמע בכל ההחלטות החשובות.'
    },
    {
      id: 2,
      title: 'זכות להנחות',
      description: 'הנחות מיוחדות לסטודנטים בעסקים שונים',
      details: 'חברי האגודה זכאים להנחות בחנויות, מסעדות, ספורט ובידור ברחבי הארץ.'
    },
    {
      id: 3,
      title: 'זכות לפעילויות',
      description: 'גישה לאירועים ופעילויות של האגודה',
      details: 'אירועי תרבות, ספורט, סדנאות וערבי היכרות לאורך כל השנה.'
    },
    {
      id: 4,
      title: 'זכות לסיוע',
      description: 'סיוע במצבי משבר ובעיות אקדמיות',
      details: 'האגודה מספקת תמיכה וסיוע בכל נושא אקדמי, חברתי או כלכלי.'
    },
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen pb-[5vh] px-[5vw] bg-gray-50">
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">זכויות הסטודנטים</h1>
          <p className="text-xl text-white/90">
            כל מה שאתם צריכים לדעת על הזכויות שלכם כסטודנטים
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {rights.map((right) => (
              <div
                key={right.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExpand(right.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <div className="text-right">
                      <h3 className="text-xl font-bold">{right.title}</h3>
                      <p className="text-gray-600">{right.description}</p>
                    </div>
                  </div>
                  {expandedId === right.id ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {expandedId === right.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <p className="text-gray-700">{right.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">צריכים עזרה?</h2>
          <p className="text-xl text-gray-600 mb-8">
            האגודה כאן בשבילכם! פנו אלינו בכל שאלה או בעיה
          </p>
          <a
            href="mailto:info@agoda.co.il"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            צור קשר
          </a>
        </div>
      </section>
    </div>
  );
};

export default RightsPage;