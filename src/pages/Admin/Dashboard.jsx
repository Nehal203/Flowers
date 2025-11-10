import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiUsers, FiShoppingBag, FiSettings, FiBarChart2, FiLogOut } from 'react-icons/fi';

const AdminDashboard = () => {
  const handleLogout = () => {
    console.log('Admin logged out');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-[#db2777] text-white w-64 flex-shrink-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <NavItem to="/admin" icon={<FiHome />} text="Dashboard" />
          <NavItem to="/admin/products" icon={<FiShoppingBag />} text="Products" />
          <NavItem to="/admin/orders" icon={<FiBarChart2 />} text="Orders" />
          <NavItem to="/admin/customers" icon={<FiUsers />} text="Customer Management" />
          <NavItem to="/admin/settings" icon={<FiSettings />} text="Settings" />
          <Link to="/admin/login" onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-left text-gray-300 hover:bg-white hover:text-black transition-colors hover:font-bold"
          >
            <FiLogOut className="mr-3" />
            Logout
          </Link>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Admin</span>
              <div className="w-8 h-8 bg-[#e07fa9] rounded-full flex items-center justify-center text-[#db2777] font-semibold ">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center px-6 py-3 text-gray-300 hover:bg-white hover:text-black transition-colors  hover:font-bold"
  >
    <span className="mr-3">{icon}</span>
    {text}
  </Link>
);

export default AdminDashboard;
