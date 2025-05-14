import React from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Hamburger Icon */}
        <button className="p-2 md:p-3">
          <Menu className="w-6 h-6 text-black" strokeWidth={2} />
        </button>

        {/* Center: Logo */}
        <div className="flex-shrink-0">
          <img
            src="/images/logo.png"
            alt="True Harvest"
            className="h-6 md:h-7 object-contain"
          />
        </div>

        {/* Right: Search + Cart */}
        <div className="flex items-center gap-4">
          <button>
            <Search className="w-6 h-6 text-black" strokeWidth={2} />
          </button>
          <button className="relative">
            <ShoppingCart className="w-6 h-6 text-black" strokeWidth={2} />
            <span className="absolute -top-1 -right-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">
              4
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}