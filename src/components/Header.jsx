// src/components/Header.jsx
import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

export default function Header({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* slide-in drawer */}
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <header className="relative w-full bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Hamburger / Close (left) */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Menu'}
            className="p-2 bg-transparent border-none rounded-none text-gray-800 hover:text-gray-600"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
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
            )}
          </button>

          {/* Logo—absolutely centered with link */}
          <a
            href="https://www.trueharvest.store"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <img
              src="/images/logo.png"
              alt="True Harvest"
              className="h-8 object-contain"
            />
          </a>

          {/* Search & Cart (right) */}
          <div className="flex items-center space-x-4">
            <button
              aria-label="Search"
              className="p-2 bg-transparent border-none rounded-none text-gray-800 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                className="w-6 h-6"
              >
                <g transform="matrix(1.3333,0,0,-1.3333,0,400)">
                  <g transform="scale(0.1)">
                    <path
                      fill="currentColor"
                      d="m 1312.7,795.5 c -472.7,0 -857.204,384.3 -857.204,856.7 0,472.7 384.504,857.2 857.204,857.2 472.7,0 857.3,-384.5 857.3,-857.2 0,-472.4 -384.6,-856.7 -857.3,-856.7 z M 2783.9,352.699 2172.7,963.898 c 155.8,194.702 241.5,438.602 241.5,688.302 0,607.3 -494.1,1101.4 -1101.5,1101.4 -607.302,0 -1101.399,-494.1 -1101.399,-1101.4 0,-607.4 494.097,-1101.501 1101.399,-1101.501 249.8,0 493.5,85.5 687.7,241 L 2611.7,181 c 23,-23 53.6,-35.699 86.1,-35.699 32.4,0 63,12.699 86,35.699 23.1,22.801 35.8,53.301 35.8,85.898 0,32.602 -12.7,63 -35.7,85.801"
                    />
                  </g>
                </g>
              </svg>
            </button>

            <button
              aria-label="Cart"
              className="relative p-2 bg-transparent border-none rounded-none text-gray-800 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                className="w-6 h-6"
              >
                <g transform="matrix(1.3333,0,0,-1.3333,0,400)">
                  <g transform="scale(0.1)">
                    <path
                      fill="currentColor"
                      d="M 2565.21,2412.71 H 450.992 V 0 H 2565.21 V 2412.71 Z M 2366.79,2214.29 V 198.43 H 649.418 V 2214.29 H 2366.79"
                    />
                    <path
                      fill="currentColor"
                      d="m 1508.11,2990 h -0.01 c -361.22,0 -654.037,-292.82 -654.037,-654.04 V 2216.92 H 2162.14 v 119.04 c 0,361.22 -292.82,654.04 -654.03,654.04 z m 0,-198.43 c 224.16,0 411.02,-162.7 448.69,-376.23 h -897.39 c 37.66,213.53 224.53,376.23 448.7,376.23"
                    />
                    <path
                      fill="currentColor"
                      d="m 1946.24,1868.17 h -876.27 v 169.54 h 876.27 v -169.54"
                    />
                  </g>
                </g>
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
    </>
  );
}