import React from 'react';
import { useStore } from '../../context/StoreContext';
import { getWhatsAppDirectUrl, openWhatsAppDirect } from '../../utils/whatsapp';
import {
  MessageCircle,
  Heart,
  ArrowUp,
  MapPin,
  Mail,
  Sparkles
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export const Footer: React.FC = () => {
  const { profile, categories, navigateToCategory, setCurrentPage } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (slug: string) => {
    navigateToCategory(slug);
  };

  return (
    <footer className="bg-heritage-darkSurface text-gray-300 pt-16 pb-12 border-t-2 border-heritage-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1 & 2: Brand & Craft Promise */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-heritage-crimson border border-heritage-gold/50 flex items-center justify-center text-heritage-gold font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                BD
              </div>
              <span className="font-serif font-bold text-2xl text-heritage-gold tracking-wide">
                {profile.businessName}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Where heritage meets style. Every knot we tie is a promise of authenticity, sustainability, and love for handmade Bandhani.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppDirectUrl(profile.whatsappNumber)}
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsAppDirect(profile.whatsappNumber, 'Hello Bandhanu! I am reaching out from your website footer.');
                }}
                className="p-2.5 rounded-full bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-500/30"
                title="WhatsApp Hotline"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>

              <a
                href={`https://instagram.com/${profile.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all border border-rose-500/30"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Signature Categories */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Signature Edits
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="hover:text-heritage-gold transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCurrentPage('catalogue')}
                  className="text-heritage-gold hover:underline transition-colors text-left font-medium mt-1 cursor-pointer"
                >
                  View Full Catalogue ➔
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation Pages */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Pages & Heritage
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-heritage-gold transition-colors text-left cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('catalogue')}
                  className="hover:text-heritage-gold transition-colors text-left cursor-pointer"
                >
                  Digital Catalogue & Filters
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="hover:text-heritage-gold transition-colors text-left cursor-pointer"
                >
                  About Us & Craft of Bandhej
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('wishlist')}
                  className="hover:text-heritage-gold transition-colors text-left cursor-pointer"
                >
                  Saved Heirlooms & Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="hover:text-heritage-gold transition-colors text-left cursor-pointer"
                >
                  Studio Atelier & Bespoke Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio Concierge */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Studio Concierge
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {profile.address}
            </p>
            <div className="text-xs text-emerald-400 font-mono">
              WhatsApp: {profile.displayPhone}
            </div>
            <div className="text-xs text-gray-400">
              Email: {profile.email}
            </div>
            <div className="pt-1">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-3 py-1.5 rounded-lg bg-heritage-gold/20 text-heritage-gold text-xs font-semibold hover:bg-heritage-gold hover:text-heritage-charcoal transition-all cursor-pointer"
              >
                Book Studio Visit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {profile.businessName}. Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>in Jamnagar, Gujarat.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-heritage-gold transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
