import React from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity } from 'react-icons/fi';

const DashboardHome = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: <FiUsers className="text-2xl" />, change: '+12%', trend: 'up' },
    { title: 'Total Products', value: '567', icon: <FiShoppingBag className="text-2xl" />, change: '+5%', trend: 'up' },
    { title: 'Total Orders', value: '2,345', icon: <FiDollarSign className="text-2xl" />, change: '+8.2%', trend: 'up' },
    { title: 'Revenue', value: '$34,546', icon: <FiActivity className="text-2xl" />, change: '+15.3%', trend: 'up' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-[#e07fa9] rounded-lg text-[#db2777]">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((order) => (
                <tr key={order} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#db2777] font-medium">#ORD-{1000 + order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Customer {order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-11-{10 + order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(100 + order * 20).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order % 3 === 0 ? 'bg-green-100 text-green-800' : 
                        order % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {order % 3 === 0 ? 'Delivered' : order % 3 === 1 ? 'Processing' : 'Shipped'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 text-right">
          <a href="/admin/orders" className="text-sm font-medium text-[#db2777] hover:text-[#db2777]">
            View all orders →
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
