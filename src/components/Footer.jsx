import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return ( 
    <footer className="w-full bg-cover bg-[#F5E7E6] bg-center bg-no-repeat text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl text-black font-bold mb-6">About</h3>
            <p className="text-gray-500 mb-6">
              We are dedicated to providing the best flower arrangements for all your special occasions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-black hover:text-pink-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-black hover:text-pink-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-black hover:text-pink-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-black hover:text-pink-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl text-black font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-500 hover:text-black hover:font-bold hover:underline transition-colors duration-300">Home</a></li>
              <li><a href="/about" className="text-gray-500 hover:text-black hover:font-bold hover:underline transition-colors duration-300">About Us</a></li>
              <li><a href="/shop" className="text-gray-500 hover:text-black hover:font-bold hover:underline transition-colors duration-300">Shop</a></li>
              <li><a href="contact" className="text-gray-500 hover:text-black hover:font-bold hover:underline transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-black font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-pink-500 mr-3 mt-1" size={20} />
                <span className="text-gray-500">123 Flower Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-pink-500 mr-3" size={20} />
                <a href="tel:+1234567890" className="text-gray-500 hover:text-black">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-pink-500 mr-3" size={20} />
                <a href="mailto:info@example.com" className="text-gray-500 hover:text-black">info@example.com</a>
              </li>
            </ul>
          </div>

          <div className="border border-white bg-white py-6 px-4 rounded-lg shadow-lg mt-8">
            <h3 className="text-2xl text-black  font-bold mb-6">Newsletter</h3>
            <p className="text-gray-500 mb-4">Sign up for our mailing list to get lastest updates and offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your mail here"
                className="px-4 py-2 border border-black w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-500"
              />
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Flower Shop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
