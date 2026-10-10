import React, { useState, useEffect } from 'react';
import { Product, ProductColor, AvailabilityStatus } from '../../types';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Check,
  RefreshCw
} from 'lucide-react';

interface ProductModalProps {
  productToEdit?: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_COLORS = [
  { name: 'Sindoor Crimson', hex: '#9B111E' },
  { name: 'Kutch Rust', hex: '#C85A32' },
  { name: 'Haldi Yellow', hex: '#F4A228' },
  { name: 'Royal Gold', hex: '#D4AF37' },
  { name: 'Peacock Indigo', hex: '#1F2942' },
  { name: 'Forest Emerald', hex: '#1A5336' },
  { name: 'Gulabi Rani Pink', hex: '#D12D69' },
  { name: 'Sacred White', hex: '#FFFDF9' }
];

export const ProductModal: React.FC<ProductModalProps> = ({
  productToEdit,
  isOpen,
  onClose
}) => {
  const { categories, addProduct, updateProduct } = useStore();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('sarees');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState<number>(18500);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(22000);
  const [fabric, setFabric] = useState('Pure Gajji Silk');
  const [craftTechnique, setCraftTechnique] = useState('Rai Bandhej (Micro-Dot)');
  const [knotCount, setKnotCount] = useState('~20,000 hand-tied knots');
  const [availability, setAvailability] = useState<AvailabilityStatus>('in_stock');
  const [leadTime, setLeadTime] = useState('Ready to Dispatch within 24 Hours');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewDrop, setIsNewDrop] = useState(true);
  const [description, setDescription] = useState('');
  const [washCare, setWashCare] = useState('Strictly dry clean only. Store in unbleached muslin wrap.');
  const [dimensions, setDimensions] = useState('Standard Traditional Dimensions');

  // Photo management state
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Color swatches state
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [newColorName, setNewColorName] = useState('Sindoor Crimson');
  const [newColorHex, setNewColorHex] = useState('#9B111E');

