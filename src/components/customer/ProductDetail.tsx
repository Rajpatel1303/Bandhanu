import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  ShieldCheck,
  Check,
  Truck,
  Award,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    profile,
    isWishlisted,
    toggleWishlist,
    triggerWhatsAppEnquiry,
    generateWhatsAppUrl
  } = useStore();

  const product = products.find(p => p.id === selectedProductId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'craft' | 'specs' | 'care' | 'provenance'>('craft');
  const [copiedToast, setCopiedToast] = useState(false);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  const [showMsgPreview, setShowMsgPreview] = useState(false);

  if (!product) {
    return null;
  }

  const wishlisted = isWishlisted(product.id);
  const activeColor = product.colors[selectedColorIndex] || { name: 'Original Heritage', hex: '#9B111E' };
  const previewWhatsAppUrl = generateWhatsAppUrl(product, activeColor.name);

  // Extract raw text for simulator preview
  const previewMessage = decodeURIComponent(previewWhatsAppUrl.split('text=')[1] || '');

  const handleWhatsAppClick = () => {
    // Confetti burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#25D366', '#D4AF37', '#9B111E']
    });

    triggerWhatsAppEnquiry(product, activeColor.name);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-4 sm:py-6 pb-24 md:pb-8 bg-[#FFFDF9] dark:bg-heritage-darkSurface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation & Breadcrumb */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-heritage-gold/20 text-xs">
          <button
            onClick={() => setSelectedProductId(null)}
            className="flex items-center gap-1.5 font-semibold text-heritage-crimson dark:text-heritage-gold hover:underline group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Digital Catalogue</span>
          </button>

          <div className="flex items-center gap-2 text-heritage-charcoal/60 dark:text-gray-400">
            <span>Catalogue</span>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="font-mono text-heritage-crimson dark:text-heritage-gold font-medium">
              {product.sku}
            </span>
          </div>
        </div>

        {/* Main Product Layout — 50/50 Balanced Grid to show Full Clothes immediately */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Full Uncropped Clothing Showcase (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-3">
            {/* Primary Main Image Frame with Fit/Cover toggle */}
            <div className="relative h-[360px] xs:h-[420px] sm:h-[500px] lg:h-[calc(100vh-210px)] max-h-[580px] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200/80 dark:from-stone-900/90 dark:to-stone-950 border-2 border-heritage-gold/30 shadow-xl flex items-center justify-center group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className={`w-full h-full transition-all duration-300 ${
                  fitMode === 'contain'
                    ? 'object-contain p-2'
                    : 'object-cover object-top'
                }`}
              />

              {/* Top Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.knotCount && (
                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-heritage-gold text-[11px] font-semibold border border-heritage-gold/40 shadow-md">
                    ✨ {product.knotCount}
                  </span>
                )}
                {product.isFeatured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-heritage-crimson text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Signature Drop
                  </span>
                )}
              </div>

              {/* Top Action Buttons: Fit Toggle + Share + Wishlist */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                <button
                  onClick={() => setFitMode(fitMode === 'contain' ? 'cover' : 'contain')}
                  className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-heritage-darkCard/95 backdrop-blur-md text-heritage-charcoal dark:text-white hover:bg-white text-[11px] font-semibold shadow-md flex items-center gap-1 transition-all border border-heritage-gold/30"
                  title={fitMode === 'contain' ? 'Click to zoom in' : 'Click to fit full clothes'}
                >
                  {fitMode === 'contain' ? (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-heritage-crimson" />
                      <span className="hidden sm:inline">Zoom In</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">Full Clothes</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="p-1.5 sm:p-2 rounded-full bg-white/95 dark:bg-heritage-darkCard/95 backdrop-blur-md text-heritage-charcoal dark:text-white hover:bg-white shadow-md transition-all border border-heritage-gold/30"
                  title="Share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md shadow-md transition-all border border-heritage-gold/30 ${
                    wishlisted
                      ? 'bg-heritage-crimson text-white'
                      : 'bg-white/95 dark:bg-heritage-darkCard/95 text-heritage-charcoal hover:bg-white'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Uncropped Clothes Indicator */}
              {fitMode === 'contain' && (
                <div className="absolute bottom-2.5 inset-x-auto px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white/90 text-[10px] font-medium pointer-events-none">
                  Full Clothing Visible • Head-to-Hem
                </div>
              )}

              {/* Toast when link copied */}
              {copiedToast && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/85 text-white text-xs font-medium backdrop-blur-md flex items-center gap-1.5 animate-fade-in shadow-xl z-20">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link copied!</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-stone-100 dark:bg-stone-800 ${
                      activeImageIndex === idx
                        ? 'border-heritage-crimson ring-2 ring-heritage-crimson/30 scale-105 shadow-md'
                        : 'border-heritage-gold/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Clean, Simplified Details & WhatsApp Action (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-3.5">
            {/* Category Pill & Stock Status Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson dark:text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  {product.category}
                </span>
                <span className="text-heritage-charcoal/60 dark:text-gray-400 font-medium">
                  • {product.craftTechnique}
                </span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  product.availability === 'in_stock'
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                    : product.availability === 'made_to_order'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                    : 'bg-gray-500/15 text-gray-600 border border-gray-500/30'
                }`}
              >
                {product.availability === 'in_stock'
                  ? '● Ready to Ship'
                  : product.availability === 'made_to_order'
                  ? '⏳ Made to Order (14 Days)'
                  : 'Sold Out'}
              </span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-heritage-charcoal dark:text-white leading-snug">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300 mt-1">
                {product.subtitle}
              </p>
              <div className="text-[11px] text-gray-400 font-mono mt-1">
                SKU: <strong className="text-heritage-charcoal dark:text-gray-200">{product.sku}</strong> • {product.fabric}
              </div>
            </div>

            {/* Compact Price Box */}
            <div className="p-3.5 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkCard border border-heritage-gold/30">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-heritage-crimson dark:text-heritage-gold">
                  {profile.currencySymbol}
                  {product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {profile.currencySymbol}
                    {product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                    Save {profile.currencySymbol}{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-heritage-charcoal/60 dark:text-gray-400 mt-0.5">
                Inclusive of all taxes & Silk Mark certification. Free doorstep delivery across India.
              </p>
            </div>

            {/* Color Swatch Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-heritage-charcoal dark:text-white">
                    Select Color:{' '}
                    <span className="font-serif italic text-heritage-crimson dark:text-heritage-gold font-normal">
                      {activeColor.name}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-medium transition-all ${
                        selectedColorIndex === idx
                          ? 'border-heritage-crimson bg-heritage-crimson/10 ring-2 ring-heritage-crimson/30 shadow-xs'
                          : 'border-heritage-gold/30 hover:border-heritage-gold bg-white dark:bg-heritage-darkCard'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                      {selectedColorIndex === idx && (
                        <Check className="w-3.5 h-3.5 text-heritage-crimson" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PRIMARY CALL TO ACTION: ENQUIRE ON WHATSAPP & ORDER */}
            <div className="pt-1 space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 animate-gold-shine"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Enquire on WhatsApp & Order</span>
              </button>

              {/* Express Trust Perks */}
              <div className="flex items-center justify-center gap-3 text-[11px] text-heritage-charcoal/70 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Express Dispatch
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  100% Genuine Silk
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-rose-600" />
                  Direct Khatri Artisans
                </span>
              </div>
            </div>

            {/* Collapsible Pre-filled WhatsApp Message Preview */}
            <div className="border border-emerald-500/25 rounded-2xl bg-emerald-500/5 overflow-hidden text-xs">
              <button
                type="button"
                onClick={() => setShowMsgPreview(!showMsgPreview)}
                className="w-full p-2.5 px-3.5 flex items-center justify-between font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-600" />
                  <span>Pre-filled WhatsApp Message ({showMsgPreview ? 'Click to collapse' : 'Click to preview'})</span>
                </span>
                {showMsgPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showMsgPreview && (
                <div className="p-3 pt-0 border-t border-emerald-500/20 animate-fade-in">
                  <div className="bg-white dark:bg-heritage-darkCard rounded-xl p-3 text-xs font-mono text-heritage-charcoal dark:text-gray-200 border border-emerald-500/20 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                    {previewMessage}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Deep Detailed Accordion / Tabs Section */}
        <div className="mt-12 pt-8 border-t border-heritage-gold/25">
          {/* Tab buttons */}
          <div className="flex items-center gap-3 border-b border-heritage-gold/20 overflow-x-auto no-scrollbar">
            {[
              { id: 'craft', label: 'Craft & Knotting Technique' },
              { id: 'specs', label: 'Fabric & Dimensions' },
              { id: 'care', label: 'Heirloom Care & Storage' },
              { id: 'provenance', label: 'Artisan Provenance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-heritage-crimson text-heritage-crimson dark:text-heritage-gold'
                    : 'border-transparent text-heritage-charcoal/60 dark:text-gray-400 hover:text-heritage-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="py-6 text-sm text-heritage-charcoal/80 dark:text-gray-300 leading-relaxed max-w-4xl">
            {activeTab === 'craft' && (
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-heritage-charcoal dark:text-white">
                  {product.craftTechnique}
                </h3>
                <p>{product.description}</p>
                <div className="p-4 rounded-xl bg-heritage-sand/40 border border-heritage-gold/20 text-xs">
                  <strong>Estimated Knot Density:</strong> {product.knotCount || '15,000 to 25,000 fine dots'}
                  . Each dot is hand-pinched and resist-tied with cotton yarn prior to multiple natural dye immersions.
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-heritage-charcoal dark:text-white">
                  Dimensions & Fabric Weave
                </h3>
                <p>
                  <strong>Dimensions:</strong> {product.dimensions || 'Standard Traditional Dimensions'}
                </p>
                <p>
                  <strong>Fabric Base:</strong> {product.fabric}
                </p>
                <p>
                  <strong>Lead Time:</strong> {product.leadTime || 'Ready to dispatch within 24-48 hours'}
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-heritage-charcoal dark:text-white">
                  Heirloom Preservation Guide
                </h3>
                <p>{product.washCare}</p>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs">
                  <strong>Preservation Tip:</strong> Never press with a dry hot iron directly over the Bandhani crinkle texture; use gentle steam hover. Fold along original creases and change folds twice a year.
                </div>
              </div>
            )}

            {activeTab === 'provenance' && (
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-heritage-charcoal dark:text-white">
                  Khatri Guild Provenance
                </h3>
                <p>
                  Handcrafted in Jamnagar and Kutch, Gujarat. Supported by the Silk Mark Organization of India.
                  By choosing this handcrafted piece, 100% of the value directly supports multigenerational weaver families and preserves 400 years of living Gujarati cultural art.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Pieces Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-heritage-gold/25">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-heritage-charcoal dark:text-white mb-6">
              You May Also Admire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => {
                    setSelectedProductId(rp.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer group rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/20 overflow-hidden shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={rp.images[0]}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-heritage-crimson font-bold uppercase">
                      {rp.fabric}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white line-clamp-1 group-hover:text-heritage-crimson">
                      {rp.title}
                    </h4>
                    <p className="text-sm font-bold text-heritage-crimson dark:text-heritage-gold mt-1">
                      {profile.currencySymbol}
                      {rp.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Fixed Sticky Bottom Order Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-heritage-darkSurface/95 backdrop-blur-md border-t border-heritage-gold/30 p-2.5 px-4 shadow-2xl flex md:hidden items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-gray-500 font-medium leading-none mb-1">Total Price</div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-lg text-heritage-crimson dark:text-heritage-gold">
              {profile.currencySymbol}{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through">
                {profile.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleWhatsAppClick}
          className="flex-1 max-w-[230px] py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all animate-gold-shine"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
