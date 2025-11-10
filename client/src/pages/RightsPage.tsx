import { useEffect, useState } from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import { supabase, RightCategory } from '../lib/supabase';

export default function RightsPage() {
  const [categories, setCategories] = useState<RightCategory[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('rights_categories')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) {
      setCategories(data);
      if (data.length > 0) setOpenCategory(data[0].id);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-6 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">זכויות הסטודנטים</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            האגודה שלנו פועלת ללא הפסקה כדי להגן על הזכויות שלך ולוודא שאתה מקבל את מה שמגיע לך
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                  className="w-full p-6 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                >
                  <ChevronDown
                    className={`w-6 h-6 text-cyan-600 transition-transform duration-300 flex-shrink-0 ${
                      openCategory === category.id ? 'rotate-180' : ''
                    }`}
                  />
                  <h2 className="text-2xl font-bold text-gray-900">{category.name_he}</h2>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openCategory === category.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 border-t border-gray-100">
                    <p className="text-lg text-gray-700 leading-relaxed text-right">
                      {category.description_he}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {categories.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">אין מידע זמין כרגע</p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">זקוק לעזרה?</h2>
          <p className="text-lg leading-relaxed text-center mb-8">
            אם אתה מרגיש שזכויותיך נפגעות או שיש לך שאלות, אנחנו כאן בשבילך!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">פנה אלינו</h3>
              <p className="text-white/90">בואו למשרד האגודה בקומה 2</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">התקשר</h3>
              <p className="text-white/90">03-1234567</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">שלח מייל</h3>
              <p className="text-white/90">rights@union.ac.il</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 text-right">
          <h3 className="text-xl font-bold text-gray-900 mb-3">חשוב לדעת:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold flex-shrink-0">•</span>
              <span>כל סטודנט זכאי לייצוג משפטי בעניינים אקדמיים</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold flex-shrink-0">•</span>
              <span>זכותך לעיין בעבודות ובחינות שלך ולקבל הסברים על הציונים</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold flex-shrink-0">•</span>
              <span>האגודה מספקת סיוע משפטי ללא עלות לחברי האגודה</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
