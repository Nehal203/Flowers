import { Heart, ShoppingCart } from 'lucide-react';

export const ProductListCard = ({ product, onAddToCart, onAddToWishlist, onNavigate, isWishlisted = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
      <div className="flex">
        <div 
          className="w-48 flex-shrink-0"
          onClick={() => onNavigate('product', product.slug)}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div 
              onClick={() => onNavigate('product', product.slug)}
              className="flex-1"
            >
              <span className="text-sm text-gray-500">{product.category}</span>
              <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>
            </div>
            <button 
              onClick={() => onAddToWishlist(product)}
              className="p-2 rounded-full hover:bg-gray-100 transition ml-4"
            >
              <Heart 
                size={20} 
                className={isWishlisted ? 'text-rose-500 fill-current' : 'text-gray-600'} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-rose-600">${product.price}</span>
                {product.original_price && (
                  <span className="text-lg text-gray-500 line-through">${product.original_price}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-600">{product.rating} ({product.review_count} reviews)</span>
              </div>
            </div>
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition flex items-center gap-2"
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