import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  MessageCircle,
  Save,
  CheckCircle,
  Download,
  Upload,
  RefreshCw,
  Phone,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const BusinessSettings: React.FC = () => {
  const {
    profile,
    updateProfile,
    products,
    exportDatabase,
    importDatabase,
    resetToDemo
  } = useStore();

  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Sample product for live WhatsApp preview simulation
  const sampleProduct = products[0] || {
    title: 'Royal Shikargah Gharchola Gajji Silk Saree',
    sku: 'BD-GHR-091',
    price: 24500,
    colors: [{ name: 'Sindoor Crimson & Gold' }]
  };

  // Generate simulated message in real time
  const sampleColor = sampleProduct.colors[0]?.name || 'Sindoor Crimson';
  const samplePrice = `${formData.currencySymbol}${sampleProduct.price.toLocaleString('en-IN')}`;
  const sampleUrl = 'https://bandhanu.com/#product-sample';

  let renderedPreview = formData.customMessageTemplate || '';
  renderedPreview = renderedPreview.replace(/{product_name}/g, sampleProduct.title);
  renderedPreview = renderedPreview.replace(/{sku}/g, sampleProduct.sku);
  renderedPreview = renderedPreview.replace(/{price}/g, samplePrice);
  renderedPreview = renderedPreview.replace(/{color}/g, sampleColor);
  renderedPreview = renderedPreview.replace(/{url}/g, sampleUrl);

  const insertToken = (token: string) => {
    setFormData(prev => ({
      ...prev,
      customMessageTemplate: prev.customMessageTemplate + token
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadBackup = () => {
    const data = exportDatabase();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bandhanu_catalogue_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const text = event.target?.result as string;
        const success = importDatabase(text);
        if (success) {
          setImportStatus('Catalogue imported successfully!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          alert('Invalid backup JSON format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-xs max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-heritage-charcoal dark:text-white">
            WhatsApp & Business Orchestrator
          </h2>
          <p className="text-xs text-heritage-charcoal/60 dark:text-gray-400">
            Configure order reception telephone, dynamic pre-filled order templates, and brand details
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 font-semibold flex items-center gap-1.5 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: WhatsApp Configuration & Live Simulator */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-heritage-gold/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                  WhatsApp Commerce Configuration
                </h3>
                <p className="text-[11px] text-gray-500">
                  Every "Enquire on WhatsApp" button on the customer website directs orders here
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${formData.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello! Testing WhatsApp integration.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 flex items-center gap-1 font-semibold"
            >
              <span>Test Live Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Fields (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                    WhatsApp Number (International format without '+') *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 919876543210"
                    value={formData.whatsappNumber}
                    onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface font-mono font-bold text-heritage-charcoal dark:text-white"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Format: Country code + digits (India: 919876543210)
                  </span>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                    Display Phone (Formatted for customers)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.displayPhone}
                    onChange={e => setFormData({ ...formData, displayPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-heritage-charcoal dark:text-gray-200">
                    Dynamic Order Enquiry Message Template:
                  </label>
                  <span className="text-[10px] text-gray-400">Click tokens to insert</span>
                </div>

                {/* Token Buttons */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[
                    { token: '{product_name}', label: 'Product Name' },
                    { token: '{sku}', label: 'SKU' },
                    { token: '{price}', label: 'Price' },
                    { token: '{color}', label: 'Selected Color' },
                    { token: '{url}', label: 'Product URL' }
                  ].map(t => (
                    <button
                      key={t.token}
                      type="button"
                      onClick={() => insertToken(t.token)}
                      className="px-2 py-1 rounded-lg bg-heritage-gold/15 hover:bg-heritage-gold/30 text-heritage-crimson dark:text-heritage-gold font-mono text-[10px] font-semibold border border-heritage-gold/30 transition-all"
                    >
                      +{t.label}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={6}
                  value={formData.customMessageTemplate}
                  onChange={e => setFormData({ ...formData, customMessageTemplate: e.target.value })}
                  className="w-full p-3 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface font-mono text-heritage-charcoal dark:text-white leading-relaxed resize-none"
                />
              </div>
            </div>

            {/* Right: Live Interactive Smartphone WhatsApp Simulator (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border-4 border-gray-800 bg-[#0c1317] text-white shadow-2xl overflow-hidden max-w-sm mx-auto">
                {/* Simulated Phone Top Header */}
                <div className="bg-[#005c4b] p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-heritage-crimson border border-heritage-gold flex items-center justify-center font-bold text-heritage-gold text-xs">
                    BD
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs leading-tight">{formData.businessName}</div>
                    <div className="text-[9px] text-emerald-200">online • Official Business Account</div>
                  </div>
                  <Phone className="w-4 h-4 text-emerald-200" />
                </div>

                {/* Simulated WhatsApp Chat Canvas */}
                <div className="p-3.5 bg-[#0b141a] min-h-[260px] flex flex-col justify-end space-y-2">
                  <div className="p-1 px-2.5 rounded-lg bg-[#182229] text-[9px] text-gray-400 text-center mx-auto border border-white/5">
                    Messages are end-to-end encrypted
                  </div>

                  {/* Customer Sent Message Bubble */}
                  <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-xs text-[11px] font-sans leading-relaxed shadow-md whitespace-pre-line ml-4 border border-emerald-400/20">
                    {renderedPreview}
                    <div className="text-right text-[8px] text-emerald-200 mt-1">
                      12:30 PM ✓✓
                    </div>
                  </div>
                </div>

                {/* Simulated Chat Input Bar */}
                <div className="p-2 bg-[#1f2c34] flex items-center justify-between text-[11px] text-gray-400">
                  <span>Type a message...</span>
                  <div className="w-6 h-6 rounded-full bg-[#00a884] text-white flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-center text-gray-500 mt-2">
                Live simulation of what your buyer sees in WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: General Business Profile */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-4">
          <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white pb-2 border-b border-heritage-gold/20">
            Brand Identity & Location Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Business Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Currency Symbol</label>
              <select
                value={formData.currencySymbol}
                onChange={e => setFormData({ ...formData, currencySymbol: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface cursor-pointer"
              >
                <option value="₹">₹ (INR - Indian Rupee)</option>
                <option value="$">$ (USD - US Dollar)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - British Pound)</option>
                <option value="AED ">AED (UAE Dirham)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Instagram Handle</label>
              <input
                type="text"
                value={formData.instagramHandle}
                onChange={e => setFormData({ ...formData, instagramHandle: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Concierge Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Studio Atelier Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-heritage-crimson to-heritage-ruby text-white font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Business Settings</span>
            </button>
          </div>
        </div>
      </form>

      {/* Section 3: Catalogue Backup & Data Portability */}
      <div className="p-6 rounded-3xl bg-heritage-sand/40 dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white pb-2 border-b border-heritage-gold/20 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Catalogue Backup & Portability</span>
        </h3>

        <p className="text-gray-500">
          Export your entire product catalogue, categories, banners, and WhatsApp logs as a secure JSON backup. You can import it on any device anytime.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="px-4 py-2 rounded-xl bg-white dark:bg-heritage-darkSurface border border-heritage-gold/40 text-heritage-charcoal dark:text-white font-semibold flex items-center gap-2 shadow-xs hover:bg-heritage-sand"
          >
            <Download className="w-4 h-4 text-heritage-crimson" />
            <span>Download Catalogue JSON Backup</span>
          </button>

          <label className="px-4 py-2 rounded-xl bg-white dark:bg-heritage-darkSurface border border-heritage-gold/40 text-heritage-charcoal dark:text-white font-semibold flex items-center gap-2 shadow-xs hover:bg-heritage-sand cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Import / Restore Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (confirm('Reset entire catalogue to default seed data? All custom products will be restored to initial state.')) {
                resetToDemo();
              }
            }}
            className="px-4 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset to Factory Showcase</span>
          </button>
        </div>

        {importStatus && (
          <div className="text-emerald-600 font-semibold pt-1">
            {importStatus}
          </div>
        )}
      </div>
    </div>
  );
};
