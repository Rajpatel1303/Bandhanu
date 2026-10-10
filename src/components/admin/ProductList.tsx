import React, { useState, useMemo } from 'react';
import { Product, AvailabilityStatus } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ProductModal } from './ProductModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  MessageCircle,
  Eye,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export const ProductList: React.FC = () => {
  const {
    products,
    categories,
    deleteProduct,
    toggleFeatured,
    toggleAvailability,
    profile,
    setSelectedProductId,
    setActiveView
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Filtered Products
  const filtered = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedStatus !== 'all' && p.availability !== selectedStatus) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        if (!matchTitle && !matchSku && !matchFabric) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedStatus, search]);

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setProductToEdit(p);
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the catalogue?`)) {
      deleteProduct(id);
    }
  };

  const handleViewLive = (id: string) => {
    setSelectedProductId(id);
    setActiveView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-heritage-charcoal dark:text-white">
            Bandhani Products Catalogue ({products.length})
          </h2>
          <p className="text-xs text-heritage-charcoal/60 dark:text-gray-400">
            Manage inventory, upload photos, set custom colorways, and track WhatsApp orders
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-heritage-crimson via-heritage-ruby to-heritage-terracotta text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or fabric..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="p-2 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="p-2 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200 cursor-pointer"
            >
              <option value="all">All Stock Status</option>
              <option value="in_stock">Ready to Ship</option>
              <option value="made_to_order">Made to Order</option>
              <option value="sold_out">Sold Out</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Card List (md:hidden) */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white dark:bg-heritage-darkCard rounded-2xl border border-heritage-gold/20">
            No products match the selected filters.
          </div>
        ) : (
          filtered.map(p => (
            <div
              key={p.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-xs space-y-3"
            >
              {/* Top Row: Thumbnail + Info + Star */}
              <div className="flex gap-3 items-start">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-heritage-gold/25 shrink-0">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  {p.images.length > 1 && (
                    <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/70 text-white text-[8px] font-mono">
                      +{p.images.length - 1}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white line-clamp-1">
                      {p.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => toggleFeatured(p.id)}
                      className={`p-1 rounded-md transition-colors shrink-0 ${
                        p.isFeatured ? 'text-heritage-crimson' : 'text-gray-300'
                      }`}
                      title={p.isFeatured ? 'Featured on home' : 'Click to feature'}
                    >
                      <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="text-[11px] text-heritage-crimson dark:text-heritage-gold font-medium truncate">
                    {p.craftTechnique}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold">
                      {profile.currencySymbol}{p.price.toLocaleString('en-IN')}
                    </span>
                    {p.originalPrice && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {profile.currencySymbol}{p.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                    <span className="font-mono text-gray-500 bg-heritage-sand/60 dark:bg-heritage-darkSurface px-1.5 py-0.5 rounded">
                      {p.sku}
                    </span>
                    <span className="capitalize text-heritage-charcoal/70 dark:text-gray-300 bg-heritage-sand/40 dark:bg-heritage-darkSurface px-1.5 py-0.5 rounded">
                      {p.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Row: Colors & Enquiries */}
              <div className="pt-2 border-t border-heritage-gold/15 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {p.colors.slice(0, 4).map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {p.colors.length} {p.colors.length === 1 ? 'shade' : 'shades'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold">
                    <MessageCircle className="w-3 h-3 fill-current" />
                    {p.enquiriesCount || 0}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Status Selector & Actions */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-heritage-gold/15">
                <select
                  value={p.availability}
                  onChange={e => toggleAvailability(p.id, e.target.value as AvailabilityStatus)}
                  className={`text-[11px] font-semibold px-2 py-1 rounded-xl border cursor-pointer ${
                    p.availability === 'in_stock'
                      ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                      : p.availability === 'made_to_order'
                      ? 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                      : 'bg-gray-500/10 text-gray-500 border-gray-500/30'
                  }`}
                >
                  <option value="in_stock">Ready to Ship</option>
                  <option value="made_to_order">Made to Order</option>
                  <option value="sold_out">Sold Out</option>
                </select>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleViewLive(p.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-heritage-sand/60 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200 text-[11px] font-medium hover:text-heritage-crimson"
                    title="View live"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-heritage-crimson/10 text-heritage-crimson dark:text-heritage-gold text-[11px] font-semibold hover:bg-heritage-crimson/20"
                    title="Edit product"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Datatable (Desktop) */}
      <div className="hidden md:block rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-heritage-sand/50 dark:bg-heritage-darkSurface border-b border-heritage-gold/20 text-heritage-charcoal/70 dark:text-gray-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Item & Craft</th>
                <th className="py-3.5 px-3">SKU & Category</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Colors</th>
                <th className="py-3.5 px-3">Stock Status</th>
                <th className="py-3.5 px-3">Featured</th>
                <th className="py-3.5 px-3">WhatsApp Inquiries</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-heritage-gold/15">
              {filtered.map(p => (
                <tr
                  key={p.id}
                  className="hover:bg-heritage-sand/20 dark:hover:bg-heritage-darkSurface/40 transition-colors"
                >
                  {/* Item Image & Title */}
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-heritage-gold/20 shrink-0">
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      {p.images.length > 1 && (
                        <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/70 text-white text-[8px] font-mono">
                          +{p.images.length - 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white line-clamp-1">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-heritage-crimson dark:text-heritage-gold font-medium">
                        {p.craftTechnique}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {p.fabric}
                      </div>
                    </div>
                  </td>

                  {/* SKU & Category */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-heritage-charcoal dark:text-gray-200">
                      {p.sku}
                    </div>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-heritage-sand dark:bg-heritage-darkSurface text-[10px] capitalize text-heritage-charcoal/80 dark:text-gray-300">
                      {p.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-3 font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold">
                    {profile.currencySymbol}{p.price.toLocaleString('en-IN')}
                    {p.originalPrice && (
                      <span className="block text-[10px] text-gray-400 font-normal line-through">
                        {profile.currencySymbol}{p.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </td>

                  {/* Colors */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1">
                      {p.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">
                      {p.colors.length} shades
                    </span>
                  </td>

                  {/* Stock Status Selector */}
                  <td className="py-3.5 px-3">
                    <select
                      value={p.availability}
                      onChange={e => toggleAvailability(p.id, e.target.value as AvailabilityStatus)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl border cursor-pointer ${
                        p.availability === 'in_stock'
                          ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                          : p.availability === 'made_to_order'
                          ? 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/30'
                      }`}
                    >
                      <option value="in_stock">Ready to Ship</option>
                      <option value="made_to_order">Made to Order</option>
                      <option value="sold_out">Sold Out</option>
                    </select>
                  </td>

                  {/* Featured */}
                  <td className="py-3.5 px-3">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(p.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        p.isFeatured
                          ? 'bg-heritage-gold/20 text-heritage-crimson'
                          : 'text-gray-300 hover:text-gray-500'
                      }`}
                      title={p.isFeatured ? 'Featured on home' : 'Click to feature'}
                    >
                      <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                  </td>

                  {/* WhatsApp Inquiries */}
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                      <MessageCircle className="w-3 h-3 fill-current" />
                      {p.enquiriesCount || 0}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleViewLive(p.id)}
                        className="p-1.5 rounded-lg hover:bg-heritage-sand/60 text-gray-500 hover:text-heritage-crimson transition-colors"
                        title="View live on customer website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-heritage-sand/60 text-gray-500 hover:text-heritage-crimson transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Add/Edit Modal */}
      <ProductModal
        productToEdit={productToEdit}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
