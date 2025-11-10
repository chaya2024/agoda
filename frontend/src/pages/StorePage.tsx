import { useEffect, useState } from 'react';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { StoreProduct } from '../lib/supabase';

const StorePage = () => {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [filter]);

  const loadProducts = async () => {
    setLoading(true);
    let query = supabase.from('store_products').select('*').order('name');

    if (filter !== 'all') {
      query = query.eq('category', filter);
    }

    const { data } = await query;
    if (data) setProducts(data);
    setLoading(false);
  };

  const categories = ['all', 'ביגוד', 'אקססוריז', 'ספרים', 'ציוד לימודי'];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 mt-12">
          <h1 className="text-5xl font-bold mb-4">חנות האגודה</h1>
          <p className="text-xl text-gray-600">מוצרים ייחודיים למען הסטודנטים</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingCart className="w-20 h-20 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {product.in_stock ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">במלאי</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">אזל</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">₪{product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-right">{product.name}</h3>
                  <p className="text-sm text-gray-600 text-right leading-relaxed mb-4 line-clamp-2">{product.description}</p>

                  <button
                    disabled={!product.in_stock}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      product.in_stock
                        ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:from-primary-600 hover:to-primary-800 shadow-md hover:shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.in_stock ? 'הוסף לסל' : 'לא זמין'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
