import React, { useState } from 'react';
import { FaShoppingCart, FaCreditCard, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'United States',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeStep < 3) {
            setActiveStep(activeStep + 1);
        } else {
            console.log('Form submitted:', formData);
        }
    };

    const steps = [
        { id: 1, name: 'Shopping Cart', icon: <FaShoppingCart /> },
        { id: 2, name: 'Checkout', icon: <FaCreditCard /> },
        { id: 3, name: 'Order Complete', icon: <FaCheck /> },
    ];

    const cartItems = [
        { id: 1, name: 'Bouquet of Roses', price: 49.99, quantity: 1, image: '' },
        { id: 2, name: 'Tulip Bouquet', price: 39.99, quantity: 2, image: '' },
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 15.00;
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
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
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                                <option>Australia</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors font-medium"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-b border-gray-200 py-4 space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold mb-6">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link
                        to="/shop"
                        className="block text-center text-green-600 hover:text-green-700 font-medium mb-4"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
