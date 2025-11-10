import { useEffect, useState } from 'react';
import { Users, Target, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../lib/supabase';

const AboutPage = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    const { data } = await supabase.from('team_members').select('*').order('order_index');
    if (data) setTeam(data);
    setLoading(false);
  };

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
            {[
              { icon: Target, title: 'המטרה שלנו', text: 'לשפר את איכות החיים הסטודנטיאלית ולקדם את האינטרסים של כלל הסטודנטים' },
              { icon: Heart, title: 'הערכים שלנו', text: 'שקיפות, שוויון, מעורבות קהילתית ומחויבות לשירות הסטודנטים' },
              { icon: Users, title: 'החזון שלנו', text: 'להיות הקול המוביל של הסטודנטים ולהוביל שינוי משמעותי בקמפוס' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-bold text-center mb-4">מילת יו"ר האגודה</h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-50 to-blue-50 p-8 rounded-2xl">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                "שלום לכולם! אני גאה להוביל את אגודת הסטודנטים ולפעול למען כל אחד ואחת מכם.
                האגודה שלנו היא הבית של כל הסטודנטים, והקול שלכם הוא הכוח המניע שלנו."
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                "אנחנו פועלים בלא לאות כדי להבטיח שכל סטודנט יקבל את השירות, התמיכה וההזדמנויות שמגיעים לו.
                ביחד, אנחנו יוצרים קהילה חזקה ותומכת שתלווה אתכם לאורך כל הדרך."
              </p>
              <p className="text-right mt-6 font-semibold text-primary-700">- יו"ר אגודת הסטודנטים</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-center mb-12">צוות האגודה</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="w-full aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {team.map((member) => (
                  <div key={member.id} className="group">
                    <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                          <Users className="w-20 h-20 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-center">{member.name}</h3>
                    <p className="text-primary-600 font-medium text-center mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 text-center">{member.bio}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
