import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNotification } from '../context/NotificationContext';
import { ProductCard } from '../components/customer/ProductCard';
import { BandhaniMotifDivider } from '../components/common/BandhaniMotifDivider';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Share2,
  Check,
  MessageCircle
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    setCurrentPage,
    isWishlisted,
    toggleWishlist,
    triggerWhatsAppEnquiry,
    setSelectedCategory,
    profile
  } = useStore();
  const { notify } = useNotification();

  const product = (selectedProductId ? products.find((p) => p.id === selectedProductId) : null) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md w-full p-8 rounded-3xl bg-heritage-sand/60 dark:bg-heritage-darkCard border border-heritage-gold/30 space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-heritage-crimson/10 dark:bg-heritage-gold/10 text-heritage-crimson dark:text-heritage-gold flex items-center justify-center font-serif text-xl font-bold mx-auto border border-heritage-gold/30">
            BD
          </div>
          <h2 className="font-serif text-2xl font-bold text-heritage-charcoal dark:text-white">
            Handcrafted Piece Not Found
          </h2>
          <p className="text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300 leading-relaxed font-sans">
            The requested textile may have found its patron or the catalog identifier has changed.
          </p>
          <button
            onClick={() => {
              setCurrentPage('catalogue');
              window.location.hash = '#/catalogue';
            }}
            className="mt-2 px-6 py-2.5 rounded-full bg-heritage-crimson hover:bg-heritage-ruby text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Explore Active Collection
          </button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const images = product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
  ];



  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      notify.royal('Piece Link Copied ✨', 'Direct shareable atelier link copied to clipboard.');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 4 Related Products
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen py-6 sm:py-10 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between pb-6 text-xs text-[#6E6259]">
          <button
            onClick={() => {
              setSelectedProductId(null);
              setCurrentPage('catalogue');
            }}
            className="flex items-center gap-1.5 hover:text-[#4A121A] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-[#4A121A] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Main Product Section: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Gallery with Vertical Thumbnails matching Image 2 */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Vertical Thumbnail Column */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 no-scrollbar sm:w-24">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] w-18 sm:w-full overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#4A121A] ring-1 ring-[#4A121A]'
                      : 'border-[#E2D7C7] hover:border-[#4A121A]/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="relative flex-grow aspect-[4/5] bg-[#F5EFE6] border border-[#E2D7C7] overflow-hidden">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] leading-snug">
                {product.title}
              </h1>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#241E1C] mt-2">
                {formatCurrency(product.price)}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#6E6259] leading-relaxed">
                {product.subtitle || product.description}
              </p>
            </div>

            {/* 3 Hallmark Icons matching Image 2 */}
            <div className="space-y-2.5 py-4 border-y border-[#E2D7C7]">
              <div className="flex items-center gap-3 text-xs text-[#241E1C]">
                <div className="w-6 h-6 rounded-full bg-[#F5EFE6] border border-[#D8C7B5] flex items-center justify-center text-[#4A121A] shrink-0">
                  <span className="text-xs">🏷️</span>
                </div>
                <span className="font-medium">Handcrafted in {profile.city || 'Kutch'}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#241E1C]">
                <div className="w-6 h-6 rounded-full bg-[#F5EFE6] border border-[#D8C7B5] flex items-center justify-center text-[#4A121A] shrink-0">
                  <span className="text-xs">🧵</span>
                </div>
                <span className="font-medium">{product.fabric || 'Pure Silk'}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#241E1C]">
                <div className="w-6 h-6 rounded-full bg-[#F5EFE6] border border-[#D8C7B5] flex items-center justify-center text-[#4A121A] shrink-0">
                  <span className="text-xs">🌿</span>
                </div>
                <span className="font-medium">{product.craftTechnique || 'Authentic Bandhej'}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="block text-[11px] font-medium text-[#6E6259] uppercase tracking-wider">
                Quantity
              </span>
              <div className="inline-flex items-center border border-[#E2D7C7] rounded-sm bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 px-3 text-[#6E6259] hover:text-[#241E1C] hover:bg-[#F5EFE6] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold text-[#241E1C] min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 px-3 text-[#6E6259] hover:text-[#241E1C] hover:bg-[#F5EFE6] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Order via WhatsApp & Wishlist */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  confetti({
                    particleCount: 35,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#25D366', '#D4AF37', '#4A121A']
                  });
                  triggerWhatsAppEnquiry(product, undefined, quantity);
                }}
                className="flex-grow py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer rounded-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire & Order on WhatsApp</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle Wishlist"
                className={`p-3.5 border transition-all duration-300 cursor-pointer ${
                  wishlisted
                    ? 'bg-[#4A121A] border-[#4A121A] text-white shadow-sm'
                    : 'border-[#E2D7C7] bg-white hover:border-[#4A121A] text-[#241E1C]'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current text-white' : ''}`} />
              </button>
            </div>

            {/* Collapsible Accordions matching Image 2 */}
            <div className="pt-4 border-t border-[#E2D7C7] space-y-3">
              {/* Product Details */}
              <div className="border-b border-[#E2D7C7]/60 pb-3">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#241E1C] hover:text-[#4A121A] py-1 text-left"
                >
                  <span>Product Details</span>
                  <span className="text-base font-normal">
                    {openAccordion === 'details' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'details' && (
                  <div className="pt-2 text-xs text-[#6E6259] space-y-1.5 leading-relaxed animate-fade-in">
                    <p>• <strong>Fabric:</strong> {product.fabric || 'Pure Mulberry Silk'}</p>
                    <p>• <strong>Technique:</strong> {product.craftTechnique || 'Authentic Hand-Tied Rai Bandhej'}</p>
                    {product.knotCount && <p>• <strong>Knot Density:</strong> {product.knotCount}</p>}
                    {product.dimensions && <p>• <strong>Dimensions:</strong> {product.dimensions}</p>}
                  </div>
                )}
              </div>

              {/* Shipping Information */}
              <div className="border-b border-[#E2D7C7]/60 pb-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#241E1C] hover:text-[#4A121A] py-1 text-left"
                >
                  <span>Shipping Information</span>
                  <span className="text-base font-normal">
                    {openAccordion === 'shipping' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-2 text-xs text-[#6E6259] space-y-1.5 leading-relaxed animate-fade-in">
                    <p>• Complimentary shipping across India via DTDC or another trusted courier partner.</p>
                    <p>• Orders are dispatched within 1–2 working days, with an estimated delivery time of 3–4 working days after dispatch.</p>
                  </div>
                )}
              </div>

              {/* Return & Exchange Policy */}
              <div className="border-b border-[#E2D7C7]/60 pb-3">
                <button
                  onClick={() => toggleAccordion('returns')}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#241E1C] hover:text-[#4A121A] py-1 text-left"
                >
                  <span>Return & Exchange Policy</span>
                  <span className="text-base font-normal">
                    {openAccordion === 'returns' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'returns' && (
                  <div className="pt-2 text-xs text-[#6E6259] space-y-2 leading-relaxed animate-fade-in">
                    <p>• We do not accept returns or exchanges for reasons such as colour preference, change of mind or incorrect size selection.</p>
                    <p>• Returns are accepted only for products received in a damaged condition.</p>
                    <p>• Any damage must be reported within 48 hours of delivery, along with clear photographs or an unboxing video.</p>
                    <p>• <strong>Handcrafted Variations:</strong> Slight variations in colour, pattern and dots are natural characteristics of handmade Bandhani and are not considered defects.</p>
                    <p>• <strong>Custom Orders:</strong> Customised and made-to-order products are non-returnable and non-exchangeable.</p>
                    <p>• <strong>Delivery Address:</strong> Customers are responsible for providing the correct and complete shipping address and contact number.</p>
                  </div>
                )}
              </div>

              {/* Care Instructions & Wash Care */}
              <div className="border-b border-[#E2D7C7]/60 pb-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#241E1C] hover:text-[#4A121A] py-1 text-left"
                >
                  <span>Care Instructions & Wash Care</span>
                  <span className="text-base font-normal">
                    {openAccordion === 'care' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'care' && (
                  <div className="pt-2 text-xs text-[#6E6259] space-y-1.5 leading-relaxed animate-fade-in">
                    <p>• Strictly dry clean only to preserve the colours and delicate Bandhani craftsmanship.</p>
                    <p>• Do not machine wash or hand wash to protect the fine hand-tied knots and fabric texture.</p>
                    <p>• Dry in shade and avoid prolonged exposure to direct sunlight to maintain colour vibrancy.</p>
                    <p>• Store wrapped in a clean, breathable cotton or muslin cloth, away from moisture and dampness.</p>
                    <p>• Avoid spraying perfumes, deodorants or harsh chemicals directly onto the fabric.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* "You May Also Like" Section matching Image 2 */}
        <div className="py-6 sm:py-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-grow">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#241E1C] whitespace-nowrap">
                You May Also Like
              </h2>
              <BandhaniMotifDivider />
            </div>

            <button
              onClick={() => {
                setSelectedProductId(null);
                setSelectedCategory(null);
                setCurrentPage('catalogue');
              }}
              className="text-xs sm:text-sm font-medium text-[#241E1C] hover:text-[#4A121A] flex items-center gap-1.5 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
