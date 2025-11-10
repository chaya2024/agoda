import { useEffect, useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { GalleryImage } from '../lib/supabase';

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, [filter]);

  const loadImages = async () => {
    setLoading(true);
    let query = supabase.from('gallery_images').select('*').order('event_date', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('category', filter);
    }

    const { data } = await query;
    if (data) setImages(data);
    setLoading(false);
  };

  const categories = ['all', 'אירועים', 'פעילויות', 'חגיגות', 'קהילה'];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 mt-12">
          <h1 className="text-5xl font-bold mb-4">גלריית התמונות</h1>
          <p className="text-xl text-gray-600">רגעים מיוחדים מהאירועים והפעילויות שלנו</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'הכל' : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(image.event_date).toLocaleDateString('he-IL')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-6 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">{selectedImage.title}</h2>
              {selectedImage.description && <p className="text-lg mb-3">{selectedImage.description}</p>}
              <div className="flex items-center justify-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(selectedImage.event_date).toLocaleDateString('he-IL')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
