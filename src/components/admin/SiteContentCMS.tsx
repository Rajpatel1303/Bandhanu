import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { UniversalSiteContent } from '../../types';
import {
  Sparkles,
  Save,
  Eye,
  Layers,
  FileText,
  Phone,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Globe,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SiteContentCMS: React.FC = () => {
  const { siteContent, updateSiteContent } = useStore();

  const [activeTab, setActiveTab] = useState<'announcement' | 'hero' | 'about' | 'contact' | 'toggles'>('hero');
  const [formData, setFormData] = useState<UniversalSiteContent>(siteContent);
  const [savedToast, setSavedToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateSiteContent(formData);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 }
      });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (err) {
      console.error('Failed to save CMS content:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-heritage-darkCard via-heritage-darkSurface to-heritage-darkCard text-white border border-heritage-gold/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-gold/15 text-heritage-gold text-xs font-bold uppercase tracking-wider mb-2 border border-heritage-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Universal Content Management</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Website Content & Section CMS
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-xl">
            Edit and customize any headline, paragraph, badge, phone number, and visibility setting across the entire website. Changes persist immediately to Supabase Cloud.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving to Cloud...' : 'Publish Changes to Cloud'}</span>
        </button>
      </div>

      {/* Toast Notification */}
      {savedToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>All website content changes published to Supabase Cloud successfully! Live on all devices.</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">Status: 200 OK</span>
        </div>
      )}

      {/* CMS Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-heritage-gold/20">
        {[
          { id: 'hero', label: '1. Hero Section', icon: Sparkles },
          { id: 'announcement', label: '2. Announcement Bar', icon: Layers },
          { id: 'about', label: '3. About & Vision Pillars', icon: FileText },
          { id: 'contact', label: '4. Studio Contact & Hours', icon: Phone },
          { id: 'toggles', label: '5. Section Visibility Toggles', icon: ToggleRight }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-heritage-crimson text-white shadow-md'
                  : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 hover:bg-heritage-sand/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
            <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white border-b border-heritage-gold/20 pb-2">
              Hero Showcase Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Hero Badge Text
                </label>
                <input
                  type="text"
                  value={formData.hero.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, badge: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={formData.hero.heading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, heading: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Headline Highlight Accent (Italic Crimson)
                </label>
                <input
                  type="text"
                  value={formData.hero.highlight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, highlight: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={formData.hero.primaryBtnText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, primaryBtnText: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                Hero Description Paragraph
              </label>
              <textarea
                rows={3}
                value={formData.hero.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, description: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-heritage-gold/20">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Hero Image URL
                </label>
                <input
                  type="url"
                  value={formData.hero.heroImage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, heroImage: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Knot Badge Text
                </label>
                <input
                  type="text"
                  value={formData.hero.knotBadgeText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, knotBadgeText: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANNOUNCEMENT BAR */}
        {activeTab === 'announcement' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-heritage-gold/20 pb-2">
              <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white">
                Top Announcement Bar
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.announcement.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, enabled: e.target.checked }
                    })
                  }
                  className="w-4 h-4 rounded text-heritage-crimson"
                />
                <span className="text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                  {formData.announcement.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Primary Marquee Message
                </label>
                <input
                  type="text"
                  value={formData.announcement.text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, text: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Middle Slogan Highlight
                </label>
                <input
                  type="text"
                  value={formData.announcement.subtext}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, subtext: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.announcement.ctaText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, ctaText: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT US & VISION PILLARS */}
        {activeTab === 'about' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
            <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white border-b border-heritage-gold/20 pb-2">
              Official Heritage Narrative & 3 Vision Pillars
            </h3>

            <div>
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                Story Headline
              </label>
              <input
                type="text"
                value={formData.about.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, headline: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Paragraph 1 (Tradition & Artistry)
                </label>
                <textarea
                  rows={4}
                  value={formData.about.storyParagraph1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, storyParagraph1: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Paragraph 2 (Patience, Soul & Modern Living)
                </label>
                <textarea
                  rows={4}
                  value={formData.about.storyParagraph2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, storyParagraph2: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            {/* 3 Vision Pillars */}
            <div className="pt-4 border-t border-heritage-gold/20 space-y-4">
              <h4 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold">
                The 3 Vision Pillars
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/25 space-y-2">
                  <span className="text-[10px] font-bold text-heritage-crimson dark:text-heritage-gold uppercase">Pillar 1</span>
                  <input
                    type="text"
                    placeholder="Pillar 1 Title"
                    value={formData.about.visionPillar1Title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, visionPillar1Title: e.target.value }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard text-xs font-bold dark:text-white"
                  />
                  <textarea
                    rows={2}
                    placeholder="Pillar 1 Description"
                    value={formData.about.visionPillar1Desc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, visionPillar1Desc: e.target.value }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard text-xs dark:text-white"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/25 space-y-2">
                  <span className="text-[10px] font-bold text-heritage-crimson dark:text-heritage-gold uppercase">Pillar 2</span>
                  <input
                    type="text"
                    placeholder="Pillar 2 Title"
                    value={formData.about.visionPillar2Title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, visionPillar2Title: e.target.value }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard text-xs font-bold dark:text-white"
                  />
                  <textarea
                    rows={2}
                    placeholder="Pillar 2 Description"
                    value={formData.about.visionPillar2Desc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, visionPillar2Desc: e.target.value }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard text-xs dark:text-white"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/25 space-y-2">
                  <span className="text-[10px] font-bold text-heritage-crimson dark:text-heritage-gold uppercase">Pillar 3</span>
                  <input
                    type="text"
                    placeholder="Pillar 3 Title"
                    value={formData.about.visionPillar3Title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, visionPillar3Title: e.target.value }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard text-xs font-bold dark:text-white"
                  />
                  <textarea
                    rows={2}
                    placeholder="Pillar 3 Description"
                    value={formData.about.visionPillar3Desc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, visionPillar3Desc: e.target.value }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard text-xs dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STUDIO CONTACT */}
        {activeTab === 'contact' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
            <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white border-b border-heritage-gold/20 pb-2">
              Studio Atelier Information & Concierge
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.contact.businessName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, businessName: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  WhatsApp Hotline Number (Digits with country code)
                </label>
                <input
                  type="text"
                  value={formData.contact.whatsappNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsappNumber: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={formData.contact.instagramHandle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, instagramHandle: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                Studio Address
              </label>
              <textarea
                rows={2}
                value={formData.contact.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, address: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                Visiting & Consultation Hours
              </label>
              <input
                type="text"
                value={formData.contact.visitingHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, visitingHours: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
              />
            </div>
          </div>
        )}

        {/* TAB 5: SECTION TOGGLES */}
        {activeTab === 'toggles' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
            <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white border-b border-heritage-gold/20 pb-2">
              Website Section Visibility Switches
            </h3>
            <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400">
              Toggle any section on or off on the live website with a single click.
            </p>

            <div className="space-y-4 max-w-xl">
              {[
                { key: 'showAnnouncement', label: 'Top Announcement Marquee Bar', desc: 'Displays promotional text & WhatsApp concierge link atop header' },
                { key: 'showLookbook', label: 'Editorial Lookbook Section', desc: 'Editorial photoshoots and style storytelling' },
                { key: 'showCraftJourney', label: 'The Craft of Bandhej Simulation', desc: '4-stage traditional knot and dye journey' },
                { key: 'showSimilarProducts', label: 'Similar Product Recommendations', desc: 'Displays curated pairings under each product detail' }
              ].map((toggle) => {
                const isEnabled = (formData.toggles as any)[toggle.key];
                return (
                  <div
                    key={toggle.key}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        toggles: {
                          ...formData.toggles,
                          [toggle.key]: !isEnabled
                        }
                      })
                    }
                    className="p-4 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between cursor-pointer hover:border-heritage-gold transition-colors"
                  >
                    <div>
                      <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                        {toggle.label}
                      </h4>
                      <p className="text-[11px] text-heritage-charcoal/60 dark:text-gray-400">
                        {toggle.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                        isEnabled ? 'bg-emerald-600' : 'bg-gray-400 dark:bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-heritage-gold/20">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing Changes...' : 'Save & Publish All to Supabase Cloud'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
