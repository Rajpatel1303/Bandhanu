import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/customer/ProductCard';
import { BandhaniMotifDivider } from '../components/common/BandhaniMotifDivider';
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
  Check
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
    addToCart,
    setSelectedCategory,
    profile
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-lg text-[#241E1C]">Product not found.</p>
        <button
          onClick={() => setCurrentPage('catalogue')}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#4A121A] text-white text-xs font-semibold"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const images = product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
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

            {/* Action Buttons: Add to Cart (Solid Maroon) & Wishlist */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-grow py-3.5 px-6 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Add to Cart</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    <p>• Hand-finished with traditional zari selvedge and tassels.</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="border-b border-[#E2D7C7]/60 pb-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#241E1C] hover:text-[#4A121A] py-1 text-left"
                >
                  <span>Shipping & Returns</span>
                  <span className="text-base font-normal">
                    {openAccordion === 'shipping' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-2 text-xs text-[#6E6259] space-y-1.5 leading-relaxed animate-fade-in">
                    <p>• Complimentary express insured courier across India (3–5 working days).</p>
                    <p>• Worldwide priority dispatch via DHL Express (5–7 working days).</p>
                    <p>• Easy 7-day return / exchange policy on un-stitched original items.</p>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div className="border-b border-[#E2D7C7]/60 pb-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#241E1C] hover:text-[#4A121A] py-1 text-left"
                >
                  <span>Care Instructions</span>
                  <span className="text-base font-normal">
                    {openAccordion === 'care' ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === 'care' && (
                  <div className="pt-2 text-xs text-[#6E6259] space-y-1.5 leading-relaxed animate-fade-in">
                    <p>• Strictly dry clean only to preserve natural vegetable and mineral dyes.</p>
                    <p>• Store wrapped in breathable unbleached muslin cloth away from dampness.</p>
                    <p>• Avoid spraying perfume or water directly on pure metallic gold zari.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Editorial Split Banner matching Image 2 */}
        <div className="my-16 sm:my-24 grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-[#E2D7C7]">
          {/* Left: Close-up Texture Visual */}
          <div className="h-44 sm:h-56 relative bg-white overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
              alt="Bandhani dots texture"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right: Deep Maroon Editorial Bar */}
          <div className="bg-[#4A121A] text-white p-8 sm:p-12 flex items-center justify-center text-center relative overflow-hidden">
            {/* Ambient Bandhani Dot Cluster Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-80 h-80 fill-none stroke-current animate-pulse-subtle">
                <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="3,3" />
                <circle cx="50" cy="50" r="25" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="10" strokeWidth="1" />
                <circle cx="50" cy="15" r="3" fill="currentColor" />
                <circle cx="50" cy="85" r="3" fill="currentColor" />
                <circle cx="15" cy="50" r="3" fill="currentColor" />
                <circle cx="85" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>

            <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl font-light tracking-wide max-w-md relative z-10">
              "A piece of tradition, woven for today."
            </blockquote>
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
