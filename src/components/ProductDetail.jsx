import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select(`
            *,
            categories (
              name,
              slug
            )
          `)
          .eq('slug', productSlug)
          .single();

        if (productError) throw productError;
        
        if (productData) {
          setProduct(productData);
          
          if (productData.category_id) {
            const { data: relatedData, error: relatedError } = await supabase
              .from('products')
              .select('*')
              .eq('category_id', productData.category_id)
              .neq('id', productData.id)
              .limit(4);
              
            if (!relatedError && relatedData) {
              setRelatedProducts(relatedData);
            }
          }
        } else {
          navigate('/shop');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug, navigate]);

  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/cart');
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse w-full max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg font-medium mt-4 inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </button>
      </div>
    );
  }

  const finalPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-rose-600 mb-6 flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to {document.referrer ? 'Previous Page' : 'Shop'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {hasDiscount && (
              <span className="absolute top-4 right-4 bg-rose-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">₹{finalPrice.toLocaleString()}</span>
              {hasDiscount && (
                <span className="text-lg text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
              )}
              {hasDiscount && (
                <span className="text-sm font-medium text-green-600">
                  Save ₹{(product.price - product.discount_price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-900 w-32">Availability:</span>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.details && (
              <div className="space-y-2">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex gap-4">
                    <span className="font-medium text-gray-900 w-32 capitalize">
                      {key.replace('_', ' ')}:
                    </span>
                    <span className="text-gray-700">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 h-full"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 h-full"
                  disabled={product.stock <= 0 || quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">{product.stock} available</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  product.stock > 0
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Heart size={20} className={isWishlisted ? 'fill-current text-rose-500' : ''} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>
          </div>

          {product.care_instructions && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Care Instructions</h3>
              <p className="text-gray-600 text-sm">{product.care_instructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
