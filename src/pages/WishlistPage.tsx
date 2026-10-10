import React from 'react';
import { useStore } from '../context/StoreContext';
import { openWhatsAppDirect } from '../utils/whatsapp';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Trash2,
  ArrowRight,
  Sparkles,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import confetti from 'canvas-confetti';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, toggleWishlist, navigateToProduct, setCurrentPage, profile } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));
  const totalValue = savedProducts.reduce((acc, p) => acc + p.price, 0);
  const cleanPhone = profile.whatsappNumber.replace(/[^0-9]/g, '');

  const handleBulkEnquire = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    const itemsList = savedProducts
      .map((p, idx) => `${idx + 1}. ${p.title} - ${formatCurrency(p.price)}`)
      .join('\n');

    const message = `Hello Bandhanu Concierge! 👋

I have curated my personalized Bandhanu Wishlist (${savedProducts.length} pieces) and would like to check availability and place an order:

${itemsList}

✦ Total Estimated Value: ${formatCurrency(totalValue)}

Please confirm which of these pieces are ready for immediate dispatch or bespoke bridal order. Thank you!`;

    openWhatsAppDirect(profile.whatsappNumber, message);
  };

  const handleSingleEnquire = (product: typeof products[0]) => {
    const text = `Hello Bandhanu! I am interested in ordering this piece from my wishlist:
✦ ${product.title}
✦ Price: ${formatCurrency(product.price)}
✦ Craft: ${product.craftTechnique}
Please provide availability and dispatch timeline.`;
    openWhatsAppDirect(profile.whatsappNumber, text);
  };

  return (
    <div className="min-h-screen bg-heritage-cream dark:bg-heritage-darkSurface pb-24">
      {/* Header */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-b from-heritage-sand/40 via-heritage-cream to-transparent dark:from-heritage-darkCard/60 dark:via-heritage-darkSurface border-b border-heritage-gold/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-heritage-crimson dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Heirlooms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-heritage-charcoal dark:text-white">
            My Curated Trousseau
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300 max-w-xl mx-auto">
            {savedProducts.length > 0
              ? `You have saved ${savedProducts.length} handcrafted masterpiece${savedProducts.length > 1 ? 's' : ''}. Send your full selection directly to our WhatsApp concierge.`
              : 'Keep track of the exquisite Bandhani pieces you adore while browsing our collection.'}
          </p>

          {savedProducts.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <div className="px-4 py-2 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-sm text-xs sm:text-sm font-semibold">
                <span className="text-heritage-charcoal/60 dark:text-gray-400">Total Selection Value: </span>
                <span className="font-serif font-bold text-heritage-crimson dark:text-heritage-gold text-base">
                  {formatCurrency(totalValue)}
                </span>
              </div>

              <button
                onClick={handleBulkEnquire}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enquire Entire Wishlist on WhatsApp ({savedProducts.length})</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Wishlist Grid or Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {savedProducts.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/10 text-heritage-crimson flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-heritage-charcoal dark:text-white">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-400">
              Browse our heritage collection of sarees, dupattas, stoles, garments, and running fabrics to build your bespoke trousseau.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setCurrentPage('catalogue')}
                className="px-6 py-3 rounded-full bg-heritage-crimson hover:bg-heritage-crimson/90 text-white font-bold text-xs sm:text-sm shadow-lg shadow-heritage-crimson/25 transition-transform active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Discover Masterpieces</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((product) => {
              const primaryImg = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85';
              return (
                <div
                  key={product.id}
                  className="group rounded-2xl sm:rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 hover:border-heritage-gold shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Container with full-garment aspect */}
                  <div
                    onClick={() => navigateToProduct(product.id)}
                    className="relative w-full aspect-[3/4] overflow-hidden bg-heritage-sand/30 dark:bg-black/30 cursor-pointer"
                  >
                    <img
                      src={primaryImg}
                      alt={product.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Tag */}
                    <div className="absolute top-2.5 left-2.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-heritage-gold">
                      {product.category}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      title="Remove from wishlist"
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-heritage-darkSurface/90 hover:bg-rose-50 text-heritage-crimson flex items-center justify-center shadow-md transition-transform active:scale-90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="text-[11px] text-heritage-crimson dark:text-heritage-gold font-semibold truncate">
                        {product.craftTechnique}
                      </div>
                      <h3
                        onClick={() => navigateToProduct(product.id)}
                        className="font-serif font-bold text-xs sm:text-sm text-heritage-charcoal dark:text-white line-clamp-1 hover:text-heritage-crimson cursor-pointer mt-0.5"
                      >
                        {product.title}
                      </h3>
                      <div className="mt-1 font-serif font-bold text-sm sm:text-base text-heritage-crimson dark:text-heritage-gold">
                        {formatCurrency(product.price)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-heritage-gold/20 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => navigateToProduct(product.id)}
                        className="flex-1 py-1.5 px-2 rounded-xl border border-heritage-gold/30 hover:border-heritage-gold text-[11px] font-semibold text-heritage-charcoal dark:text-white text-center transition-colors"
                      >
                        View Piece
                      </button>
                      <button
                        onClick={() => handleSingleEnquire(product)}
                        className="py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span className="sm:hidden">Enquire</span>
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
