import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Edit, LogOut, MapPin, Package, User, Lock, CreditCard, HelpCircle, Settings } from 'lucide-react';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  const getUserOrders = () => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('allUserOrders') || '{}');
      console.log('All orders from localStorage:', allOrders);
      if (!user?.email) return [];
      
      const userOrders = allOrders[user.email] || [];
      console.log('Orders for user', user.email, ':', userOrders);
      
      return userOrders.map(order => ({
        id: order.id || `ORD-${Date.now()}`,
        date: order.date || new Date().toISOString().split('T')[0],
        status: order.status || 'Processing',
        items: order.items || [],
        total: order.total || 0,
        shippingAddress: order.shippingAddress || 'Address not specified',
        paymentMethod: order.paymentMethod || 'Not specified',
        userId: order.userId || user.email
      }));
    } catch (error) {
      console.error('Error getting user orders:', error);
      return [];
    }
  };

  const saveUserOrders = (userEmail, orders) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('allUserOrders') || '{}');
      allOrders[userEmail] = orders;
      localStorage.setItem('allUserOrders', JSON.stringify(allOrders));
    } catch (error) {
      console.error('Error saving user orders:', error);
    }
  };

  const loadOrders = () => {
    console.log('Loading orders for user:', user?.email);
    if (!user?.email) {
      console.log('No user email, clearing orders');
      setOrders([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const userOrders = getUserOrders();
      console.log('Loaded orders:', userOrders);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    
    const handleStorageChange = (e) => {
      if (e.key === 'allUserOrders' || e.key === null) {
        console.log('Storage changed, reloading orders...');
        loadOrders();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleCustomStorageChange = () => {
      console.log('Custom storage event received, reloading orders...');
      loadOrders();
    };
    
    window.addEventListener('ordersUpdated', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ordersUpdated', handleCustomStorageChange);
    };
  }, [user?.email]);

  const addNewOrder = (order) => {
    if (!user?.email) {
      console.error('Cannot add order: No user logged in');
      return;
    }
    
    try {
      const newOrder = {
        id: order.id || `ORD-${Date.now()}`,
        date: order.date || new Date().toISOString().split('T')[0],
        status: order.status || 'Processing',
        items: (order.items || []).map(item => ({
          name: item.name || 'Unnamed Product',
          quantity: item.quantity || 1,
          price: item.price || 0,
          image: item.image || item.image_url || ''
        })),
        total: order.total || (order.items || []).reduce((sum, item) => 
          sum + ((item.price || 0) * (item.quantity || 1)), 0),
        shippingAddress: order.shippingAddress || 'Address not specified',
        paymentMethod: order.paymentMethod || 'Not specified',
        userId: order.userId || user.email
      };

      console.log('Adding new order:', newOrder);
      
      setOrders(prevOrders => {
        const updatedOrders = [newOrder, ...prevOrders];
        saveUserOrders(user.email, updatedOrders);
        
        window.dispatchEvent(new Event('ordersUpdated'));
        
        return updatedOrders;
      });
      
      return newOrder;
    } catch (error) {
      console.error('Error adding new order:', error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      window.addNewOrder = addNewOrder;
    }
    return () => {
      delete window.addNewOrder;
    };
  }, [user?.email]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditProfile = () => {
    alert('Edit profile functionality will be implemented here');
  };

  const handleAddAddress = () => {
    alert('Add new address functionality will be implemented here');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">My Orders</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
              </div>
            ) : user && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Order #{order.id}</span>
                        <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <Package className="h-6 w-6 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium">₹{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <p>Shipped to: {order.shippingAddress}</p>
                          <p>Payment method: {order.paymentMethod}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-lg font-semibold">₹{order.total.toLocaleString()}</p>
                          <button className="mt-2 px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !user ? (
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Please sign in</h3>
                <p className="mt-1 text-sm text-gray-500">Sign in to view your order history and manage your account.</p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/shop')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Saved Addresses</h2>
              <button
                onClick={handleAddAddress}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <MapPin className="-ml-1 mr-2 h-5 w-5" />
                Add New Address
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div key={address.id} className={`border rounded-lg p-6 relative ${
                  address.isDefault ? 'ring-2 ring-pink-500' : ''
                }`}>
                  {address.isDefault && (
                    <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      Default
                    </span>
                  )}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-pink-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{address.type}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {address.name}<br />
                        {address.address}<br />
                        {address.city}, {address.state} - {address.pincode}<br />
                        Phone: {address.phone}
                      </p>
                      <div className="mt-4 flex space-x-3">
                        <button className="text-sm font-medium text-pink-600 hover:text-pink-700">
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button className="text-sm font-medium text-pink-600 hover:text-pink-700">
                            Set as default
                          </button>
                        )}
                        <button className="text-sm font-medium text-red-600 hover:text-red-700">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
              <button
                onClick={handleEditProfile}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <Edit className="-ml-1 mr-2 h-4 w-4" />
                Edit Profile
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your account details and information</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user?.name || 'John Doe'}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user?.email || 'john.doe@example.com'}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      +91 9876543210
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      January 1, 1990
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );

      case 'password':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <form className="space-y-6">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="current-password"
                      name="current-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="new-password"
                      name="new-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const navigation = [
    { name: 'My Orders', icon: Package, tab: 'orders' },
    { name: 'Addresses', icon: MapPin, tab: 'addresses' },
    { name: 'Profile', icon: User, tab: 'profile' },
    { name: 'Change Password', icon: Lock, tab: 'password' },
    { name: 'Payment Methods', icon: CreditCard, tab: 'payments' },
    { name: 'Help & Support', icon: HelpCircle, tab: 'support' },
    { name: 'Settings', icon: Settings, tab: 'settings' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:space-x-8">
          <div className="md:w-64 flex-shrink-0 mb-6 md:mb-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{user?.name || 'John Doe'}</h3>
                    <p className="text-sm text-gray-500">{user?.email || 'john.doe@example.com'}</p>
                  </div>
                </div>
              </div>
              <nav className="p-4 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      activeTab === item.tab
                        ? 'bg-pink-50 text-pink-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        activeTab === item.tab ? 'text-pink-500' : 'text-gray-400'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md"
                >
                  <LogOut className="mr-3 h-5 w-5 text-red-400" />
                  Sign out
                </button>
              </nav>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white shadow overflow-hidden rounded-lg p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;