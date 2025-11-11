import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, HeartOff, ShoppingCart, Star, Minus, Plus, CheckCircle, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Check, X, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sampleProducts } from '../data/sampleProducts';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentColor, setCurrentColor] = useState('White');
  const [currentSize, setCurrentSize] = useState('M');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const imageRef = useRef(null);

  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods, including credit/debit cards, PayPal, and bank transfers for your convenience."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to many countries. Please check our shipping information page for details on available destinations and shipping rates."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package's delivery status on our website or through the courier's tracking portal."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a hassle-free return policy. If you're not satisfied with your purchase for any reason, you can return it within 30 days for a full refund or exchange. Please refer to our returns page for detailed instructions."
    },
    {
      question: "Are your products covered by a warranty?",
      answer: "Yes, most of our products come with a manufacturer's warranty against defects in materials and workmanship. The duration and terms of the warranty vary by product, so please check the product description or contact our customer support team for specific details."
    }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 20);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getProduct = () => {
      if (!productSlug) {
        console.error('No product slug provided');
        navigate('/shop');
        return;
      }

      try {
        setLoading(true);

        const foundProduct = sampleProducts.find(
          p => p.slug && p.slug.toLowerCase() === productSlug.toLowerCase()
        );

        if (!foundProduct) {
          console.error('Product not found with slug:', productSlug);
          return;
        }

        setProduct(foundProduct);

        const related = sampleProducts.filter(
          p => p.category_slug === foundProduct.category_slug && p.id !== foundProduct.id
        ).slice(0, 4);

        setRelatedProducts(related);
      } catch (error) {
        console.error('Error finding product:', error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productSlug, navigate]);

  const handleAddToCart = () => {
    if (!product) return;

    const productToAdd = {
      ...product,
      selectedColor: currentColor,
      selectedSize: currentSize,
      image_url: Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : product.image_url || '/placeholder-image.jpg'
    };

    addToCart(productToAdd, quantity);
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
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist', {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist', {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2 mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
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

  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const finalPrice = hasDiscount ? product.discount_price : product.price;

  const fadeUp = {
    hidden: { y: 16, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 }
    }
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image_url || product.image || '/placeholder-image.jpg'];

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            whileHover={{ x: -2 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </motion.button>

          {loading ? (
            <div>Loading...</div>
          ) : product ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div
                  ref={imageRef}
                  className={`space-y-4 ${isSticky ? ' top-24 transition-all duration-300' : ''}`}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
                    <motion.button
                      onClick={handleWishlist}
                      className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                      aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {isInWishlist(product.id) ? (
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                      ) : (
                        <HeartOff className="w-6 h-6 text-gray-600" />
                      )}
                    </motion.button>
                    <motion.img
                      src={images[selectedImage]}
                      alt={product.name}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100?text=Image';
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={selectedImage}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                          selectedImage === index ? 'border-blue-500' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:pl-8">
                  <motion.div 
                    className="flex items-center text-sm text-gray-500 mb-2" 
                    variants={container} 
                    initial="hidden" 
                    whileInView="show" 
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Link to="/"><span>Home</span></Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link to="/shop"><span>Shop</span></Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-gray-400">{product.name}</span>
                  </motion.div>

                  <motion.h1 
                    className="text-3xl font-bold text-gray-900 mb-4" 
                    variants={fadeUp} 
                    initial="hidden" 
                    whileInView="show" 
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {product.name}
                  </motion.h1>

                  <motion.div 
                    className="flex items-center mb-6" 
                    variants={fadeUp} 
                    initial="hidden" 
                    whileInView="show" 
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(150 reviews)</span>
                    <span className="mx-3 text-gray-300">|</span>
                    <span className="text-sm text-green-600 font-medium">In Stock</span>
                  </motion.div>

                  <motion.div 
                    className="mb-6" 
                    variants={fadeUp} 
                    initial="hidden" 
                    whileInView="show" 
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
                      {hasDiscount && (
                        <span className="ml-3 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      )}
                      {hasDiscount && (
                        <span className="ml-3 bg-red-100 text-red-600 text-sm font-medium px-2 py-0.5 rounded">
                          {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-gray-600 mb-8"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {product.description || 'No description available for this product.'}
                  </motion.p>

                  <motion.div 
                    className="border-t border-b border-gray-200 py-6 mb-6" 
                    variants={container} 
                    initial="hidden" 
                    whileInView="show" 
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-center space-x-6" 
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={decreaseQuantity}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button
                          onClick={increaseQuantity}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                      <div className="flex flex-wrap gap-2">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setCurrentSize(size)}
                            className={`px-4 py-2 border rounded-md text-sm font-medium ${currentSize === size
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div> */}

<<<<<<< HEAD
<div className="flex items-center space-x-6">
=======
                    <motion.div className="flex items-center space-x-6" variants={fadeUp}>
>>>>>>> 6e4d586 (any message)
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        onClick={decreaseQuantity}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-12 text-center">{quantity}</span>
      <button
        onClick={increaseQuantity}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>

    <button
      onClick={handleAddToCart}
      className="flex-1 bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      Add to Cart
    </button>

    <button
      onClick={handleWishlist}
      className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
      aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
=======
                      <motion.button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </motion.button>

                      <motion.button
                        onClick={handleWishlist}
                        className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                        aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
>>>>>>> 6e4d586 (any message)
    >
      <Heart
        className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
      />
<<<<<<< HEAD
                      </button >
                    </div >
                  </div >
=======
                      </motion.button>
                    </motion.div>
                  </motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="space-y-4 mt-12"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    <motion.div
      className="border-b border-gray-200"
      variants={fadeUp}
    >
      <motion.button
        whileHover={{ x: 4 }}
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
      >
        <span className="font-medium text-gray-900">Description</span>
        {isDescriptionOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </motion.button>
      {isDescriptionOpen && (
        <motion.div 
          className="pb-4 text-gray-600" 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: 'auto', opacity: 1 }} 
          transition={{ duration: 0.3 }}
        >
          <p className="mb-4">
            {product.long_description || product.description || 'No detailed description available.'}
          </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>High-quality material</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Comfortable fit</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Available in multiple colors</span>
              </li>
            </ul>
<<<<<<< HEAD
                        </div >
=======
                        </motion.div>
>>>>>>> 6e4d586 (any message)
                      )}
                    </div >

                    <div className="border-b border-gray-200">
                      <button
                        className="flex justify-between items-center w-full py-4 text-left"
                        onClick={() => setIsShippingOpen(!isShippingOpen)}
                      >
                        <span className="font-medium text-gray-900">Shipping & Returns</span>
                        {isShippingOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      {isShippingOpen && (
                        <div className="pb-4 text-gray-600">
                          <p className="mb-2">Free shipping on all orders over $50. Standard delivery takes 3-5 business days.</p>
                          <p>Free returns within 30 days of purchase.</p>
                        </div>
                      )}
                    </div>

                    <div className="border-b border-gray-200">
                      <button
                        className="flex justify-between items-center w-full py-4 text-left"
                        onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                      >
                        <span className="font-medium text-gray-900">Reviews (150)</span>
                        {isReviewsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      {isReviewsOpen && (
<<<<<<< HEAD
                        <div className="pb-4">
=======
                        <motion.div className="pb-4" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }}>
>>>>>>> 6e4d586 (any message)
          <motion.div
            className="flex items-center mb-4"
            variants={fadeUp}
          >
            <div className="flex text-yellow-400 mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star className="w-5 h-5 fill-current" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm font-medium">4.9 out of 5</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">150 Reviews</span>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium mr-3">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-600 text-sm">Great product! Fits perfectly and the quality is amazing.</p>
            </div>
          </div>
<<<<<<< HEAD
                        </div >
=======
                        </motion.div>
>>>>>>> 6e4d586 (any message)
                      )}
                    </div >
                  </div >
                </div >
              </div >

  <div>
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqItems.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="flex justify-between items-center w-full py-4 text-left text-gray-900 font-medium"
              onClick={() => toggleFaq(index)}
              aria-expanded={openFaqIndex === index}
            >
              <span>{faq.question}</span>
              {openFaqIndex === index ? (
                <Minus className="w-5 h-5 text-gray-500" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openFaqIndex === index && (
<<<<<<< HEAD
              <div className="pb-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
=======
                          <motion.div className="pb-4 text-gray-600" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }}>
                            <p>{faq.answer}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>

    {relatedProducts.length > 0 && (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group relative">
              <Link to={`/product/${relatedProduct.slug}`} className="block">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={relatedProduct.image_url || '/placeholder-image.jpg'}
                    alt={relatedProduct.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
              </Link>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link to={`/product/${relatedProduct.slug}`} className="hover:text-rose-600">
                      {relatedProduct.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{relatedProduct.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${relatedProduct.price.toFixed(2)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const productToAdd = {
                    ...relatedProduct,
                    image_url: relatedProduct.image_url ||
                      (Array.isArray(relatedProduct.images) && relatedProduct.images[0]) ||
                      '/path/to/default-image.jpg',
                    selectedColor: relatedProduct.colors?.[0] || 'Default',
                    selectedSize: relatedProduct.sizes?.[0] || 'M'
                  };
                  addToCart(productToAdd, 1);
                  toast.success(`${relatedProduct.name} added to cart!`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                }}
                className="mt-2 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 z-10 relative"
              >
                Add to Cart
              </button>
<<<<<<< HEAD
                        </div >
                      ))}
                    </div >
=======
                        </motion.div>
                      ))}
                    </motion.div>
>>>>>>> 6e4d586 (any message)
                  </div >
                )}
              </div >
            </div >
          ) : (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
    <button
      onClick={() => navigate('/shop')}
      className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
    >
      Back to Shop
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
