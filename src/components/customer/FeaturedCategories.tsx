import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCategories: React.FC = () => {
  const { categories, products, selectedCategory, setSelectedCategory } = useStore();

  const handleSelect = (slug: string) => {
    setSelectedCategory(slug);
    const el = document.getElementById('catalogue-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-heritage-cream dark:bg-heritage-darkSurface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-heritage-crimson dark:text-heritage-gold text-xs font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white">
              Explore Handcrafted Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              const el = document.getElementById('catalogue-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 text-sm font-semibold text-heritage-crimson dark:text-heritage-gold hover:underline flex items-center gap-1.5"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5">
          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.slug)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 relative bg-white dark:bg-heritage-darkCard flex flex-col justify-between ${
                  isSelected
                    ? 'border-heritage-crimson shadow-xl ring-2 ring-heritage-crimson/30 -translate-y-1'
                    : 'border-heritage-gold/30 hover:border-heritage-gold hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Image Container with Zoom */}
                <div className="relative h-36 sm:h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

                  {/* Badge */}
                  {cat.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-heritage-gold text-heritage-charcoal text-[10px] font-bold tracking-wider uppercase shadow-md">
                        {cat.badge}
                      </span>
                    </div>
                  )}

                  {/* Item Count */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium border border-white/20">
                      {count} {count === 1 ? 'Piece' : 'Pieces'}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-heritage-gold transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Card Description */}
                <div className="p-3.5 flex flex-col justify-between flex-grow">
                  <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-heritage-gold/15 flex items-center justify-between text-xs font-semibold text-heritage-crimson dark:text-heritage-gold">
                    <span>Explore Edit</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
