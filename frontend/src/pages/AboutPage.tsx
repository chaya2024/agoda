import { Users, Target, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">אודות האגודה</h1>
          <p className="text-xl leading-relaxed">
            אגודת הסטודנטים שלנו פועלת כבר למעלה מעשור למען רווחת הסטודנטים והקהילה האקדמית.
            אנחנו מאמינים בכוח הקהילה ובחשיבות של קול הסטודנטים.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">המטרה שלנו</h3>
              <p className="text-gray-600 leading-relaxed">
                לשפר את איכות החיים הסטודנטיאלית ולקדם את האינטרסים של כלל הסטודנטים
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">הערכים שלנו</h3>
              <p className="text-gray-600 leading-relaxed">
                שקיפות, שוויון, מעורבות קהילתית ומחויבות לשירות הסטודנטים
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">החזון שלנו</h3>
              <p className="text-gray-600 leading-relaxed">
                להיות הקול המוביל של הסטודנטים ולהוביל שינוי משמעותי בקמפוס
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-bold text-center mb-4">מילת יו"ר האגודה</h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-50 to-blue-50 p-8 rounded-2xl">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                חברים וחברות יקרים,
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                ברצוני לברך אתכם על הצטרxxxכם לקהילת הסטודנטים שלנו. האגודה כאן כדי לשרת אתכם
                ולהבטיח שקולכם יישמע בכל הרמות.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                ביחד נמשיך לבנות קהילה חזקה, תומכת ומצליחה!
              </p>
              <p className="text-sm text-gray-600 mt-6">- יו"ר האגודה</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
