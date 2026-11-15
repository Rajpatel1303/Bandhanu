import React from 'react';
import { useStore } from '../../context/StoreContext';
import { InstagramIcon } from './InstagramIcon';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedProductId, setSelectedCategory, theme } = useStore();
  const footerStyles = theme?.sections?.footer;
  const footerBg = footerStyles?.bg || undefined;
  const footerText = footerStyles?.textColor || undefined;

  const handleNav = (page: 'home' | 'catalogue' | 'about' | 'contact') => {
    setSelectedProductId(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCraftScroll = () => {
    setSelectedProductId(null);
    setCurrentPage('home');
    setTimeout(() => {
      const el = document.getElementById('our-craft-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer
      style={{ backgroundColor: footerBg, color: footerText }}
      className="bg-[#4A121A] text-[#F5EFE6] py-12 border-t border-[#380D13] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand Monogram / Logo */}
          <div
            onClick={() => handleNav('home')}
            className="cursor-pointer text-center md:text-left select-none"
          >
            <span className="font-serif font-bold text-2xl sm:text-3xl tracking-[0.14em] text-[#FBF8F3] block leading-none">
              BANDHANU
            </span>
            <span className="block text-[8.5px] tracking-[0.25em] text-[#D8C7B5] uppercase font-medium mt-1">
              Tie and Dye Textile
            </span>
          </div>

          {/* Center: Clean Horizontal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#F5EFE6]/90 font-medium">
            <button
              onClick={() => {
                setSelectedCategory(null);
                handleNav('catalogue');
              }}
              className="hover:text-white transition-colors cursor-pointer px-1 py-1"
            >
              Shop
            </button>
            <span className="text-[#F5EFE6]/40 select-none">|</span>
            <button
              onClick={handleCraftScroll}
              className="hover:text-white transition-colors cursor-pointer px-1 py-1"
            >
              Our Craft
            </button>
            <span className="text-[#F5EFE6]/40 select-none">|</span>
            <button
              onClick={() => handleNav('about')}
              className="hover:text-white transition-colors cursor-pointer px-1 py-1"
            >
              Our Story
            </button>
            <span className="text-[#F5EFE6]/40 select-none">|</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-white transition-colors cursor-pointer px-1 py-1"
            >
              Contact
            </button>
          </div>

          {/* Right: Social & Copyright */}
          <div className="flex flex-col md:items-end items-center gap-2.5">
            <div className="flex items-center space-x-3 text-[#F5EFE6]/80">
              <a
                href="https://instagram.com/bandhanu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors p-1"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors p-1"
                aria-label="YouTube"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <p className="text-[11px] text-[#D8C7B5]/80 font-normal">
              © 2026 Bandhanu. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
