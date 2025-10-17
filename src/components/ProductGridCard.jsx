import { Heart, ShoppingCart } from 'lucide-react';

export const ProductGridCard = ({ product, onAddToCart, onAddToWishlist, onNavigate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
      <div 
        className="relative"
        onClick={() => onNavigate('product', product.slug)}
      >
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
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist(product);
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{product.rating} ({product.review_count})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-rose-600">${product.price}</span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
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
  );
};