import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Headphones, Mail, Heart, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart, useWishlist, useAuth } from "../contexts";
import logo from '../assets/logo.png'

const Navb = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const isActive = (path) => {
        return location.pathname === path;
    };
    const { getCartItemCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { user, logout } = useAuth();
    const cartItemCount = getCartItemCount();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    return (
        <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent shadow-none'}`}>
            <div className={`bg-[#db2777] flex justify-between items-center px-4 sm:px-6 py-2 text-xs sm:text-sm transition-colors duration-300`}>
                <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <Headphones size={14} className="text-orange-500 flex-shrink-0" />
                        <span className="text-white whitespace-nowrap">
                            Call Us -{" "}
                            <span className="font-semibold">+1800 326 3264</span>
                        </span>
                    </div>
                    <div className="hidden lg:flex items-center space-x-2">
                        <Mail size={14} className="text-orange-500 flex-shrink-0" />
                        <span className="text-white whitespace-nowrap">
                            Support -{" "}
                            <span className="font-semibold">flower@website.com</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6 text-white">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/account" className="flex items-center space-x-2 hover:text-orange-500 transition">
                                <User size={16} />
                                <span>{user.name || 'My Account'}</span>
                            </Link>
                            <button 
                                onClick={logout} 
                                className="flex items-center space-x-2 hover:text-orange-500 transition"
                                title="Logout"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center space-x-2 hover:text-orange-500 transition">
                            <User size={16} />
                            <span>Log in / Register</span>
                        </Link>
                    )}
                    <Link to="/wishlist" className="relative p-2 hover:bg-gray-800 rounded-full transition">
                        <div className="relative">
                            <Heart size={18} className="text-orange-500" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                        <span className="sr-only">Wishlist</span>
                    </Link>

                    <Link to="/cart" className="relative p-2 hover:bg-gray-800 rounded-full transition">
                        <div className="relative">
                            <ShoppingCart size={18} className="text-orange-500" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                        <span className="sr-only">Shopping Cart</span>
                    </Link>
                </div>
            </div>
            <nav className={`${scrolled ? 'bg-white' : 'bg-white md:bg-transparent'} flex flex-wrap justify-center gap-72 items-center px-4 sm:px-6 py-3 relative z-10 transition-colors duration-300`}>
                <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to="/" className="flex-shrink-0">
                        <img src={logo} alt="flower Logo" className="w-10 md:w-12" />
                    </Link>
                    
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-orange-500 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
                    <Link
                        to="/"
                        className={`px-3 py-2 text-sm font-medium ${isActive('/') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className={`px-3 py-2 text-sm font-medium ${isActive('/about') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                    >
                        About
                    </Link>
                    <Link
                        to="/shop"
                        className={`px-3 py-2 text-sm font-medium ${isActive('/shop') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                    >
                        Shop
                    </Link>
                    <Link
                        to="/contact"
                        className={`px-3 py-2 text-sm font-medium ${isActive('/contact') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                    >
                        Contact
                    </Link>
                </div>

                <div 
                    ref={menuRef}
                    className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:hidden mt-4 transition-all duration-300 ease-in-out`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg shadow-lg">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'}`}
                        >
                            About
                        </Link>
                        <Link
                            to="/shop"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/shop') ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'}`}
                        >
                            Shop
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'}`}
                        >
                            Contact
                        </Link>
                        <div className="border-t border-gray-200 pt-4 mt-2">
                            <div className="flex items-center px-3 py-2 space-x-4">
                                {user ? (
                                    <>
                                        <Link 
                                            to="/account" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center space-x-2 text-gray-700 hover:text-orange-500"
                                        >
                                            <User size={18} />
                                            <span>My Account</span>
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="flex items-center space-x-2 text-gray-700 hover:text-orange-500"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link 
                                        to="/login" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-orange-500"
                                    >
                                        <User size={18} />
                                        <span>Log in / Register</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Navb;