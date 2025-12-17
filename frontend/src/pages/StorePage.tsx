import { useState } from 'react';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  image: string;
}

const StorePage = () => {
  const [filter, setFilter] = useState<string>('all');

  const products: Product[] = [
    { id: 1, name: 'חולצת האגודה', price: 50, category: 'ביגוד', inStock: true, image: 'https://via.placeholder.com/300x400?text=Shirt' },
    { id: 2, name: 'תיק גב', price: 80, category: 'אקססוריז', inStock: true, image: 'https://via.placeholder.com/300x400?text=Backpack' },
    { id: 3, name: 'ספר לימוד', price: 120, category: 'ספרים', inStock: false, image: 'https://via.placeholder.com/300x400?text=Book' },
    { id: 4, name: 'מחברת A4', price: 15, category: 'ציוד לימודי', inStock: true, image: 'https://via.placeholder.com/300x400?text=Notebook' },
    { id: 5, name: 'כובע', price: 35, category: 'ביגוד', inStock: true, image: 'https://via.placeholder.com/300x400?text=Hat' },
    { id: 6, name: 'בקבוק מים', price: 25, category: 'אקססוריז', inStock: true, image: 'https://via.placeholder.com/300x400?text=Bottle' },
  ];

  const categories = ['all', 'ביגוד', 'אקססוריז', 'ספרים', 'ציוד לימודי'];
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pb-[5vh] px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 mt-12">
          <h1 className="text-5xl font-bold mb-4">חנות האגודה</h1>
          <p className="text-xl text-gray-600">מוצרים ייחודיים למען הסטודנטים</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative aspect-[3/4]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">אזל מהמלאי</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">₪{product.price}</span>
                  <div className="flex items-center gap-1">
                    {product.inStock ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-600">במלאי</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-red-600">לא זמין</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  disabled={!product.inStock}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    product.inStock
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  הוסף לסל
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;