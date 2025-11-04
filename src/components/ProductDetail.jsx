import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Minus, Plus, CheckCircle, ArrowRight } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productSlug) {
        navigate('/shop');
        return;
      }

      try {
        setLoading(true);
        
        let { data: productData, error: productError } = await supabase
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

        if (productError || !productData) {
          const { data: products, error } = await supabase
            .from('products')
            .select(`
              *,
              categories (
                name,
                slug
              )
            `);
          
          if (!error && products) {
            const formattedSlug = productSlug.toLowerCase();
            productData = products.find(p => p.slug && p.slug.toLowerCase() === formattedSlug);
            productError = productData ? null : new Error('Product not found');
          } else {
            productError = error;
          }
        }

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

    fetchProduct();
  }, [productSlug, navigate]);

  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const increaseQuantity = () => {
    if (product && quantity < (product.stock || 10)) {
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
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3 mt-8"></div>
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
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image_url || product.image || 'https://via.placeholder.com/500'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-rose-600">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-rose-600">Shop</button>
          <span className="mx-2">/</span>
          <span className="text-gray-400">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
            <div className="relative aspect-square">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Available';
                }}
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-rose-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">
                  ({product.review_count || 0} Reviews)
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-rose-600">
                  ₹{finalPrice.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div className="text-sm text-green-600 mt-1">
                  You save: ₹{(product.price - product.discount_price).toLocaleString()} ({Math.round(((product.price - product.discount_price) / product.price) * 100)}%)
                </div>
              )}
              <div className="text-sm text-gray-500 mt-1">
                (Inclusive of all taxes)
              </div>
            </div>

            <div className="prose max-w-none text-gray-600 mb-6">
              <p className="mb-4">{product.description || 'No description available.'}</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fresh from our farms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Free delivery on orders above ₹999</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Same day delivery available</span>
                </li>
              </ul>
            </div>

            {product.categories && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {product.categories.name || 'Uncategorized'}
                </span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center border-x border-gray-300 py-2">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    disabled={quantity >= (product.stock || 10)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock || 10} available
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className="flex-1 border border-rose-600 text-rose-600 hover:bg-rose-50 py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Heart 
                  size={20} 
                  className={isWishlisted ? 'fill-current' : ''} 
                />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="border-b-2 border-rose-500 text-rose-600 py-4 px-1 text-sm font-medium">
                  Description
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Additional Information
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Reviews ({product.review_count || 0})
                </button>
              </nav>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
              <div className="prose prose-sm text-gray-500">
                <p>{product.long_description || product.description || 'No detailed description available.'}</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium text-gray-900 w-32">Category:</span>
                    <span>{product.categories?.name || 'Flowers'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-gray-900 w-32">Availability:</span>
                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-gray-900 w-32">SKU:</span>
                    <span>{product.sku || product.id || 'N/A'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
            <button className="text-rose-600 hover:text-rose-700 text-sm font-medium flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/product/${relatedProduct.slug || relatedProduct.id}`)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={relatedProduct.image_url || relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-rose-600 font-semibold">
                      ₹{relatedProduct.discount_price || relatedProduct.price}
                    </span>
                    {relatedProduct.discount_price && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{relatedProduct.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductDetail;
