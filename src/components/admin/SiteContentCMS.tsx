import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { UniversalSiteContent, SiteCustomOrder } from '../../types';
import { MediaUploader } from './MediaUploader';
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
  Image as ImageIcon,
  Camera,
  Scissors,
  Palette,
  Clock,
  MessageCircle,
  Trash2,
  Plus,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_ABOUT = {
  badge: 'ABOUT US',
  headline: 'A Celebration of Tradition, Artistry & Timeless Elegance',
  storyParagraph1: 'Bandhanu is a celebration of tradition, artistry, and timeless elegance. Rooted in the ancient craft of Bandhani (Bandhej), our brand brings forward the beauty of knots, patterns, and indigo hues that tell stories of heritage and culture.',
  storyParagraph2: 'Each piece is hand-tied and hand-dyed, carrying with it the patience, skill, and soul of artisans who have preserved this art for generations. At Bandhanu, we don’t just create products—we create experiences woven with history and designed for modern living.',
  image: '/images/artisan-story.jpg',
  buttonText: 'Read Our Story',
  buttonLink: '',
  locationCity: 'Bhadli',
  locationState: 'Kutch, Gujarat',
  locationTagline: 'Visit Our Heritage Atelier • Get Directions',
  locationMapUrl: 'https://maps.app.goo.gl/86qCkie4AofH5xPQA',
  quoteText: 'Every knot we tie is not just a design—it’s a promise of authenticity, sustainability, and love for handmade.',
  quoteAuthor: 'Bandhanu: Every Knot, A Story.',
  visionPillar1Title: 'Global Identity',
  visionPillar1Desc: 'To make Bandhani a global identity.',
  visionPillar2Title: 'Honor The Artisans',
  visionPillar2Desc: 'To honor the craft and the artisans behind it.',
  visionPillar3Title: 'Contemporary Designs',
  visionPillar3Desc: 'To blend traditional techniques with contemporary designs that suit today’s world.'
};

const DEFAULT_CUSTOM_ORDER: SiteCustomOrder = {
  badge: 'Bespoke Atelier Service',
  heading: 'Custom Bandhani Commission',
  subtitle: 'Tailored Exclusively to Your Color, Fabric & Knot Density',
  description: 'Have a specific wedding theme, family heirloom motif, or bespoke drape in mind? Our master Khatri artisans tie and dye customized pieces to your exact vision.',
  image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
  leadTime: '4 to 6 weeks handcrafting lead-time',
  whatsappCtaText: 'Discuss Custom Commission on WhatsApp',
  productTypes: [
    'Bridal Gharchola Saree',
    'Heirloom Shikargah Dupatta',
    'Bespoke Kurta & Stole',
    'Unstitched Silk Fabric (5m)'
  ],
  fabrics: ['Pure Gajji Silk', 'Modal Silk', 'Pure Georgette', 'Chanderi Silk', 'Mulberry Katan'],
  patterns: [
    'Micro Rai Bandhej (~25,000 knots)',
    'Traditional Shikargah',
    'Royal Bavan Baug',
    'Chaukadi (4-Dot Grid)'
  ],
  colors: [
    { name: 'Sindoor Crimson', hex: '#9B111E' },
    { name: 'Kutch Indigo', hex: '#1F2942' },
    { name: 'Haldi Ochre', hex: '#D4AF37' },
    { name: 'Gulabi Rani Pink', hex: '#D12D69' },
    { name: 'Forest Emerald', hex: '#1A5336' },
    { name: 'Custom Dye / Ombre', hex: '#C85A32' }
  ]
};

