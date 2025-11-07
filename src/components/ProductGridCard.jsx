import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductGridCard = ({ product, onAddToCart, onAddToWishlist, isWishlisted = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasMultipleImages = product.images && product.images.length > 1;
  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      <Link to={`/product/${product.slug}`} className="block flex-grow">
        <div 
          className="relative overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-64">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isHovered && hasMultipleImages ? 'opacity-0' : 'opacity-100'
              }`}
            />
            
            {hasMultipleImages && (
              <img 
                src={product.images[1]} 
                alt={product.name}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            
            {product.original_price && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                Sale
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{product.category}</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600">{product.rating} ({product.review_count})</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 hover:text-rose-600">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        </div>
      </Link>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-rose-600">${product.price}</span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleWishlistClick}
              className="p-2 text-gray-600 hover:text-rose-500 transition-colors"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart 
                size={20}
                className={isWishlisted ? 'fill-current text-rose-500' : ''}
              />
            </button>
            <button 
              onClick={handleCartClick}
              className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};