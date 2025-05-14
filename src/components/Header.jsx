// src/components/Header.jsx
import React from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import logo from '/logo.svg'; // Ensure logo.svg is placed in /public or /src/assets

export default function Header() {
  return (
    <div className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Hamburger menu */}
        <button className="p-2">
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        {/* Center: Logo */}
        <img
          src={logo}
          alt="True Harvest"
          className="h-5 md:h-6 object-contain"
        />

        {/* Right: Search and Cart */}
        <div className="flex gap-4">
          <button className="p-2">
            <Search className="w-5 h-5 text-gray-800" />
          </button>
          <button className="relative p-2">
            <ShoppingCart className="w-5 h-5 text-gray-800" />
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
              4
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}