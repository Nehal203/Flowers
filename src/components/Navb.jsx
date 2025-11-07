import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Headphones, Mail, Heart, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart, useWishlist, useAuth } from "../contexts";
import logo from '../assets/logo.png'

const Navb = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    
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
        <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className={`${  'bg-black' } flex justify-between items-center px-6 py-2 text-sm transition-colors duration-300`}>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <Headphones size={16} className="text-orange-500" />
                        <span className="text-white">
                            Call Us -{" "}
                            <span className="font-semibold ">+1800 326 3264</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-orange-500" />
                        <span className="text-white">
                            Support -{" "}
                            <span className="font-semibold">flower@website.com</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-6 text-white">
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
                    <Link to="/wishlist" className="relative">
                        <div className="flex items-center space-x-2">
                            <Heart size={16} className="text-orange-500" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                    </Link>

                    <Link to="/cart" className="relative">
                        <div className="flex items-center space-x-2">
                            <ShoppingCart size={18} className="text-orange-500" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
            <nav className={`${scrolled ? 'bg-white' : 'bg-transparent'} flex justify-center gap-80 items-center px-6 py-4 relative z-10 transition-colors duration-300`}>
                <Link to="/">
                    <img src={logo} alt="flower Logo" className="w-[50px]" />
                </Link>

                <ul className="flex space-x-8 font-medium">
                    <li>
                        <Link
                            to="/"
                            className={`${isActive('/') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`${isActive('/about') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shop"
                            className={`${isActive('/shop') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                        >
                         Shop   
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`${isActive('/contact') ? 'text-orange-500' : 'text-black hover:text-orange-500'} transition`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
                {/* <Search className="text-orange-500 cursor-pointer" size={18} /> */}
            </nav>
        </header>
    );
}
export default Navb;