import React from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Hamburger Icon */}
        <button className="p-2">
          <Menu className="w-6 h-6 text-gray-800" />
        </button>

        {/* Center: Logo */}
        <img
          src="/images/logo.png"
          alt="True Harvest Logo"
          className="h-6 md:h-8"
        />

        {/* Right: Search & Cart */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Search className="w-6 h-6 text-gray-800" />
          </button>
          <button className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            <span className="absolute -top-1 -right-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              4
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}