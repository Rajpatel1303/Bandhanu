import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  Filter,
  Check
} from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wishlist,
    profile
  } = useStore();

  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [priceTier, setPriceTier] = useState<string>('all'); // all, under10k, 10k-25k, over25k
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Extract unique craft techniques and fabrics for filter tags
  const craftTechniques = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.craftTechnique.split(' ')[0]))).filter(Boolean);
    return list;
  }, [products]);

  const fabrics = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.fabric.split(' ')[0]))).filter(Boolean);
    return list;
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Wishlist filter
      if (showWishlistOnly && !wishlist.includes(p.id)) return false;

      // Category filter
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchCraft = p.craftTechnique.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchFabric && !matchSku && !matchCraft) return false;
      }

      // Craft filter
      if (selectedCraft !== 'all' && !p.craftTechnique.toLowerCase().includes(selectedCraft.toLowerCase())) {
        return false;
      }

      // Fabric filter
      if (selectedFabric !== 'all' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }

      // Availability filter
      if (selectedAvailability !== 'all' && p.availability !== selectedAvailability) {
        return false;
      }

      // Price tier
      if (priceTier === 'under10k' && p.price >= 10000) return false;
      if (priceTier === '10k-25k' && (p.price < 10000 || p.price > 25000)) return false;
      if (priceTier === 'over25k' && p.price <= 25000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.enquiriesCount || 0) - (a.enquiriesCount || 0);
      // Default: featured first, then newest
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedCraft,
    selectedFabric,
    selectedAvailability,
    priceTier,
    sortBy,
    showWishlistOnly,
    wishlist
  ]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedCraft !== 'all' ? 1 : 0) +
    (selectedFabric !== 'all' ? 1 : 0) +
    (selectedAvailability !== 'all' ? 1 : 0) +
    (priceTier !== 'all' ? 1 : 0) +
    (showWishlistOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedCraft('all');
    setSelectedFabric('all');
    setSelectedAvailability('all');
    setPriceTier('all');
    setSearchQuery('');
    setShowWishlistOnly(false);
  };

  return (
    <section id="catalogue-section" className="py-16 bg-[#FFFDF9] dark:bg-heritage-darkSurface scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-gold/15 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Digital Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white">
            Authentic Handcrafted Bandhani Creations
          </h2>
          <p className="mt-2 text-sm text-heritage-charcoal/70 dark:text-gray-400">
            Browse our master-tied sarees, dupattas, and bridal lehengas. Click any piece to inspect micro-details and enquire directly via WhatsApp.
          </p>
        </div>

        {/* Controls Bar: Category Pills, Filter Drawer Trigger, Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-heritage-gold/20">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-heritage-crimson text-white shadow-md'
                  : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 border border-heritage-gold/30 hover:border-heritage-gold'
              }`}
            >
              All Pieces ({products.length})
            </button>
            {categories.map(cat => {
              const count = products.filter(p => p.category === cat.slug).length;
              const isSel = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSel
                      ? 'bg-heritage-crimson text-white shadow-md'
                      : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 border border-heritage-gold/30 hover:border-heritage-gold'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSel ? 'bg-white/20 text-white' : 'bg-heritage-gold/20 text-heritage-crimson'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Filter Toggle, Wishlist, Sort */}
          <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end w-full md:w-auto flex-wrap sm:flex-nowrap">
            {/* Wishlist Toggle */}
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all shrink-0 ${
                showWishlistOnly
                  ? 'bg-heritage-crimson text-white border-heritage-crimson shadow-sm'
                  : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-200 border-heritage-gold/30 hover:border-heritage-gold'
              }`}
            >
              <span>Saved ({wishlist.length})</span>
            </button>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all shrink-0 ${
                showFiltersDrawer || activeFiltersCount > 0
                  ? 'bg-heritage-gold/20 text-heritage-crimson border-heritage-gold font-semibold'
                  : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-200 border-heritage-gold/30 hover:border-heritage-gold'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-heritage-crimson" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-heritage-crimson text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="relative flex items-center bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 rounded-full px-2.5 py-1.5 shadow-xs text-xs">
              <ArrowUpDown className="w-3 h-3 text-heritage-charcoal/60 dark:text-gray-400 mr-1.5 shrink-0" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-transparent text-xs text-heritage-charcoal dark:text-gray-200 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured First</option>
                <option value="popular">Most Inquired</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {showFiltersDrawer && (
          <div className="my-6 p-5 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkCard/60 border border-heritage-gold/30 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-heritage-gold/20 mb-4">
              <span className="text-xs font-bold text-heritage-charcoal dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-heritage-crimson" />
                Refine Showcase Specifications
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-heritage-crimson dark:text-heritage-gold font-semibold hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              {/* Price Tier */}
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-2">
                  Price Tier
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Price Ranges' },
                    { id: 'under10k', label: `Under ${profile.currencySymbol}10,000` },
                    { id: '10k-25k', label: `${profile.currencySymbol}10,000 - ${profile.currencySymbol}25,000` },
                    { id: 'over25k', label: `Above ${profile.currencySymbol}25,000` }
                  ].map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setPriceTier(tier.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                        priceTier === tier.id
                          ? 'bg-heritage-crimson text-white font-medium'
                          : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand'
                      }`}
                    >
                      <span>{tier.label}</span>
                      {priceTier === tier.id && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Craft Technique */}
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-2">
                  Craft Technique
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCraft('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                      selectedCraft === 'all'
                        ? 'bg-heritage-crimson text-white font-medium'
                        : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand'
                    }`}
                  >
                    <span>All Techniques</span>
                    {selectedCraft === 'all' && <Check className="w-3 h-3" />}
                  </button>
                  {craftTechniques.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCraft(c)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                        selectedCraft === c
                          ? 'bg-heritage-crimson text-white font-medium'
                          : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand'
                      }`}
                    >
                      <span>{c}</span>
                      {selectedCraft === c && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Type */}
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-2">
                  Silk & Fabric
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedFabric('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                      selectedFabric === 'all'
                        ? 'bg-heritage-crimson text-white font-medium'
                        : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand'
                    }`}
                  >
                    <span>All Fabrics</span>
                    {selectedFabric === 'all' && <Check className="w-3 h-3" />}
                  </button>
                  {fabrics.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFabric(f)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                        selectedFabric === f
                          ? 'bg-heritage-crimson text-white font-medium'
                          : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand'
                      }`}
                    >
                      <span>{f}</span>
                      {selectedFabric === f && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-2">
                  Dispatch Availability
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Availability' },
                    { id: 'in_stock', label: 'Ready to Ship (24h)' },
                    { id: 'made_to_order', label: 'Made to Order' }
                  ].map(av => (
                    <button
                      key={av.id}
                      onClick={() => setSelectedAvailability(av.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                        selectedAvailability === av.id
                          ? 'bg-heritage-crimson text-white font-medium'
                          : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand'
                      }`}
                    >
                      <span>{av.label}</span>
                      {selectedAvailability === av.id && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-heritage-charcoal/60 dark:text-gray-400">
              Active Filters:
            </span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-heritage-crimson/10 text-heritage-crimson text-xs font-medium">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
              </span>
            )}
            {selectedCraft !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-heritage-crimson/10 text-heritage-crimson text-xs font-medium">
                Craft: {selectedCraft}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCraft('all')} />
              </span>
            )}
            {selectedFabric !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-heritage-crimson/10 text-heritage-crimson text-xs font-medium">
                Fabric: {selectedFabric}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFabric('all')} />
              </span>
            )}
            {priceTier !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-heritage-crimson/10 text-heritage-crimson text-xs font-medium">
                Price Filter Active
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceTier('all')} />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-heritage-crimson/10 text-heritage-crimson text-xs font-medium">
                "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-xs text-heritage-crimson underline font-medium ml-1"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-heritage-sand/30 rounded-3xl border border-heritage-gold/30 p-8">
            <div className="w-16 h-16 rounded-full bg-heritage-gold/20 text-heritage-crimson mx-auto flex items-center justify-center text-2xl font-serif font-bold mb-4">
              BD
            </div>
            <h3 className="text-xl font-serif font-bold text-heritage-charcoal dark:text-white mb-2">
              No Bandhani Pieces Match Your Current Filter
            </h3>
            <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400 max-w-md mx-auto mb-6">
              Try adjusting your price range, fabric type, or search term to discover other hand-knotted heirlooms.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-full bg-heritage-crimson text-white text-xs font-semibold shadow-md hover:bg-heritage-ruby transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
