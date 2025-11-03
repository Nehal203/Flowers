import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onNavigate, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      alert('Please login to add items to cart');
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    onNavigate('product', product.slug);
  };

  const finalPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition ${
              isWishlisted 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-rose-500 hover:text-white'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full backdrop-blur-sm transition bg-white/80 text-gray-600 hover:bg-rose-500 hover:text-white"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded text-sm font-semibold">
            Save ₹{product.price - product.discount_price}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-rose-600 transition">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{finalPrice}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </span>
            )}
          </div>
          <span className={`text-sm px-2 py-1 rounded ${
            product.stock > 5 
              ? 'bg-green-100 text-green-800' 
              : product.stock > 0 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 5 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;