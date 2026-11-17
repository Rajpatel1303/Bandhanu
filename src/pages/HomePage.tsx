import React from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSection } from '../components/customer/HeroSection';
import { FeaturedCategories } from '../components/customer/FeaturedCategories';
import { ProductCard } from '../components/customer/ProductCard';
import { OurCraftSection } from '../components/customer/OurCraftSection';
import { OurStorySection } from '../components/customer/OurStorySection';
import { InstagramGallery } from '../components/customer/InstagramGallery';
import { BandhaniMotifDivider } from '../components/common/BandhaniMotifDivider';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage, setSelectedCategory, siteContent, theme } = useStore();

  // Curated 6 products: prioritized by isFeatured, otherwise latest products
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
      className="space-y-6 sm:space-y-12 animate-fade-in pb-12 transition-colors duration-300"
    >
      {/* 1. Hero Section Banner (Connected to CMS Hero & Banner Manager) */}
      <HeroSection />

      {/* 2. Shop by Category Showcase (Connected to CategoryManager) */}
      <FeaturedCategories />

      {/* 3. Featured Collection ("Handpicked For You") - Honoring showSimilarProducts toggle */}
      {siteContent?.toggles?.showSimilarProducts !== false && featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#6E6259] uppercase block mb-1">
              Featured Collection
            </span>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-grow">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] whitespace-nowrap">
                  Handpicked For You
                </h2>
                <BandhaniMotifDivider />
              </div>
              <button
                onClick={handleViewAllProducts}
                className="text-xs sm:text-sm font-medium text-[#241E1C] hover:text-[#4A121A] flex items-center gap-1.5 transition-colors cursor-pointer group shrink-0"
              >
                <span>View All Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 6-Column Responsive Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Our Craft Section (Connected to CMS Craft Journey) - Honoring showCraftJourney toggle */}
      {siteContent?.toggles?.showCraftJourney !== false && <OurCraftSection />}

      {/* 5. Our Story Section (Connected to CMS About Us) */}
      <OurStorySection />

      {/* 6. Instagram Gallery (Connected to Business Profile) - Honoring showLookbook toggle */}
      {siteContent?.toggles?.showLookbook !== false && <InstagramGallery />}
    </div>
  );
};
