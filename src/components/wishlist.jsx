import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Heart as HeartFilled } from 'lucide-react';
import ProductCard from './ProductCard';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockWishlist = [
    {
      id: '1',
      name: 'Red Rose Bouquet',
      slug: 'red-rose-bouquet',
      price: 1299,
      discount_price: 999,
      image_url: 'https://i.pinimg.com/736x/62/41/eb/6241eb803728ad49fc8a684fa905e62b.jpg',
      inStock: true
    },
    {
      id: '2',
      name: 'Lily Arrangement',
      slug: 'lily-arrangement',
      price: 899,
      image_url: 'https://png.pngtree.com/png-clipart/20250531/original/pngtree-white-lilies-blooming-with-green-fresh-leaves-png-image_21099878.png',
      inStock: true
    }
  ];

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setWishlist(mockWishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const moveToCart = (product) => {
    alert(`Added ${product.name} to cart`);
    removeFromWishlist(product.id);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <HeartFilled className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">You haven't added any products to your wishlist yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={(type, slug) => window.location.href = `/${type}/${slug}`}
              onAddToCart={(product) => {
                console.log('Adding to cart:', product);
                alert(`Added ${product.name} to cart`);
                removeFromWishlist(product.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}