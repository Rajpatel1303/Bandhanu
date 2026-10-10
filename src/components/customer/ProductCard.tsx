import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, MessageCircle, Eye, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    profile,
    isWishlisted,
    toggleWishlist,
    setSelectedProductId,
    setQuickViewProductId,
    triggerWhatsAppEnquiry
  } = useStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || { name: 'Original', hex: '#9B111E' };
  const wishlisted = isWishlisted(product.id);

  // Determine secondary image for hover flip
  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c';
  const secondaryImage = product.images[1] || product.images[0];

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Trigger subtle celebratory confetti
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 50,
      origin: { x, y },
      colors: ['#25D366', '#D4AF37', '#9B111E'],
      ticks: 120,
      disableForReducedMotion: true
    });

    triggerWhatsAppEnquiry(product, activeColor.name);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProductId(product.id);
  };

  return (
    <div
      onClick={() => {
        setSelectedProductId(product.id);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 hover:border-heritage-gold shadow-xs hover:shadow-xl transition-all duration-400 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-heritage-sand/40 dark:bg-gray-800">
        {/* Main Image & Hover Secondary Image */}
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          onError={e => {
            const target = e.currentTarget;
            target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85';
          }}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <div className="flex flex-col gap-1 pointer-events-auto">
            {product.isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-heritage-crimson text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-heritage-gold" />
                Featured
              </span>
            )}
            {product.knotCount && (
              <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-heritage-gold text-[10px] font-medium border border-heritage-gold/30">
                {product.knotCount}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              wishlisted
                ? 'bg-heritage-crimson text-white scale-110'
                : 'bg-white/85 text-heritage-charcoal hover:bg-white hover:text-heritage-crimson'
            }`}
            title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Button (appears on hover) */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 pointer-events-auto">
          <button
            onClick={handleQuickView}
            className="w-full py-2 rounded-xl bg-white/95 dark:bg-heritage-darkSurface/95 backdrop-blur-md text-heritage-charcoal dark:text-white text-xs font-semibold shadow-lg hover:bg-heritage-sand transition-colors flex items-center justify-center gap-1.5 border border-heritage-gold/30"
          >
            <Eye className="w-3.5 h-3.5 text-heritage-crimson" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Product Content & Details */}
      <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-grow space-y-2 sm:space-y-3">
        <div>
          {/* Category & Availability row */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1">
            <span className="text-heritage-crimson dark:text-heritage-gold font-semibold uppercase tracking-wider truncate max-w-[55%]">
              {product.fabric}
            </span>
            <span
              className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold shrink-0 ${
                product.availability === 'in_stock'
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : product.availability === 'made_to_order'
                  ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                  : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
              }`}
            >
              {product.availability === 'in_stock'
                ? 'Ready'
                : product.availability === 'made_to_order'
                ? 'Made-to-Order'
                : 'Sold Out'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-xs sm:text-base text-heritage-charcoal dark:text-white group-hover:text-heritage-crimson transition-colors line-clamp-1">
            {product.title}
          </h3>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-xs text-heritage-charcoal/65 dark:text-gray-400 line-clamp-1 mt-0.5 hidden xs:block">
            {product.subtitle}
          </p>

          {/* Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-heritage-gold/15">
              <span className="text-[9px] sm:text-[10px] text-heritage-charcoal/60 dark:text-gray-400 mr-0.5">
                Colors:
              </span>
              <div className="flex items-center gap-1">
                {product.colors.map((c, cIdx) => (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedColorIndex(cIdx);
                    }}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all flex items-center justify-center ${
                      selectedColorIndex === cIdx
                        ? 'ring-2 ring-heritage-crimson scale-110 border-white'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColorIndex === cIdx && (
                      <Check className="w-2 h-2 text-white stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & WhatsApp Direct Action */}
        <div className="pt-2 sm:pt-3 border-t border-heritage-gold/15 flex items-center justify-between gap-1.5 sm:gap-2">
          <div>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-sm sm:text-lg font-serif font-bold text-heritage-crimson dark:text-heritage-gold">
                {profile.currencySymbol}
                {product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                  {profile.currencySymbol}
                  {product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-heritage-charcoal/50 dark:text-gray-400 font-mono block">
              {product.sku}
            </span>
          </div>

          {/* WhatsApp Action Button */}
          <button
            onClick={handleWhatsAppClick}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1 active:scale-95 group/btn shrink-0"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
