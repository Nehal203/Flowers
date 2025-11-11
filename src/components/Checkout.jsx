import React, { useState, useContext, useEffect } from 'react';
import { FaShoppingCart, FaCreditCard, FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Checkout = () => {
    const { cart, getCartTotal, getCartItemCount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
        paymentMethod: 'credit-card',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activeStep < 3) {
            setActiveStep(activeStep + 1);
        } else {
            try {
                const orderDate = new Date().toISOString().split('T')[0];
                const newOrder = {
                    id: `ORD-${Date.now()}`,
                    date: orderDate,
                    status: 'Processing',
                    items: cart.map(item => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        price: item.product.discount_price || item.product.price,
                        image: item.product.image_url || ''
                    })),
                    total: getCartTotal(),
                    shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
                    paymentMethod: formData.paymentMethod,
                    userId: user.email
                };

                if (user?.email) {
                    const allOrders = JSON.parse(localStorage.getItem('allUserOrders') || '{}');
                    const userOrders = allOrders[user.email] || [];
                    allOrders[user.email] = [newOrder, ...userOrders];
                    localStorage.setItem('allUserOrders', JSON.stringify(allOrders));
                    console.log('Order saved to localStorage:', newOrder);
                }

                console.log('Order submitted:', newOrder);
                clearCart();
                
                // Ensure all required order details are included
                const orderConfirmationData = {
                  orderDetails: {
                    ...newOrder,
                    id: newOrder.id,
                    total: newOrder.total,
                    paymentMethod: newOrder.paymentMethod,
                    date: newOrder.date,
                    status: newOrder.status,
                    items: newOrder.items.map(item => ({
                      ...item,
                      name: item.name || 'Unnamed Product',
                      quantity: item.quantity || 1,
                      price: item.price || 0,
                      image: item.image || ''
                    }))
                  }
                };
                
                console.log('Navigating to order confirmation with data:', orderConfirmationData);
                navigate('/orderconfirmation', { state: orderConfirmationData });
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        }
    };

    const steps = [
        { id: 1, name: 'Shopping Cart', icon: <FaShoppingCart /> },
        { id: 2, name: 'Checkout', icon: <FaCreditCard /> },
        { id: 3, name: 'Order Complete', icon: <FaCheck /> },
    ];

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? (subtotal > 999 ? 0 : 99) : 0;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto mb-12">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeStep >= step.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    {activeStep > step.id ? <FaCheck /> : step.icon}
                                </div>
                                <span className="mt-2 text-sm font-medium">{step.name}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 ${activeStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 required">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">Shipping Address</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option>India</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                                <option>Australia</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <Link to="/orderconfirmation" rel="stylesheet" href="" ><button
                                type="submit"
                                className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors font-medium"
                            >
                                Continue to Payment
                            </button></Link>
                        </div>
                    </form>
                </div>

                <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {cart.map(item => {
                            const price = item.product.discount_price || item.product.price;
                            const totalPrice = price * item.quantity;

                            return (
                                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center">
                                        <img
                                            src={item.product.image_url}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded mr-4"
                                        />
                                        <div>
                                            <h4 className="font-medium">{item.product.name}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            {item.product.discount_price ? (
                                                <p className="text-sm">
                                                    <span className="text-rose-600 font-semibold">₹{item.product.discount_price.toLocaleString()}</span>
                                                    <span className="ml-1 text-xs text-gray-400 line-through">₹{item.product.price.toLocaleString()}</span>
                                                </p>
                                            ) : (
                                                <p className="text-sm">₹{item.product.price.toLocaleString()}</p>
                                            )}
                                        </div>
                                    </div>
                                    <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="border-t border-b border-gray-200 py-4 space-y-2 mb-6">
                        <div className="flex justify-between py-2">
                            <span>Subtotal ({getCartItemCount()} items)</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                        </div>
                        <div className="flex justify-between py-4 font-bold text-lg border-t border-gray-200 mt-2">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Checkout;
