import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, Gift, MapPin, ChevronDown, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsApi, departmentsApi } from '../lib/api';
import * as LucideIcons from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location?: string;
  imageUrl?: string;
  isFeatured: boolean;
}

interface Department {
  id: number;
  name: string;
  description: string;
  icon?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [openDepartment, setOpenDepartment] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsData, departmentsData] = await Promise.all([
          eventsApi.getUpcoming(),
          departmentsApi.getAll()
        ]);
        setEvents(eventsData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleDepartment = (id: number) => {
    setOpenDepartment(openDepartment === id ? null : id);
  };

  const getIcon = (iconName: string | null | undefined) => {
    if (!iconName) return Users;
    const Icon = (LucideIcons as any)[iconName];
    return Icon || Users;
  };

  return (
    <div className="pb-[5vh] px-[5vw]">
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                ברוכים הבאים לאגודת הסטודנטים
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                אנחנו כאן כדי להפוך את חוויית הלימודים שלכם למעשירה, מהנה ובלתי נשכחת.
                מאירועים מרגשים ועד הטבות בלעדיות - הכל במקום אחד
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/about"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all flex items-center gap-2"
                >
                  גלו עוד
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="bg-white text-slate-700 px-8 py-3 rounded-full border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  צרו קשר
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">50+</div>
                  <div className="text-sm text-slate-600">אירועים בשנה</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">8,000+</div>
                  <div className="text-sm text-slate-600">סטודנטים פעילים</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">100+</div>
                  <div className="text-sm text-slate-600">הטבות בלעדיות</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              אירועים קרובים
            </h2>
            <p className="text-lg text-slate-600">
              הצטרפו לאירועים המרגשים שלנו והיו חלק מהקהילה
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">אין אירועים קרובים כרגע</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {event.imageUrl && (
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                  )}
                  <div className="p-6">
                    {event.isFeatured && (
                      <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        מומלץ
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(event.eventDate).toLocaleDateString('he-IL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              מחלקות האגודה
            </h2>
            <p className="text-lg text-slate-600">
              הכירו את המחלקות שלנו והשירותים שאנחנו מציעים
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {departments.map((department) => {
                const Icon = getIcon(department.icon);
                const isOpen = openDepartment === department.id;

                return (
                  <div
                    key={department.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleDepartment(department.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {department.name}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {department.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {department.contactEmail && (
                            <a
                              href={`mailto:${department.contactEmail}`}
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                              <Mail className="w-4 h-4" />
                              {department.contactEmail}
                            </a>
                          )}
                          {department.contactPhone && (
                            <a
                              href={`tel:${department.contactPhone}`}
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                              <Phone className="w-4 h-4" />
                              {department.contactPhone}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            רוצים להיות חלק מהקהילה?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            הצטרפו לאגודת הסטודנטים עוד היום ותהנו מכל היתרונות
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            הצטרפו עכשיו
          </Link>
        </div>
      </section>
    </div>
  );
}
