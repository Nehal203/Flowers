import React from "react";
import { Search, ShoppingCart, User, Headphones, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

const Navb = () => {
    return (
        <header className="text-white">
            <div className="bg-black flex justify-between items-center px-6 py-2 text-sm border-b border-gray-700">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <Headphones size={16} className="text-orange-500" />
                        <span>
                            Call Us -{" "}
                            <span className="font-semibold">+1800 326 3264</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-orange-500" />
                        <span>
                            Support -{" "}
                            <span className="font-semibold">flower@website.com</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 hover:text-orange-500 transition">
                        <User size={16} />
                        <span>Log in / Register</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <ShoppingCart size={18} className="text-orange-500" />
                        <span>$512</span>
                        <span className="bg-orange-500 text-xs px-2 rounded-full">02</span>
                    </div>
                </div>
            </div>
            <nav className="bg-white flex justify-between items-center px-6 py-4">
                <Link to="/">
                    <img src={logo} alt="flower Logo" className="w-[50px]" />
                </Link>

                <ul className="flex space-x-8 font-medium">
                    <li>
                        <Link
                            to="/"
                            className="text-black hover:text-orange-500 transition"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="text-black hover:text-orange-500 transition"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shop"
                            className="text-black hover:text-orange-500 transition"
                        >
                         Shop   
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/product"
                            className="text-black hover:text-orange-500 transition"
                        >
                            Product
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="text-black hover:text-orange-500 transition"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
                <Search className="text-orange-500 cursor-pointer" size={18} />
            </nav>
        </header>
    );
}
export default Navb;