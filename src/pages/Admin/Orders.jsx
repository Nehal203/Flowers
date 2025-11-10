import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEye, FiX, FiCheck, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [orders, setOrders] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        const initialOrders = [
            {
                id: '#ORD-001',
                customer: 'N',
                date: '2023-06-15',
                status: 'Delivered',
                total: 159.97,
                items: [
                    { name: 'Red Roses Bouquet', quantity: 2, price: 59.99 },
                    { name: 'Chocolates Bouquet', quantity: 1, price: 39.99 }
                ],
                shippingAddress: '123 Flower St, Garden City, GC 12345',
                paymentMethod: 'Credit Card',
                trackingNumber: 'TRK123456789',
                orderNotes: 'Please deliver after 5 PM'
            },
            {
                id: '#ORD-002',
                customer: 'J',
                date: '2023-06-16',
                status: 'Shipped',
                total: 89.98,
                items: [
                    { name: 'White Lilies', quantity: 1, price: 69.99 },
                    { name: 'Greeting Card', quantity: 1, price: 4.99 },
                    { name: 'Chocolates', quantity: 1, price: 14.99 }
                ],
                shippingAddress: '456 Petal Ln, Roseville, RV 54321',
                paymentMethod: 'PayPal',
                trackingNumber: 'TRK987654321',
                orderNotes: 'Fragile - Handle with care'
            },
            {
                id: '#ORD-003',
                customer: 'A',
                date: '2023-06-17',
                status: 'Processing',
                total: 149.97,
                items: [
                    { name: 'Mixed Flower Bouquet', quantity: 1, price: 79.99 },
                    { name: 'Teddy Bear', quantity: 1, price: 29.99 },
                    { name: 'Champagne Bottle', quantity: 1, price: 39.99 }
                ],
                shippingAddress: '789 Blossom Ave, Lilyfield, LF 67890',
                paymentMethod: 'Credit Card',
                trackingNumber: '',
                orderNotes: 'Birthday surprise - please include a birthday card'
            },
            {
                id: '#ORD-004',
                customer: 'B',
                date: '2023-06-18',
                status: 'Pending',
                total: 199.95,
                items: [
                    { name: 'Premium Rose Box', quantity: 1, price: 149.99 },
                    { name: 'Chocolate Box', quantity: 1, price: 29.99 },
                    { name: 'Greeting Card', quantity: 1, price: 4.99 },
                    { name: 'Balloon', quantity: 3, price: 14.97 }
                ],
                shippingAddress: '321 Garden Dr, Sunville, SV 13579',
                paymentMethod: 'Credit Card',
                trackingNumber: '',
                orderNotes: 'Anniversary gift - please make it special!'
            },
            {
                id: '#ORD-005',
                customer: 'C',
                date: '2023-06-19',
                status: 'Cancelled',
                total: 74.98,
                items: [
                    { name: 'Sunflower Bouquet', quantity: 1, price: 49.99 },
                    { name: 'Get Well Soon Card', quantity: 1, price: 4.99 },
                    { name: 'Chocolates', quantity: 1, price: 19.99 }
                ],
                shippingAddress: '159 Tulip St, Meadowbrook, MB 24680',
                paymentMethod: 'PayPal',
                trackingNumber: '',
                orderNotes: 'Order cancelled by customer',
                cancellationReason: 'Changed my mind'
            }
        ];
        setOrders(initialOrders);
    }, []);

    const getStatusBadge = (status) => {
        const statusClasses = {
            'Delivered': 'bg-green-100 text-green-800',
            'Shipped': 'bg-blue-100 text-blue-800',
            'Processing': 'bg-yellow-100 text-yellow-800',
            'Pending': 'bg-gray-100 text-gray-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    const getStatusIcon = (status) => {
        const icons = {
            'Delivered': <FiCheckCircle className="text-green-500 mr-2" />,
            'Shipped': <FiTruck className="text-blue-500 mr-2" />,
            'Processing': <FiClock className="text-yellow-500 mr-2" />,
            'Pending': <FiClock className="text-gray-500 mr-2" />,
            'Cancelled': <FiX className="text-red-500 mr-2" />
        };
        return icons[status] || <FiClock className="mr-2" />;
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const openViewModal = (order) => {
        setCurrentOrder(order);
        setIsViewModalOpen(true);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Orders</h1>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <FiFilter />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.items.reduce((total, item) => total + item.quantity, 0)} items
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(order.status)}
                                            {getStatusBadge(order.status)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => openViewModal(order)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <FiEye className="inline-block mr-1" /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isViewModalOpen && currentOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold mb-4">Order Details - {currentOrder.id}</h2>
                                <button 
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="md:col-span-2">
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                                        <div className="space-y-4">
                                            {currentOrder.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                            <div className="flex justify-between font-medium text-lg pt-2">
                                                <span>Total</span>
                                                <span>${currentOrder.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-3">Order Status</h3>
                                        <div className="flex items-center mb-4">
                                            {getStatusIcon(currentOrder.status)}
                                            <span className="font-medium">{currentOrder.status}</span>
                                        </div>
                                        
                                        {currentOrder.status !== 'Cancelled' && (
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => updateOrderStatus(currentOrder.id, 'Processing')}
                                                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                                                        currentOrder.status === 'Processing' 
                                                            ? 'bg-blue-100 text-blue-800' 
                                                            : 'hover:bg-gray-100'
                                                    }`}
                                                >
                                                    Mark as Processing
                                                </button>
                                                <button
                                                    onClick={() => updateOrderStatus(currentOrder.id, 'Shipped')}
                                                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                                                        currentOrder.status === 'Shipped' 
                                                            ? 'bg-blue-100 text-blue-800' 
                                                            : 'hover:bg-gray-100'
                                                    }`}
                                                >
                                                    Mark as Shipped
                                                </button>
                                                <button
                                                    onClick={() => updateOrderStatus(currentOrder.id, 'Delivered')}
                                                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                                                        currentOrder.status === 'Delivered' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'hover:bg-gray-100'
                                                    }`}
                                                >
                                                    Mark as Delivered
                                                </button>
                                                <button
                                                    onClick={() => updateOrderStatus(currentOrder.id, 'Cancelled')}
                                                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                                >
                                                    Cancel Order
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-3">Customer Details</h3>
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <span className="font-medium">Name:</span> {currentOrder.customer}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-medium">Email:</span> {currentOrder.customer.toLowerCase().replace(/\s+/g, '.')}@example.com
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-medium">Phone:</span> +1 (555) 123-4567
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                                        <p className="text-sm">{currentOrder.shippingAddress}</p>
                                    </div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                                        <p className="text-sm">{currentOrder.paymentMethod}</p>
                                        {currentOrder.paymentMethod === 'Credit Card' && (
                                            <p className="text-sm text-gray-500 mt-1">Visa ending in 4242</p>
                                        )}
                                    </div>
                                    
                                    {currentOrder.trackingNumber && (
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h3 className="font-medium text-gray-900 mb-2">Tracking Information</h3>
                                            <p className="text-sm">
                                                <span className="font-medium">Tracking #:</span> {currentOrder.trackingNumber}
                                            </p>
                                            <p className="text-sm mt-1">
                                                <span className="font-medium">Carrier:</span> Standard Shipping
                                            </p>
                                            <a 
                                                href={`#track-${currentOrder.trackingNumber}`}
                                                className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                                            >
                                                Track Package
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {currentOrder.orderNotes && (
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                <span className="font-medium">Order Notes:</span> {currentOrder.orderNotes}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {currentOrder.cancellationReason && (
                                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">
                                                <span className="font-medium">Cancellation Reason:</span> {currentOrder.cancellationReason}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FiCheck className="mr-2 h-4 w-4" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;