import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  url: string;
}

const baseUrl = import.meta.env.VITE_GALLERY_BASE_URL || '';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch('/galleryImages.json')
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  const categories = ['all', 'אירועים', 'פעילויות', 'חגיגות', 'קהילה'];
  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

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
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'הכל' : cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="cursor-pointer group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/3]">
                <img src={baseUrl + image.url} alt={image.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl w-full">
              <img src={baseUrl + selectedImage.url} alt={selectedImage.title} className="w-full rounded-lg" />
              <div className="bg-white mt-4 p-4 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;