import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    navigateToProduct,
    setCurrentPage,
    triggerWhatsAppEnquiry,
    triggerMultiProductEnquiry
  } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleProductClick = (productId: string) => {
    navigateToProduct(productId);
  };

  const handleContinueShopping = () => {
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen pb-20 sm:pb-28 animate-fade-in">
      {/* 1. Header with Subtle Traditional Motif Watermark matching Image 2 */}
      <section className="relative py-12 sm:py-16 bg-[#F5EFE6] border-b border-[#E2D7C7] overflow-hidden">
        {/* Subtle Mandala / Motif Background Accent */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <svg className="w-96 h-96 text-[#4A121A]" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.6" fill="none" />
            <path d="M50 5 L55 35 L85 20 L65 45 L95 50 L65 55 L85 80 L55 65 L50 95 L45 65 L15 80 L35 55 L5 50 L35 45 L15 20 L45 35 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-serif text-[#241E1C]">
            <Heart className="w-6 h-6 stroke-[1.8] text-[#4A121A]" />
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#241E1C]">
              My Wishlist
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6259]">
            Your favourite pieces, saved for later
          </p>
        </div>
      </section>

      {/* 2. Wishlist Rows List matching Image 2 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {savedProducts.length === 0 ? (
          <div className="text-center py-16 space-y-4 bg-white/60 border border-[#E2D7C7] p-8">
            <Heart className="w-12 h-12 stroke-1 text-[#6E6259] mx-auto opacity-50" />
            <h3 className="font-serif text-xl text-[#241E1C]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#6E6259] max-w-md mx-auto">
              Save your cherished pieces while browsing our handcrafted Bandhani collection.
            </p>
            <button
              onClick={handleContinueShopping}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-[#4A121A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#380D13] transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#E2D7C7] p-4 sm:p-5 flex items-center justify-between gap-4 transition-all hover:shadow-sm"
              >
                {/* Left: Thumbnail & Title + Price */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <div
                    onClick={() => handleProductClick(product.id)}
                    className="w-16 h-20 sm:w-20 sm:h-24 bg-[#F5EFE6] border border-[#E2D7C7]/50 overflow-hidden shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      onClick={() => handleProductClick(product.id)}
                      className="font-serif font-bold text-sm sm:text-base text-[#241E1C] truncate hover:text-[#4A121A] cursor-pointer"
                    >
                      {product.title}
                    </h3>
                    <p className="font-serif font-semibold text-xs sm:text-sm text-[#241E1C] mt-1">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>

                {/* Right: Enquire on WhatsApp Button + Trash Icon */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <button
                    onClick={() => triggerWhatsAppEnquiry(product)}
                    className="py-2.5 px-4 sm:py-3 sm:px-5 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-xs flex items-center gap-1.5 cursor-pointer rounded-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Enquire on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Bottom Actions: Enquire All & Continue Shopping */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={handleContinueShopping}
                className="text-xs sm:text-sm font-medium text-[#241E1C] hover:text-[#4A121A] inline-flex items-center gap-1.5 transition-colors cursor-pointer order-2 sm:order-1"
              >
                <span>Continue Shopping →</span>
              </button>

              {savedProducts.length > 1 && (
                <button
                  onClick={() => triggerMultiProductEnquiry(savedProducts)}
                  className="py-2.5 px-5 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer rounded-sm order-1 sm:order-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire All ({savedProducts.length} Pieces) on WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
