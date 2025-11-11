import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart as HeartFilled, X } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const loading = false;

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <HeartFilled className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save your favorite items here to view them later</p>
            <Link 
              to="/shop" 
              className="inline-block bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.images && product.images.length > 0 
                      ? product.images[0] 
                      : product.image_url || product.image || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white p-2 rounded-full text-gray-800 hover:bg-rose-500 hover:text-white transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                        toast.info(`${product.name} removed from wishlist`);
                      }}
                      className="bg-white p-2 rounded-full text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                      aria-label="Remove from wishlist"
                      title="Remove from wishlist"
                    >
                      <HeartFilled size={20} fill="currentColor" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    <Link to={`/product/${product.slug || product.id}`} className="hover:text-rose-600">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.discount_price || product.price}
                      </span>
                      {product.discount_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="flex-1 sm:flex-none bg-rose-600 hover:bg-rose-700 text-white px-2 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFromWishlist(product.id);
                          toast.info(`${product.name} removed from wishlist`, {
                            position: 'top-center',
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }}
                        className="flex-1 sm:flex-none border border-gray-300 hover:bg-rose-50 hover:border-rose-200 text-rose-600 px-2 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;