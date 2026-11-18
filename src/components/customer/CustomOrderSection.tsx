import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  MessageCircle,
  Clock,
  Palette,
  Layers,
  Scissors,
  Check,
  Send,
  ShieldCheck
} from 'lucide-react';
import { openWhatsAppDirect } from '../../utils/whatsapp';
import confetti from 'canvas-confetti';

export const CustomOrderSection: React.FC = () => {
  const { siteContent, profile } = useStore();

  const customOrder = siteContent?.customOrder;
  const toggles = siteContent?.toggles;

  // Check section visibility toggle
  if (toggles && toggles.showCustomOrders === false) {
    return null;
  }

  const badge = customOrder?.badge || 'Bespoke Atelier Service';
  const heading = customOrder?.heading || 'Custom Bandhani Commission';
  const subtitle = customOrder?.subtitle || 'Tailored Exclusively to Your Color, Fabric & Knot Density';
  const description =
    customOrder?.description ||
    'Have a specific wedding theme, family heirloom motif, or bespoke drape in mind? Our master Khatri artisans tie and dye customized pieces to your exact vision.';
  const image =
    customOrder?.image ||
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85';
  const leadTime = customOrder?.leadTime || '4 to 6 weeks handcrafting lead-time';
  const whatsappCtaText = customOrder?.whatsappCtaText || 'Discuss Custom Commission on WhatsApp';

  // Product categories for bespoke creation
  const PRODUCT_TYPES = customOrder?.productTypes && customOrder.productTypes.length > 0
    ? customOrder.productTypes
    : [
        'Bridal Gharchola Saree',
        'Heirloom Shikargah Dupatta',
        'Bespoke Kurta & Stole',
        'Unstitched Silk Fabric (5m)'
      ];

  const FABRIC_OPTIONS = customOrder?.fabrics && customOrder.fabrics.length > 0
    ? customOrder.fabrics
    : ['Pure Gajji Silk', 'Modal Silk', 'Pure Georgette', 'Chanderi Silk', 'Mulberry Katan'];

  const PATTERN_OPTIONS = customOrder?.patterns && customOrder.patterns.length > 0
    ? customOrder.patterns
    : ['Micro Rai Bandhej (~25,000 knots)', 'Traditional Shikargah', 'Royal Bavan Baug', 'Chaukadi (4-Dot Grid)'];

  const COLOR_OPTIONS = customOrder?.colors && customOrder.colors.length > 0
    ? customOrder.colors
    : [
        { name: 'Sindoor Crimson', hex: '#9B111E' },
        { name: 'Kutch Indigo', hex: '#1F2942' },
        { name: 'Haldi Ochre', hex: '#D4AF37' },
        { name: 'Gulabi Rani Pink', hex: '#D12D69' },
        { name: 'Forest Emerald', hex: '#1A5336' },
        { name: 'Custom Dye / Ombre', hex: '#C85A32' }
      ];

  const [selectedProductType, setSelectedProductType] = useState(PRODUCT_TYPES[0] || '');
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_OPTIONS[0] || '');
  const [selectedPattern, setSelectedPattern] = useState(PATTERN_OPTIONS[0] || '');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0] || { name: 'Sindoor Crimson', hex: '#9B111E' });
  const [customNotes, setCustomNotes] = useState('');

  // Keep selection valid if admin edits or removes options in CMS
  React.useEffect(() => {
    if (!PRODUCT_TYPES.includes(selectedProductType) && PRODUCT_TYPES.length > 0) {
      setSelectedProductType(PRODUCT_TYPES[0]);
    }
  }, [PRODUCT_TYPES, selectedProductType]);

  React.useEffect(() => {
    if (!FABRIC_OPTIONS.includes(selectedFabric) && FABRIC_OPTIONS.length > 0) {
      setSelectedFabric(FABRIC_OPTIONS[0]);
    }
  }, [FABRIC_OPTIONS, selectedFabric]);

  React.useEffect(() => {
    if (!PATTERN_OPTIONS.includes(selectedPattern) && PATTERN_OPTIONS.length > 0) {
      setSelectedPattern(PATTERN_OPTIONS[0]);
    }
  }, [PATTERN_OPTIONS, selectedPattern]);

  React.useEffect(() => {
    if (!COLOR_OPTIONS.some(c => c.name === selectedColor?.name) && COLOR_OPTIONS.length > 0) {
      setSelectedColor(COLOR_OPTIONS[0]);
    }
  }, [COLOR_OPTIONS, selectedColor]);

  const handleWhatsAppEnquiry = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#25D366', '#D4AF37', '#9B111E']
    });

    const brandName = profile.businessName || 'Bandhanu';
    const message = `Hello ${brandName} Bespoke Concierge! 👋

I would like to commission a custom handcrafted Bandhani piece with the following specifications:

✦ Product Type: ${selectedProductType}
✦ Fabric: ${selectedFabric}
✦ Desired Shade: ${selectedColor.name}
✦ Resisted Knot Pattern: ${selectedPattern}
✦ Additional Notes / Occasion: ${customNotes.trim() || 'Please share bespoke lead times and colour swatches.'}

Please connect me with a master artisan consultant. Thank you!`;

    openWhatsAppDirect(profile.whatsappNumber, message);
  };

  return (
    <section id="custom-order-section" className="py-12 sm:py-20 bg-[#F5EFE6]/60 dark:bg-heritage-darkCard/30 border-y border-heritage-gold/25 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-heritage-gold/15 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-wider mb-3 border border-heritage-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#241E1C] dark:text-white">
            {heading}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#6E6259] dark:text-gray-300 font-medium">
            {subtitle}
          </p>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 2-Column Responsive Customization Atelier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* Left Column: Interactive Bespoke Controls */}
          <div className="lg:col-span-7 bg-white dark:bg-heritage-darkSurface p-5 sm:p-8 rounded-3xl border border-heritage-gold/30 shadow-md space-y-6">
            
            {/* Step 1: Product Silhouette */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#241E1C] dark:text-gray-200 mb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                <span>1. Select Silhouette / Garment Type</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRODUCT_TYPES.map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedProductType(item)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedProductType === item
                        ? 'border-heritage-crimson bg-heritage-crimson text-white shadow-xs'
                        : 'border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-[#241E1C] dark:text-gray-200 hover:border-heritage-gold'
                    }`}
                  >
                    <span className="truncate">{item}</span>
                    {selectedProductType === item && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pure Silk Fabric */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#241E1C] dark:text-gray-200 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                <span>2. Select Heirloom Fabric Base</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {FABRIC_OPTIONS.map(fabric => (
                  <button
                    key={fabric}
                    type="button"
                    onClick={() => setSelectedFabric(fabric)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                      selectedFabric === fabric
                        ? 'bg-[#4A121A] text-white border-[#4A121A] shadow-xs'
                        : 'bg-heritage-sand/20 dark:bg-heritage-darkCard border-heritage-gold/30 text-[#241E1C] dark:text-gray-200 hover:border-heritage-gold'
                    }`}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Color Palette */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#241E1C] dark:text-gray-200 mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                <span>3. Choose Your Color Palette</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COLOR_OPTIONS.map(c => {
                  const isSelected = selectedColor?.name === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`p-2 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-heritage-crimson ring-2 ring-heritage-crimson/20 bg-heritage-crimson/5 font-semibold text-heritage-crimson dark:text-heritage-gold'
                          : 'border-heritage-gold/30 hover:border-heritage-gold bg-heritage-sand/15 dark:bg-heritage-darkCard text-[#241E1C] dark:text-gray-200'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[11px] truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Resisted Knotting Technique */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#241E1C] dark:text-gray-200 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                <span>4. Knot Pattern Complexity</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PATTERN_OPTIONS.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedPattern(p)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedPattern === p
                        ? 'border-heritage-crimson bg-heritage-crimson text-white font-medium shadow-xs'
                        : 'border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-[#241E1C] dark:text-gray-200 hover:border-heritage-gold'
                    }`}
                  >
                    <span className="truncate">{p}</span>
                    {selectedPattern === p && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Custom Notes & Occasion */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#241E1C] dark:text-gray-200 mb-1.5">
                5. Bespoke Notes (Occasion, Date, or Measurements)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Wedding trousseau for December 2026, dual-pallu drape, with zari border..."
                value={customNotes}
                onChange={e => setCustomNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-xs text-[#241E1C] dark:text-white focus:outline-none focus:border-heritage-crimson resize-none"
              />
            </div>
          </div>

          {/* Right Column: Visual Preview & Live Commission Summary */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl overflow-hidden border border-heritage-gold/30 shadow-lg bg-white dark:bg-heritage-darkSurface flex flex-col">
              
              {/* Visual Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt="Custom Bandhani Crafting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-heritage-gold block">
                    Kutch Master Atelier
                  </span>
                  <span className="font-serif font-bold text-base sm:text-lg">
                    Hand-Tied Knot by Knot
                  </span>
                </div>
              </div>

              {/* Commission Summary */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="pb-3 border-b border-heritage-gold/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Your Bespoke Blueprint
                  </span>
                  <h4 className="font-serif font-bold text-lg text-heritage-crimson dark:text-heritage-gold mt-0.5">
                    {selectedProductType}
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#6E6259] dark:text-gray-300">
                    <span>Fabric:</span>
                    <strong className="text-[#241E1C] dark:text-white">{selectedFabric}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#6E6259] dark:text-gray-300">
                    <span>Selected Dye:</span>
                    <strong className="text-[#241E1C] dark:text-white flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor?.hex || '#9B111E' }} />
                      <span>{selectedColor?.name || 'Selected Shade'}</span>
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-[#6E6259] dark:text-gray-300">
                    <span>Knot Technique:</span>
                    <strong className="text-[#241E1C] dark:text-white text-right truncate max-w-[180px]">{selectedPattern}</strong>
                  </div>
                </div>

                {/* Lead time card */}
                <div className="p-3 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkCard/60 border border-heritage-gold/30 flex items-center gap-2.5 text-xs text-[#241E1C] dark:text-gray-300">
                  <Clock className="w-4 h-4 text-heritage-crimson dark:text-heritage-gold shrink-0" />
                  <span className="font-medium text-[11px] sm:text-xs">{leadTime}</span>
                </div>

                {/* Submit to WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span className="truncate">{whatsappCtaText}</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct consultation with Khatri master dyer via WhatsApp</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
