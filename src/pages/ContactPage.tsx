import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { getWhatsAppDirectUrl, openWhatsAppDirect } from '../utils/whatsapp';
import {
  MapPin,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  Phone,
  HelpCircle,
  ChevronDown,
  Calendar,
  Globe2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

const FAQS = [
  {
    q: 'How long does a bespoke hand-tied Bandhani piece take to make?',
    a: 'Authentic Khatri Bandhani requires meticulous manual tying of thousands of microscopic knots (*bandhas*) followed by multi-stage natural or azo-free dyeing. Ready-to-ship pieces dispatch in 24-48 hours. Bespoke bridal sarees and custom-dyed kaftans typically take 25 to 45 business days depending on knot density and zari complexity.'
  },
  {
    q: 'Do you ship internationally (USA, UK, UAE, Canada, Australia)?',
    a: 'Yes, Bandhanu ships handcrafted heirlooms worldwide via DHL Express & FedEx International. International orders are securely packaged with authenticity certificates. Delivery takes 4-7 business days once dispatched.'
  },
  {
    q: 'Can I request a custom color palette or bridal customization?',
    a: 'Absolutely. We specialize in custom bridal Gharcholas, bespoke dupatta lengths, and specific heritage color dyeings (Sindoor Red, Jamnagari Mustard, Royal Indigo, Kutchrani Emerald). Connect with us directly on WhatsApp with your color reference swatches.'
  },
  {
    q: 'How can I verify the authenticity of Bandhanu Bandhej?',
    a: 'Every authentic Bandhani garment has characteristic puckered crinkles (*crush*) and microscopic knot imprints where the thread was tied by hand. Our products come unpressed or semi-pressed to preserve this signature handcrafted texture.'
  }
];

export const ContactPage: React.FC = () => {
  const { profile, setCurrentPage } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    interest: 'Bridal Gharchola Saree',
    timeline: 'Within 1-2 Months',
    message: ''
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const cleanPhone = profile.whatsappNumber.replace(/[^0-9]/g, '');

  const generatedWhatsAppMessage = `Hello Bandhanu Concierge! 👋

I would like to enquire about bespoke handcrafted Bandhani:

✦ Client Name: ${formData.name || '(Name)'}
✦ Phone / WhatsApp: ${formData.phone || '(Phone)'}
✦ Location: ${formData.city || '(City/Country)'}
✦ Interested Collection: ${formData.interest}
✦ Required Timeline: ${formData.timeline}
✦ Customization Notes: ${formData.message || 'Please share available designs, prices, and fabric details.'}

Looking forward to hearing from your master artisans!`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });

    openWhatsAppDirect(profile.whatsappNumber, generatedWhatsAppMessage);
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(profile.whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-heritage-cream dark:bg-heritage-darkSurface pb-24">
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-heritage-sand/40 via-heritage-cream to-transparent dark:from-heritage-darkCard/60 dark:via-heritage-darkSurface border-b border-heritage-gold/20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-heritage-gold/15 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-wider mb-4 border border-heritage-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jamnagar Artisan Concierge</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-heritage-charcoal dark:text-white tracking-tight leading-tight">
            Connect With Our Atelier
          </h1>

          <p className="mt-4 text-sm sm:text-base text-heritage-charcoal/75 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Whether you seek a custom bridal heirloom, personal style consultation, or worldwide export assistance, our artisan concierge is at your service.
          </p>

          {/* Quick Action Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={getWhatsAppDirectUrl(profile.whatsappNumber)}
              onClick={(e) => {
                e.preventDefault();
                openWhatsAppDirect(profile.whatsappNumber, 'Hello Bandhanu team! I would like to enquire about your handcrafted Bandhani collection.');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Instant WhatsApp Chat</span>
            </a>
            <button
              onClick={() => setCurrentPage('catalogue')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-heritage-darkCard border border-heritage-gold/40 text-heritage-charcoal dark:text-white font-medium text-xs sm:text-sm hover:border-heritage-gold transition-colors"
            >
              <span>Explore Catalogue First</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Atelier Information & Studio Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-lg space-y-6">
              <div className="border-b border-heritage-gold/20 pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-crimson dark:text-heritage-gold">
                  Flagship Workshop
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-heritage-charcoal dark:text-white mt-1">
                  {profile.businessName} Atelier
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-rose-500/10 text-heritage-crimson shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-heritage-charcoal dark:text-white font-semibold">
                      Studio Address
                    </strong>
                    <p className="text-heritage-charcoal/70 dark:text-gray-400 mt-0.5 leading-relaxed">
                      {profile.address}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-heritage-crimson dark:text-heritage-gold font-bold mt-2 hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-heritage-charcoal dark:text-white font-semibold">
                      WhatsApp Hotline
                    </strong>
                    <p className="text-heritage-charcoal/70 dark:text-gray-400 mt-0.5 font-mono">
                      {profile.whatsappNumber}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href={getWhatsAppDirectUrl(profile.whatsappNumber)}
                        onClick={(e) => {
                          e.preventDefault();
                          openWhatsAppDirect(profile.whatsappNumber, 'Hello Bandhanu team! I am looking for assistance.');
                        }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                      >
                        Start Chatting ➔
                      </a>
                      <button
                        onClick={handleCopyNumber}
                        className="text-xs text-heritage-charcoal/60 dark:text-gray-400 hover:text-heritage-crimson transition-colors"
                      >
                        {copied ? '✓ Copied!' : 'Copy Number'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-heritage-charcoal dark:text-white font-semibold">
                      Email Inquiries
                    </strong>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-heritage-charcoal/70 dark:text-gray-400 mt-0.5 block hover:text-heritage-crimson dark:hover:text-heritage-gold font-mono"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-heritage-charcoal dark:text-white font-semibold">
                      Visiting & Consultation Hours
                    </strong>
                    <p className="text-heritage-charcoal/70 dark:text-gray-400 mt-0.5">
                      Monday to Saturday: 10:30 AM – 8:00 PM IST
                    </p>
                    <span className="text-[11px] text-heritage-gold font-medium">
                      Studio visits by prior appointment recommended
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Worldwide Delivery Highlight */}
            <div className="p-5 rounded-3xl bg-heritage-sand/30 dark:bg-heritage-darkCard/50 border border-heritage-gold/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-heritage-gold/20 text-heritage-gold flex items-center justify-center shrink-0">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm">
                <strong className="block text-heritage-charcoal dark:text-white font-serif">
                  Global Doorstep Delivery
                </strong>
                <p className="text-heritage-charcoal/70 dark:text-gray-400">
                  Fully insured express shipping across USA, UK, UAE, Canada, Singapore & Australia.
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-5 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/20">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-charcoal/60 dark:text-gray-400 block mb-3">
                Follow Behind The Craft
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://instagram.com/${profile.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-heritage-sand/40 dark:bg-heritage-darkSurface hover:bg-heritage-crimson hover:text-white text-heritage-charcoal dark:text-white text-xs font-semibold text-center border border-heritage-gold/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Instagram {profile.instagramHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & WhatsApp Dispatcher */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-heritage-gold/20">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-heritage-charcoal dark:text-white">
                    Bespoke Inquiry & Order Request
                  </h3>
                  <p className="text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300 mt-0.5">
                    Fill the details to launch a pre-formatted direct WhatsApp consultation.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Online on WhatsApp</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Merchant"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white focus:outline-none focus:ring-2 focus:ring-heritage-crimson/30 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white focus:outline-none focus:ring-2 focus:ring-heritage-crimson/30 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                      Your City / Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, India / London, UK"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white focus:outline-none focus:ring-2 focus:ring-heritage-crimson/30 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                      Required Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white focus:outline-none focus:ring-2 focus:ring-heritage-crimson/30 text-sm"
                    >
                      <option value="Ready to Ship (Immediate)">Ready to Ship (Immediate)</option>
                      <option value="Within 2-3 Weeks">Within 2-3 Weeks</option>
                      <option value="Within 1-2 Months">Within 1-2 Months (Bridal Order)</option>
                      <option value="Exploring for Wedding Season">Exploring for Wedding Season</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                    Garment / Craft of Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white focus:outline-none focus:ring-2 focus:ring-heritage-crimson/30 text-sm"
                  >
                    <option value="Bridal Gharchola Saree (Pure Georgette)">Bridal Gharchola Saree (Pure Georgette)</option>
                    <option value="Shikargah Royal Heritage Saree">Shikargah Royal Heritage Saree</option>
                    <option value="Pure Katan Silk Dupatta (Heavy Zari)">Pure Katan Silk Dupatta (Heavy Zari)</option>
                    <option value="Modal Silk Bandhani Stole">Modal Silk Bandhani Stole</option>
                    <option value="Handmade Bandhani Garment / Kaftan">Handmade Bandhani Garment / Kaftan</option>
                    <option value="Raw Unstitched Bandhani Fabric (Running Yards)">Raw Unstitched Bandhani Fabric (Running Yards)</option>
                    <option value="Custom Bespoke Color Dyeing">Custom Bespoke Color Dyeing</option>
                    <option value="Wholesale / Boutique Sourcing">Wholesale / Boutique Sourcing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-heritage-charcoal dark:text-gray-200 uppercase tracking-wider mb-1">
                    Custom Notes / Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specific color shades (e.g. Sindoor Red, Rani Pink), zari preference, or blouse requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-sand/15 dark:bg-heritage-darkSurface dark:text-white focus:outline-none focus:ring-2 focus:ring-heritage-crimson/30 text-sm resize-none"
                  />
                </div>

                {/* Live Message Preview */}
                <div className="p-3.5 rounded-2xl bg-heritage-sand/30 dark:bg-heritage-darkSurface border border-heritage-gold/25">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-charcoal/60 dark:text-gray-400">
                      Live WhatsApp Preview
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Formatted for 1-Tap Send
                    </span>
                  </div>
                  <pre className="text-xs font-mono text-heritage-charcoal/80 dark:text-gray-300 whitespace-pre-wrap max-h-28 overflow-y-auto bg-white/70 dark:bg-black/20 p-2.5 rounded-xl border border-heritage-gold/15">
                    {generatedWhatsAppMessage}
                  </pre>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Consultation to WhatsApp</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>

                <p className="text-[11px] text-center text-heritage-charcoal/60 dark:text-gray-400">
                  ⚡ Directly opens WhatsApp on your phone or web. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-12 border-t border-heritage-gold/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-heritage-crimson dark:text-heritage-gold">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-charcoal dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-heritage-gold/25 bg-white dark:bg-heritage-darkCard overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-serif font-semibold text-sm sm:text-base text-heritage-charcoal dark:text-white hover:text-heritage-crimson transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-heritage-gold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-heritage-charcoal/75 dark:text-gray-300 border-t border-heritage-gold/15 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
