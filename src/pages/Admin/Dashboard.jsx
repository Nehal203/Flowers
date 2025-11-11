import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiShoppingBag, FiSettings, FiBarChart2, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log('Admin logged out');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const menuButton = document.querySelector('.menu-button');
      
      if (window.innerWidth <= 768 && 
          isSidebarOpen && 
          !sidebar.contains(event.target) && 
          !menuButton.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#db2777] text-white menu-button"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div 
        className={`sidebar bg-[#db2777] text-white w-64 flex-shrink-0 fixed md:fixed h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ zIndex: 40, height: '100vh' }}
      >
        <div className="p-4 pt-16 md:pt-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <NavItem to="/admin" icon={<FiHome />} text="Dashboard" />
          <NavItem to="/admin/products" icon={<FiShoppingBag />} text="Products" />
          <NavItem to="/admin/orders" icon={<FiBarChart2 />} text="Orders" />
          <NavItem to="/admin/customers" icon={<FiUsers />} text="Customer Management" />
          <NavItem to="/admin/settings" icon={<FiSettings />} text="Settings" />
          <Link 
            to="/admin/login" 
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-left text-gray-300 hover:bg-white hover:text-black transition-colors hover:font-bold mt-4"
          >
            <FiLogOut className="mr-3" />
            Logout
          </Link>
        </nav>
      </div>

      <div className="flex-1 overflow-auto w-full">
        <div className="md:ml-64">
          <header className="bg-white shadow-sm sticky top-0 z-30">
            <div className="flex items-center justify-between p-4">
              <div className="md:hidden w-12"></div>
              <img className='w-12 h-12 mx-auto md:mx-0' src="/images/logo.png" alt="" />
              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline text-gray-600">Welcome, Admin</span>
                <div className="w-8 h-8 bg-[#e07fa9] rounded-full flex items-center justify-center text-[#db2777] font-semibold">
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
    </div>
  );
};

const NavItem = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = to === '/admin' 
    ? location.pathname === to
    : location.pathname.startsWith(to);
  
  return (
    <Link
      to={to}
      className={`flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-white text-black font-bold' : 'text-gray-300 hover:bg-white hover:text-black hover:font-bold'}`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </Link>
  );
};

export default AdminDashboard;
