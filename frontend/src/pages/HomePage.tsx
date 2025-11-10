import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Calendar, Users, Award, TrendingUp, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Department, NewsItem } from '../lib/supabase';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [openDepartment, setOpenDepartment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const departmentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const [{ data: deptsData }, { data: newsData }] = await Promise.all([
      supabase.from('departments').select('*').order('order_index'),
      supabase.from('news').select('*').order('published_at', { ascending: false }).limit(3),
    ]);

    if (deptsData) setDepartments(deptsData);
    if (newsData) setNews(newsData);
    setLoading(false);
  };

  const scrollToDepartments = () => {
    departmentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-br from-primary-400 via-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCAxMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAgMTBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wIDEwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              ברוכים הבאים
              <br />
              <span className="bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
                לאגודת הסטודנטים
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              האגודה שלך, הקול שלך - פועלים למען הסטודנטים בכל יום
            </p>
            <button
              onClick={scrollToDepartments}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              גלה עוד
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">חדשות ועדכונים</h2>
            <p className="text-lg text-gray-600">הישאר מעודכן בכל מה שקורה באגודה</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.published_at).toLocaleDateString('he-IL')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-right">{item.title}</h3>
                    <p className="text-gray-600 text-right leading-relaxed line-clamp-3">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section ref={departmentsRef} className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">מחלקות האגודה</h2>
            <p className="text-lg text-gray-600">לחץ על כל מחלקה לקבלת מידע נוסף</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-6 rounded-2xl shadow-lg bg-gray-200 animate-pulse h-32"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setOpenDepartment(openDepartment === dept.id ? null : dept.id)}
                    className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                      openDepartment === dept.id
                        ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-2xl scale-105'
                        : 'bg-white hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="text-4xl">{dept.icon}</div>
                      <h3 className="text-sm font-bold leading-tight">{dept.name}</h3>
                    </div>
                  </button>
                ))}
              </div>

              {openDepartment && (
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl p-8 shadow-xl animate-slide-down">
                  {departments
                    .filter((dept) => dept.id === openDepartment)
                    .map((dept) => (
                      <div key={dept.id} className="text-right">
                        <div className="flex items-center justify-end gap-4 mb-6">
                          <h3 className="text-3xl font-bold text-gray-900">{dept.name}</h3>
                          <div className="text-4xl">{dept.icon}</div>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">{dept.description}</p>
                        <div className="prose prose-lg max-w-none text-right" dangerouslySetInnerHTML={{ __html: dept.content }} />
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">למה לבחור בנו?</h2>
            <p className="text-lg text-gray-600">האגודה שלך פועלת למענך בכל רגע</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'פעילות מתמדת',
                description: 'אירועים, הטבות ופעילויות מגוונות לאורך כל השנה',
                color: 'from-primary-500 to-primary-700',
              },
              {
                icon: Users,
                title: 'קהילה תומכת',
                description: 'חברי אגודה פעילים שתמיד כאן כדי לעזור ולתמוך',
                color: 'from-secondary-500 to-secondary-700',
              },
              {
                icon: Award,
                title: 'הטבות בלעדיות',
                description: 'הנחות מיוחדות בחנויות, מסעדות ועוד בכל רחבי העיר',
                color: 'from-green-500 to-green-700',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full font-semibold hover:from-primary-600 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              למד עוד אודותינו
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
