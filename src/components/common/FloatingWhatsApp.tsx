import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { getWhatsAppDirectUrl, openWhatsAppDirect } from '../../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { profile, selectedProductId } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (selectedProductId) {
    return null;
  }

  const defaultMsg = 'Hello Bandhanu! I am browsing your handcrafted Bandhani website and would like some assistance.';
  const chatUrl = getWhatsAppDirectUrl(profile.whatsappNumber, defaultMsg);

  return (
    <div className="fixed bottom-5 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end pointer-events-none transition-all duration-300">
      {/* Tooltip Card */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 w-72 p-4 rounded-2xl bg-white dark:bg-heritage-darkSurface border border-[#25D366]/40 shadow-2xl animate-fade-up relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xs font-bold text-heritage-charcoal dark:text-white">
                Bandhanu Artisan Desk
              </div>
              <div className="text-[10px] text-emerald-600 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Jamnagar Weavers Studio
              </div>
            </div>
          </div>

          <p className="text-xs text-heritage-charcoal/70 dark:text-gray-300 leading-relaxed mb-3">
            Looking for styling advice, custom bridal drapes, or video inspection of real sarees?
          </p>

          <a
            href={chatUrl}
            onClick={(e) => {
              e.preventDefault();
              openWhatsAppDirect(profile.whatsappNumber, defaultMsg);
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative p-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
        aria-label="Open WhatsApp Concierge"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
      </button>
    </div>
  );
};
