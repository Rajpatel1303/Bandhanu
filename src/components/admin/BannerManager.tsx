import React, { useState } from 'react';
import { Banner } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Plus, Trash2, Edit2, Check, Sparkles, Image } from 'lucide-react';

export const BannerManager: React.FC = () => {
  const { banners, addBanner, deleteBanner, toggleBannerStatus } = useStore();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [ctaText, setCtaText] = useState('Explore Catalogue');
  const [badge, setBadge] = useState('Special Drop 2026');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addBanner({
      title,
      subtitle,
      ctaText,
      badge,
      imageUrl,
      bgGradient: 'from-heritage-crimson via-heritage-ruby to-heritage-indigo',
      isActive: true
    });

    setTitle('');
    setSubtitle('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-heritage-charcoal dark:text-white">
            Homepage Hero Banners & Campaigns ({banners.length})
          </h2>
          <p className="text-xs text-heritage-charcoal/60 dark:text-gray-400">
            Control the visual story, festive headlines, and call-to-action promotions
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-xl bg-heritage-crimson hover:bg-heritage-ruby text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel' : 'Create Hero Banner'}</span>
        </button>
      </div>

      {/* Add Banner Form */}
      {showAddForm && (
        <form onSubmit={handleAddBanner} className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md text-xs space-y-4 animate-fade-in">
          <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white pb-2 border-b border-heritage-gold/20">
            New Campaign Banner
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Headline Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. The Sacred Art of Bandhej"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Badge Tag</label>
              <input
                type="text"
                placeholder="e.g. Festive & Bridal 2026 Collection"
                value={badge}
                onChange={e => setBadge(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Subtext / Artisanal Tagline</label>
            <input
              type="text"
              placeholder="e.g. Direct from the Master Khatri Artisans of Kutch & Jamnagar"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">CTA Button Text</label>
              <input
                type="text"
                value={ctaText}
                onChange={e => setCtaText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Background Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-heritage-crimson text-white font-bold"
          >
            Save & Publish Banner
          </button>
        </form>
      )}

      {/* Existing Banners List */}
      <div className="space-y-4">
        {banners.map((b, idx) => (
          <div
            key={b.id}
            className="rounded-3xl overflow-hidden border border-heritage-gold/30 shadow-md bg-white dark:bg-heritage-darkCard flex flex-col md:flex-row items-center justify-between"
          >
            <div className="relative md:w-64 h-40 w-full overflow-hidden shrink-0">
              <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 rounded bg-heritage-gold text-black text-[10px] font-bold">
                  Banner #{idx + 1}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 space-y-1">
              <span className="text-[10px] font-bold text-heritage-crimson uppercase tracking-wider">
                {b.badge}
              </span>
              <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white">
                {b.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-1">{b.subtitle}</p>
              <div className="pt-2 text-xs font-semibold text-emerald-600">
                CTA: "{b.ctaText}"
              </div>
            </div>

            <div className="p-5 flex items-center gap-3 border-t md:border-t-0 md:border-l border-heritage-gold/20">
              <button
                onClick={() => toggleBannerStatus(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  b.isActive
                    ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                    : 'bg-gray-200 text-gray-600 border-gray-300'
                }`}
              >
                {b.isActive ? 'Active on Home' : 'Disabled'}
              </button>

              <button
                onClick={() => deleteBanner(b.id)}
                className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50"
                title="Delete banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
