import { Mail, Briefcase } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'רועי כהן',
      role: 'יו"ר האגודה',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'roei@union.ac.il',
    },
    {
      name: 'נועה לוי',
      role: 'סגנית יו"ר',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'noa@union.ac.il',
    },
    {
      name: 'יונתן אברהם',
      role: 'גזבר',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'yonatan@union.ac.il',
    },
    {
      name: 'שירה מזרחי',
      role: 'מזכירה',
      image: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'shira@union.ac.il',
    },
    {
      name: 'אלעד דוד',
      role: 'רכז תרבות',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'elad@union.ac.il',
    },
    {
      name: 'מיכל שפירא',
      role: 'רכזת רווחה',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'michal@union.ac.il',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">אודות האגודה</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            אגודת הסטודנטים פועלת למען הסטודנטים מזה למעלה מ-20 שנה, ומספקת מגוון שירותים, פעילויות והטבות
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-right">מסר מיו"ר האגודה</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="יו״ר האגודה"
              className="w-48 h-48 rounded-2xl object-cover shadow-lg"
            />
            <div className="flex-1 text-right space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                שלום לכולם,
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                ברוכים הבאים לאגודת הסטודנטים! אנחנו כאן כדי לדאוג שחוויית הלימודים שלכם תהיה מלאה, מעשירה ומהנה.
                האגודה שלנו פועלת ללא הפסקה כדי להבטיח את זכויותיכם, לספק לכם הטבות ייחודיות, ולארגן אירועים
                וחוויות בלתי נשכחות.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                אני מזמין אתכם להיות חלק אקטיבי בחיי הקמפוס, לבוא לאירועים שלנו, ולפנות אלינו בכל שאלה או בקשה.
                ביחד נמשיך לבנות קהילה אקדמית חזקה ותומכת.
              </p>
              <p className="text-lg text-gray-800 font-semibold">
                בהצלחה בשנת הלימודים!<br />
                רועי כהן, יו"ר האגודה
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">הצוות שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-right">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <div className="flex items-center gap-2 text-cyan-600 mb-3 justify-end">
                    <span className="text-sm font-medium">{member.role}</span>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors justify-end"
                  >
                    <span className="text-sm">{member.email}</span>
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">החזון שלנו</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            ליצור קהילה סטודנטיאלית תוססת ומגובשת, בה כל סטודנט מרגיש שייך, מוערך ומקבל את כל הכלים
            להצליח הן אקדמית והן חברתית. אנחנו שואפים להיות הקול המייצג והחזק של כל הסטודנטים, ולפעול
            ללא לאות למען שיפור התנאים והחוויה האקדמית.
          </p>
        </div>
      </div>
    </div>
  );
}
