import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CustomThemeSettings } from '../../types';
import {
  Palette,
  RotateCcw,
  Save,
  CheckCircle,
  Eye,
  Sliders,
  Type,
  Layout,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_THEMES: { name: string; desc: string; colors: Partial<CustomThemeSettings> }[] = [
  {
    name: 'Imperial Bandhanu (Default)',
    desc: 'Deep maroon, warm silk cream, and rich espresso charcoal',
    colors: {
      brandAccent: '#4A121A',
      brandAccentHover: '#380D13',
      pageBackground: '#FBF8F3',
      cardBackground: '#F5EFE6',
      borderColor: '#E2D7C7',
      textPrimary: '#241E1C',
      textMuted: '#6E6259',
      sections: {
        navbar: { bg: '', text: '' },
        hero: { bg: '', titleColor: '', btnBg: '', btnText: '' },
        categories: { bg: '', titleColor: '', cardBg: '' },
        featured: { bg: '', titleColor: '', cardBg: '' },
        craft: { bg: '', cardBg: '', titleColor: '', textColor: '' },
        story: { bg: '', cardBg: '', titleColor: '', textColor: '', btnBg: '' },
        instagram: { bg: '', titleColor: '' },
        footer: { bg: '#4A121A', textColor: '#F5EFE6' }
      }
    }
  },
  {
    name: 'Royal Indigo & Kutch Sand',
    desc: 'Traditional plant indigo, desert sand, and midnight accents',
    colors: {
      brandAccent: '#1E2B45',
      brandAccentHover: '#131C2E',
      pageBackground: '#F7F3EA',
      cardBackground: '#EFE7DA',
      borderColor: '#D8CDBE',
      textPrimary: '#191C22',
      textMuted: '#5C6270',
      sections: {
        navbar: { bg: '', text: '' },
        hero: { bg: '', titleColor: '', btnBg: '', btnText: '' },
        categories: { bg: '', titleColor: '', cardBg: '' },
        featured: { bg: '', titleColor: '', cardBg: '' },
        craft: { bg: '', cardBg: '', titleColor: '', textColor: '' },
        story: { bg: '', cardBg: '', titleColor: '', textColor: '', btnBg: '' },
        instagram: { bg: '', titleColor: '' },
        footer: { bg: '#1E2B45', textColor: '#F7F3EA' }
      }
    }
  },
  {
    name: 'Sunset Terracotta & Gold',
    desc: 'Auspicious Gujarati ochre, madder rust, and warm ivory',
    colors: {
      brandAccent: '#A6432D',
      brandAccentHover: '#8A321E',
      pageBackground: '#FFFDF9',
      cardBackground: '#FAF1E6',
      borderColor: '#E8D5C4',
      textPrimary: '#2B1E19',
      textMuted: '#785F54',
      sections: {
        navbar: { bg: '', text: '' },
        hero: { bg: '', titleColor: '', btnBg: '', btnText: '' },
        categories: { bg: '', titleColor: '', cardBg: '' },
        featured: { bg: '', titleColor: '', cardBg: '' },
        craft: { bg: '', cardBg: '', titleColor: '', textColor: '' },
        story: { bg: '', cardBg: '', titleColor: '', textColor: '', btnBg: '' },
        instagram: { bg: '', titleColor: '' },
        footer: { bg: '#8A321E', textColor: '#FFFDF9' }
      }
    }
  },
  {
    name: 'Forest Emerald & Silk',
    desc: 'Royal Kathiawari emerald green, champagne gold, and raw silk',
    colors: {
      brandAccent: '#1A5336',
      brandAccentHover: '#113A25',
      pageBackground: '#FAF7EE',
      cardBackground: '#F0EAD8',
      borderColor: '#DCD4BE',
      textPrimary: '#18241C',
      textMuted: '#586A5E',
      sections: {
        navbar: { bg: '', text: '' },
        hero: { bg: '', titleColor: '', btnBg: '', btnText: '' },
        categories: { bg: '', titleColor: '', cardBg: '' },
        featured: { bg: '', titleColor: '', cardBg: '' },
        craft: { bg: '', cardBg: '', titleColor: '', textColor: '' },
        story: { bg: '', cardBg: '', titleColor: '', textColor: '', btnBg: '' },
        instagram: { bg: '', titleColor: '' },
        footer: { bg: '#113A25', textColor: '#FAF7EE' }
      }
    }
  }
];

export const ThemeCustomizer: React.FC = () => {
  const { theme, updateTheme, resetTheme, siteContent, updateSiteContent } = useStore();

  const [formData, setFormData] = useState<CustomThemeSettings>(theme);
  const [activeTab, setActiveTab] = useState<'global' | 'sections' | 'presets'>('global');
  const [openSectionAccordion, setOpenSectionAccordion] = useState<string | null>('craft');
  const [savedToast, setSavedToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync with store theme updates
  React.useEffect(() => {
    setFormData(theme);
  }, [theme]);

  const handleGlobalColorChange = (key: keyof Omit<CustomThemeSettings, 'sections'>, value: string) => {
    const updated = {
      ...formData,
      [key]: value
    };
    setFormData(updated);
    updateTheme(updated); // Instant live preview
  };

  const handleSectionColorChange = (
    sectionName: keyof CustomThemeSettings['sections'],
    propName: string,
    value: string
  ) => {
    const updated = {
      ...formData,
      sections: {
        ...formData.sections,
        [sectionName]: {
          ...(formData.sections[sectionName] || {}),
          [propName]: value
        }
      }
    };
    setFormData(updated);
    updateTheme(updated); // Instant live preview
  };

  const handleApplyPreset = (presetColors: Partial<CustomThemeSettings>) => {
    const merged = {
      ...formData,
      ...presetColors,
      sections: {
        ...formData.sections,
        ...(presetColors.sections || {})
      }
    };
    setFormData(merged as CustomThemeSettings);
    updateTheme(merged);
  };

  const handleResetToDefault = () => {
    resetTheme();
    if (PRESET_THEMES[0]) {
      setFormData(PRESET_THEMES[0].colors as CustomThemeSettings);
    }
  };

  const handlePublishTheme = async () => {
    setIsSaving(true);
    try {
      await updateSiteContent({
        ...siteContent,
        theme: formData
      });
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 }
      });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (err) {
      console.error('Failed to publish theme:', err);
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
            <Palette className="w-3.5 h-3.5" />
            <span>Granular Color & Theme Studio</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Custom Website Theme & Section Color Changer
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-xl">
            Fine-tune global typography, text colors, background tones, and individually override colors for any specific section (Hero, Craft, Story, Categories, Footer).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetToDefault}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Colors</span>
          </button>

          <button
            onClick={handlePublishTheme}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing...' : 'Publish Theme Live'}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {savedToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Custom theme and color palette published live across all devices!</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">Status: 200 OK</span>
        </div>
      )}

      {/* Studio Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-heritage-gold/20">
        <button
          onClick={() => setActiveTab('global')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'global'
              ? 'bg-heritage-crimson text-white shadow-md'
              : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 border border-heritage-gold/30'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>1. Global Colors (Text & Canvas)</span>
        </button>

        <button
          onClick={() => setActiveTab('sections')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'sections'
              ? 'bg-heritage-crimson text-white shadow-md'
              : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 border border-heritage-gold/30'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>2. Single Section Color Overrides</span>
        </button>

        <button
          onClick={() => setActiveTab('presets')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-heritage-crimson text-white shadow-md'
              : 'bg-white dark:bg-heritage-darkCard text-heritage-charcoal dark:text-gray-300 border border-heritage-gold/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>3. Curated Heritage Presets</span>
        </button>
      </div>

      {/* TAB 1: GLOBAL TEXT & CANVAS COLORS */}
      {activeTab === 'global' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-8 space-y-6">
            {/* Typography Colors */}
            <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-heritage-charcoal dark:text-white">
                <Type className="w-4 h-4 text-heritage-gold" />
                <h4>Global Typography Colors</h4>
              </div>
              <p className="text-xs text-gray-500">
                Change headline and body text colors across the entire website.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Primary Text Color */}
                <div className="p-3.5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                      Primary Text Color
                    </label>
                    <span className="text-[10px] text-gray-400">Headings, titles, prices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.textPrimary || '#241E1C'}
                      onChange={(e) => handleGlobalColorChange('textPrimary', e.target.value)}
                      className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.textPrimary || '#241E1C'}
                      onChange={(e) => handleGlobalColorChange('textPrimary', e.target.value)}
                      className="w-20 text-xs font-mono px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-heritage-darkCard"
                    />
                  </div>
                </div>

                {/* Secondary / Muted Text Color */}
                <div className="p-3.5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                      Muted Text Color
                    </label>
                    <span className="text-[10px] text-gray-400">Subtitles, captions, copy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.textMuted || '#6E6259'}
                      onChange={(e) => handleGlobalColorChange('textMuted', e.target.value)}
                      className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.textMuted || '#6E6259'}
                      onChange={(e) => handleGlobalColorChange('textMuted', e.target.value)}
                      className="w-20 text-xs font-mono px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-heritage-darkCard"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas, Surfaces & Accent Colors */}
            <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-heritage-charcoal dark:text-white">
                <Sliders className="w-4 h-4 text-heritage-gold" />
                <h4>Surfaces, Accents & Borders</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Page Background */}
                <div className="p-3.5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                      Page Canvas Background
                    </label>
                    <span className="text-[10px] text-gray-400">Main background body</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.pageBackground || '#FBF8F3'}
                      onChange={(e) => handleGlobalColorChange('pageBackground', e.target.value)}
                      className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.pageBackground || '#FBF8F3'}
                      onChange={(e) => handleGlobalColorChange('pageBackground', e.target.value)}
                      className="w-20 text-xs font-mono px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-heritage-darkCard"
                    />
                  </div>
                </div>

                {/* Card Background */}
                <div className="p-3.5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                      Card / Panel Tone
                    </label>
                    <span className="text-[10px] text-gray-400">Containers & sections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.cardBackground || '#F5EFE6'}
                      onChange={(e) => handleGlobalColorChange('cardBackground', e.target.value)}
                      className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.cardBackground || '#F5EFE6'}
                      onChange={(e) => handleGlobalColorChange('cardBackground', e.target.value)}
                      className="w-20 text-xs font-mono px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-heritage-darkCard"
                    />
                  </div>
                </div>

                {/* Brand Primary Accent (Buttons) */}
                <div className="p-3.5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                      Brand Accent (CTA Buttons)
                    </label>
                    <span className="text-[10px] text-gray-400">Solid buttons & active tags</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.brandAccent || '#4A121A'}
                      onChange={(e) => handleGlobalColorChange('brandAccent', e.target.value)}
                      className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.brandAccent || '#4A121A'}
                      onChange={(e) => handleGlobalColorChange('brandAccent', e.target.value)}
                      className="w-20 text-xs font-mono px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-heritage-darkCard"
                    />
                  </div>
                </div>

                {/* Delicate Border Color */}
                <div className="p-3.5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                      Divider & Border Line
                    </label>
                    <span className="text-[10px] text-gray-400">Card outlines & thread lines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.borderColor || '#E2D7C7'}
                      onChange={(e) => handleGlobalColorChange('borderColor', e.target.value)}
                      className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.borderColor || '#E2D7C7'}
                      onChange={(e) => handleGlobalColorChange('borderColor', e.target.value)}
                      className="w-20 text-xs font-mono px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-heritage-darkCard"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Mini Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 p-5 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Live Color Preview
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Sample Component Preview Card */}
              <div
                style={{
                  backgroundColor: formData.pageBackground,
                  borderColor: formData.borderColor
                }}
                className="p-4 rounded-2xl border transition-colors duration-300 space-y-3"
              >
                <div
                  style={{
                    backgroundColor: formData.cardBackground,
                    borderColor: formData.borderColor
                  }}
                  className="p-3.5 rounded-xl border space-y-2"
                >
                  <span
                    style={{ color: formData.brandAccent }}
                    className="text-[10px] font-bold uppercase tracking-widest block"
                  >
                    Sample Component
                  </span>
                  <h5
                    style={{ color: formData.textPrimary }}
                    className="font-serif font-bold text-base leading-tight"
                  >
                    Where Heritage Meets Style
                  </h5>
                  <p
                    style={{ color: formData.textMuted }}
                    className="text-xs leading-relaxed"
                  >
                    Hand-tied micro Rai Bandhej in pure Mulberry silk.
                  </p>
                  <button
                    style={{
                      backgroundColor: formData.brandAccent,
                      color: '#FFFFFF'
                    }}
                    className="w-full py-2 rounded-md text-xs font-semibold uppercase tracking-wider shadow-xs"
                  >
                    Explore Collection →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPECIFIC SINGLE-SECTION COLOR OVERRIDES */}
      {activeTab === 'sections' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs">
            💡 <strong>Granular Section Control:</strong> Want only the <em>Craft Section</em> or <em>Story Section</em> to have a different background or title color? Set custom colors below. Leave any field empty to inherit the global theme!
          </div>

          {/* Section Overrides Accordion List */}
          {[
            {
              id: 'craft',
              title: 'Our Craft Section ("The Journey of a Hand-Tied Dot")',
              controls: [
                { key: 'bg', label: 'Section Outer Background', desc: 'Main section container tone' },
                { key: 'cardBg', label: 'Craft Card Inner Background', desc: 'Box containing the 3-step photography' },
                { key: 'titleColor', label: 'Craft Section Headline Color', desc: '"The Journey of a Hand-Tied Dot" title' },
                { key: 'textColor', label: 'Craft Section Body Text Color', desc: 'Paragraphs & descriptions' }
              ]
            },
            {
              id: 'story',
              title: 'Our Story Section ("Rooted in Bhadli, Kutch")',
              controls: [
                { key: 'bg', label: 'Section Outer Background', desc: 'Outer spacing' },
                { key: 'cardBg', label: 'Story Panel Background', desc: 'Warm panel behind artisan & map' },
                { key: 'titleColor', label: 'Story Headline Color', desc: '"Rooted in Bhadli, Kutch" title' },
                { key: 'textColor', label: 'Story Paragraph Color', desc: 'Narrative body text' },
                { key: 'btnBg', label: 'Read Story Button Background', desc: 'Button color' }
              ]
            },
            {
              id: 'hero',
              title: 'Hero Section Banner',
              controls: [
                { key: 'bg', label: 'Hero Background Color', desc: 'Base color behind photography' },
                { key: 'titleColor', label: 'Main Headline Color', desc: '"Where Heritage Meets Style" title' },
                { key: 'btnBg', label: 'Explore Collection Button Color', desc: 'Primary CTA button' },
                { key: 'btnText', label: 'Button Text Color', desc: 'Text inside button' }
              ]
            },
            {
              id: 'categories',
              title: 'Shop by Category Section',
              controls: [
                { key: 'bg', label: 'Section Background Color', desc: 'Background around the 4 category cards' },
                { key: 'titleColor', label: 'Section Title Color', desc: '"Explore Our Collection" title' },
                { key: 'cardBg', label: 'Category Card Background', desc: 'Surface behind each category image' }
              ]
            },
            {
              id: 'featured',
              title: 'Featured Collection ("Handpicked For You")',
              controls: [
                { key: 'bg', label: 'Section Background Color', desc: 'Background behind products grid' },
                { key: 'titleColor', label: 'Section Title Color', desc: '"Handpicked For You" title' },
                { key: 'cardBg', label: 'Product Card Background', desc: 'Card backdrop' }
              ]
            },
            {
              id: 'footer',
              title: 'Website Footer',
              controls: [
                { key: 'bg', label: 'Footer Background Color', desc: 'Solid bottom footer background' },
                { key: 'textColor', label: 'Footer Text & Links Color', desc: 'Typography and copyright color' }
              ]
            }
          ].map((sec) => {
            const isOpen = openSectionAccordion === sec.id;
            const secData = (formData.sections as any)[sec.id] || {};

            return (
              <div
                key={sec.id}
                className="rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenSectionAccordion(isOpen ? null : sec.id)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-heritage-sand/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-heritage-crimson/10 text-heritage-crimson flex items-center justify-center font-bold text-xs">
                      {sec.id.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-heritage-charcoal dark:text-white">
                        {sec.title}
                      </h4>
                      <span className="text-[11px] text-gray-400">
                        {Object.values(secData).filter(Boolean).length > 0
                          ? `Customized (${Object.values(secData).filter(Boolean).length} overrides active)`
                          : 'Inheriting global colors'}
                      </span>
                    </div>
                  </div>

                  {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>

                {isOpen && (
                  <div className="p-5 pt-2 border-t border-heritage-gold/15 bg-heritage-sand/10 space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {sec.controls.map((ctrl) => {
                        const val = secData[ctrl.key] || '';
                        return (
                          <div
                            key={ctrl.key}
                            className="p-3.5 rounded-2xl bg-white dark:bg-heritage-darkSurface border border-heritage-gold/20 flex items-center justify-between"
                          >
                            <div className="pr-2">
                              <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200">
                                {ctrl.label}
                              </label>
                              <span className="text-[10px] text-gray-400">{ctrl.desc}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <input
                                type="color"
                                value={val || '#FFFFFF'}
                                onChange={(e) => handleSectionColorChange(sec.id as any, ctrl.key, e.target.value)}
                                className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer p-0.5"
                              />
                              <input
                                type="text"
                                placeholder="Inherit"
                                value={val}
                                onChange={(e) => handleSectionColorChange(sec.id as any, ctrl.key, e.target.value)}
                                className="w-20 text-xs font-mono px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-heritage-darkCard"
                              />
                              {val && (
                                <button
                                  onClick={() => handleSectionColorChange(sec.id as any, ctrl.key, '')}
                                  className="text-[10px] text-rose-600 hover:underline"
                                  title="Reset this property to default"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: CURATED PRESETS */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PRESET_THEMES.map((preset, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                  {preset.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{preset.desc}</p>

                {/* Color Swatch Dots */}
                <div className="flex items-center gap-2 mt-3">
                  <span
                    style={{ backgroundColor: preset.colors.brandAccent }}
                    className="w-7 h-7 rounded-full shadow-xs border border-white"
                    title="Brand Accent"
                  />
                  <span
                    style={{ backgroundColor: preset.colors.pageBackground }}
                    className="w-7 h-7 rounded-full shadow-xs border border-gray-300"
                    title="Page Background"
                  />
                  <span
                    style={{ backgroundColor: preset.colors.cardBackground }}
                    className="w-7 h-7 rounded-full shadow-xs border border-gray-300"
                    title="Card Background"
                  />
                  <span
                    style={{ backgroundColor: preset.colors.textPrimary }}
                    className="w-7 h-7 rounded-full shadow-xs border border-white"
                    title="Text Primary"
                  />
                </div>
              </div>

              <button
                onClick={() => handleApplyPreset(preset.colors)}
                className="w-full py-2.5 rounded-xl bg-heritage-sand/60 hover:bg-heritage-crimson hover:text-white text-heritage-charcoal dark:text-gray-200 text-xs font-semibold transition-all cursor-pointer border border-heritage-gold/30"
              >
                Apply This Palette
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
