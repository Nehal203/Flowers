import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductGridCard = ({ product, onAddToCart, onAddToWishlist, isWishlisted = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {product.original_price && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              Sale
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{product.rating} ({product.review_count})</span>
          </div>
        </div>
        
        <Link to={`/product/${product.slug}`} className="hover:text-rose-600">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-rose-600">${product.price}</span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                onAddToWishlist(product);
              }}
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
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
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