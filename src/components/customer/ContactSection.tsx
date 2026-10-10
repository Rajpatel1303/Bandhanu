import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  MapPin,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { profile } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Bridal Gharchola Saree',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 }
    });

    const text = `Hello Bandhanu Team! 👋

I would like to enquire about bespoke handcrafted clothing:

✦ Name: ${formData.name}
✦ Phone: ${formData.phone}
✦ Interest: ${formData.interest}
✦ Note: ${formData.message || 'Please provide details on catalogue availability and bridal customization.'}

Looking forward to connecting with your master artisans!`;

    const url = `https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', interest: 'Bridal Gharchola Saree', message: '' });
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-20 bg-heritage-sand/20 dark:bg-heritage-darkCard/30 border-b border-heritage-gold/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-gold/15 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Studio Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white">
            Connect With Our Jamnagar Studio
          </h2>
          <p className="mt-2 text-sm text-heritage-charcoal/75 dark:text-gray-300">
            For bespoke bridal trousseau consultations, custom dye palettes, or international shipping assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Studio Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl bg-white dark:bg-heritage-darkSurface border border-heritage-gold/30 shadow-md space-y-5">
              <h3 className="font-serif font-bold text-xl text-heritage-charcoal dark:text-white pb-3 border-b border-heritage-gold/20">
                {profile.businessName}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-heritage-crimson shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-heritage-charcoal dark:text-white">Studio Atelier:</strong>
                    <span className="text-heritage-charcoal/70 dark:text-gray-400">
                      {profile.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-heritage-charcoal dark:text-white">WhatsApp Hotline:</strong>
                    <a
                      href={`https://wa.me/${profile.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      {profile.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-heritage-charcoal dark:text-white">Email Inquiries:</strong>
                    <span className="text-heritage-charcoal/70 dark:text-gray-400">{profile.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-heritage-charcoal dark:text-white">Studio Timings:</strong>
                    <span className="text-heritage-charcoal/70 dark:text-gray-400">
                      Monday – Saturday: 10:30 AM – 7:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Banner */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent('Hello! I would like to schedule a virtual video walkthrough of your Bandhani catalogue.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Book Virtual Video Walkthrough</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-heritage-darkSurface border border-heritage-gold/30 shadow-xl">
              <h3 className="font-serif font-bold text-xl text-heritage-charcoal dark:text-white mb-1">
                Enquire for Bespoke Trousseau or Bulk Orders
              </h3>
              <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400 mb-6">
                Fill this quick enquiry to dispatch your requirements directly to our head artisan on WhatsApp.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif font-bold text-base text-emerald-800 dark:text-emerald-400">
                    Enquiry Dispatched to WhatsApp!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Our artisan concierge will review your requirements and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Sharma"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                      Piece / Collection of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={e => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full p-3 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson cursor-pointer"
                    >
                      <option value="Bridal Gharchola Saree">Bridal Gharchola Saree (Pure Gajji Silk)</option>
                      <option value="Rai Bandhej Georgette Saree">Rai Bandhej Georgette Saree</option>
                      <option value="Kutch Mirror Work Dupatta">Kutch Mirror Work Modal Silk Dupatta</option>
                      <option value="Bespoke 32-Kali Bridal Lehenga">Bespoke 32-Kali Bridal Lehenga</option>
                      <option value="Pure Silk Fabrics By The Metre">Pure Silk Fabrics By The Metre</option>
                      <option value="Other Custom Craft Enquiry">Other Custom Craft Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-heritage-charcoal dark:text-gray-200 mb-1">
                      Specific Requirements or Wedding Date (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Need color customization in deep burgundy for an upcoming December wedding..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl border border-heritage-gold/30 bg-heritage-sand/20 dark:bg-heritage-darkCard text-heritage-charcoal dark:text-white focus:outline-none focus:border-heritage-crimson resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-heritage-crimson via-heritage-ruby to-heritage-terracotta text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry Directly via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
