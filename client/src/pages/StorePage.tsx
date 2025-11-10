import { useEffect, useState } from 'react';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { supabase, StoreProduct } from '../lib/supabase';

export default function StorePage() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('store_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProducts(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-6 shadow-xl">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">חנות האגודה</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            מוצרים ייחודיים עם לוגו האגודה - הזמן עכשיו והראה את הגאווה שלך!
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.name_he}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
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
                      <p className="text-2xl font-bold text-cyan-600">₪{product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-right">{product.name_he}</h3>
                  <p className="text-sm text-gray-600 text-right leading-relaxed mb-4">
                    {product.description_he}
                  </p>

                  <button
                    disabled={!product.in_stock}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      product.in_stock
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-md hover:shadow-lg'
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

        {products.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">אין מוצרים להצגה כרגע</p>
          </div>
        )}

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">איך להזמין?</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700 text-right">
            <p>
              <strong>1.</strong> בחר את המוצרים שאתה מעוניין בהם והוסף לסל
            </p>
            <p>
              <strong>2.</strong> פנה למשרד האגודה בקומה 2, בניין 3
            </p>
            <p>
              <strong>3.</strong> הצג את תעודת הסטודנט שלך וקבל את המוצרים
            </p>
            <p className="text-cyan-600 font-semibold mt-6">
              משלוח חינם לכל ההזמנות מעל ₪200!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
