import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { getWhatsAppDirectUrl } from '../../utils/whatsapp';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedProductId,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wishlist,
    setIsCartOpen,
    totalCartItems,
    profile,
    siteContent,
    theme
  } = useStore();

  const navStyles = theme?.sections?.navbar;
  const navBg = navStyles?.bg || undefined;
  const navText = navStyles?.text || undefined;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const announcement = siteContent?.announcement;
  const showAnnouncement = siteContent?.toggles?.showAnnouncement !== false && announcement?.enabled;

  const instagramUrl = profile.instagramHandle
    ? (profile.instagramHandle.startsWith('http')
        ? profile.instagramHandle
        : `https://instagram.com/${profile.instagramHandle.replace('@', '')}`)
    : 'https://instagram.com';

  const handleNavClick = (page: 'home' | 'catalogue' | 'about' | 'contact' | 'wishlist') => {
    setSelectedProductId(null);
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedProductId(null);
      setCurrentPage('catalogue');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 transition-all">
      {/* Dynamic Announcement Bar from CMS */}
      {showAnnouncement && (
        <div className="bg-[#4A121A] text-[#F5EFE6] px-4 py-2 text-center text-xs font-medium border-b border-[#380D13] flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span>{announcement.text}</span>
          {announcement.subtext && (
            <span className="hidden sm:inline text-[#D8C7B5]">| {announcement.subtext}</span>
          )}
          {announcement.ctaText && (
            <a
              href={
                announcement.ctaLink && !announcement.ctaLink.includes('wa.me') && !announcement.ctaLink.includes('whatsapp')
                  ? announcement.ctaLink
                  : getWhatsAppDirectUrl(profile.whatsappNumber, announcement.text || 'Hello Bandhanu!')
              }
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:text-white transition-colors ml-1"
            >
              {announcement.ctaText} ➔
            </a>
          )}
        </div>
      )}

      {/* Main Navbar */}
      <div
        style={{ backgroundColor: navBg, color: navText }}
        className="bg-[#FBF8F3]/95 backdrop-blur-md border-b border-[#E2D7C7]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#241E1C] hover:bg-[#F5EFE6] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Left: Classic Typographic Logo connected to Profile Data */}
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer text-center md:text-left group select-none min-w-0"
            >
              <span className="font-serif font-bold text-xl xs:text-2xl sm:text-3xl tracking-[0.08em] sm:tracking-[0.12em] text-[#4A121A] block leading-none group-hover:text-[#380D13] transition-colors truncate">
                {profile.businessName || 'BANDHANU'}
              </span>
              <span className="block text-[7.5px] sm:text-[9.5px] tracking-[0.18em] sm:tracking-[0.25em] text-[#6E6259] uppercase font-medium mt-1 truncate">
                {profile.tagline || 'Tie and Dye Textile'}
              </span>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-9">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-sm tracking-wide transition-all relative py-1 font-medium cursor-pointer ${
                  currentPage === 'home'
                    ? 'text-[#4A121A] font-semibold'
                    : 'text-[#241E1C]/80 hover:text-[#4A121A]'
                }`}
              >
                Home
                {currentPage === 'home' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#4A121A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  handleNavClick('catalogue');
                }}
                className={`text-sm tracking-wide transition-all relative py-1 font-medium cursor-pointer ${
                  currentPage === 'catalogue'
                    ? 'text-[#4A121A] font-semibold'
                    : 'text-[#241E1C]/80 hover:text-[#4A121A]'
                }`}
              >
                Shop
                {currentPage === 'catalogue' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#4A121A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`text-sm tracking-wide transition-all relative py-1 font-medium cursor-pointer ${
                  currentPage === 'about'
                    ? 'text-[#4A121A] font-semibold'
                    : 'text-[#241E1C]/80 hover:text-[#4A121A]'
                }`}
              >
                Our Story
                {currentPage === 'about' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#4A121A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`text-sm tracking-wide transition-all relative py-1 font-medium cursor-pointer ${
                  currentPage === 'contact'
                    ? 'text-[#4A121A] font-semibold'
                    : 'text-[#241E1C]/80 hover:text-[#4A121A]'
                }`}
              >
                Contact
                {currentPage === 'contact' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#4A121A] rounded-full" />
                )}
              </button>
            </nav>

            {/* Right: Utility Icons (Search, Instagram, Wishlist, Bag) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Dropdown / Trigger */}
              <div className="relative">
                {searchOpen ? (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center bg-white border border-[#E2D7C7] rounded-full px-3 py-1 shadow-xs"
                  >
                    <Search className="w-4 h-4 text-[#6E6259] mr-2" />
                    <input
                      type="text"
                      placeholder="Search collection..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-32 sm:w-44 text-xs bg-transparent border-none focus:outline-none text-[#241E1C]"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-gray-400 hover:text-gray-600 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-[#241E1C] hover:text-[#4A121A] hover:bg-[#F5EFE6] rounded-full transition-colors"
                    aria-label="Search items"
                  >
                    <Search className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>

              {/* Instagram Link */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#241E1C] hover:text-[#4A121A] hover:bg-[#F5EFE6] rounded-full transition-colors hidden xs:flex items-center justify-center"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>

              {/* Wishlist Link with Badge */}
              <button
                onClick={() => handleNavClick('wishlist')}
                className="p-2 text-[#241E1C] hover:text-[#4A121A] hover:bg-[#F5EFE6] rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5 stroke-[1.8]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#4A121A] text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button with Counter */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#241E1C] hover:text-[#4A121A] hover:bg-[#F5EFE6] rounded-full transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
                {totalCartItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#4A121A] text-white text-[9px] font-bold flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#E2D7C7] bg-[#FBF8F3] space-y-2 animate-fade-in">
              <button
                onClick={() => handleNavClick('home')}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentPage === 'home'
                    ? 'bg-[#4A121A] text-white'
                    : 'text-[#241E1C] hover:bg-[#F5EFE6]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  handleNavClick('catalogue');
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentPage === 'catalogue'
                    ? 'bg-[#4A121A] text-white'
                    : 'text-[#241E1C] hover:bg-[#F5EFE6]'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentPage === 'about'
                    ? 'bg-[#4A121A] text-white'
                    : 'text-[#241E1C] hover:bg-[#F5EFE6]'
                }`}
              >
                Our Story
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentPage === 'contact'
                    ? 'bg-[#4A121A] text-white'
                    : 'text-[#241E1C] hover:bg-[#F5EFE6]'
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => handleNavClick('wishlist')}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#241E1C] hover:bg-[#F5EFE6]"
              >
                Wishlist ({wishlist.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
