// src/components/HamburgerMenu.jsx
import React from 'react';

export default function HamburgerMenu({ isOpen, onClose }) {
  return (
    <>
      {/* backdrop under header only */}
      <div
        className={`
          fixed top-14 inset-x-0 bottom-0 bg-black bg-opacity-50
          transition-opacity duration-300 z-30
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* drawer slides in from left, under a 3.5rem-tall header */}
      <div
        className={`
          fixed top-14 left-0 bottom-0 w-full bg-white shadow-lg
          transition-transform duration-300 z-40 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* nav links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            <li className="py-4 px-4">
              <a
                href="https://trueharvest.store"
                className="flex items-center text-lg text-gray-800 hover:text-green-600"
              >
                <img
                  src="/icons/all-products.svg"
                  alt=""
                  className="h-6 w-6 mr-3"
                />
                All Products
              </a>
            </li>
            <li className="py-4 px-4">
              <a
                href="https://trueharvest.store/collections/wood-pressed-oils"
                className="flex items-center text-lg text-gray-800 hover:text-green-600"
              >
                <img
                  src="/icons/stone-pressed.svg"
                  alt=""
                  className="h-6 w-6 mr-3"
                />
                Stone Pressed Oils
              </a>
            </li>
            <li className="py-4 px-4">
              <a
                href="https://trueharvest.store/pages/contact"
                className="flex items-center text-lg text-gray-800 hover:text-green-600"
              >
                <img
                  src="/icons/blogs.svg"
                  alt=""
                  className="h-6 w-6 mr-3"
                />
                Blogs
              </a>
            </li>
            <li className="py-4 px-4">
              <a
                href="https://trueharvest.store/pages/about-us"
                className="flex items-center text-lg text-gray-800 hover:text-green-600"
              >
                <img
                  src="/icons/about-us.svg"
                  alt=""
                  className="h-6 w-6 mr-3"
                />
                About Us
              </a>
            </li>
            <li className="py-4 px-4">
              <a
                href="https://trueharvest.store/pages/contact"
                className="flex items-center text-lg text-gray-800 hover:text-green-600"
              >
                <img
                  src="/icons/contact-us.svg"
                  alt=""
                  className="h-6 w-6 mr-3"
                />
                Contact Us
              </a>
            </li>
          </ul>
        </nav>

        {/* footer login, always at bottom */}
        <div className="px-4 pb-6 pt-4">
          <a
            href="#"
            className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium"
          >
            Login
          </a>
        </div>
      </div>
    </>
  );
}