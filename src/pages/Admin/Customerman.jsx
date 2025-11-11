import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEye, FiX, FiTrash, FiCheck, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi';

const Customerman = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        const initialOrders = [
            {
                id: '#CUST-001',
                customer: 'N',
                email: 'n@gmail.com',
                phone: '1234567890',
                address: 'N',
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
                id: '#CUST-002',
                customer: 'J',
                email: 'j@gmail.com',
                phone: '1234567890',
                address: 'J',
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
                id: '#CUST-003',
                customer: 'A',
                email: 'a@gmail.com',
                phone: '1234567890',
                address: 'A',
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
                id: '#CUST-004',
                customer: 'B',
                email: 'b@gmail.com',
                phone: '1234567890',
                address: 'B',
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
                id: '#CUST-005',
                customer: 'C',
                email: 'c@gmail.com',
                phone: '1234567890',
                address: 'C',
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

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    const handleDeleteCustomer = (orderId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Customers</h1>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
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
                            <option value="asc">A to Z</option>
                            <option value="desc">Z to A</option>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
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
                                        {order.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.address}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.date}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteCustomer(order.id)}
                                            className="text-red-600 hover:text-red-900 focus:outline-none"
                                            title="Delete Customer"
                                        >
                                            <FiTrash className="h-5 w-5 inline-block" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customerman;