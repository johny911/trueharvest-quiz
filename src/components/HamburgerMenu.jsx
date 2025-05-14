// src/components/HamburgerMenu.jsx
import React from 'react';

export default function HamburgerMenu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 bg-white transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-2xl text-gray-700"
        >
          ×
        </button>
        <img
          src="/icons/logo.png"
          alt="True Harvest"
          className="h-8 object-contain"
        />
        <div className="w-6" /> {/* placeholder to keep logo centered */}
      </div>

      {/* Menu items */}
      <nav className="mt-6">
        <ul className="space-y-4 px-4">
          <li>
            <a
              href="/collections/all"
              className="flex items-center text-lg font-medium text-gray-800 hover:text-green-600"
            >
              <img
                src="/icons/all-products.svg"
                alt=""
                className="h-6 w-6 mr-3"
              />
              All Products
            </a>
          </li>
          <li>
            <a
              href="/collections/stone-pressed-oils"
              className="flex items-center text-lg font-medium text-gray-800 hover:text-green-600"
            >
              <img
                src="/icons/stone-pressed.svg"
                alt=""
                className="h-6 w-6 mr-3"
              />
              Stone Pressed Oils
            </a>
          </li>
          <li>
            <a
              href="/blogs"
              className="flex items-center text-lg font-medium text-gray-800 hover:text-green-600"
            >
              <img
                src="/icons/blogs.svg"
                alt=""
                className="h-6 w-6 mr-3"
              />
              Blogs
            </a>
          </li>
          <li>
            <a
              href="/pages/about-us"
              className="flex items-center text-lg font-medium text-gray-800 hover:text-green-600"
            >
              <img
                src="/icons/about-us.svg"
                alt=""
                className="h-6 w-6 mr-3"
              />
              About us
            </a>
          </li>
          <li>
            <a
              href="/pages/contact-us"
              className="flex items-center text-lg font-medium text-gray-800 hover:text-green-600"
            >
              <img
                src="/icons/contact-us.svg"
                alt=""
                className="h-6 w-6 mr-3"
              />
              Contact us
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer/Login button */}
      <div className="mt-auto px-4 pb-6">
        <a
          href="/account/login"
          className="block text-center bg-green-600 text-white py-3 rounded-lg font-medium"
        >
          Login
        </a>
      </div>
    </div>
  );
}