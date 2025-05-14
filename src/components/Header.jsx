import React from 'react';
import { ShoppingCart, Menu, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Menu Icon */}
        <button className="block md:hidden text-gray-700">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex-1 flex justify-center md:justify-start">
          <img
            src="/images/logo.png"
            alt="True Harvest Logo"
            className="h-6 md:h-8 object-contain"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-black">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative text-gray-700 hover:text-black">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              4
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}