export const SiteContentCMS: React.FC = () => {
  const { siteContent, updateSiteContent } = useStore();

  const [activeTab, setActiveTab] = useState<'hero' | 'customOrder' | 'about' | 'contact' | 'announcement' | 'toggles'>('hero');
  const [rawFormData, setRawFormData] = useState<UniversalSiteContent>(siteContent);
  const [savedToast, setSavedToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // States for adding new custom order options
  const [newProductType, setNewProductType] = useState('');
  const [newFabric, setNewFabric] = useState('');
  const [newPattern, setNewPattern] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#9B111E');

  const currentAbout = rawFormData.about || DEFAULT_ABOUT;
  const currentCustomOrder = rawFormData.customOrder || DEFAULT_CUSTOM_ORDER;
  const formData: UniversalSiteContent = {
    ...rawFormData,
    about: {
      ...DEFAULT_ABOUT,
      ...currentAbout
    },
    customOrder: {
      ...DEFAULT_CUSTOM_ORDER,
      ...currentCustomOrder,
      productTypes: currentCustomOrder.productTypes ?? DEFAULT_CUSTOM_ORDER.productTypes,
      fabrics: currentCustomOrder.fabrics ?? DEFAULT_CUSTOM_ORDER.fabrics,
      patterns: currentCustomOrder.patterns ?? DEFAULT_CUSTOM_ORDER.patterns,
      colors: currentCustomOrder.colors ?? DEFAULT_CUSTOM_ORDER.colors
    }
  };

  // Sync state if store content changes externally
  React.useEffect(() => {
    setRawFormData(siteContent);
  }, [siteContent]);

  const updateTimeoutRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Wrapper so ANY input modification immediately updates store & localStorage in real time
  const setFormData: React.Dispatch<React.SetStateAction<UniversalSiteContent>> = (nextOrFn) => {
    setRawFormData((prev) => {
      const next = typeof nextOrFn === 'function' ? nextOrFn(prev) : nextOrFn;
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
      updateTimeoutRef.current = setTimeout(() => {
        updateSiteContent(next);
      }, 40);
      return next;
    });
  };

  // Custom Order interactive options handlers
  const customOrder = formData.customOrder || DEFAULT_CUSTOM_ORDER;
  const productTypes = customOrder.productTypes ?? DEFAULT_CUSTOM_ORDER.productTypes ?? [];
  const fabrics = customOrder.fabrics ?? DEFAULT_CUSTOM_ORDER.fabrics ?? [];
  const patterns = customOrder.patterns ?? DEFAULT_CUSTOM_ORDER.patterns ?? [];
  const colors = customOrder.colors ?? DEFAULT_CUSTOM_ORDER.colors ?? [];

  // 1. Silhouette / Garment Type Handlers
  const handleUpdateProductType = (index: number, val: string) => {
    const updated = [...productTypes];
    updated[index] = val;
    setFormData({
      ...formData,
      customOrder: { ...customOrder, productTypes: updated }
    });
  };

  const handleDeleteProductType = (index: number) => {
    const updated = productTypes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      customOrder: { ...customOrder, productTypes: updated }
    });
  };

  const handleAddProductType = () => {
    if (!newProductType.trim()) return;
    const updated = [...productTypes, newProductType.trim()];
    setFormData({
      ...formData,
      customOrder: { ...customOrder, productTypes: updated }
    });
    setNewProductType('');
  };

  // 2. Fabric Options Handlers
  const handleUpdateFabric = (index: number, val: string) => {
    const updated = [...fabrics];
    updated[index] = val;
    setFormData({
      ...formData,
      customOrder: { ...customOrder, fabrics: updated }
    });
  };

  const handleDeleteFabric = (index: number) => {
    const updated = fabrics.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      customOrder: { ...customOrder, fabrics: updated }
    });
  };

  const handleAddFabric = () => {
    if (!newFabric.trim()) return;
    const updated = [...fabrics, newFabric.trim()];
    setFormData({
      ...formData,
      customOrder: { ...customOrder, fabrics: updated }
    });
    setNewFabric('');
  };

  // 3. Color Palette Handlers
  const handleUpdateColor = (index: number, field: 'name' | 'hex', val: string) => {
    const updated = [...colors];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({
      ...formData,
      customOrder: { ...customOrder, colors: updated }
    });
  };

  const handleDeleteColor = (index: number) => {
    const updated = colors.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      customOrder: { ...customOrder, colors: updated }
    });
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    const updated = [...colors, { name: newColorName.trim(), hex: newColorHex || '#9B111E' }];
    setFormData({
      ...formData,
      customOrder: { ...customOrder, colors: updated }
    });
    setNewColorName('');
    setNewColorHex('#9B111E');
  };

  // 4. Knot Pattern Complexity Handlers
  const handleUpdatePattern = (index: number, val: string) => {
    const updated = [...patterns];
    updated[index] = val;
    setFormData({
      ...formData,
      customOrder: { ...customOrder, patterns: updated }
    });
  };

  const handleDeletePattern = (index: number) => {
    const updated = patterns.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      customOrder: { ...customOrder, patterns: updated }
    });
  };

  const handleAddPattern = () => {
    if (!newPattern.trim()) return;
    const updated = [...patterns, newPattern.trim()];
    setFormData({
      ...formData,
      customOrder: { ...customOrder, patterns: updated }
    });
    setNewPattern('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
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
          { id: 'hero', label: '1. Hero Banner', icon: Sparkles },
          { id: 'customOrder', label: '2. Custom Orders & Bespoke Studio', icon: Scissors },
          { id: 'about', label: '3. About & Lineage', icon: FileText },
          { id: 'contact', label: '4. Studio Contact & Hours', icon: Phone },
          { id: 'announcement', label: '5. Announcement Bar', icon: Layers },
          { id: 'toggles', label: '6. Section Visibility', icon: ToggleRight }
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
        {/* TAB: CRAFT JOURNEY (DEPRECATED) */}
        {(activeTab as any) === 'craft' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-heritage-gold/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white">
                  Craft Journey ("The Journey of a Hand-Tied Dot")
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Change photos, titles, phases, captions, descriptions, and heritage notes for all 3 stages.
                </p>
              </div>
            </div>

            {/* Section Header Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Section Kicker Badge
                </label>
                <input
                  type="text"
                  value={formData.craftJourney?.badge || 'Living Craft In Action'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      craftJourney: {
                        ...(formData.craftJourney || ({} as any)),
                        badge: e.target.value
                      }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Main Section Headline
                </label>
                <input
                  type="text"
                  value={formData.craftJourney?.heading || 'The Journey of a Hand-Tied Dot'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      craftJourney: {
                        ...(formData.craftJourney || ({} as any)),
                        heading: e.target.value
                      }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            {/* Stages Editor Cards (Stage 1, Stage 2, Stage 3) */}
            <div className="space-y-6 pt-2">
              <h4 className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-heritage-gold" />
                <span>The 3 Living Craft Stages (Photos & Text)</span>
              </h4>

              {(formData.craftJourney?.stages || []).map((stageItem, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/25 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-heritage-gold/15 pb-2">
                    <span className="font-serif font-bold text-xs sm:text-sm text-heritage-crimson dark:text-heritage-gold">
                      Stage {stageItem.step || `0${index + 1}`} • {stageItem.phase}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Stage #{index + 1}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    {/* Left: Photo Preview & URL input */}
                    <div className="md:col-span-5 space-y-2">
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100 border border-heritage-gold/30 relative">
                        <img
                          src={stageItem.image}
                          alt={stageItem.title}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-heritage-charcoal dark:text-gray-300 uppercase tracking-wider mb-1">
                          Photo Image URL
                        </label>
                        <input
                          type="text"
                          value={stageItem.image}
                          onChange={(e) => {
                            const newStages = [...(formData.craftJourney?.stages || [])];
                            newStages[index] = { ...stageItem, image: e.target.value };
                            setFormData({
                              ...formData,
                              craftJourney: {
                                ...(formData.craftJourney || ({} as any)),
                                stages: newStages
                              }
                            });
                          }}
                          className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-mono"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {/* Right: Text & Details */}
                    <div className="md:col-span-7 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Phase Name (e.g. Bandhana)
                          </label>
                          <input
                            type="text"
                            value={stageItem.phase}
                            onChange={(e) => {
                              const newStages = [...(formData.craftJourney?.stages || [])];
                              newStages[index] = { ...stageItem, phase: e.target.value };
                              setFormData({
                                ...formData,
                                craftJourney: {
                                  ...(formData.craftJourney || ({} as any)),
                                  stages: newStages
                                }
                              });
                            }}
                            className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Badge Tag
                          </label>
                          <input
                            type="text"
                            value={stageItem.badge}
                            onChange={(e) => {
                              const newStages = [...(formData.craftJourney?.stages || [])];
                              newStages[index] = { ...stageItem, badge: e.target.value };
                              setFormData({
                                ...formData,
                                craftJourney: {
                                  ...(formData.craftJourney || ({} as any)),
                                  stages: newStages
                                }
                              });
                            }}
                            className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Stage Title
                        </label>
                        <input
                          type="text"
                          value={stageItem.title}
                          onChange={(e) => {
                            const newStages = [...(formData.craftJourney?.stages || [])];
                            newStages[index] = { ...stageItem, title: e.target.value };
                            setFormData({
                              ...formData,
                              craftJourney: {
                                ...(formData.craftJourney || ({} as any)),
                                stages: newStages
                              }
                            });
                          }}
                          className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Stage Subtitle
                        </label>
                        <input
                          type="text"
                          value={stageItem.subtitle}
                          onChange={(e) => {
                            const newStages = [...(formData.craftJourney?.stages || [])];
                            newStages[index] = { ...stageItem, subtitle: e.target.value };
                            setFormData({
                              ...formData,
                              craftJourney: {
                                ...(formData.craftJourney || ({} as any)),
                                stages: newStages
                              }
                            });
                          }}
                          className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Photo Description Paragraph
                        </label>
                        <textarea
                          rows={2}
                          value={stageItem.description}
                          onChange={(e) => {
                            const newStages = [...(formData.craftJourney?.stages || [])];
                            newStages[index] = { ...stageItem, description: e.target.value };
                            setFormData({
                              ...formData,
                              craftJourney: {
                                ...(formData.craftJourney || ({} as any)),
                                stages: newStages
                              }
                            });
                          }}
                          className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Photo Caption Text
                        </label>
                        <input
                          type="text"
                          value={stageItem.caption}
                          onChange={(e) => {
                            const newStages = [...(formData.craftJourney?.stages || [])];
                            newStages[index] = { ...stageItem, caption: e.target.value };
                            setFormData({
                              ...formData,
                              craftJourney: {
                                ...(formData.craftJourney || ({} as any)),
                                stages: newStages
                              }
                            });
                          }}
                          className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs italic"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Heritage Technique Bullet Points */}
            <div className="pt-2 border-t border-heritage-gold/20 space-y-3">
              <h4 className="font-serif font-bold text-xs uppercase text-heritage-charcoal dark:text-white">
                Artisan Technique Footnotes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Technique Point 1
                  </label>
                  <input
                    type="text"
                    value={formData.craftJourney?.techniqueNote1 || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        craftJourney: {
                          ...(formData.craftJourney || ({} as any)),
                          techniqueNote1: e.target.value
                        }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Technique Point 2
                  </label>
                  <input
                    type="text"
                    value={formData.craftJourney?.techniqueNote2 || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        craftJourney: {
                          ...(formData.craftJourney || ({} as any)),
                          techniqueNote2: e.target.value
                        }
                      })
                    }
                    className="w-full p-2 rounded-lg border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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

            {/* Hero Visual Media Uploader */}
            <div className="pt-4 border-t border-heritage-gold/20 space-y-3">
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider">
                Hero Visual Media (Upload Photo from Gallery / Files or Paste URL)
              </label>
              {formData.hero.heroImage && (
                <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-heritage-gold/30 bg-gray-100">
                  <img src={formData.hero.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, heroImage: '' }
                      })
                    }
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-xs cursor-pointer"
                    title="Remove hero image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <MediaUploader
                folder="banners"
                multiple={false}
                title="Hero Background Media"
                onImagesSelected={urls => {
                  if (urls[0]) {
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, heroImage: urls[0] }
                    });
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-heritage-gold/20">

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

        {/* TAB: CUSTOM ORDERS & BESPOKE */}
        {activeTab === 'customOrder' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-heritage-gold/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white">
                  Bespoke Custom Orders & Customization Section
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Control the interactive customization studio where customers configure custom sarees, dupattas, fabrics, and colors.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.toggles.showCustomOrders !== false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      toggles: { ...formData.toggles, showCustomOrders: e.target.checked }
                    })
                  }
                  className="w-4 h-4 rounded text-heritage-crimson"
                />
                <span className="text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                  {formData.toggles.showCustomOrders !== false ? 'Section Visible' : 'Section Hidden'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Section Badge Tag
                </label>
                <input
                  type="text"
                  value={formData.customOrder?.badge || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), badge: e.target.value }
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
                  value={formData.customOrder?.heading || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), heading: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Subtitle / Highlight
                </label>
                <input
                  type="text"
                  value={formData.customOrder?.subtitle || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), subtitle: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Lead Time Note
                </label>
                <input
                  type="text"
                  value={formData.customOrder?.leadTime || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), leadTime: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                Narrative Description Body
              </label>
              <textarea
                rows={2}
                value={formData.customOrder?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), description: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                WhatsApp Button Call-To-Action Text
              </label>
              <input
                type="text"
                value={formData.customOrder?.whatsappCtaText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), whatsappCtaText: e.target.value }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
              />
            </div>

            {/* Custom Order Atelier Feature Photo */}
            <div className="pt-4 border-t border-heritage-gold/20 space-y-3">
              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider">
                Atelier Commission Showcase Photo (Gallery / Files / URL)
              </label>
              {formData.customOrder?.image && (
                <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-heritage-gold/30 bg-gray-100">
                  <img src={formData.customOrder.image} alt="Custom Order Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), image: '' }
                      })
                    }
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-xs cursor-pointer"
                    title="Remove image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <MediaUploader
                folder="cms"
                multiple={false}
                title="Bespoke Showcase Photo"
                onImagesSelected={urls => {
                  if (urls[0]) {
                    setFormData({
                      ...formData,
                      customOrder: { ...(formData.customOrder || DEFAULT_CUSTOM_ORDER), image: urls[0] }
                    });
                  }
                }}
              />
            </div>

            {/* INTERACTIVE CUSTOM STUDIO OPTIONS BUILDER */}
            <div className="pt-6 border-t border-heritage-gold/30 space-y-6">
              <div>
                <h4 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-heritage-gold" />
                  <span>Custom Studio Selectable Options (Client Interactive Choices)</span>
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Customize the buttons and options that customers see in the Custom Order Atelier. You can add new choices, edit values, or delete options.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Silhouettes / Garment Types */}
                <div className="p-4 sm:p-5 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-heritage-gold/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-heritage-charcoal dark:text-white flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                      <span>1. Garment Types & Silhouettes ({productTypes.length})</span>
                    </span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {productTypes.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleUpdateProductType(idx, e.target.value)}
                          className="flex-1 p-2 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-medium"
                          placeholder="Garment Type Name"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteProductType(idx)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors cursor-pointer"
                          title="Delete option"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {productTypes.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic">No garment types configured. Add one below.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-heritage-gold/15">
                    <input
                      type="text"
                      placeholder="Add new silhouette (e.g. Lehenga Set)..."
                      value={newProductType}
                      onChange={(e) => setNewProductType(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddProductType(); } }}
                      className="flex-1 p-2 rounded-xl border border-dashed border-heritage-gold/40 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddProductType}
                      disabled={!newProductType.trim()}
                      className="px-3.5 py-2 bg-heritage-crimson hover:bg-heritage-crimson/90 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* 2. Fabric Bases */}
                <div className="p-4 sm:p-5 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-heritage-gold/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-heritage-charcoal dark:text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                      <span>2. Heirloom Fabric Bases ({fabrics.length})</span>
                    </span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {fabrics.map((fabric, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={fabric}
                          onChange={(e) => handleUpdateFabric(idx, e.target.value)}
                          className="flex-1 p-2 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-medium"
                          placeholder="Fabric Base Name"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteFabric(idx)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors cursor-pointer"
                          title="Delete fabric"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {fabrics.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic">No fabric options configured. Add one below.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-heritage-gold/15">
                    <input
                      type="text"
                      placeholder="Add new fabric base (e.g. Pure Tissue Silk)..."
                      value={newFabric}
                      onChange={(e) => setNewFabric(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFabric(); } }}
                      className="flex-1 p-2 rounded-xl border border-dashed border-heritage-gold/40 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddFabric}
                      disabled={!newFabric.trim()}
                      className="px-3.5 py-2 bg-heritage-crimson hover:bg-heritage-crimson/90 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* 3. Color Palette Swatches */}
                <div className="p-4 sm:p-5 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-heritage-gold/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-heritage-charcoal dark:text-white flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                      <span>3. Color Palette Swatches ({colors.length})</span>
                    </span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {colors.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-1.5 rounded-xl border border-heritage-gold/25 bg-white dark:bg-heritage-darkCard">
                        <input
                          type="color"
                          value={c.hex}
                          onChange={(e) => handleUpdateColor(idx, 'hex', e.target.value)}
                          className="w-7 h-7 rounded-lg border border-heritage-gold/40 cursor-pointer shrink-0 bg-transparent"
                          title="Choose color swatch"
                        />
                        <input
                          type="text"
                          value={c.hex}
                          onChange={(e) => handleUpdateColor(idx, 'hex', e.target.value)}
                          className="w-20 p-1 rounded-lg border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-[11px] font-mono uppercase"
                          placeholder="#HEX"
                        />
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => handleUpdateColor(idx, 'name', e.target.value)}
                          className="flex-1 p-1 rounded-lg border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs font-medium"
                          placeholder="Color Name"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteColor(idx)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                          title="Delete color"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {colors.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic">No colors configured. Add one below.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-heritage-gold/15">
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="w-7 h-7 rounded-lg border border-heritage-gold/40 cursor-pointer shrink-0 bg-transparent"
                      title="New color swatch"
                    />
                    <input
                      type="text"
                      placeholder="Color Name (e.g. Rani Pink)..."
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddColor(); } }}
                      className="flex-1 p-2 rounded-xl border border-dashed border-heritage-gold/40 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddColor}
                      disabled={!newColorName.trim()}
                      className="px-3.5 py-2 bg-heritage-crimson hover:bg-heritage-crimson/90 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* 4. Knot Pattern Complexity */}
                <div className="p-4 sm:p-5 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-heritage-gold/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-heritage-charcoal dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                      <span>4. Knot Pattern Complexity ({patterns.length})</span>
                    </span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {patterns.map((pattern, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={pattern}
                          onChange={(e) => handleUpdatePattern(idx, e.target.value)}
                          className="flex-1 p-2 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-medium"
                          placeholder="Pattern Name"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeletePattern(idx)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors cursor-pointer"
                          title="Delete pattern"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {patterns.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic">No patterns configured. Add one below.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-heritage-gold/15">
                    <input
                      type="text"
                      placeholder="Add new pattern (e.g. Floral Jaal Bandhej)..."
                      value={newPattern}
                      onChange={(e) => setNewPattern(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPattern(); } }}
                      className="flex-1 p-2 rounded-xl border border-dashed border-heritage-gold/40 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddPattern}
                      disabled={!newPattern.trim()}
                      className="px-3.5 py-2 bg-heritage-crimson hover:bg-heritage-crimson/90 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
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
            <div className="flex items-center justify-between border-b border-heritage-gold/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-heritage-crimson dark:text-heritage-gold" />
                  <span>Homepage "About Us" / Artisan Story & Heritage</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Fully customize the showcase photo, badge, headline, narrative, CTA button, and interactive workshop map card.
                </p>
              </div>
            </div>

            {/* 1. Left Showcase Photo */}
            <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/25">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-heritage-crimson dark:text-heritage-gold" />
                  <span>Section Showcase Photo (Left Column Image)</span>
                </label>
                {formData.about.image && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, image: '' }
                      })
                    }
                    className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>

              {formData.about.image && (
                <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-h-56 rounded-xl overflow-hidden bg-gray-100 border border-heritage-gold/30">
                  <img
                    src={formData.about.image}
                    alt="Story section preview"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute(
                        'src',
                        '/images/artisan-story.jpg'
                      );
                    }}
                  />
                </div>
              )}

              {/* Media Uploader */}
              <MediaUploader
                folder="cms"
                multiple={false}
                title="Upload or Choose Story Photo"
                onImagesSelected={(urls) => {
                  if (urls[0]) {
                    setFormData({
                      ...formData,
                      about: { ...formData.about, image: urls[0] }
                    });
                  }
                }}
              />

              {/* Direct URL Input */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Or Enter Direct Image URL
                </label>
                <input
                  type="text"
                  value={formData.about.image || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, image: e.target.value }
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-mono"
                />
              </div>

              {/* Quick Sample Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Presets:</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      about: {
                        ...formData.about,
                        image: '/images/artisan-story.jpg'
                      }
                    })
                  }
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-heritage-sand/50 hover:bg-heritage-sand text-heritage-charcoal dark:text-gray-200 border border-heritage-gold/30 cursor-pointer"
                >
                  Artisan Dyeing (Pink Silk)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      about: {
                        ...formData.about,
                        image: '/images/artisan-pot.jpg'
                      }
                    })
                  }
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-heritage-sand/50 hover:bg-heritage-sand text-heritage-charcoal dark:text-gray-200 border border-heritage-gold/30 cursor-pointer"
                >
                  Artisan at Dye Pot
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      about: {
                        ...formData.about,
                        image: '/images/artisan-knots.jpg'
                      }
                    })
                  }
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-heritage-sand/50 hover:bg-heritage-sand text-heritage-charcoal dark:text-gray-200 border border-heritage-gold/30 cursor-pointer"
                >
                  Bandhej Knots Untying
                </button>
              </div>
            </div>

            {/* 2. Headline & Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Section Badge / Eyebrow
                </label>
                <input
                  type="text"
                  value={formData.about.badge || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, badge: e.target.value }
                    })
                  }
                  placeholder="ABOUT US"
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Section Headline
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
                  placeholder="A Celebration of Tradition, Artistry & Timeless Elegance"
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            {/* 3. Story Narrative Paragraphs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Homepage Story Narrative (Paragraph 1)
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
                  About Page Narrative (Paragraph 2)
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

            {/* 4. CTA Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/25">
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.about.buttonText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, buttonText: e.target.value }
                    })
                  }
                  placeholder="Read Our Story"
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  CTA Button Link (Optional URL or Route)
                </label>
                <input
                  type="text"
                  value={formData.about.buttonLink || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, buttonLink: e.target.value }
                    })
                  }
                  placeholder="Leave empty for #/about, or enter URL"
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-mono"
                />
              </div>
            </div>

            {/* 5. Right Column: Workshop & Google Maps Destination Card */}
            <div className="p-5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/35 space-y-4">
              <div className="flex items-center justify-between border-b border-heritage-gold/20 pb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-heritage-crimson dark:text-heritage-gold" />
                  <span className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                    Right Column Workshop & Google Maps Location
                  </span>
                </div>
                {formData.about.locationMapUrl && (
                  <a
                    href={formData.about.locationMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-heritage-crimson dark:text-heritage-gold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Test Google Maps Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                    Workshop / City Name
                  </label>
                  <input
                    type="text"
                    value={formData.about.locationCity || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, locationCity: e.target.value }
                      })
                    }
                    placeholder="Bhadli"
                    className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={formData.about.locationState || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, locationState: e.target.value }
                      })
                    }
                    placeholder="Kutch, Gujarat"
                    className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                    Invitation / Callout Text (Replaces "The Artisan Heartland")
                  </label>
                  <input
                    type="text"
                    value={formData.about.locationTagline || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, locationTagline: e.target.value }
                      })
                    }
                    placeholder="Visit Our Heritage Atelier • Get Directions"
                    className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs"
                  />
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">
                    Displays below the map illustration and is clickable directly into Google Maps.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                    Google Maps Destination URL
                  </label>
                  <input
                    type="text"
                    value={formData.about.locationMapUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, locationMapUrl: e.target.value }
                      })
                    }
                    placeholder="https://maps.app.goo.gl/..."
                    className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard dark:text-white text-xs font-mono"
                  />
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">
                    Clicking on the map badge or invitation text opens this exact map location.
                  </span>
                </div>
              </div>
            </div>

            {/* 6. Quote & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Brand Quote (About Page)
                </label>
                <input
                  type="text"
                  value={formData.about.quoteText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, quoteText: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                  Quote Attribution
                </label>
                <input
                  type="text"
                  value={formData.about.quoteAuthor || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, quoteAuthor: e.target.value }
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white text-xs"
                />
              </div>
            </div>

            {/* 7. 3 Vision Pillars */}
            <div className="pt-4 border-t border-heritage-gold/20 space-y-4">
              <h4 className="font-serif font-bold text-sm text-heritage-crimson dark:text-heritage-gold flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>The 3 Vision Pillars (About Page)</span>
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
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Unified Contact Sync Active:</strong> Editing your WhatsApp number or Email here or in the <strong>Contact, Email & WhatsApp</strong> tab immediately updates every WhatsApp link, button, and email touchpoint site-wide.
                </span>
              </div>
            </div>

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
                { key: 'showCustomOrders', label: 'Bespoke Custom Orders Section', desc: 'Interactive customization studio for custom sarees, dupattas & fabrics' },
                { key: 'showCraftJourney', label: 'The Craft of Bandhej Simulation', desc: 'Traditional knot and dye process & techniques' },
                { key: 'showSimilarProducts', label: 'Handpicked Spotlight Products', desc: 'Top featured pieces spotlight on the homepage' },
                { key: 'showLookbook', label: 'Editorial Lookbook & Instagram Grid', desc: 'Editorial photoshoots and style storytelling' }
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
