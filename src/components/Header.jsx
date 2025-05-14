// src/components/Header.jsx
import React from 'react';

export default function Header({ cartCount = 0 }) {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Menu */}
        <button
          aria-label="Menu"
          className="flex items-center justify-center w-10 h-10 bg-white text-[#0F193E] border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/logo.png"
            alt="True Harvest"
            className="h-8 object-contain"
          />
        </div>

        {/* Search & Cart */}
        <div className="flex items-center space-x-3">
          <button
            aria-label="Search"
            className="flex items-center justify-center w-10 h-10 bg-white text-[#0F193E] border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button
            aria-label="Cart"
            className="relative flex items-center justify-center w-10 h-10 bg-white text-[#0F193E] border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m1.2-6L5 5m16 8l1.2 6m-1.2-6L19 5M9 21h.01M15 21h.01" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}