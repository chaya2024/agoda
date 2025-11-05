import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Calendar, TrendingUp, Users, Target, Heart, Sparkles, MessageCircle, BookOpen } from 'lucide-react';
import * as Icons from 'lucide-react';
import { supabase, Department, NewsUpdate } from '../lib/supabase';

export default function HomePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [news, setNews] = useState<NewsUpdate[]>([]);
  const [openDepartment, setOpenDepartment] = useState<string | null>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadDepartments();
    loadNews();
  }, []);

  const loadDepartments = async () => {
    const { data } = await supabase
      .from('departments')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) setDepartments(data);
  };

  const loadNews = async () => {
    const { data } = await supabase
      .from('news_updates')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(3);

    if (data) setNews(data);
  };

  const handleDepartmentClick = (id: string) => {
    setOpenDepartment(openDepartment === id ? null : id);
    if (departmentsRef.current) {
      setTimeout(() => {
        departmentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)] || Icons.Folder;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCAxMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAgMTBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wIDEwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              ברוכים הבאים לאגודת הסטודנטים
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              האגודה שלך, הקול שלך - פועלים למען הסטודנטים בכל יום
            </p>
            <button
              onClick={() => departmentsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              גלה עוד
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">חדשות ועדכונים</h2>
            <p className="text-lg text-gray-600">הישאר מעודכן בכל מה שקורה באגודה</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {item.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title_he}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.published_at).toLocaleDateString('he-IL')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-right">{item.title_he}</h3>
                  <p className="text-gray-600 text-right leading-relaxed">{item.content_he}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={departmentsRef} className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">מחלקות האגודה</h2>
            <p className="text-lg text-gray-600">לחץ על כל מחלקה לקבלת מידע נוסף</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => handleDepartmentClick(dept.id)}
                className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                  openDepartment === dept.id
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-2xl scale-105'
                    : 'bg-white hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={openDepartment === dept.id ? 'text-white' : 'text-cyan-600'}>
                    {getIcon(dept.icon)}
                  </div>
                  <h3 className="text-sm font-bold leading-tight">{dept.name_he}</h3>
                </div>
              </button>
            ))}
          </div>

          {openDepartment && (
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 shadow-xl animate-fade-in">
              {departments
                .filter((dept) => dept.id === openDepartment)
                .map((dept) => (
                  <div key={dept.id} className="text-right">
                    <div className="flex items-center justify-end gap-4 mb-6">
                      <h3 className="text-3xl font-bold text-gray-900">{dept.name_he}</h3>
                      <div className="text-cyan-600">
                        {getIcon(dept.icon)}
                      </div>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {dept.description_he}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">למה לבחור בנו?</h2>
            <p className="text-lg text-gray-600">האגודה שלך פועלת למענך בכל רגע</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">פעילות מתמדת</h3>
              <p className="text-gray-600 leading-relaxed">
                אירועים, הטבות ופעילויות מגוונות לאורך כל השנה
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">קהילה תומכת</h3>
              <p className="text-gray-600 leading-relaxed">
                חברי אגודה פעילים שתמיד כאן כדי לעזור ולתמוך
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">הטבות בלעדיות</h3>
              <p className="text-gray-600 leading-relaxed">
                הנחות מיוחדות בחנויות, מסעדות ועוד בכל רחבי העיר
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">הערכים שלנו</h2>
            <p className="text-lg text-gray-600">העקרונות המנחים אותנו בכל פעולה</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">שקיפות</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  פועלים בשקיפות מלאה מול הסטודנטים
                </p>
              </div>
            </div>

            <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">מחויבות</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  מחויבים לשיפור חווית הלימודים
                </p>
              </div>
            </div>

            <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">חדשנות</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  מחפשים דרכים חדשות לשפר את החיים בקמפוס
                </p>
              </div>
            </div>

            <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">שיתוף פעולה</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  עובדים יחד עם הסטודנטים והמוסד
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">מספרים שמדברים בעד עצמם</h2>
            <p className="text-lg text-gray-600">ההישגים שלנו השנה</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 mb-2">
                5,000+
              </div>
              <p className="text-gray-600 font-semibold">סטודנטים פעילים</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 mb-2">
                150+
              </div>
              <p className="text-gray-600 font-semibold">אירועים השנה</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 mb-2">
                50+
              </div>
              <p className="text-gray-600 font-semibold">עסקים משתפי פעולה</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600 font-semibold">תמיכה לסטודנטים</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">איך אפשר להצטרף?</h2>
            <p className="text-lg text-gray-600">הצטרפות פשוטה ומהירה</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.UserPlus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">הרשמה</h3>
                <p className="text-gray-600 leading-relaxed">
                  צור חשבון במערכת בקלות ובמהירות
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">אימות</h3>
                <p className="text-gray-600 leading-relaxed">
                  אמת את מעמדך כסטודנט במוסד
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">תהנה</h3>
                <p className="text-gray-600 leading-relaxed">
                  קבל גישה לכל השירותים וההטבות
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">יש לך שאלות?</h2>
          <p className="text-xl mb-8 leading-relaxed opacity-90">
            הצוות שלנו כאן כדי לעזור לך. צור קשר בכל דרך שנוחה לך
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              שלח לנו הודעה
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              לעמוד יצירת קשר
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