  // Features list state
  const [features, setFeatures] = useState<string[]>([
    'Authentic Jamnagar Rai Bandhej technique',
    'Pure 100% Silk Mark certified',
    'Hand-finished borders & silk latkan'
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Populate fields when editing
  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setSubtitle(productToEdit.subtitle);
      setSku(productToEdit.sku);
      setCategory(productToEdit.category);
      setSubCategory(productToEdit.subCategory || '');
      setPrice(productToEdit.price);
      setOriginalPrice(productToEdit.originalPrice);
      setFabric(productToEdit.fabric);
      setCraftTechnique(productToEdit.craftTechnique);
      setKnotCount(productToEdit.knotCount || '');
      setAvailability(productToEdit.availability);
      setLeadTime(productToEdit.leadTime || '');
      setIsFeatured(productToEdit.isFeatured);
      setIsNewDrop(productToEdit.isNewDrop || false);
      setDescription(productToEdit.description);
      setWashCare(productToEdit.washCare);
      setDimensions(productToEdit.dimensions || '');
      setImages(productToEdit.images || []);
      setColors(productToEdit.colors || []);
      setFeatures(productToEdit.features || []);
    } else {
      // Defaults for new product
      setTitle('');
      setSubtitle('');
      setSku(`BD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
      setCategory(categories[0]?.slug || 'saree');
      setSubCategory('');
      setPrice(16500);
      setOriginalPrice(19500);
      setFabric('Pure Gajji Silk');
      setCraftTechnique('Fine Rai Bandhej');
      setKnotCount('~18,000 hand-tied micro knots');
      setAvailability('in_stock');
      setLeadTime('Ready to Dispatch within 24 Hours');
      setIsFeatured(false);
      setIsNewDrop(true);
      setDescription('Handcrafted in Jamnagar by master artisans with authentic natural resist dyeing.');
      setWashCare('Strictly dry clean only.');
      setDimensions('Length: 5.5m + 0.8m blouse piece. Width: 44 inches.');
      setImages(['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85']);
      setColors([{ name: 'Sindoor Crimson', hex: '#9B111E', inStock: true }]);
      setFeatures([
        'Authentic hand-knotted Rai Bandhani',
        'Pure Mulberry Silk Mark verified',
        'Unstitched matching blouse fabric included'
      ]);
    }
  }, [productToEdit, isOpen, categories]);

  if (!isOpen) return null;

  // Image Handlers
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages(prev => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImages(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetCoverImage = (index: number) => {
    if (index === 0) return;
    setImages(prev => {
      const newImages = [...prev];
      const target = newImages.splice(index, 1)[0];
      newImages.unshift(target);
      return newImages;
    });
  };

  // Color Handlers
  const handleAddColor = () => {
    if (newColorName.trim()) {
      setColors(prev => [
        ...prev,
        { name: newColorName.trim(), hex: newColorHex, inStock: true }
      ]);
    }
  };

  const handleRemoveColor = (index: number) => {
    setColors(prev => prev.filter((_, i) => i !== index));
  };

  // Feature Handlers
  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures(prev => [...prev, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title,
      subtitle,
      sku,
      category,
      subCategory: subCategory.trim() || undefined,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      fabric,
      craftTechnique,
      knotCount,
      availability,
      leadTime,
      isFeatured,
      isNewDrop,
      description,
      washCare,
      dimensions,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c'],
      colors: colors.length > 0 ? colors : [{ name: 'Default', hex: '#9B111E' }],
      features
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, productData);
    } else {
      addProduct(productData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-heritage-darkSurface rounded-2xl sm:rounded-3xl border border-heritage-gold/40 shadow-2xl overflow-hidden my-2 sm:my-8 max-h-[96vh] sm:max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-6 bg-heritage-darkSurface text-white border-b border-heritage-gold/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-heritage-crimson border border-heritage-gold flex items-center justify-center text-heritage-gold font-bold text-xs sm:text-sm">
              BD
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-heritage-gold">
                {productToEdit ? 'Edit Handcrafted Piece' : 'Add New Bandhani Creation'}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400">
                Synchronizes instantly with the Customer Showcase & WhatsApp catalogue
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-xs flex-1">
          {/* Section 1: Basic Identifiers */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold pb-1 border-b border-heritage-gold/20 flex items-center gap-1.5">
              <span>1. Product Identity & Category</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Shikargah Gharchola Gajji Silk Saree"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  SKU Code *
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard font-mono font-bold text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSku(`BD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`)
                    }
                    className="p-2 rounded-xl border border-heritage-gold/40 hover:bg-heritage-sand"
                    title="Generate SKU"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={e => {
                    setCategory(e.target.value);
                    setSubCategory('');
                  }}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson cursor-pointer text-xs"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Sub-Category
                </label>
                {(() => {
                  const currentCategoryObj = categories.find(c => c.slug === category);
                  const availableSubs = currentCategoryObj?.subCategories || [];
                  return (
                    <select
                      value={subCategory}
                      onChange={e => setSubCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson cursor-pointer text-xs"
                    >
                      <option value="">-- General / None --</option>
                      {availableSubs.map(s => (
                        <option key={s.id} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  );
                })()}
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Subtitle / Highlight
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pure Gajji Silk with Real Zari Grid"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Photos Management */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold pb-1 border-b border-heritage-gold/20 flex items-center justify-between">
              <span>2. Product Photography & Media</span>
              <span className="text-[10px] text-gray-500 font-normal">
                {images.length} Photos Added
              </span>
            </h4>

            {/* Add Photo Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8 flex gap-2">
                <input
                  type="url"
                  placeholder="Paste Image URL (https://...)"
                  value={imageUrlInput}
                  onChange={e => setImageUrlInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 rounded-xl bg-heritage-crimson text-white font-semibold hover:bg-heritage-ruby"
                >
                  Add URL
                </button>
              </div>

              <div className="sm:col-span-4">
                <label className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-heritage-gold/50 hover:border-heritage-crimson bg-heritage-sand/30 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs">
                  <Upload className="w-3.5 h-3.5 text-heritage-crimson" />
                  <span>Upload Local Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Photos Preview Strip */}
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border-2 border-heritage-gold/30 aspect-[3/4] bg-gray-100 dark:bg-gray-800 shadow-sm"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />

                    {/* Primary Badge */}
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-heritage-gold text-black text-[9px] font-bold z-10">
                        Cover
                      </span>
                    )}

                    {/* Touch Friendly Quick Delete (Mobile) */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white z-10 sm:hidden shadow-xs"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Touch Friendly Make Cover (Mobile) */}
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetCoverImage(idx)}
                        className="absolute bottom-1 left-1 right-1 text-center py-0.5 rounded bg-black/80 text-white text-[8px] font-bold sm:hidden z-10"
                      >
                        Make Cover
                      </button>
                    )}

                    {/* Overlay Action Controls (Desktop Hover) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex flex-col items-center justify-center gap-1.5 p-1">
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleSetCoverImage(idx)}
                          className="px-2 py-0.5 rounded bg-white text-black text-[9px] font-bold"
                        >
                          Make Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 rounded-full bg-red-600 text-white"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No photos added yet. Add an image URL or upload above.</p>
            )}
          </div>

          {/* Section 3: Pricing & Stock Availability */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold pb-1 border-b border-heritage-gold/20">
              3. Pricing & Fulfillment
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard font-bold text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Optional original price"
                  value={originalPrice || ''}
                  onChange={e => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Stock Status *
                </label>
                <select
                  value={availability}
                  onChange={e => setAvailability(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson cursor-pointer"
                >
                  <option value="in_stock">Ready to Ship (In Stock)</option>
                  <option value="made_to_order">Made to Order (Hand-knotting)</option>
                  <option value="sold_out">Sold Out / Archived</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Lead Time / Dispatch
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dispatches in 24h"
                  value={leadTime}
                  onChange={e => setLeadTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="rounded border-gray-300 text-heritage-crimson focus:ring-heritage-crimson"
                />
                <span className="font-semibold text-heritage-charcoal dark:text-gray-200">
                  Highlight as Featured Piece on Homepage
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewDrop}
                  onChange={e => setIsNewDrop(e.target.checked)}
                  className="rounded border-gray-300 text-heritage-crimson focus:ring-heritage-crimson"
                />
                <span className="font-semibold text-heritage-charcoal dark:text-gray-200">
                  Mark as New Festive Drop
                </span>
              </label>
            </div>
          </div>

          {/* Section 4: Artisan Craft & Colorways */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold pb-1 border-b border-heritage-gold/20">
              4. Fabric, Craft & Colorways
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Fabric Base
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pure Gajji Silk"
                  value={fabric}
                  onChange={e => setFabric(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Craft Technique
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rai Bandhej (Micro-Dot)"
                  value={craftTechnique}
                  onChange={e => setCraftTechnique(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Handcrafted Knot Count
                </label>
                <input
                  type="text"
                  placeholder="e.g. ~22,000 knots"
                  value={knotCount}
                  onChange={e => setKnotCount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs"
                />
              </div>
            </div>

            {/* Color Swatch Builder */}
            <div className="p-4 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkCard/60 border border-heritage-gold/20 space-y-3">
              <label className="block font-semibold text-heritage-charcoal dark:text-gray-200">
                Artisan Colorways (Pre-fills in customer WhatsApp message):
              </label>

              {/* Existing Colors list */}
              <div className="flex flex-wrap gap-2">
                {colors.map((c, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-heritage-darkSurface border border-heritage-gold/30 shadow-xs"
                  >
                    <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: c.hex }} />
                    <span className="font-medium text-heritage-charcoal dark:text-white">{c.name}</span>
                    <X
                      className="w-3 h-3 text-gray-400 hover:text-red-600 cursor-pointer ml-1"
                      onClick={() => handleRemoveColor(idx)}
                    />
                  </span>
                ))}
              </div>

              {/* Add Color control */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={e => setNewColorHex(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Color Name (e.g. Sindoor Red)"
                  value={newColorName}
                  onChange={e => setNewColorName(e.target.value)}
                  className="p-2 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkSurface text-xs flex-1 min-w-[140px]"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="px-3 py-2 rounded-xl bg-heritage-crimson text-white font-semibold text-xs"
                >
                  + Add Color
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar whitespace-nowrap">
                <span className="text-[10px] text-gray-500 shrink-0">Presets:</span>
                {PRESET_COLORS.map((pc, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      setNewColorHex(pc.hex);
                      setNewColorName(pc.name);
                    }}
                    className="px-2 py-0.5 rounded text-[10px] border border-heritage-gold/30 flex items-center gap-1 hover:bg-heritage-sand"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pc.hex }} />
                    <span>{pc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Story & Care Details */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold pb-1 border-b border-heritage-gold/20">
              5. Narrative & Care Details
            </h4>

            <div>
              <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                Craft Story & Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson text-xs resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Wash & Heirloom Care
                </label>
                <input
                  type="text"
                  value={washCare}
                  onChange={e => setWashCare(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Dimensions / Sizing
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={e => setDimensions(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-heritage-gold/30 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-heritage-gold/40 text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand/40 font-semibold text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-heritage-crimson via-heritage-ruby to-heritage-terracotta text-white font-bold shadow-md hover:shadow-lg transition-all text-center"
            >
              {productToEdit ? 'Save Changes' : 'Publish Product to Store'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
