import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/customer/ProductCard';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  Search,
  Filter,
  Check,
  ChevronRight,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const CataloguePage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    profile
  } = useStore();

  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [priceTier, setPriceTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Extract unique crafts & fabrics
  const craftTechniques = useMemo(() => {
    return Array.from(new Set(products.map(p => p.craftTechnique.split(' ')[0]))).filter(Boolean);
  }, [products]);

  const fabrics = useMemo(() => {
    return Array.from(new Set(products.map(p => p.fabric.split(' ')[0]))).filter(Boolean);
  }, [products]);

  // Active category object
  const currentCategoryObj = categories.find(c => c.slug === selectedCategory);
  const activeSubCategories = currentCategoryObj?.subCategories || [];

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== null && p.category !== selectedCategory) {
        return false;
      }
      // Sub-category filter
      if (selectedSubCategory !== null && p.subCategory !== selectedSubCategory) {
        return false;
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
      // Price Tier filter
      if (priceTier === 'under10k' && p.price >= 10000) return false;
      if (priceTier === '10k-25k' && (p.price < 10000 || p.price > 25000)) return false;
      if (priceTier === 'over25k' && p.price <= 25000) return false;
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchCraft = p.craftTechnique.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchSub = (p.subCategory || '').toLowerCase().includes(q);
        if (!matchTitle && !matchSku && !matchCraft && !matchFabric && !matchSub) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.enquiriesCount || 0) - (a.enquiriesCount || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products,
    selectedCategory,
    selectedSubCategory,
    selectedCraft,
    selectedFabric,
    selectedAvailability,
    priceTier,
    searchQuery,
    sortBy
  ]);

  // Count active filters
  const activeFiltersCount =
    (selectedCraft !== 'all' ? 1 : 0) +
    (selectedFabric !== 'all' ? 1 : 0) +
    (selectedAvailability !== 'all' ? 1 : 0) +
    (priceTier !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (selectedSubCategory !== null ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedCraft('all');
    setSelectedFabric('all');
    setSelectedAvailability('all');
    setPriceTier('all');
    setSearchQuery('');
  };

  return (
    <div className="py-6 sm:py-10 bg-[#FFFDF9] dark:bg-heritage-darkSurface min-h-screen animate-fade-in pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-heritage-charcoal/60 dark:text-gray-400 mb-4 pb-2 border-b border-heritage-gold/20">
          <button
            onClick={() => setCurrentPage('home')}
            className="hover:text-heritage-crimson transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-heritage-charcoal dark:text-gray-200">
            Digital Catalogue
          </span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className="capitalize font-semibold text-heritage-crimson dark:text-heritage-gold">
                {selectedCategory}
              </span>
            </>
          )}
          {selectedSubCategory && (
            <>
              <span>/</span>
              <span className="capitalize font-mono text-gray-500">
                {selectedSubCategory}
              </span>
            </>
          )}
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-gold/15 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Digital Catalogue & Categories</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white">
              {currentCategoryObj ? currentCategoryObj.name : 'All Handcrafted Bandhani'}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-400 max-w-2xl">
              {currentCategoryObj
                ? currentCategoryObj.description
                : 'Browse our complete heirloom collection of master-tied sarees, dupattas, stoles, garments, and fabrics with instant WhatsApp order enquiry.'}
            </p>
          </div>

          <div className="text-xs text-heritage-charcoal/60 dark:text-gray-400 font-mono">
            Showing <strong className="text-heritage-crimson dark:text-heritage-gold">{filteredProducts.length}</strong> of {products.length} Heirloom Pieces
          </div>
        </div>

        {/* Tier 1: Primary Category Tabs Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-3 border-b border-heritage-gold/15">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubCategory(null);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
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
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSelectedSubCategory(null); // Reset subcategory when switching category
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 ${
                  isSel
                    ? 'bg-heritage-crimson text-white shadow-md'
                    : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 border border-heritage-gold/30 hover:border-heritage-gold'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSel ? 'bg-white/20 text-white' : 'bg-heritage-sand dark:bg-heritage-darkSurface text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tier 2: Dynamic Sub-Categories Selector */}
        {activeSubCategories.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-heritage-sand/35 dark:bg-heritage-darkCard/60 border border-heritage-gold/25 mb-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-heritage-crimson dark:text-heritage-gold">
              <Layers className="w-3.5 h-3.5" />
              <span>Explore Sub-Categories in {currentCategoryObj?.name}:</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setSelectedSubCategory(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedSubCategory === null
                    ? 'bg-heritage-gold text-heritage-charcoal font-bold shadow-xs'
                    : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal/80 dark:text-gray-300 border border-heritage-gold/20 hover:bg-white/80'
                }`}
              >
                All {currentCategoryObj?.name}
              </button>

              {activeSubCategories.map(sub => {
                const isSubSel = selectedSubCategory === sub.slug;
                const count = products.filter(p => p.category === selectedCategory && p.subCategory === sub.slug).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategory(sub.slug)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSubSel
                        ? 'bg-heritage-gold text-heritage-charcoal font-bold shadow-xs'
                        : 'bg-white dark:bg-heritage-darkSurface text-heritage-charcoal/80 dark:text-gray-300 border border-heritage-gold/20 hover:bg-white/80'
                    }`}
                  >
                    <span>{sub.name}</span>
                    {count > 0 && (
                      <span className="text-[9px] px-1 py-0.2 rounded-full bg-black/10 text-heritage-charcoal dark:text-white font-mono">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Controls Bar: Search, Filters Drawer Button, Sort */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs mb-6">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, SKU, craft technique, or fabric..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                activeFiltersCount > 0
                  ? 'bg-heritage-crimson text-white border-heritage-crimson shadow-xs'
                  : 'bg-heritage-sand/40 dark:bg-heritage-darkSurface border-heritage-gold/30 text-heritage-charcoal dark:text-gray-200 hover:border-heritage-gold'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-heritage-crimson text-[10px] font-bold flex items-center justify-center font-mono">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="p-2 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200 text-xs cursor-pointer focus:outline-none focus:border-heritage-crimson"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Enquired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Drawer */}
        {showFiltersDrawer && (
          <div className="p-5 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md mb-6 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-heritage-gold/20">
              <h3 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Refine by Craft & Specifications</span>
              </h3>
              <button
                onClick={() => setShowFiltersDrawer(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Craft Filter */}
              <div>
                <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                  Craft Technique:
                </label>
                <select
                  value={selectedCraft}
                  onChange={e => setSelectedCraft(e.target.value)}
                  className="w-full p-2 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200"
                >
                  <option value="all">All Craft Techniques</option>
                  {craftTechniques.map(craft => (
                    <option key={craft} value={craft}>
                      {craft}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fabric Filter */}
              <div>
                <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                  Fabric Base:
                </label>
                <select
                  value={selectedFabric}
                  onChange={e => setSelectedFabric(e.target.value)}
                  className="w-full p-2 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200"
                >
                  <option value="all">All Fabric Bases</option>
                  {fabrics.map(fabric => (
                    <option key={fabric} value={fabric}>
                      {fabric}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Tier Filter */}
              <div>
                <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                  Price Bracket:
                </label>
                <select
                  value={priceTier}
                  onChange={e => setPriceTier(e.target.value)}
                  className="w-full p-2 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200"
                >
                  <option value="all">All Price Ranges</option>
                  <option value="under10k">Under {profile.currencySymbol}10,000</option>
                  <option value="10k-25k">{profile.currencySymbol}10,000 - {profile.currencySymbol}25,000</option>
                  <option value="over25k">Above {profile.currencySymbol}25,000 (Bridal)</option>
                </select>
              </div>

              {/* Stock Availability */}
              <div>
                <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                  Fulfillment Status:
                </label>
                <select
                  value={selectedAvailability}
                  onChange={e => setSelectedAvailability(e.target.value)}
                  className="w-full p-2 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="in_stock">Ready to Ship (24h)</option>
                  <option value="made_to_order">Made to Order</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-heritage-gold/15">
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs text-gray-500 hover:text-heritage-crimson underline font-medium"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => setShowFiltersDrawer(false)}
                className="px-4 py-1.5 rounded-xl bg-heritage-crimson text-white font-semibold text-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in text-xs">
            <span className="text-gray-400 font-medium">Active Filters:</span>

            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson font-medium">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
              </span>
            )}

            {selectedSubCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-heritage-gold/20 text-heritage-charcoal font-medium">
                Sub-Category: {selectedSubCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubCategory(null)} />
              </span>
            )}

            {selectedCraft !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson font-medium">
                Craft: {selectedCraft}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCraft('all')} />
              </span>
            )}

            {selectedFabric !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson font-medium">
                Fabric: {selectedFabric}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFabric('all')} />
              </span>
            )}

            {priceTier !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson font-medium">
                Price Filter Active
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceTier('all')} />
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-heritage-crimson/10 text-heritage-crimson font-medium">
                "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-heritage-crimson underline font-medium ml-1"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Products Grid: 2-Column Mobile, 4-Column Desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 p-8 max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-heritage-sand/60 text-heritage-crimson flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white">
              No Bandhani creations found
            </h3>
            <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400">
              We couldn't find any pieces matching your active filters. Try adjusting your search query or reset filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2 rounded-full bg-heritage-crimson text-white text-xs font-semibold shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
