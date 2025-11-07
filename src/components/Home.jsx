import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Truck, Shield, Clock, Gift, ShoppingBag } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Testimonials from './Testimonials';
import WhyChooseUs from './WhyChooseUs';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const Home = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.1 });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockFeaturedProducts = [
    {
      id: '1',
      name: 'Red Rose Bouquet',
      slug: 'red-rose-bouquet',
      description: 'Beautiful red roses arranged in an elegant bouquet',
      price: 1299,
      discount_price: 999,
      image_url: 'https://i.pinimg.com/736x/62/41/eb/6241eb803728ad49fc8a684fa905e62b.jpg',
      category_id: '1',
      stock: 15,
      is_featured: true,
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Lily Arrangement',
      slug: 'lily-arrangement',
      description: 'Fresh white lilies with green foliage',
      price: 899,
      image_url: 'https://png.pngtree.com/png-clipart/20250531/original/pngtree-white-lilies-blooming-with-green-fresh-leaves-png-image_21099878.png',
      category_id: '2',
      stock: 8,
      is_featured: true,
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Mixed Flower Basket',
      slug: 'mixed-flower-basket',
      description: 'Colorful mixed flowers in a beautiful basket',
      price: 1599,
      discount_price: 1299,
      image_url: 'https://m.media-amazon.com/images/I/51iOaW6oc8L._UF894,1000_QL80_.jpg',
      category_id: '3',
      stock: 12,
      is_featured: true,
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Orchid Plant',
      slug: 'orchid-plant',
      description: 'Elegant orchid plant in decorative pot',
      price: 1999,
      image_url: 'https://image.made-in-china.com/202f0j00fNnhjszyGKgZ/New-Design-High-Quality-Silk-Artificial-Orchid-Plants-Orchid-Flowers-Small-Potted-Orchid-for-Indoor-Decoration.webp',
      category_id: '4',
      stock: 6,
      is_featured: true,
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Sunflower Bouquet',
      slug: 'sunflower-bouquet',
      description: 'Bright and cheerful sunflower arrangement',
      price: 799,
      image_url: 'https://thumbs.dreamstime.com/b/woman-holding-bouquet-bright-sunflowers-flower-market-cheerful-yellow-blooms-radiating-joy-outdoor-setting-concept-floral-369470115.jpg',
      category_id: '1',
      stock: 10,
      is_featured: true,
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Tulip Collection',
      slug: 'tulip-collection',
      description: 'Beautiful tulips in various colors',
      price: 1099,
      discount_price: 899,
      image_url: 'https://media.istockphoto.com/id/511112100/photo/tulips.jpg?s=612x612&w=0&k=20&c=BIdlCAFoXLqYIIeFpJJ8Pmbw6_68vOPGEfLr8tInMhM=',
      category_id: '2',
      stock: 14,
      is_featured: true,
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const mockCategories = [
    {
      id: '1',
      name: 'Roses',
      slug: 'roses',
      image_url: 'https://m.media-amazon.com/images/I/51lzmjkGfOL._UF894,1000_QL80_.jpg',
      description: 'Beautiful rose arrangements'
    },
    {
      id: '2',
      name: 'Lilies',
      slug: 'lilies',
      image_url: 'https://i.pinimg.com/736x/1b/4b/6f/1b4b6f68902bf22047e1ec6b78180a23.jpg',
      description: 'Elegant lily bouquets'
    },
    {
      id: '3',
      name: 'Orchids',
      slug: 'orchids',
      image_url: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/146802mbhv1wc2x.jpg',
      description: 'Exotic orchid plants'
    },
    {
      id: '4',
      name: 'Carnations',
      slug: 'carnations',
      image_url: 'https://m.media-amazon.com/images/I/51RhKoKauFL._AC_UF1000,1000_QL80_.jpg',
      description: 'Beautiful carnation flowers'
    },

    {
      id: '5',
      name: 'Chocolates',
      slug: 'chocolates',
      image_url: 'https://m.media-amazon.com/images/I/71BisyFDAxL._AC_UF1000,1000_QL80_.jpg',
      description: 'Delicious chocolate bouquets'
    },
    {
      id: '6',
      name: 'Gerberas',
      slug: 'gerberas',
      image_url: 'https://www.flowersacrossindia.com/cdn/shop/products/MGDHD20170149.jpg?v=1533023558',
      description: 'Bright and cheerful gerbera daisies'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setFeaturedProducts(mockFeaturedProducts);
      setCategories(mockCategories);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <motion.div className="min-h-screen pt-0">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-[800px] bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: 'url(/images/home.png)',
          backgroundPosition: 'center 30%',
          backgroundSize: 'cover',
          marginTop: '-80px',
          paddingTop: '80px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <motion.div 
          className="relative container mx-auto px-4 "
          variants={containerVariants}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
        >
          <motion.div className="max-w-4xl mx-auto flex flex-col gap-8 text-black">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Beautiful Flowers for Every Occasion
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Fresh blooms delivered to your doorstep. Make every moment special with our handpicked collection.
            </motion.p>
            <motion.div 
              className="flex justify-center"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('/shop')}
                className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all"
              >
                Shop Now
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <WhyChooseUs />
      </motion.section>

      

      <motion.section 
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <motion.div 
              className="w-20 h-1 bg-rose-500 mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our stunning collection of flowers for every occasion
            </p>
          </motion.div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-48 animate-pulse" />
              ))}
            </div>

          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="cursor-pointer group"
                  onClick={() => onNavigate(`/shop/category/${category.slug}`)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Featured Products</h2>
            <motion.div 
              className="w-20 h-1 bg-rose-500 mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium flowers and gifts
            </p>
          </motion.div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => onNavigate(`/product/${product.id}`)}
                        className="bg-white text-rose-600 px-6 py-2 rounded-full font-medium hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-rose-600 font-bold">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-rose-100 text-rose-600 p-2 rounded-full hover:bg-rose-600 hover:text-white transition-colors"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('/shop')}
              className="border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
            >
              View All Products
            </button>
          </div>
        </div>
      </motion.section>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Testimonials />
      </motion.div>

      <motion.section
        className="py-24 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(/images/sub.png)',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get exclusive offers, care tips, and be the first to know about new arrivals
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 px-8 py-3 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.section>

      {/* <section className='mb-12'> 
          <div> 
            <div>
              <div>
                <div>
                  <div className=''>
                    <span className='text-5xl w-[600px] text-uppercase line-height:1rem'>Collections of layouts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </motion.section> */}
    </motion.div >
    // </div>
  );
};

export default Home;