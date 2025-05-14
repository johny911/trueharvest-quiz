// src/components/Header.jsx
import React from 'react';

export default function Header({ cartCount = 0 }) {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Hamburger */}
        <button aria-label="Menu" className="p-2">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <a
          href="https://www.trueharvest.store"
          className="flex-shrink-0"
        >
          <img
            src="/images/logo.png"
            alt="True Harvest"
            className="h-8 object-contain"
          />
        </a>

        {/* Search & Cart */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="p-2">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35"
              />
            </svg>
          </button>

          <button aria-label="Cart" className="relative p-2">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m1.2-6L5 5m16 8l1.2 6m-1.2-6L19 5M9 21h.01M15 21h.01"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}