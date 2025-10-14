import React from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://media.isockphoto.com/id/1491438224/vector/isolated-green-grass-lawn-border-illustration.jpg?s=612x612&w=0&k=20&c=A2z0pGkTrWnFvfenuOtf4VKXGcVAvukr1rvgh1zy_P4=')" }} 
    >
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 py-12 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <img
              src={logo}
              alt="Astrology Logo"
              className="w-[120px] mx-auto md:mx-0"
            />
            <p className="mt-3 text-gray-200 text-sm">
              
            </p>
            <p className="mt-3 text-gray-200 text-sm">
              
            </p>
            <h4 className="mt-4 font-semibold text-red-300">
              Stay in Touch with us
            </h4>
            <div className="flex justify-center md:justify-start mt-2 space-x-4">
              <a href="#" className="text-white hover:text-red-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-red-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-red-300">Quick Links</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <a href="/"><li className="hover:text-red-400 cursor-pointer">Home</li></a>
              <a href="/about"><li className="hover:text-red-400 cursor-pointer">About</li></a>
              <a href="/puja"><li className="hover:text-red-400 cursor-pointer">Shop</li></a>
              <a href="/blog"><li className="hover:text-red-400 cursor-pointer">Product</li></a>
              <a href="/contact"><li className="hover:text-red-400 cursor-pointer">Contact</li></a>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-red-300">Location</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="hover:text-red-400 cursor-pointer">India</li>
              <li className="hover:text-red-400 cursor-pointer">USA</li>
              <li className="hover:text-red-400 cursor-pointer">Japan</li>
              <li className="hover:text-red-400 cursor-pointer">France</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-red-300">Contact Us</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-red-400" /> 112 Washtucna, India
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-red-400" /> Flower@gmail.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-red-400" /> +12 2629 7828
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300 border-t border-red-700 pt-4">
          copyright©2023 <span className="text-red-400 font-semibold">Boodoo</span> All
          Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
