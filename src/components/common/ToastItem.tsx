import React, { useEffect, useState } from 'react';
import { Toast } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  Sparkles,
  X
} from 'lucide-react';

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const duration = toast.duration ?? 4200;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPct);
      if (remainingPct <= 0) {
        clearInterval(interval);
        handleClose();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 250);
  };

  const getStyleConfigs = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          bg: 'bg-white/95 dark:bg-[#1E1917]/95 border-emerald-500/40 text-heritage-charcoal dark:text-gray-100 shadow-emerald-900/10',
          badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
          progressBar: 'bg-emerald-500'
        };
      case 'error':
        return {
          icon: <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />,
          bg: 'bg-white/95 dark:bg-[#1E1917]/95 border-rose-500/40 text-heritage-charcoal dark:text-gray-100 shadow-rose-900/10',
          badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
          progressBar: 'bg-rose-500'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          bg: 'bg-white/95 dark:bg-[#1E1917]/95 border-amber-500/40 text-heritage-charcoal dark:text-gray-100 shadow-amber-900/10',
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
          progressBar: 'bg-amber-500'
        };
      case 'royal':
        return {
          icon: <Sparkles className="w-5 h-5 text-heritage-gold shrink-0 animate-pulse" />,
          bg: 'bg-[#241E1C]/95 border-heritage-gold/50 text-white shadow-heritage-gold/15',
          badge: 'bg-heritage-gold/20 text-heritage-gold',
          progressBar: 'bg-gradient-to-r from-heritage-gold to-amber-300'
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
          bg: 'bg-white/95 dark:bg-[#1E1917]/95 border-sky-500/40 text-heritage-charcoal dark:text-gray-100 shadow-sky-900/10',
          badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
          progressBar: 'bg-sky-500'
        };
    }
  };

  const config = getStyleConfigs();

  return (
    <div
      role="alert"
      className={`relative overflow-hidden w-full max-w-sm sm:max-w-md rounded-2xl border backdrop-blur-md p-3.5 sm:p-4 shadow-xl transition-all duration-300 pointer-events-auto ${
        config.bg
      } ${
        isExiting
          ? 'opacity-0 translate-y-[-10px] sm:translate-x-4 scale-95'
          : 'opacity-100 translate-y-0 sm:translate-x-0 scale-100 animate-slide-in'
      }`}
    >
      <div className="flex items-start gap-3">
        {toast.thumbnail ? (
          <img
            src={toast.thumbnail}
            alt=""
            className="w-11 h-13 rounded-lg object-cover border border-heritage-gold/30 shrink-0 shadow-xs"
          />
        ) : (
          <div className="mt-0.5">{config.icon}</div>
        )}

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="font-serif font-bold text-xs sm:text-sm tracking-wide line-clamp-1">
              {toast.title}
            </h4>
          </div>

          {toast.message && (
            <p className="text-[11px] sm:text-xs text-heritage-charcoal/80 dark:text-gray-300 leading-relaxed line-clamp-2">
              {toast.message}
            </p>
          )}

          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                handleClose();
              }}
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-heritage-crimson dark:text-heritage-gold hover:underline cursor-pointer transition-colors"
            >
              <span>{toast.action.label}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>

        <button
          onClick={handleClose}
          aria-label="Dismiss notification"
          className="p-1 rounded-lg text-gray-400 hover:text-heritage-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Real-time countdown progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/5">
        <div
          className={`h-full transition-all ease-linear ${config.progressBar}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
