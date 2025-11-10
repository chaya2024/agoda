import { useEffect, useState } from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Right } from '../lib/supabase';

const RightsPage = () => {
  const [rights, setRights] = useState<Right[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRights();
  }, []);

  const loadRights = async () => {
    const { data } = await supabase.from('rights').select('*').order('order_index');
    if (data) {
      setRights(data);
      if (data.length > 0) setOpenCategory(data[0].category);
    }
    setLoading(false);
  };

  const categories = [...new Set(rights.map((r) => r.category))];
  const groupedRights = categories.map((cat) => ({
    category: cat,
    items: rights.filter((r) => r.category === cat),
  }));

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">זכויות הסטודנטים</h1>
          <p className="text-xl leading-relaxed">
            כל סטודנט זכאי למגוון זכויות והטבות. כאן תמצאו את כל המידע החשוב שצריך לדעת
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {groupedRights.map((group) => (
              <div key={group.category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                  className="w-full p-6 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                >
                  <ChevronDown
                    className={`w-6 h-6 text-primary-600 transition-transform duration-300 flex-shrink-0 ${
                      openCategory === group.category ? 'rotate-180' : ''
                    }`}
                  />
                  <h2 className="text-2xl font-bold text-gray-900">{group.category}</h2>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openCategory === group.category ? 'max-h-[2000px]' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 border-t border-gray-100 space-y-6">
                    {group.items.map((right) => (
                      <div key={right.id} className="border-r-4 border-primary-500 pr-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{right.title}</h3>
                        <div
                          className="prose prose-lg max-w-none text-right text-gray-600"
                          dangerouslySetInnerHTML={{ __html: right.content }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightsPage;
