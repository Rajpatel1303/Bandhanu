import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { getWhatsAppDirectUrl, openWhatsAppDirect } from '../../utils/whatsapp';
import {
  Search,
  Heart,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    currentPage,
    setCurrentPage,
    categories,
    selectedCategory,
    navigateToCategory,
    searchQuery,
    setSearchQuery,
    wishlist,
    profile,
    selectedProductId,
    siteContent
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'catalogue' | 'about' | 'contact' | 'wishlist') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (slug: string | null) => {
    navigateToCategory(slug);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('catalogue');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 dark:bg-heritage-darkSurface/95 backdrop-blur-md border-b border-heritage-gold/20 transition-colors duration-300">
      {/* Top Announcement Bar (Configurable from Studio CMS) */}
      {siteContent?.toggles?.showAnnouncement && siteContent?.announcement?.enabled && (
        <div className="bg-gradient-to-r from-heritage-crimson via-heritage-ruby to-heritage-terracotta text-white py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-heritage-gold animate-pulse" />
            <span>{siteContent.announcement.text}</span>
          </span>
          {siteContent.announcement.subtext && (
            <>
              <span className="hidden md:inline text-white/50">•</span>
              <span className="hidden md:inline text-heritage-gold font-semibold">
                {siteContent.announcement.subtext}
              </span>
            </>
          )}
          <span className="hidden md:inline text-white/50">•</span>
          <a
            href={getWhatsAppDirectUrl(profile.whatsappNumber)}
            onClick={(e) => {
              e.preventDefault();
              openWhatsAppDirect(profile.whatsappNumber, 'Hello Bandhanu team! I am contacting you from the website announcement bar.');
            }}
            className="hidden sm:inline-flex items-center gap-1 underline text-white/90 hover:text-white"
          >
            <MessageCircle className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>{siteContent.announcement.ctaText}</span>
          </a>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-heritage-charcoal dark:text-gray-200 hover:bg-heritage-sand/60 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Monogram & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-heritage-crimson to-heritage-ruby p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full border border-heritage-gold/50 flex items-center justify-center bg-heritage-crimson text-heritage-gold font-serif font-bold text-lg tracking-wider">
                BD
              </div>
              {/* Decorative Bandhani Dot */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-heritage-gold border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-heritage-crimson"></span>
              </div>
            </div>

            <div>
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-wide text-heritage-crimson dark:text-heritage-gold drop-shadow-xs block leading-tight">
                Bandhanu
              </span>
              <span className="block text-[8px] sm:text-[10px] tracking-[0.18em] uppercase text-heritage-charcoal/70 dark:text-gray-400 font-medium">
                Where Heritage Meets Style
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (100% Customer Facing) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                currentPage === 'home' && !selectedProductId && activeView === 'store'
                  ? 'text-heritage-crimson dark:text-heritage-gold font-semibold'
                  : 'text-heritage-charcoal dark:text-gray-200 hover:text-heritage-crimson'
              }`}
            >
              Home
              {currentPage === 'home' && !selectedProductId && activeView === 'store' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-heritage-crimson dark:bg-heritage-gold rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-sm font-medium transition-colors relative py-1 flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'catalogue' && !selectedProductId && activeView === 'store'
                  ? 'text-heritage-crimson dark:text-heritage-gold font-semibold'
                  : 'text-heritage-charcoal dark:text-gray-200 hover:text-heritage-crimson'
              }`}
            >
              <span>Catalogue</span>
              <span className="text-[10px] bg-heritage-gold/25 text-heritage-crimson dark:text-heritage-gold px-1.5 py-0.5 rounded-full font-bold">
                All
              </span>
              {currentPage === 'catalogue' && !selectedProductId && activeView === 'store' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-heritage-crimson dark:bg-heritage-gold rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                currentPage === 'about' && activeView === 'store'
                  ? 'text-heritage-crimson dark:text-heritage-gold font-semibold'
                  : 'text-heritage-charcoal dark:text-gray-200 hover:text-heritage-crimson'
              }`}
            >
              Our Story
              {currentPage === 'about' && activeView === 'store' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-heritage-crimson dark:bg-heritage-gold rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                currentPage === 'contact' && activeView === 'store'
                  ? 'text-heritage-crimson dark:text-heritage-gold font-semibold'
                  : 'text-heritage-charcoal dark:text-gray-200 hover:text-heritage-crimson'
              }`}
            >
              Studio Contact
              {currentPage === 'contact' && activeView === 'store' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-heritage-crimson dark:bg-heritage-gold rounded-full" />
              )}
            </button>
          </nav>

          {/* Customer Actions (Zero Admin Traces) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input / Trigger */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-white dark:bg-heritage-darkCard border border-heritage-gold/40 rounded-full px-3 py-1.5 shadow-sm">
                  <Search className="w-4 h-4 text-heritage-charcoal/50 mr-2" />
                  <input
                    type="text"
                    placeholder="Search saree, dupatta, silk..."
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      if (currentPage !== 'catalogue' && e.target.value.trim().length > 1) {
                        setCurrentPage('catalogue');
                      }
                    }}
                    autoFocus
                    className="bg-transparent text-xs sm:text-sm text-heritage-charcoal dark:text-gray-100 focus:outline-none w-36 sm:w-56"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-0.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full text-heritage-charcoal dark:text-gray-200 hover:bg-heritage-sand/60 transition-colors"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Link */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                currentPage === 'wishlist' && activeView === 'store'
                  ? 'text-heritage-crimson dark:text-heritage-gold bg-rose-500/10'
                  : 'text-heritage-charcoal dark:text-gray-200 hover:bg-heritage-sand/60'
              }`}
              title="Saved Trousseau Pieces"
            >
              <Heart className={`w-5 h-5 ${currentPage === 'wishlist' ? 'fill-current' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-heritage-crimson text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Category Quick Ribbon */}
        {activeView === 'store' && !selectedProductId && (
          <div className="py-2.5 border-t border-heritage-gold/15 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[11px] font-serif italic text-heritage-charcoal/60 dark:text-gray-400 shrink-0">
              Curated Edits:
            </span>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium cursor-pointer ${
                currentPage === 'catalogue' && selectedCategory === null
                  ? 'bg-heritage-crimson text-white shadow-xs'
                  : 'bg-heritage-sand/70 text-heritage-charcoal hover:bg-heritage-sand dark:bg-heritage-darkCard dark:text-gray-300'
              }`}
            >
              All Pieces
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 font-medium cursor-pointer ${
                  currentPage === 'catalogue' && selectedCategory === cat.slug
                    ? 'bg-heritage-crimson text-white shadow-xs'
                    : 'bg-heritage-sand/70 text-heritage-charcoal hover:bg-heritage-sand dark:bg-heritage-darkCard dark:text-gray-300'
                }`}
              >
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="text-[9px] px-1 rounded bg-heritage-gold/30 text-heritage-crimson font-semibold">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu (100% Customer Facing - Zero Admin) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] dark:bg-heritage-darkSurface border-b border-heritage-gold/30 px-5 py-4 space-y-4 animate-fade-in shadow-2xl">
          {/* Main Pages */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'home' && !selectedProductId
                  ? 'bg-heritage-crimson text-white'
                  : 'bg-heritage-sand/50 text-heritage-charcoal dark:bg-heritage-darkCard dark:text-white'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'catalogue' && !selectedProductId
                  ? 'bg-heritage-crimson text-white'
                  : 'bg-heritage-sand/50 text-heritage-charcoal dark:bg-heritage-darkCard dark:text-white'
              }`}
            >
              💎 Catalogue
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'about'
                  ? 'bg-heritage-crimson text-white'
                  : 'bg-heritage-sand/50 text-heritage-charcoal dark:bg-heritage-darkCard dark:text-white'
              }`}
            >
              📖 Our Story
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'contact'
                  ? 'bg-heritage-crimson text-white'
                  : 'bg-heritage-sand/50 text-heritage-charcoal dark:bg-heritage-darkCard dark:text-white'
              }`}
            >
              📍 Studio Contact
            </button>
          </div>

          {/* Categories Grid */}
          <div className="pt-2 border-t border-heritage-gold/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-charcoal/60 dark:text-gray-400 block mb-2">
              Browse by Garment
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="text-left px-3 py-2 rounded-lg bg-heritage-sand/30 dark:bg-heritage-darkCard/50 text-xs font-medium text-heritage-charcoal dark:text-gray-200 hover:text-heritage-crimson"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Wishlist Mobile Link */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 text-heritage-crimson text-xs font-bold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-current" />
              <span>Saved Wishlist Pieces</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-heritage-crimson text-white text-[10px]">
              {wishlist.length}
            </span>
          </button>

          {/* Action WhatsApp Concierge */}
          <div className="pt-2 border-t border-heritage-gold/20">
            <a
              href={getWhatsAppDirectUrl(profile.whatsappNumber, 'Hello Bandhanu team! I am browsing your mobile catalogue and would like some assistance.')}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                openWhatsAppDirect(profile.whatsappNumber, 'Hello Bandhanu team! I am browsing your mobile catalogue and would like some assistance.');
              }}
              className="w-full py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Studio Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
