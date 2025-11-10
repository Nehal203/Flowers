import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}>
      <div className="bg-black/80 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About Us */}
            <div>
              <h3 className="text-2xl font-bold mb-6">About Us</h3>
              <p className="text-gray-300 mb-6">
                We are dedicated to providing the best flower arrangements for all your special occasions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-pink-500 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover:text-pink-500 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-white hover:text-pink-500 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-white hover:text-pink-500 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="text-pink-500 mr-3 mt-1" size={20} />
                  <span className="text-gray-300">123 Flower Street, City, Country</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-pink-500 mr-3" size={20} />
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-white">+1 (234) 567-890</a>
                </li>
                <li className="flex items-center">
                  <Mail className="text-pink-500 mr-3" size={20} />
                  <a href="mailto:info@example.com" className="text-gray-300 hover:text-white">info@example.com</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Newsletter</h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800"
                />
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Your Flower Shop. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
