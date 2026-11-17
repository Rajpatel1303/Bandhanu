import React from 'react';
import { useStore } from '../context/StoreContext';
import { BandhaniMotifDivider } from '../components/common/BandhaniMotifDivider';
import { Home, ShoppingBag, MessageCircle, ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setCurrentPage, profile, categories } = useStore();

  const handleGoHome = () => {
    setCurrentPage('home');
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoCatalogue = () => {
    setCurrentPage('catalogue');
    window.location.hash = '#/catalogue';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const conciergeLink = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(
    'Hello Bandhanu Concierge! 👋 I was looking for a textile on your website that could not be found. Could you please guide me?'
  )}`;

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Heritage Emblem Badge */}
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-heritage-sand/60 dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-lg relative">
          <div className="w-16 h-16 rounded-2xl bg-heritage-crimson/10 dark:bg-heritage-gold/10 flex items-center justify-center text-heritage-crimson dark:text-heritage-gold">
            <Compass className="w-8 h-8 stroke-[1.5] animate-spin-slow" />
          </div>
          <span className="absolute -top-2.5 -right-2.5 px-2.5 py-0.5 rounded-full bg-heritage-crimson text-white text-[10px] font-bold font-mono tracking-wider shadow-sm">
            404
          </span>
        </div>

        {/* Poetic Heading */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-heritage-crimson dark:text-heritage-gold">
            Uncharted Atelier Pathway
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-heritage-charcoal dark:text-white leading-tight">
            The Weave You Seek Is Not on Our Loom
          </h1>
          <p className="max-w-lg mx-auto text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300 leading-relaxed font-sans">
            The textile style, craft chapter, or gallery page you navigated to might have been renamed, archived, or is resting in our artisan archives.
          </p>
        </div>

        <BandhaniMotifDivider />

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-heritage-crimson hover:bg-heritage-ruby text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Atelier Home</span>
          </button>

          <button
            onClick={handleGoCatalogue}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-heritage-gold/20 hover:bg-heritage-gold/30 text-heritage-charcoal dark:text-heritage-gold border border-heritage-gold/40 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Collection</span>
          </button>

          <a
            href={conciergeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

        {/* Quick Category Exploration */}
        {categories.length > 0 && (
          <div className="pt-6 border-t border-heritage-gold/20">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-heritage-charcoal/60 dark:text-gray-400 mb-3">
              Explore Available Categories:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCurrentPage('catalogue');
                    window.location.hash = '#/catalogue';
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-heritage-sand/60 dark:bg-heritage-darkCard border border-heritage-gold/25 hover:border-heritage-gold text-heritage-charcoal dark:text-gray-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{cat.name}</span>
                  <ArrowRight className="w-3 h-3 text-heritage-gold" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
