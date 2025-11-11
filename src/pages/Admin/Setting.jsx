import { useState } from 'react';
import { FiCreditCard, FiTruck, FiBell, FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const handleLogout = () => {
    console.log('Admin logged out');
};
const Setting = () => {
    const [activeSection, setActiveSection] = useState('payment');
    const [paymentSettings, setPaymentSettings] = useState({
        stripeEnabled: true,
        paypalEnabled: false,
        codEnabled: true,
        razorpayEnabled: false,
        testMode: true
    });

    const [shippingSettings, setShippingSettings] = useState({
        standardDelivery: { enabled: true, cost: 5.99, minDays: 3, maxDays: 7 },
        expressDelivery: { enabled: false, cost: 12.99, minDays: 1, maxDays: 2 },
        freeShippingThreshold: 50,
        localPickup: { enabled: true, cost: 0 }
    });

    const [notificationSettings, setNotificationSettings] = useState({
        orderConfirmation: { email: true, sms: false },
        orderStatus: { email: true, sms: true },
        lowStock: { email: true, sms: false },
        promotions: { email: true, sms: false }
    });

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const togglePaymentMethod = (method) => {
        setPaymentSettings({
            ...paymentSettings,
            [method]: !paymentSettings[method]
        });
    };

    const toggleNotification = (type, channel) => {
        setNotificationSettings({
            ...notificationSettings,
            [type]: {
                ...notificationSettings[type],
                [channel]: !notificationSettings[type][channel]
            }
        });
    };

    const renderPaymentSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Payment Gateways</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 mr-3 text-white bg-blue-500 rounded-full">
                            <FiCreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium">Stripe</h4>
                            <p className="text-sm text-gray-500">Credit/Debit cards, Apple Pay, Google Pay</p>
                        </div>
                    </div>
                    <button
                        onClick={() => togglePaymentMethod('stripeEnabled')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${paymentSettings.stripeEnabled ? 'bg-blue-500' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block w-5 h-5 transform transition-transform bg-white rounded-full ${paymentSettings.stripeEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 mr-3 text-white bg-yellow-500 rounded-full">
                            <FiCreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium">PayPal</h4>
                            <p className="text-sm text-gray-500">Pay with PayPal account or credit card</p>
                        </div>
                    </div>
                    <button
                        onClick={() => togglePaymentMethod('paypalEnabled')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${paymentSettings.paypalEnabled ? 'bg-blue-500' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block w-5 h-5 transform transition-transform bg-white rounded-full ${paymentSettings.paypalEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 mr-3 text-white bg-green-500 rounded-full">
                            <FiCreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium">Cash on Delivery (COD)</h4>
                            <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                    </div>
                    <button
                        onClick={() => togglePaymentMethod('codEnabled')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${paymentSettings.codEnabled ? 'bg-blue-500' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block w-5 h-5 transform transition-transform bg-white rounded-full ${paymentSettings.codEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

            <div className="p-4 mt-6 bg-white rounded-lg shadow">
                <h4 className="mb-4 font-medium">Test Mode</h4>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Enable test mode for payment gateways</p>
                    <button
                        onClick={() => togglePaymentMethod('testMode')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${paymentSettings.testMode ? 'bg-blue-500' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block w-5 h-5 transform transition-transform bg-white rounded-full ${paymentSettings.testMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderShippingSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Shipping Options</h3>
            
            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 font-medium">Standard Delivery</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Enable Standard Delivery</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                            <span className="inline-block w-5 h-5 transform translate-x-6 bg-white rounded-full" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Delivery Cost ($)</label>
                            <input
                                type="number"
                                value={shippingSettings.standardDelivery.cost}
                                className="w-full p-2 mt-1 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Delivery Time (days)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={shippingSettings.standardDelivery.minDays}
                                    className="w-full p-2 mt-1 border rounded-md"
                                    placeholder="Min"
                                />
                                <span className="flex items-center">-</span>
                                <input
                                    type="number"
                                    value={shippingSettings.standardDelivery.maxDays}
                                    className="w-full p-2 mt-1 border rounded-md"
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 font-medium">Free Shipping</h4>
                <div className="flex items-center">
                    <span className="text-sm text-gray-600">Free shipping for orders over</span>
                    <div className="relative ml-2">
                        <span className="absolute left-0 flex items-center h-full pl-2 text-gray-500">$</span>
                        <input
                            type="number"
                            value={shippingSettings.freeShippingThreshold}
                            className="w-24 py-1 pl-6 pr-2 border rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            
            <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 font-medium">Order Notifications</h4>
                <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                            <div>
                                <h5 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                                <p className="text-sm text-gray-500">
                                    {key === 'orderConfirmation' && 'When a new order is placed'}
                                    {key === 'orderStatus' && 'When order status changes'}
                                    {key === 'lowStock' && 'When product stock is low'}
                                    {key === 'promotions' && 'Special offers and promotions'}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => toggleNotification(key, 'email')}
                                    className={`px-3 py-1 text-sm rounded-md ${value.email ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    Email
                                </button>
                                <button
                                    onClick={() => toggleNotification(key, 'sms')}
                                    className={`px-3 py-1 text-sm rounded-md ${value.sms ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    SMS
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSection = (title, icon, sectionKey, content) => (
        <div className="mb-6 overflow-hidden bg-white rounded-lg shadow">
            <button
                onClick={() => toggleSection(sectionKey)}
                className="flex items-center justify-between w-full p-4 text-left focus:outline-none"
            >
                <div className="flex items-center">
                    <div className="p-2 mr-3 text-white bg-blue-500 rounded-full">
                        {icon}
                    </div>
                    <h2 className="text-lg font-medium">{title}</h2>
                </div>
                {activeSection === sectionKey ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            {activeSection === sectionKey && (
                <div className="p-6 border-t">
                    {content}
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Settings</h1>
                {/* <p className="text-gray-600">Manage your store's settings and preferences</p> */}
            </div>

            <div className="max-w-4xl mx-auto">
                {renderSection(
                    'Payment Settings',
                    <FiCreditCard className="w-5 h-5" />,
                    'payment',
                    renderPaymentSettings()
                )}

                {renderSection(
                    'Shipping Settings',
                    <FiTruck className="w-5 h-5" />,
                    'shipping',
                    renderShippingSettings()
                )}

                {renderSection(
                    'Notifications',
                    <FiBell className="w-5 h-5" />,
                    'notifications',
                    renderNotificationSettings()
                )}

                <div className="mt-8">
                    <Link to="/admin/login" onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-red-600 transition-colors bg-red-100 rounded-md hover:bg-red-200"
                    >
                        <FiLogOut className="w-5 h-5 mr-2" />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Setting;
