import React from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSection } from '../components/customer/HeroSection';
import { FeaturedCategories } from '../components/customer/FeaturedCategories';
import { ProductCard } from '../components/customer/ProductCard';
import { CustomOrderSection } from '../components/customer/CustomOrderSection';
import { OurStorySection } from '../components/customer/OurStorySection';
import { ContactSection } from '../components/customer/ContactSection';
import { BandhaniMotifDivider } from '../components/common/BandhaniMotifDivider';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { openWhatsAppDirect } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage, setSelectedCategory, siteContent, theme, profile } = useStore();

  // Curated products: prioritized by isFeatured, otherwise latest products
  const featured = products.filter((p) => p.isFeatured);
  const featuredProducts = (featured.length > 0 ? featured : products).slice(0, 6);

  const handleViewAllProducts = () => {
    setSelectedCategory(null);
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageBg = theme?.pageBackground || '#FBF8F3';

  return (
    <div
      style={{ backgroundColor: pageBg }}
      className="space-y-8 sm:space-y-14 animate-fade-in pb-12 transition-colors duration-300"
    >
      {/* 1. Hero Section Banner (Connected to CMS Hero & Banner Manager) */}
      <HeroSection />

      {/* 2. Shop Curated Pieces Section (Admin-Curated Spotlight Products) */}
      {siteContent?.toggles?.showSimilarProducts !== false && (
        <section id="shop-curated-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 scroll-mt-20">
          <div className="mb-6 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#6E6259] uppercase block mb-1">
              Curated Shop Collection
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-grow min-w-0">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] truncate">
                  Handpicked For You
                </h2>
                <BandhaniMotifDivider />
              </div>
              {featuredProducts.length > 0 && (
                <button
                  onClick={handleViewAllProducts}
                  className="text-xs sm:text-sm font-medium text-[#241E1C] hover:text-[#4A121A] flex items-center gap-1.5 transition-colors cursor-pointer group shrink-0 self-start sm:self-auto"
                >
                  <span>View Full Shop Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {featuredProducts.length > 0 ? (
            /* 6-Column Responsive Product Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Graceful Empty State Card when 0 Products exist */
            <div className="rounded-3xl border border-dashed border-[#D1C7BD] bg-white/70 dark:bg-white/5 p-8 sm:p-12 text-center max-w-2xl mx-auto backdrop-blur-xs shadow-xs space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4A121A]/10 text-[#4A121A] flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241E1C]">
                New Collection Handcrafting in Progress
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6259] max-w-md mx-auto leading-relaxed">
                Currently no products are listed in this showcase. Our master artisans are hand-tying new heirloom Bandhani pieces. You can commission bespoke creations directly on WhatsApp.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openWhatsAppDirect(profile.whatsappNumber, "Hello Bandhanu! I'd like to enquire about your upcoming collection & bespoke commissions.")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire via WhatsApp Concierge</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 3. Collections (Categories Showcase, Connected to CategoryManager) */}
      <FeaturedCategories />

      {/* 4. Bespoke Custom Orders & Customization Section */}
      <CustomOrderSection />

      {/* 6. About Our Lineage & Artisan Story */}
      <OurStorySection />

      {/* 7. Contact & Studio Atelier Section */}
      <ContactSection />
    </div>
  );
};
