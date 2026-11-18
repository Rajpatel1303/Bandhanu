import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { BandhaniMotifDivider } from '../common/BandhaniMotifDivider';

export const FeaturedCategories: React.FC = () => {
  const { categories, setSelectedCategory, setCurrentPage, theme } = useStore();
  const catStyles = theme?.sections?.categories;
  const sectionBg = catStyles?.bg || undefined;
  const titleColor = catStyles?.titleColor || undefined;
  const cardBg = catStyles?.cardBg || undefined;

  // Only display active categories defined in CategoryManager
  const activeCategories = categories.filter((c) => c.isActive !== false);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAll = () => {
    setSelectedCategory(null);
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeCategories.length === 0) return null;

  return (
    <section
      style={{ backgroundColor: sectionBg }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 transition-colors duration-300"
    >
      {/* Section Header with Horizontal Rule & Bandhani Motif */}
      <div className="mb-8 sm:mb-10">
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#6E6259] uppercase block mb-1">
          Shop by Category
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-grow min-w-0">
            <h2
              style={{ color: titleColor }}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] truncate"
            >
              Explore Our Collection
            </h2>
            <BandhaniMotifDivider />
          </div>
          <button
            onClick={handleViewAll}
            className="text-xs sm:text-sm font-medium text-[#241E1C] hover:text-[#4A121A] flex items-center gap-1.5 transition-colors cursor-pointer group shrink-0 self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Dynamic Category Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {activeCategories.slice(0, 8).map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            style={{ backgroundColor: cardBg }}
            className="group cursor-pointer bg-[#F5EFE6] border border-[#E2D7C7]/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Image Container with smooth zoom */}
            <div className="relative aspect-[4/4.5] overflow-hidden bg-white">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {cat.badge && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#4A121A]/80 text-[#F5EFE6] text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs">
                  {cat.badge}
                </span>
              )}
            </div>

            {/* Content info below image */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#241E1C] group-hover:text-[#4A121A] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#6E6259] mt-0.5 font-normal line-clamp-1">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2 flex items-center gap-1 text-xs font-medium text-[#241E1C] group-hover:text-[#4A121A] transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
