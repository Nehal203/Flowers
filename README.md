# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



import { useEffect, useState } from 'react';
import { ArrowRight, Truck, Shield, Clock, Gift } from 'lucide-react';
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
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
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
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
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
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
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
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
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
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
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
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
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
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
      description: 'Beautiful rose arrangements'
    },
    {
      id: '2',
      name: 'Lilies',
      slug: 'lilies',
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
      description: 'Elegant lily bouquets'
    },
    {
      id: '3',
      name: 'Mixed Bouquets',
      slug: 'mixed-bouquets',
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
      description: 'Colorful mixed flower arrangements'
    },
    {
      id: '4',
      name: 'Orchids',
      slug: 'orchids',
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
      description: 'Exotic orchid plants'
    },
    {
      id: '5',
      name: 'Seasonal',
      slug: 'seasonal',
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
      description: 'Seasonal flower collections'
    },
    {
      id: '6',
      name: 'Wedding',
      slug: 'wedding',
      image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
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
          backgroundImage: 'url(https://img.freepik.com/free-vector/hand-painted-watercolor-floral-wallpaper_52683-67104.jpg)',
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
              onClick={() => onNavigate('shop')}
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              Shop Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-rose-100 p-4 rounded-full mb-4">
                <Truck className="text-rose-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600 text-sm">On orders above ₹999</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-rose-100 p-4 rounded-full mb-4">
                <Shield className="text-rose-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Fresh</h3>
              <p className="text-gray-600 text-sm">Quality guaranteed flowers</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-rose-100 p-4 rounded-full mb-4">
                <Clock className="text-rose-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Same Day Delivery</h3>
              <p className="text-gray-600 text-sm">Order before 2 PM</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-rose-100 p-4 rounded-full mb-4">
                <Gift className="text-rose-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gift Wrapping</h3>
              <p className="text-gray-600 text-sm">Complimentary service</p>
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
          backgroundImage: 'url(https://img.freepik.com/free-vector/hand-painted-watercolor-floral-wallpaper_52683-67104.jpg)',
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
    </div>
  );
};

export default Home;