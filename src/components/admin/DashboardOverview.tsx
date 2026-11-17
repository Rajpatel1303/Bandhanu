import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  MessageCircle,
  Package,
  Layers,
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { products, categories, enquiryLogs, profile, setAdminTab, navigateToProduct } = useStore();
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);

  // Key Analytics Calculations (100% Real Dynamic Data)
  const totalCatalogueValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  const totalEnquiries = enquiryLogs.length;
  const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
  const conversionRate = totalViews > 0 ? ((totalEnquiries / totalViews) * 100).toFixed(1) : '0.0';
  const avgProductPrice = products.length > 0 ? Math.round(totalCatalogueValue / products.length) : 0;

  // Stock status breakdown
  const inStockCount = products.filter(p => p.availability === 'in_stock').length;
  const madeToOrderCount = products.filter(p => p.availability === 'made_to_order').length;
  const soldOutCount = products.filter(p => p.availability === 'sold_out').length;

  // Category distribution analysis
  const categoryStats = categories.map(cat => {
    const catProducts = products.filter(p => p.category === cat.slug);
    const count = catProducts.length;
    const value = catProducts.reduce((sum, p) => sum + (p.price || 0), 0);
    const enquiries = catProducts.reduce((sum, p) => sum + (p.enquiriesCount || 0), 0);
    return {
      name: cat.name,
      slug: cat.slug,
      count,
      value,
      enquiries,
      percentage: products.length > 0 ? Math.round((count / products.length) * 100) : 0
    };
  });

  // Price brackets analysis
  const priceBrackets = [
    { label: `Under ${profile.currencySymbol}10k`, count: products.filter(p => p.price < 10000).length, tag: 'Accessible Silk' },
    { label: `${profile.currencySymbol}10k - 25k`, count: products.filter(p => p.price >= 10000 && p.price <= 25000).length, tag: 'Signature Weaves' },
    { label: `Above ${profile.currencySymbol}25k`, count: products.filter(p => p.price > 25000).length, tag: 'Bridal Couture' }
  ];

  // Real Dynamic Timeline Data for Last 14 Days
  const timelineData = useMemo(() => {
    const days: { day: string; dateKey: string; enquiries: number }[] = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      days.push({ day: dayLabel, dateKey, enquiries: 0 });
    }

    enquiryLogs.forEach(log => {
      if (!log.timestamp) return;
      const logDate = log.timestamp.split('T')[0].split(' ')[0];
      const found = days.find(d => d.dateKey === logDate);
      if (found) {
        found.enquiries += 1;
      }
    });

    return days;
  }, [enquiryLogs]);

  const totalTimelineEnquiries = timelineData.reduce((sum, d) => sum + d.enquiries, 0);
  const maxEnquiry = Math.max(...timelineData.map(d => d.enquiries), 1);

  // Top products by enquiries
  const topProducts = [...products]
    .sort((a, b) => (b.enquiriesCount || 0) - (a.enquiriesCount || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-heritage-darkSurface to-heritage-darkCard p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-heritage-gold/30 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-heritage-gold text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Catalogue Intelligence & WhatsApp Commerce</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Performance Overview & Order Velocity
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-300 mt-1">
            Real-time analytics for {profile.businessName} • Connected to +{profile.whatsappNumber}
          </p>
        </div>

        <button
          onClick={() => setAdminTab('products')}
          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-heritage-crimson hover:bg-heritage-ruby text-white text-xs font-semibold shadow-md transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <Package className="w-4 h-4" />
          <span>Manage Catalogue ({products.length})</span>
        </button>
      </div>

      {/* KPI Stats Grid - 2x2 on Mobile, 4 columns on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1 */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-heritage-charcoal/60 dark:text-gray-400">
            <span className="font-semibold uppercase tracking-wider truncate">Catalogue Value</span>
            <span className="p-1 sm:p-1.5 rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-serif font-bold text-heritage-charcoal dark:text-white truncate">
            {profile.currencySymbol}{totalCatalogueValue.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] sm:text-[11px] text-emerald-600 font-medium flex items-center gap-1 truncate">
            <TrendingUp className="w-3 h-3 shrink-0" />
            <span className="truncate">Avg {profile.currencySymbol}{avgProductPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-heritage-charcoal/60 dark:text-gray-400">
            <span className="font-semibold uppercase tracking-wider truncate">WhatsApp Orders</span>
            <span className="p-1 sm:p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-serif font-bold text-emerald-600 truncate">
            {totalEnquiries} Orders
          </div>
          <div className="text-[10px] sm:text-[11px] text-emerald-600 font-medium flex items-center gap-1 truncate">
            <TrendingUp className="w-3 h-3 shrink-0" />
            <span className="truncate">{totalEnquiries > 0 ? `${totalEnquiries} recorded` : 'No inquiries yet'}</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-heritage-charcoal/60 dark:text-gray-400">
            <span className="font-semibold uppercase tracking-wider truncate">Active Styles</span>
            <span className="p-1 sm:p-1.5 rounded-lg bg-rose-500/10 text-heritage-crimson shrink-0">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-serif font-bold text-heritage-charcoal dark:text-white truncate">
            {products.length} Styles
          </div>
          <div className="text-[10px] sm:text-[11px] text-heritage-charcoal/60 dark:text-gray-400 truncate">
            {categories.length} categories
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-heritage-charcoal/60 dark:text-gray-400">
            <span className="font-semibold uppercase tracking-wider truncate">Conversion</span>
            <span className="p-1 sm:p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 shrink-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-serif font-bold text-heritage-crimson dark:text-heritage-gold truncate">
            {conversionRate}%
          </div>
          <div className="text-[10px] sm:text-[11px] text-heritage-charcoal/60 dark:text-gray-400 truncate">
            Views to Orders
          </div>
        </div>
      </div>

      {/* Chart 1: Real Dynamic SVG Daily Enquiry Velocity Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white">
              WhatsApp Order Enquiry Velocity (Last 14 Days)
            </h3>
            <p className="text-xs text-heritage-charcoal/60 dark:text-gray-400">
              Real-time customer inquiries generated across all Bandhani styles
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>WhatsApp Inquiries</span>
            </span>
          </div>
        </div>

        {totalTimelineEnquiries === 0 ? (
          <div className="py-14 text-center space-y-3 bg-heritage-sand/15 dark:bg-heritage-darkSurface/40 rounded-2xl border border-heritage-gold/20">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                No Inquiries Recorded Yet
              </h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                When customers click "Enquire on WhatsApp" on any product, live customer inquiry velocity will graph here automatically.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative pt-4 pb-2">
            <svg viewBox="0 0 700 220" className="w-full h-56 overflow-visible">
              <defs>
                <linearGradient id="enquiryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 50, 100, 150].map((y, idx) => (
                <line
                  key={idx}
                  x1="40"
                  y1={y + 30}
                  x2="680"
                  y2={y + 30}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-800"
                  strokeDasharray="4,4"
                />
              ))}

              {/* Compute SVG Path Points from Real Timeline Data */}
              {(() => {
                const startX = 50;
                const width = 620;
                const step = width / (timelineData.length - 1 || 1);
                const height = 150;
                const baseY = 180;

                const points = timelineData.map((d, i) => {
                  const x = startX + i * step;
                  const y = baseY - (d.enquiries / (maxEnquiry || 1)) * height;
                  return { x, y, data: d };
                });

                const dStr = points.reduce(
                  (acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`,
                  ''
                );
                const areaStr = `${dStr} L ${startX + (timelineData.length - 1) * step} ${baseY} L ${startX} ${baseY} Z`;

                return (
                  <>
                    <path d={areaStr} fill="url(#enquiryGradient)" />
                    <path d={dStr} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />

                    {points.map((p, idx) => (
                      <g key={idx} className="cursor-pointer">
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={hoveredDataPoint === idx ? 6 : 4}
                          fill="#10B981"
                          stroke="#fff"
                          strokeWidth="2"
                          className="transition-all"
                          onMouseEnter={() => setHoveredDataPoint(idx)}
                          onMouseLeave={() => setHoveredDataPoint(null)}
                        />
                        {/* X-axis labels */}
                        {idx % 2 === 0 && (
                          <text
                            x={p.x}
                            y="205"
                            textAnchor="middle"
                            fontSize="10"
                            className="fill-gray-400 font-mono"
                          >
                            {p.data.day}
                          </text>
                        )}
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>

            {/* Hover Tooltip display */}
            {hoveredDataPoint !== null && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-heritage-darkSurface text-white text-xs border border-emerald-500/40 shadow-xl flex items-center gap-3">
                <span className="font-semibold text-heritage-gold">{timelineData[hoveredDataPoint].day}:</span>
                <span className="text-emerald-400 font-bold">{timelineData[hoveredDataPoint].enquiries} WhatsApp Orders</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid: Category Breakdown & Price Brackets & Inventory Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Category Distribution Analysis */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
              Category Distribution
            </h3>
            <span className="text-xs text-heritage-charcoal/60 dark:text-gray-400 font-mono">
              {categories.length} categories
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {categories.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-xs">
                <Layers className="w-6 h-6 mx-auto mb-1.5 opacity-40" />
                <span>No categories created yet</span>
              </div>
            ) : (
              categoryStats.map((c) => (
                <div key={c.slug} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-heritage-charcoal dark:text-gray-200">
                      {c.name}
                    </span>
                    <span className="font-mono text-heritage-charcoal/70 dark:text-gray-400">
                      {c.count} pcs ({c.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-heritage-sand dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full bg-heritage-crimson rounded-full"
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Price Bracket Analysis */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
              Price Brackets
            </h3>
            <span className="text-xs text-heritage-gold font-mono">Spectrum</span>
          </div>

          <div className="space-y-3 pt-2">
            {priceBrackets.map((tier) => (
              <div
                key={tier.label}
                className="p-3 rounded-2xl bg-heritage-sand/25 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-xs text-heritage-charcoal dark:text-white">
                    {tier.label}
                  </div>
                  <div className="text-[10px] text-gray-500">{tier.tag}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-heritage-crimson dark:text-heritage-gold">
                    {tier.count} Styles
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {products.length > 0 ? Math.round((tier.count / products.length) * 100) : 0}% of inventory
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Stock Health & Fulfillment Readiness */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
              Inventory Readiness
            </h3>
            <span className="text-xs text-emerald-600 font-semibold">Fulfillment</span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Ready to Dispatch (24h)
                </span>
                <span className="font-bold">{inStockCount} Styles</span>
              </div>
              <div className="w-full h-2 rounded-full bg-heritage-sand dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(inStockCount / (products.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 font-medium text-amber-700 dark:text-amber-400">
                  <Clock className="w-3.5 h-3.5" />
                  Made to Order (Hand-knotting)
                </span>
                <span className="font-bold">{madeToOrderCount} Styles</span>
              </div>
              <div className="w-full h-2 rounded-full bg-heritage-sand dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(madeToOrderCount / (products.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            {soldOutCount > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Sold Out / Archived</span>
                  <span className="font-bold">{soldOutCount} Styles</span>
                </div>
                <div className="w-full h-2 rounded-full bg-heritage-sand dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-gray-400 rounded-full"
                    style={{ width: `${(soldOutCount / (products.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leaderboard: Most Enquired Bandhani Products */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-heritage-charcoal dark:text-white">
              Most Enquired Heirloom Pieces Leaderboard
            </h3>
            <p className="text-[11px] sm:text-xs text-heritage-charcoal/60 dark:text-gray-400">
              Pieces driving direct WhatsApp buyer conversations
            </p>
          </div>
          <button
            onClick={() => setAdminTab('products')}
            className="text-xs font-semibold text-heritage-crimson dark:text-heritage-gold hover:underline self-start sm:self-auto"
          >
            View All Products &rarr;
          </button>
        </div>

        {topProducts.length === 0 ? (
          <div className="py-12 text-center text-gray-400 space-y-2 bg-heritage-sand/15 dark:bg-heritage-darkSurface/30 rounded-2xl border border-heritage-gold/20">
            <Package className="w-8 h-8 mx-auto opacity-40 text-gray-400" />
            <p className="font-semibold text-xs text-heritage-charcoal dark:text-gray-300">No products added yet</p>
            <p className="text-[11px] text-gray-400">Products will appear here with enquiry analytics as you add them to your catalogue.</p>
          </div>
        ) : (
          <>
            {/* Mobile Leaderboard Cards (md:hidden) */}
            <div className="md:hidden space-y-2.5">
              {topProducts.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-3 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface/60 border border-heritage-gold/20 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-heritage-crimson/10 text-heritage-crimson font-serif font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {p.images[0] && (
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-11 h-14 rounded-lg object-cover border border-heritage-gold/20 shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-heritage-charcoal dark:text-white truncate">
                        {p.title}
                      </div>
                      <div className="text-[10px] text-heritage-crimson dark:text-heritage-gold font-medium truncate">
                        {p.craftTechnique}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-serif font-bold text-xs text-heritage-charcoal dark:text-gray-200">
                          {profile.currencySymbol}{p.price.toLocaleString('en-IN')}
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[9px]">
                          <MessageCircle className="w-2.5 h-2.5 fill-current" />
                          {p.enquiriesCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToProduct(p.id)}
                    className="px-2.5 py-1 rounded-lg border border-heritage-gold/30 hover:bg-heritage-sand/50 text-[10px] font-semibold shrink-0"
                  >
                    Inspect
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop Leaderboard Table (hidden md:block) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-heritage-gold/20 text-heritage-charcoal/60 dark:text-gray-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-3">SKU</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">WhatsApp Clicks</th>
                    <th className="py-3 px-3">Stock Status</th>
                    <th className="py-3 px-3 text-right">Quick Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-heritage-gold/15">
                  {topProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-heritage-sand/30 dark:hover:bg-heritage-darkSurface/50 transition-colors">
                      <td className="py-3 px-3 flex items-center gap-3">
                        {p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-10 h-12 rounded-lg object-cover border border-heritage-gold/20 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[9px] text-gray-400 shrink-0">
                            No photo
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-heritage-charcoal dark:text-white line-clamp-1">
                            {p.title}
                          </div>
                          <div className="text-[10px] text-heritage-crimson dark:text-heritage-gold font-medium">
                            {p.craftTechnique}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-gray-500">{p.sku}</td>
                      <td className="py-3 px-3 font-bold text-heritage-crimson dark:text-heritage-gold">
                        {profile.currencySymbol}{p.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                          <MessageCircle className="w-3 h-3 fill-current" />
                          {p.enquiriesCount || 0} enquiries
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            p.availability === 'in_stock'
                              ? 'bg-emerald-500/15 text-emerald-700'
                              : 'bg-amber-500/15 text-amber-700'
                          }`}
                        >
                          {p.availability === 'in_stock' ? 'Ready to Ship' : 'Made to Order'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => navigateToProduct(p.id)}
                          className="px-2.5 py-1 rounded-lg border border-heritage-gold/30 hover:bg-heritage-sand/50 text-[11px] font-medium"
                        >
                          View Live
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
