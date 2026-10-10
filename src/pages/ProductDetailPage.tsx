import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/customer/ProductCard';
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
  ChevronUp,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    setCurrentPage,
    navigateToCategory,
    navigateToProduct,
    profile,
    isWishlisted,
    toggleWishlist,
    triggerWhatsAppEnquiry,
    generateWhatsAppUrl
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'craft' | 'specs' | 'care' | 'provenance'>('craft');
  const [copiedToast, setCopiedToast] = useState(false);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  const [showMsgPreview, setShowMsgPreview] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p>Product not found.</p>
        <button
          onClick={() => setCurrentPage('catalogue')}
          className="mt-4 px-4 py-2 rounded-xl bg-heritage-crimson text-white text-xs"
        >
          Back to Catalogue
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const activeColor = product.colors[selectedColorIndex] || { name: 'Original Heritage', hex: '#9B111E' };
  const previewWhatsAppUrl = generateWhatsAppUrl(product, activeColor.name);
  const previewMessage = decodeURIComponent(previewWhatsAppUrl.split('text=')[1] || '');

  const handleWhatsAppClick = () => {
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

  // Similar products from same category or same craft
  const similarProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.craftTechnique === product.craftTechnique))
    .slice(0, 4);

  return (
    <div className="py-4 sm:py-8 pb-28 md:pb-16 bg-[#FFFDF9] dark:bg-heritage-darkSurface min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-6 border-b border-heritage-gold/20 text-xs">
          <button
            onClick={() => setCurrentPage('catalogue')}
            className="flex items-center gap-1.5 font-semibold text-heritage-crimson dark:text-heritage-gold hover:underline group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Digital Catalogue</span>
          </button>

          <div className="flex items-center gap-1.5 text-heritage-charcoal/60 dark:text-gray-400">
            <button onClick={() => setCurrentPage('home')} className="hover:text-heritage-crimson">
              Home
            </button>
            <span>/</span>
            <button onClick={() => setCurrentPage('catalogue')} className="hover:text-heritage-crimson">
              Catalogue
            </button>
            <span>/</span>
            <button
              onClick={() => navigateToCategory(product.category)}
              className="capitalize hover:text-heritage-crimson"
            >
              {product.category}
            </button>
            <span>/</span>
            <span className="font-mono text-heritage-crimson dark:text-heritage-gold font-medium truncate max-w-[120px] sm:max-w-none">
              {product.sku}
            </span>
          </div>
        </div>

        {/* Main Product Layout — 50/50 Balanced Grid to show Full Clothes immediately */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column: Full Uncropped Clothing Showcase (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-3">
            {/* Primary Main Image Frame with Fit/Cover toggle */}
            <div className="relative h-[360px] xs:h-[420px] sm:h-[500px] lg:h-[calc(100vh-210px)] max-h-[580px] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200/80 dark:from-stone-900/90 dark:to-stone-950 border-2 border-heritage-gold/30 shadow-xl flex items-center justify-center group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className={`w-full h-full transition-all duration-300 ${
                  fitMode === 'contain'
                    ? 'object-contain p-2 sm:p-4'
                    : 'object-cover object-top'
                }`}
              />

              {/* Floating Top Left Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.knotCount && (
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1 border border-white/20 shadow-md">
                    <Sparkles className="w-3 h-3 text-heritage-gold" />
                    <span>{product.knotCount}</span>
                  </span>
                )}
                {product.isNewDrop && (
                  <span className="px-3 py-1 rounded-full bg-heritage-crimson text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Signature Drop
                  </span>
                )}
              </div>

              {/* Floating Top Right Action Controls */}
              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <button
                  onClick={() => setFitMode(fitMode === 'contain' ? 'cover' : 'contain')}
                  className="p-2 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xs text-heritage-charcoal dark:text-white shadow-md hover:bg-white transition-all"
                  title={fitMode === 'contain' ? 'Zoom In to Inspect Knots' : 'View Full Clothes (Head to Hem)'}
                >
                  {fitMode === 'contain' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xs text-heritage-charcoal dark:text-white shadow-md hover:bg-white transition-all"
                  title="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full backdrop-blur-xs shadow-md transition-all ${
                    wishlisted
                      ? 'bg-heritage-crimson text-white'
                      : 'bg-white/90 dark:bg-black/80 text-heritage-charcoal dark:text-white hover:text-heritage-crimson'
                  }`}
                  title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Bottom Tag indicating full view status */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono pointer-events-none">
                {fitMode === 'contain' ? 'Full Clothing Visible • Head-to-Hem' : 'Zoomed Inspection View'}
              </div>

              {copiedToast && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center text-white text-xs font-semibold z-20 animate-fade-in">
                  <div className="px-4 py-2 rounded-xl bg-heritage-crimson border border-heritage-gold flex items-center gap-2 shadow-xl">
                    <Check className="w-4 h-4" />
                    <span>Product Link Copied to Clipboard!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-heritage-crimson ring-2 ring-heritage-gold/50 scale-105 shadow-md'
                        : 'border-heritage-gold/25 hover:border-heritage-gold opacity-75'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Specs, WhatsApp Action & Tabs (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Category & Craft Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigateToCategory(product.category)}
                className="px-3 py-0.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-wider hover:bg-heritage-crimson/20"
              >
                {product.category}
              </button>
              {product.subCategory && (
                <span className="px-2.5 py-0.5 rounded-full bg-heritage-sand dark:bg-heritage-darkCard text-[11px] font-mono text-heritage-charcoal/80 dark:text-gray-300">
                  {product.subCategory}
                </span>
              )}
              <span className="text-xs text-gray-400 font-mono">
                SKU: {product.sku}
              </span>
            </div>

            {/* Product Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-charcoal dark:text-white leading-tight">
                {product.title}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300 leading-relaxed font-sans">
                {product.subtitle}
              </p>
            </div>

            {/* Price & Savings */}
            <div className="p-4 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkCard/60 border border-heritage-gold/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                  Handcrafted Value
                </span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-heritage-crimson dark:text-heritage-gold">
                    {profile.currencySymbol}{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {profile.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  {product.availability === 'in_stock' ? 'Ready to Ship' : 'Made to Order'}
                </span>
                <span className="block text-[10px] text-gray-400 mt-1">
                  {product.leadTime || 'Worldwide Courier'}
                </span>
              </div>
            </div>

            {/* Colorways Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-heritage-charcoal dark:text-gray-200">
                    Selected Shade:
                  </span>
                  <span className="font-medium text-heritage-crimson dark:text-heritage-gold">
                    {activeColor.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColorIndex === idx
                          ? 'border-heritage-crimson ring-2 ring-heritage-gold scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColorIndex === idx && (
                        <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop WhatsApp Action Button */}
            <div className="pt-2 hidden md:block">
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enquire on WhatsApp</span>
                <span className="text-xs bg-white/25 px-2 py-0.5 rounded-full font-mono">
                  {profile.currencySymbol}{product.price.toLocaleString('en-IN')}
                </span>
              </button>
              <p className="text-center text-[11px] text-gray-400 mt-2">
                Opens directly with pre-filled title, SKU ({product.sku}), and selected shade ({activeColor.name})
              </p>
            </div>

            {/* WhatsApp Pre-filled Message Preview Toggle */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-xs">
              <button
                onClick={() => setShowMsgPreview(!showMsgPreview)}
                className="w-full flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-semibold"
              >
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>View Pre-Filled WhatsApp Message</span>
                </span>
                {showMsgPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showMsgPreview && (
                <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-heritage-darkSurface border border-emerald-500/20 text-[11px] text-gray-700 dark:text-gray-300 font-mono leading-relaxed whitespace-pre-line">
                  {previewMessage}
                </div>
              )}
            </div>

            {/* Specifications & Craft Details Tabs */}
            <div className="pt-4 border-t border-heritage-gold/25 space-y-4">
              <div className="flex items-center border-b border-heritage-gold/20 text-xs">
                {[
                  { id: 'craft', label: 'Craft & Knots' },
                  { id: 'specs', label: 'Fabric & Weave' },
                  { id: 'care', label: 'Heirloom Care' },
                  { id: 'provenance', label: 'Provenance' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`py-2.5 px-3.5 font-semibold text-xs border-b-2 transition-all ${
                      activeTab === t.id
                        ? 'border-heritage-crimson text-heritage-crimson dark:text-heritage-gold'
                        : 'border-transparent text-heritage-charcoal/60 dark:text-gray-400 hover:text-heritage-charcoal'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-heritage-charcoal/80 dark:text-gray-300 leading-relaxed min-h-[140px]">
                {activeTab === 'craft' && (
                  <div className="space-y-3 animate-fade-in">
                    <p>{product.description}</p>
                    <ul className="space-y-1.5 pt-1">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-heritage-gold mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2.5 animate-fade-in">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-heritage-sand/30 dark:bg-heritage-darkCard">
                        <span className="text-[10px] text-gray-400 block font-semibold">Fabric Base</span>
                        <span className="font-semibold text-heritage-charcoal dark:text-white">{product.fabric}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-heritage-sand/30 dark:bg-heritage-darkCard">
                        <span className="text-[10px] text-gray-400 block font-semibold">Craft Technique</span>
                        <span className="font-semibold text-heritage-charcoal dark:text-white">{product.craftTechnique}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-heritage-sand/30 dark:bg-heritage-darkCard">
                        <span className="text-[10px] text-gray-400 block font-semibold">Dimensions</span>
                        <span className="font-semibold text-heritage-charcoal dark:text-white">{product.dimensions || 'Standard Traditional'}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-heritage-sand/30 dark:bg-heritage-darkCard">
                        <span className="text-[10px] text-gray-400 block font-semibold">Fulfillment</span>
                        <span className="font-semibold text-heritage-charcoal dark:text-white">{product.leadTime || 'Ready to Dispatch'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-3 animate-fade-in">
                    <p>{product.washCare}</p>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
                      💡 Heirloom Tip: Keep in unbleached muslin wrap with dried neem leaves to protect the pure silk and metallic zari sheen for decades.
                    </div>
                  </div>
                )}

                {activeTab === 'provenance' && (
                  <div className="space-y-3 animate-fade-in">
                    <p>
                      Hand-tied in Jamnagar and Kutch by traditional Khatri artisan families whose generational lineage in Bandhani spans over two centuries.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                        <ShieldCheck className="w-4 h-4" />
                        <span>100% Authentic Handloom</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold text-xs">
                        <Award className="w-4 h-4" />
                        <span>Pure Silk Mark Certified</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products / You May Also Like Section */}
        {similarProducts.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-10 border-t border-heritage-gold/25">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-heritage-crimson dark:text-heritage-gold uppercase tracking-wider">
                  Curated Pairings
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-heritage-charcoal dark:text-white mt-1">
                  Similar Handcrafted Creations
                </h2>
              </div>
              <button
                onClick={() => navigateToCategory(product.category)}
                className="text-xs font-semibold text-heritage-crimson dark:text-heritage-gold hover:underline"
              >
                View More in {product.category} &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {similarProducts.map(sim => (
                <ProductCard key={sim.id} product={sim} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Pinned Mobile Bottom WhatsApp Order Bar (md:hidden) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-heritage-darkSurface/95 backdrop-blur-md border-t border-heritage-gold/30 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl md:hidden">
        <div>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold leading-none">
            Total Price
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-serif font-bold text-lg text-heritage-crimson dark:text-heritage-gold">
              {profile.currencySymbol}{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                {profile.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleWhatsAppClick}
          className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
