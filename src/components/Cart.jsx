import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingCart as CartIcon, ArrowRight } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockCart = [
    {
      id: '1',
      product: {
        id: '1',
        name: 'Red Rose Bouquet',
        slug: 'red-rose-bouquet',
        price: 1299,
        discount_price: 999,
        image_url: 'https://i.pinimg.com/736x/62/41/eb/6241eb803728ad49fc8a684fa905e62b.jpg',
      },
      quantity: 2,
    },
    {
      id: '2',
      product: {
        id: '2',
        name: 'Lily Arrangement',
        slug: 'lily-arrangement',
        price: 899,
        image_url: 'https://png.pngtree.com/png-clipart/20250531/original/pngtree-white-lilies-blooming-with-green-fresh-leaves-png-image_21099878.png',
      },
      quantity: 1,
    },
  ];

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setCart(mockCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discount_price || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? (subtotal > 999 ? 0 : 99) : 0; 
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg shadow">
                <div className="w-full md:w-32 h-32 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-48 bg-gray-200 rounded-lg mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart ({calculateTotalItems()})</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <CartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
              {cart.map((item) => {
                const price = item.product.discount_price || item.product.price;
                const totalPrice = price * item.quantity;
                
                return (
                  <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link to={`/product/${item.product.slug}`} className="hover:text-rose-600">
                            {item.product.name}
                          </Link>
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-rose-500"
                          aria-label="Remove item"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      
                      <p className="text-gray-500 mt-1">
                        {item.product.discount_price ? (
                          <>
                            <span className="text-rose-600 font-semibold">₹{item.product.discount_price.toLocaleString()}</span>
                            <span className="ml-2 text-sm text-gray-400 line-through">₹{item.product.price.toLocaleString()}</span>
                          </>
                        ) : (
                          <span>₹{item.product.price.toLocaleString()}</span>
                        )}
                      </p>
                      
                      <div className="mt-4 flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 h-full"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 h-full"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-sm text-rose-600 hover:text-rose-700 flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                      
                      <div className="mt-4 text-right">
                        <p className="text-lg font-semibold">
                          ₹{totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Link
                to="/shop"
                className="flex items-center text-rose-600 hover:text-rose-700 font-medium"
              >
                <ArrowRight size={18} className="mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({calculateTotalItems()} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                
                <button
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-lg font-medium mt-4 transition-colors"
                  onClick={() => alert('Proceeding to checkout')}
                >
                  Proceed to Checkout
                </button>
                
                <p className="text-sm text-gray-500 mt-4 text-center">
                  or{' '}
                  <Link to="/shop" className="text-rose-600 hover:underline">
                    continue shopping
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-rose-50 p-4 rounded-lg">
              <h3 className="font-medium text-rose-800 mb-2">Free Shipping</h3>
              <p className="text-sm text-rose-700">
                {subtotal >= 999
                  ? 'You qualify for free shipping!'
                  : `Add ₹${999 - subtotal} more to get free shipping`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;