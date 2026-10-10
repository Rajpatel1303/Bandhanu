import React, { useState } from 'react';
import { Category } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Plus, Edit2, Trash2, X, Image, Sparkles } from 'lucide-react';

export const CategoryManager: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('Signature Craft');

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');
    setBadge('Curated');
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImage(cat.image);
    setBadge(cat.badge || '');
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        description,
        image,
        badge: badge || undefined
      });
    } else {
      addCategory({
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-') || name.toLowerCase().replace(/\s+/g, '-'),
        description,
        image,
        badge: badge || undefined,
        isActive: true
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, catName: string) => {
    const attachedProducts = products.filter(p => p.category === categories.find(c => c.id === id)?.slug);
    if (attachedProducts.length > 0) {
      if (!confirm(`Warning: There are ${attachedProducts.length} products linked to category "${catName}". Do you still want to delete it?`)) {
        return;
      }
    } else {
      if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;
    }
    deleteCategory(id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-heritage-charcoal dark:text-white">
            Category Manager ({categories.length})
          </h2>
          <p className="text-xs text-heritage-charcoal/60 dark:text-gray-400">
            Define dynamic categories, edit collection banners, and organize customer browsing
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-heritage-crimson hover:bg-heritage-ruby text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => {
          const count = products.filter(p => p.category === cat.slug).length;
          return (
            <div
              key={cat.id}
              className="rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {cat.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-heritage-gold text-heritage-charcoal text-[10px] font-bold uppercase tracking-wider shadow-md">
                      {cat.badge}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium border border-white/20">
                    {count} {count === 1 ? 'Product' : 'Products'}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif font-bold text-lg">{cat.name}</h3>
                    <p className="text-[10px] font-mono text-gray-300">slug: {cat.slug}</p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-heritage-charcoal/70 dark:text-gray-300 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-heritage-gold/15 flex items-center justify-between text-xs mt-3">
                <span className="text-[11px] text-emerald-600 font-semibold">● Active in Store</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg hover:bg-heritage-sand text-gray-500 hover:text-heritage-crimson"
                    title="Edit category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-md bg-white dark:bg-heritage-darkSurface rounded-2xl sm:rounded-3xl border border-heritage-gold/40 shadow-2xl p-4 sm:p-6 text-xs space-y-4 max-h-[92vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-heritage-gold/20">
              <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bandhani Sarees"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    if (!editingCategory) {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                    }
                  }}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. sarees"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard font-mono text-heritage-charcoal dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Category Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Badge Tag (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bridal Edit, Signature Craft, Trending"
                  value={badge}
                  onChange={e => setBadge(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-heritage-crimson text-white font-semibold"
                >
                  {editingCategory ? 'Update' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
