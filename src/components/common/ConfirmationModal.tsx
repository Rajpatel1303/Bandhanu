import React, { useEffect, useRef } from 'react';
import { DialogVariant } from '../../types';
import { AlertOctagon, AlertTriangle, Info, Sparkles, X } from 'lucide-react';

interface ConfirmationModalProps {
  type: 'confirm' | 'alert';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  type,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <AlertOctagon className="w-6 h-6 text-rose-500 shrink-0" />,
          iconBg: 'bg-rose-500/10 border-rose-500/30 text-rose-600',
          confirmBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />,
          iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-600',
          confirmBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/20'
        };
      case 'royal':
        return {
          icon: <Sparkles className="w-6 h-6 text-heritage-gold shrink-0" />,
          iconBg: 'bg-heritage-gold/20 border-heritage-gold/40 text-heritage-gold',
          confirmBtn: 'bg-gradient-to-r from-heritage-crimson to-[#6A1A24] text-white border border-heritage-gold/40 shadow-heritage-crimson/20'
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-6 h-6 text-heritage-crimson dark:text-heritage-gold shrink-0" />,
          iconBg: 'bg-heritage-sand dark:bg-heritage-darkCard border-heritage-gold/30',
          confirmBtn: 'bg-heritage-charcoal hover:bg-black text-white'
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-3xl bg-[#FBF8F3] dark:bg-[#1E1917] border border-heritage-gold/40 p-6 sm:p-7 shadow-2xl text-heritage-charcoal dark:text-gray-100 animate-scale-up"
      >
        {/* Subtle Bandhani Tie-Dye Motif Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-gold/5 rounded-bl-full pointer-events-none -z-0" />

        <div className="flex items-start gap-4 relative z-10">
          <div className={`p-3 rounded-2xl border shrink-0 ${vStyles.iconBg}`}>
            {vStyles.icon}
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <h3 id="dialog-title" className="font-serif font-bold text-lg text-heritage-charcoal dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-heritage-charcoal/75 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {message}
            </p>
          </div>

          <button
            onClick={onCancel}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-gray-400 hover:text-heritage-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 relative z-10 pt-2 border-t border-heritage-gold/20">
          {type === 'confirm' && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border border-heritage-gold/30 hover:bg-heritage-sand/40 dark:hover:bg-white/5 text-xs font-semibold text-heritage-charcoal/80 dark:text-gray-300 transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer ${vStyles.confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
