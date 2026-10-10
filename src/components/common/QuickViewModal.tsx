import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, MessageCircle, Heart, Sparkles, ExternalLink, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuickViewModal: React.FC = () => {
  const {
    products,
    quickViewProductId,
    setQuickViewProductId,
    setSelectedProductId,
    profile,
    isWishlisted,
    toggleWishlist,
    triggerWhatsAppEnquiry
  } = useStore();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!quickViewProductId) return null;

  const product = products.find(p => p.id === quickViewProductId);
  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const activeColor = product.colors[selectedColorIdx] || { name: 'Original', hex: '#9B111E' };

  const handleClose = () => setQuickViewProductId(null);

  const handleWhatsApp = (e: React.MouseEvent) => {
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.5 },
      colors: ['#25D366', '#D4AF37', '#9B111E']
    });
    triggerWhatsAppEnquiry(product, activeColor.name);
  };

  const handleOpenFullDetail = () => {
    setSelectedProductId(product.id);
    setQuickViewProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-heritage-darkSurface rounded-3xl border border-heritage-gold/40 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 dark:bg-heritage-darkCard/80 text-heritage-charcoal dark:text-white hover:bg-white shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-heritage-sand/40 dark:bg-stone-900 overflow-hidden flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain md:object-cover max-h-[260px] md:max-h-none min-h-[220px] p-2 md:p-0"
          />
          {product.knotCount && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-heritage-gold text-[10px] font-semibold border border-heritage-gold/30">
                {product.knotCount}
              </span>
            </div>
          )}
        </div>

        {/* Product Info & CTA */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-heritage-crimson font-bold uppercase tracking-wider mb-1">
              <span>{product.craftTechnique}</span>
              <span className="text-gray-400 font-mono text-[10px]">SKU: {product.sku}</span>
            </div>

            <h3 className="text-xl font-serif font-bold text-heritage-charcoal dark:text-white">
              {product.title}
            </h3>

            <p className="text-xs text-heritage-charcoal/70 dark:text-gray-300 mt-1 line-clamp-2">
              {product.subtitle}
            </p>

            <div className="my-3 flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-heritage-crimson dark:text-heritage-gold">
                {profile.currencySymbol}
                {product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {profile.currencySymbol}
                  {product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Color Swatch */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5 mb-3">
                <span className="text-xs font-semibold text-heritage-charcoal dark:text-white">
                  Color: <span className="font-normal">{activeColor.name}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColorIdx(i)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        selectedColorIdx === i
                          ? 'ring-2 ring-heritage-crimson scale-110 border-white'
                          : 'border-black/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColorIdx === i && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-heritage-charcoal/70 dark:text-gray-300 line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-heritage-gold/20">
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Enquire on WhatsApp</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleOpenFullDetail}
                className="flex-1 py-2 px-3 rounded-xl border border-heritage-gold/40 hover:bg-heritage-sand/40 text-heritage-charcoal dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Full Product Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-xl border transition-all ${
                  wishlisted
                    ? 'bg-heritage-crimson text-white border-heritage-crimson'
                    : 'border-heritage-gold/40 text-heritage-charcoal dark:text-white hover:bg-heritage-sand/40'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
