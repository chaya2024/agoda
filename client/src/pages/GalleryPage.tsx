import { useEffect, useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { supabase, GalleryImage } from '../lib/supabase';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('event_date', { ascending: false });

    if (data) setImages(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">גלריית תמונות</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            רגעים מיוחדים מאירועי האגודה והפעילויות שלנו
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title_he}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 text-right">{image.title_he}</h3>
                      {image.description_he && (
                        <p className="text-sm text-white/90 text-right">{image.description_he}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-right">{image.title_he}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
                    <span>{image.event_date ? new Date(image.event_date).toLocaleDateString('he-IL') : ''}</span>
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">אין תמונות להצגה כרגע</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="סגור"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title_he}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="bg-white/10 backdrop-blur-md text-white p-6 mt-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-right">{selectedImage.title_he}</h3>
              {selectedImage.description_he && (
                <p className="text-lg text-white/90 mb-3 text-right">{selectedImage.description_he}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-white/80 justify-end">
                <span>{selectedImage.event_date ? new Date(selectedImage.event_date).toLocaleDateString('he-IL') : ''}</span>
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
