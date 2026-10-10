import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface StudioAuthGateProps {
  onAuthenticate: (passcode: string) => boolean;
  onExit: () => void;
}

export const StudioAuthGate: React.FC<StudioAuthGateProps> = ({ onAuthenticate, onExit }) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = onAuthenticate(passcode);
      if (!success) {
        setError('Incorrect atelier passcode. Access denied.');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-heritage-darkSurface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-heritage-crimson/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-heritage-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-heritage-darkCard border border-heritage-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        {/* Brand Monogram */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-heritage-crimson to-heritage-ruby border-2 border-heritage-gold/60 mx-auto flex items-center justify-center text-heritage-gold font-serif font-bold text-2xl shadow-lg">
            BD
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-gold/10 text-heritage-gold text-[10px] font-bold uppercase tracking-widest border border-heritage-gold/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Private Atelier Access</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              Bandhanu Studio
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Authorized personnel only. Enter studio passcode to manage catalogue, CMS, and Supabase cloud sync.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Studio Passcode
            </label>
            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-heritage-gold/30 text-white placeholder-gray-500 focus:outline-none focus:border-heritage-gold text-sm tracking-wider pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-heritage-gold" />
              <span>Default Studio Passcode: <code className="text-heritage-gold font-mono">bandhanu@2026</code></span>
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !passcode.trim()}
            className="w-full py-3.5 px-4 rounded-xl bg-heritage-crimson hover:bg-heritage-ruby text-white font-bold text-sm shadow-lg shadow-heritage-crimson/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span>Validating Key...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Unlock Studio Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Exit link */}
        <div className="pt-4 border-t border-gray-800 text-center">
          <button
            onClick={onExit}
            className="text-xs text-gray-400 hover:text-heritage-gold transition-colors inline-flex items-center gap-1"
          >
            <span>← Return to Customer Storefront</span>
          </button>
        </div>
      </div>
    </div>
  );
};
