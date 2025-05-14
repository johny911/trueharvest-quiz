// src/components/Header.jsx
import React, { useState } from 'react';

export default function Header({ cartCount = 0 }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative w-full bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className="p-2 text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="w-6 h-6"
              viewBox="0 0 18 16"
            >
              <path
                fill="currentColor"
                d="M1 .5a.5.5 0 1 0 0 1h15.71a.5.5 0 0 0 0-1zM.5 8a.5.5 0 0 1 .5-.5h15.71a.5.5 0 0 1 0 1H1A.5.5 0 0 1 .5 8m0 7a.5.5 0 0 1 .5-.5h15.71a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>

          {/* Logo (centered absolutely) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/images/logo.png"
              alt="True Harvest"
              className="h-8 object-contain"
            />
          </div>

          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-2 text-black">
              {/* …search SVG as before… */}
            </button>
            <button aria-label="Cart" className="relative p-2 text-black">
              {/* …cart SVG as before… */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-4 text-gray-600"
            >
              Close
            </button>
            <div role="tabpanel" id="tab_menu_mobile">
              {/* All Products */}
              <div className="menu-horizon-list mb-2">
                <a
                  href="/"
                  title="All Products"
                  className="flex items-center w-full py-2"
                >
                  <img
                    src="//trueharvest.store/cdn/shop/t/9/assets/menu-all-products.svg?v=305904794437763681731604526"
                    alt="All Products"
                    className="w-6 h-6 mr-2"
                  />
                  <span>All Products</span>
                </a>
              </div>
              {/* Stone Pressed Oils */}
              <div className="menu-horizon-list mb-2">
                <a
                  href="/collections/wood-pressed-oils"
                  title="Stone Pressed Oils"
                  className="flex items-center w-full py-2"
                >
                  <img
                    src="//trueharvest.store/cdn/shop/t/9/assets/menu-stone-pressed-oils.svg?v=145535086326840849801734946630"
                    alt="Stone Pressed Oils"
                    className="w-6 h-6 mr-2"
                  />
                  <span>Stone Pressed Oils</span>
                </a>
              </div>
              {/* Blogs */}
              <div className="menu-horizon-list mb-2">
                <a
                  href="/pages/contact"
                  title="Blogs"
                  className="flex items-center w-full py-2"
                >
                  <img
                    src="//trueharvest.store/cdn/shop/t/9/assets/menu-blogs.svg?v=70136298312384238751731604524"
                    alt="Blogs"
                    className="w-6 h-6 mr-2"
                  />
                  <span>Blogs</span>
                </a>
              </div>
              {/* About us */}
              <div className="menu-horizon-list mb-2">
                <a
                  href="/pages/about-us"
                  title="About us"
                  className="flex items-center w-full py-2"
                >
                  <img
                    src="//trueharvest.store/cdn/shop/t/9/assets/menu-about-us.svg?v=126804700212775061811731604524"
                    alt="About us"
                    className="w-6 h-6 mr-2"
                  />
                  <span>About us</span>
                </a>
              </div>
              {/* Contact us */}
              <div className="menu-horizon-list mb-4">
                <a
                  href="/pages/contact"
                  title="Contact us"
                  className="flex items-center w-full py-2"
                >
                  <img
                    src="//trueharvest.store/cdn/shop/t/9/assets/menu-contact-us.svg?v=119868032474917759591731604525"
                    alt="Contact us"
                    className="w-6 h-6 mr-2"
                  />
                  <span>Contact us</span>
                </a>
              </div>
              {/* Login */}
              <a
                href="https://trueharvest.store/account/login"
                className="mobile-menu-login flex items-center mt-3 text-gray-800"
              >
                <i className="fa fa-sign-in mr-2" aria-hidden="true" />
                <span>Login</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}