import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useNotification } from '../../context/NotificationContext';
import { getWhatsAppDirectUrl } from '../../utils/whatsapp';
import {
  MessageCircle,
  Save,
  CheckCircle,
  Download,
  Upload,
  Phone,
  Mail,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  Copy,
  Check,
  Video,
  ShoppingBag,
  BellRing,
  MapPin,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BusinessSettings: React.FC = () => {
  const { alert: customAlert } = useNotification();
  const {
    profile,
    updateProfile,
    products,
    exportDatabase,
    importDatabase,
    dbStatus,
    setSupabaseCredentials
  } = useStore();

  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Supabase Cloud Configuration inputs
  const [supabaseUrl, setSupabaseUrl] = useState(() => {
    try {
      return localStorage.getItem('bandhanu_supabase_url') || '';
    } catch {
      return '';
    }
  });
  const [supabaseKey, setSupabaseKey] = useState(() => {
    try {
      return localStorage.getItem('bandhanu_supabase_anon_key') || '';
    } catch {
      return '';
    }
  });
  const [supabaseSaved, setSupabaseSaved] = useState(false);

  // Sync when profile updates
  React.useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  const handleSaveSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supabaseUrl && supabaseKey) {
      await setSupabaseCredentials(supabaseUrl, supabaseKey);
      setSupabaseSaved(true);
      setTimeout(() => setSupabaseSaved(false), 3000);
    }
  };

  // Sample product for live WhatsApp preview simulation
  const sampleProduct = products[0] || {
    title: 'Royal Shikargah Gharchola Gajji Silk Saree',
    sku: 'BD-GHR-091',
    price: 24500,
    colors: [{ name: 'Sindoor Crimson & Gold' }]
  };

  const sampleColor = sampleProduct.colors[0]?.name || 'Sindoor Crimson';
  const samplePrice = `${formData.currencySymbol || '₹'}${sampleProduct.price.toLocaleString('en-IN')}`;
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
    // Auto-clean whatsappNumber to digits only
    const cleanedNumber = formData.whatsappNumber.replace(/[^0-9]/g, '');
    const updated = {
      ...formData,
      whatsappNumber: cleanedNumber
    };
    setFormData(updated);
    updateProfile(updated);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
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
          setImportStatus('Catalogue & settings imported successfully!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          customAlert({
            title: 'Invalid Backup Format',
            message: 'The file you selected is not a valid Bandhanu JSON database backup. Please select a valid .json file.',
            variant: 'danger'
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const cleanPhone = formData.whatsappNumber.replace(/[^0-9]/g, '');
  const brand = formData.businessName || 'Bandhanu';

  // Active website links list for audit
  const touchpoints = [
    {
      id: 'announcement',
      name: 'Top Announcement Bar CTA',
      location: 'Top header marquee across all pages',
      icon: BellRing,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello ${brand}! I am contacting from the announcement on your website.`),
      type: 'WhatsApp'
    },
    {
      id: 'floating',
      name: 'Floating WhatsApp Concierge Widget',
      location: 'Bottom right floating button & chat popup on all pages',
      icon: MessageCircle,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello ${brand}! I am browsing your handcrafted collection and need assistance.`),
      type: 'WhatsApp'
    },
    {
      id: 'hero',
      name: 'Hero Banner WhatsApp CTA',
      location: 'Homepage main hero banner ("Enquire via WhatsApp")',
      icon: Sparkles,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello ${brand} Concierge! I am interested in your luxury handcrafted Bandhani collection.`),
      type: 'WhatsApp'
    },
    {
      id: 'product',
      name: 'Product Card & Detail Page Enquire',
      location: 'Every product card, modal, and detail page ("Enquire on WhatsApp")',
      icon: ShoppingBag,
      url: getWhatsAppDirectUrl(cleanPhone, renderedPreview),
      type: 'WhatsApp'
    },
    {
      id: 'bespoke',
      name: 'Custom Order Bespoke Commission',
      location: 'Homepage Bespoke Atelier Studio ("Discuss Custom Commission")',
      icon: Sparkles,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello ${brand} Bespoke Concierge! I would like to commission a custom Bandhani piece.`),
      type: 'WhatsApp'
    },
    {
      id: 'cart',
      name: 'Shopping Bag Checkout on WhatsApp',
      location: 'Cart slide-over drawer ("Checkout via WhatsApp")',
      icon: ShoppingBag,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello ${brand} Concierge! I would like to place an order for the items in my shopping bag.`),
      type: 'WhatsApp'
    },
    {
      id: 'walkthrough',
      name: 'Virtual Video Walkthrough Booking',
      location: 'Studio contact section ("Book Virtual Video Walkthrough")',
      icon: Video,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello! I would like to schedule a virtual video walkthrough of your Bandhani catalogue.`),
      type: 'WhatsApp'
    },
    {
      id: 'contact_page',
      name: 'Studio Contact Page Direct Chat',
      location: 'Dedicated Contact Page (/contact) hotline card',
      icon: Phone,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello ${brand} team! I am looking for assistance.`),
      type: 'WhatsApp'
    },
    {
      id: 'email_inquiry',
      name: 'Official Concierge Email Link',
      location: 'Contact Page, Home Contact Section & Footer (mailto:)',
      icon: Mail,
      url: `mailto:${formData.email}`,
      type: 'Email'
    },
    {
      id: 'not_found',
      name: '404 Page Concierge Rescue Link',
      location: 'Page not found fallback ("Connect with Concierge")',
      icon: Compass,
      url: getWhatsAppDirectUrl(cleanPhone, `Hello ${brand} Concierge! I was looking for a textile that could not be found.`),
      type: 'WhatsApp'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-xs max-w-6xl pb-16">
      {/* Top Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-heritage-darkCard via-heritage-darkSurface to-heritage-darkCard text-white border border-heritage-gold/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Centralized 1-Click Communications Hub</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Contact, Email & WhatsApp Command Center
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
            Edit your phone number, WhatsApp number, and official email once here. All buttons, product inquiry links, floating widgets, and email links across 100% of the website update immediately in real time.
          </p>
        </div>

        {/* Live Active Pill Badges */}
        <div className="flex flex-col sm:items-end gap-1.5 shrink-0 bg-white/5 p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Active WhatsApp:</span>
            <span className="font-mono font-bold text-emerald-400">+{cleanPhone || '919876543210'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Active Email:</span>
            <span className="font-mono font-bold text-amber-300">{formData.email || 'concierge@bandhanu.com'}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live site-wide sync active</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Success! Email, phone, and all WhatsApp links updated site-wide across all customer pages and cloud storage!</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">100% Synced</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Core Contact & Communication Coordinates */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-heritage-gold/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Phone className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                  1. Primary Contact Coordinates
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Enter your official coordinates. Any change here propagates to all customer buttons, footer, and contact cards instantly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={getWhatsAppDirectUrl(cleanPhone, 'Hello! Testing live WhatsApp direct integration.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 flex items-center gap-1.5 font-bold transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Test Live WhatsApp Chat</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. WhatsApp Number */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <label className="font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Number (Digits Only) *</span>
                </label>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Powers All Chats</span>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. 919876543210"
                value={formData.whatsappNumber}
                onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                className="w-full p-2.5 rounded-xl border border-emerald-500/30 bg-white dark:bg-heritage-darkSurface font-mono font-bold text-sm text-heritage-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <span className="text-[10px] text-gray-500 block leading-tight">
                Include country code without '+' or spaces (India: <strong>91</strong> + 10 digits).
              </span>
            </div>

            {/* 2. Display Phone */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-heritage-sand/20 dark:bg-heritage-darkSurface border border-heritage-gold/30">
              <div className="flex items-center justify-between">
                <label className="font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
                  <span>Display Phone (Customer-Facing)</span>
                </label>
                <span className="text-[10px] text-gray-400 font-medium">Text Display</span>
              </div>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={formData.displayPhone}
                onChange={e => setFormData({ ...formData, displayPhone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-white dark:bg-heritage-darkCard text-xs font-semibold text-heritage-charcoal dark:text-white"
              />
              <span className="text-[10px] text-gray-500 block leading-tight">
                Formatted with spaces/hyphens as shown to clients in cards & studio timings.
              </span>
            </div>

            {/* 3. Official Email */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center justify-between">
                <label className="font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>Concierge Email Address *</span>
                </label>
                <a
                  href={`mailto:${formData.email}`}
                  className="text-[10px] text-amber-700 dark:text-amber-400 font-bold hover:underline flex items-center gap-0.5"
                >
                  <span>Test mailto:</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <input
                type="email"
                required
                placeholder="concierge@bandhanu.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-amber-500/30 bg-white dark:bg-heritage-darkSurface font-mono text-xs font-bold text-heritage-charcoal dark:text-white"
              />
              <span className="text-[10px] text-gray-500 block leading-tight">
                Powers all email cards, contact page mailto links, and customer support.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-heritage-charcoal dark:text-gray-300">
                Business Brand Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-heritage-charcoal dark:text-gray-300">
                Instagram Handle
              </label>
              <input
                type="text"
                placeholder="@bandhanu"
                value={formData.instagramHandle}
                onChange={e => setFormData({ ...formData, instagramHandle: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-xs"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-heritage-charcoal dark:text-gray-300">
                Currency Symbol
              </label>
              <select
                value={formData.currencySymbol}
                onChange={e => setFormData({ ...formData, currencySymbol: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-xs cursor-pointer"
              >
                <option value="₹">₹ (INR - Indian Rupee)</option>
                <option value="$">$ (USD - US Dollar)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - British Pound)</option>
                <option value="AED ">AED (UAE Dirham)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 uppercase tracking-wider text-[11px] text-heritage-charcoal dark:text-gray-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-heritage-crimson dark:text-heritage-gold" />
              <span>Studio Atelier Physical Address</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface text-xs"
              placeholder="e.g. Artisan Heritage Atelier, Bhadli, Kutch - 370485, Gujarat, India"
            />
          </div>
        </div>

        {/* Section 2: WhatsApp Link Messages & Dynamic Templates + Live Simulator */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-heritage-gold/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-heritage-crimson text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-heritage-gold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                  2. Dynamic WhatsApp Order Enquiry Message Template
                </h3>
                <p className="text-[11px] text-gray-500">
                  When a customer clicks "Enquire on WhatsApp" on any product, this exact message is pre-filled automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Token Buttons & Textarea (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider text-[11px]">
                    Interactive Dynamic Tokens:
                  </label>
                  <span className="text-[10px] text-gray-400">Click a token to insert into template</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {[
                    { token: '{product_name}', label: 'Product Name' },
                    { token: '{sku}', label: 'SKU Code' },
                    { token: '{price}', label: 'Price' },
                    { token: '{color}', label: 'Selected Color' },
                    { token: '{url}', label: 'Live Page URL' }
                  ].map(t => (
                    <button
                      key={t.token}
                      type="button"
                      onClick={() => insertToken(t.token)}
                      className="px-2.5 py-1 rounded-xl bg-heritage-gold/15 hover:bg-heritage-gold/30 text-heritage-crimson dark:text-heritage-gold font-mono text-[11px] font-bold border border-heritage-gold/30 transition-all cursor-pointer"
                    >
                      +{t.label}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={8}
                  value={formData.customMessageTemplate}
                  onChange={e => setFormData({ ...formData, customMessageTemplate: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface font-mono text-xs text-heritage-charcoal dark:text-white leading-relaxed resize-none focus:outline-none focus:border-heritage-crimson"
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
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs leading-tight truncate">{formData.businessName || 'Bandhanu'}</div>
                    <div className="text-[9px] text-emerald-200">online • Official Concierge (+{cleanPhone})</div>
                  </div>
                  <Phone className="w-4 h-4 text-emerald-200 shrink-0" />
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
                      Just now ✓✓
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
                Live simulation of what buyer sees when inquiring on WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: 🌐 All Active Website Touchpoints (Live Test & Audit Matrix) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-heritage-gold/20">
            <div>
              <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>3. Live Audit: All Active WhatsApp & Email Links Across The Website</span>
              </h3>
              <p className="text-[11px] text-gray-500">
                Every touchpoint below is 100% connected to your number (<strong>+{cleanPhone}</strong>) and email (<strong>{formData.email}</strong>). Click any link to test live in a new tab.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/30 flex items-center gap-1 self-start sm:self-auto">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              <span>{touchpoints.length} Touchpoints Monitored</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {touchpoints.map((tp) => {
              const Icon = tp.icon;
              const isCopied = copiedLink === tp.id;
              return (
                <div
                  key={tp.id}
                  className="p-3.5 rounded-2xl bg-heritage-sand/15 dark:bg-heritage-darkSurface border border-heritage-gold/25 flex flex-col justify-between gap-3 hover:border-heritage-gold/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`p-2 rounded-xl text-white shrink-0 mt-0.5 ${tp.type === 'Email' ? 'bg-amber-600' : 'bg-[#25D366]'}`}>
                        <Icon className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div>
                        <strong className="text-xs text-heritage-charcoal dark:text-white font-bold block">
                          {tp.name}
                        </strong>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 block mt-0.5">
                          {tp.location}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                      tp.type === 'Email'
                        ? 'bg-amber-500/15 text-amber-700 border border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                    }`}>
                      {tp.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-heritage-gold/15 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(tp.url, tp.id)}
                      className="px-2.5 py-1 text-[10px] font-medium text-gray-500 hover:text-heritage-charcoal dark:text-gray-400 hover:bg-white dark:hover:bg-heritage-darkCard rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy Link'}</span>
                    </button>

                    <a
                      href={tp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                    >
                      <span>Test Live ↗</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Save Bar */}
        <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-heritage-darkSurface/95 backdrop-blur-md text-white border border-heritage-gold/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-gray-200">
              Ready to publish? Saving will update email, phone, and all WhatsApp links across the entire store.
            </span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save & Propagate Site-Wide</span>
          </button>
        </div>
      </form>

      {/* Section 4: Cloud Database & Backup Hub */}
      <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-heritage-gold/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                Database Engine & Supabase Cloud Sync
              </h3>
              <p className="text-[11px] text-gray-500">
                All catalogue products, categories, themes, and CMS content are persisted automatically.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {dbStatus === 'connected' ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase Live Sync Active</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-800 font-bold border border-teal-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Local Database Storage Active</span>
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSaveSupabase} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                Supabase Project URL
              </label>
              <input
                type="text"
                placeholder="https://your-project.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-heritage-charcoal dark:text-gray-200">
                Supabase Anon Key
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOi..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkSurface font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-gray-500">
              Enter your Supabase credentials to sync with your private cloud project across all devices.
            </span>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Database Connection</span>
            </button>
          </div>

          {supabaseSaved && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Supabase credentials saved successfully!</span>
            </div>
          )}
        </form>

        {/* Database Backup & Restore */}
        <div className="pt-4 border-t border-heritage-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-xs text-heritage-charcoal dark:text-white">
              Complete Website Backup & Restore (.json)
            </h4>
            <p className="text-[11px] text-gray-500">
              Export all products, categories, CMS content, and WhatsApp templates into an offline JSON snapshot.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="px-4 py-2 rounded-xl bg-heritage-sand/40 hover:bg-heritage-sand border border-heritage-gold/30 text-heritage-charcoal dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup</span>
            </button>

            <label className="px-4 py-2 rounded-xl bg-heritage-sand/40 hover:bg-heritage-sand border border-heritage-gold/30 text-heritage-charcoal dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Restore Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {importStatus && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
};
