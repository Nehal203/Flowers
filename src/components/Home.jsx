import { useEffect, useState } from 'react';
import { ArrowRight, Truck, Shield, Clock, Gift, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const Home = ({ onNavigate }) => {
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
      name: 'Mixed Bouquets',
      slug: 'mixed-bouquets',
      image_url: 'https://cdn.bloomsflora.com/uploads/product/flowers_n_fruits/1687421373_13140.png',
      description: 'Colorful mixed flower arrangements'
    },
    {
      id: '4',
      name: 'Orchids',
      slug: 'orchids',
      image_url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/plant-sapling/8/x/e/perennial-no-yes-exotic-orchid-indoor-live-flower-plant-pack-of-original-imaggxhczk9yn7bh.jpeg?q=90',
      description: 'Exotic orchid plants'
    },
    {
      id: '5',
      name: 'Seasonal',
      slug: 'seasonal',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuLI5VuxNV2iJRCutPtbQ6vngQLw4-QaTHg&s',
      description: 'Seasonal flower collections'
    },
    {
      id: '6',
      name: 'Wedding',
      slug: 'wedding',
      image_url: 'https://abia.com.au/abia-admin/ckfinder/userfiles/images/complete-guide-to-wedding-flowers-Willow-Bud-Perwillowen-photo-@trentandjessie.webp',
      description: 'Special wedding arrangements'
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
    <div className="min-h-screen">
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://t3.ftcdn.net/jpg/05/30/03/40/360_F_530034062_Zfweld9RDiPmKrg1hblsFcIlWafencPt.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Beautiful Flowers for Every Occasion
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Fresh blooms delivered to your doorstep. Make every moment special with our handpicked collection.
            </p>
            <button
              onClick={() => onNavigate('/')}
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              Shop Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-rose-100  p-4 rounded-full mb-1'>
                <Truck className='text-rose-600' size={32} />
              </div>
              <h3 className='text-lg mb-2 font-semibold'>Free Delivery</h3>
              <p className="text-gray-600 text-sm">On orders above ₹999</p>

            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-rose-100  p-4 rounded-full mb-1'>
                <ShoppingBag className='text-rose-600' size={32} />
              </div>
              <h3 className='text-lg mb-2 font-semibold'>Free Shopping</h3>
              <p className='text-gray-600 test-sm'>Cost on all order $0.00</p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-rose-100  p-4 rounded-full mb-1'>
                <Gift className='text-rose-600' size={32} />
              </div>
              <h3 className='text-lg mb-2 font-semibold'>Free Delivery</h3>
              <p className='text-gray-600 text-sm'>on order above 999</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our stunning collection of flowers for every occasion
            </p>
          </div>
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
                  onClick={() => onNavigate('shop', category.slug)}
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
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular flowers, handpicked just for you
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition"
            >
              View All Products
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section
        className="py-24 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(/images/sub.png)',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
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
      </section>

      <section className='mb-12'> 
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
      </section>
    </div>
  );
};

export default Home;