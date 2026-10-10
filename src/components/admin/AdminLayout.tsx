import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminTab } from '../../types';
import {
  BarChart3,
  Package,
  Layers,
  Image,
  Settings,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  RefreshCw,
  Lock
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    adminTab,
    setAdminTab,
    products,
    categories,
    enquiryLogs,
    profile,
    resetToDemo,
    logoutStudio
  } = useStore();

  const navItems: { tab: AdminTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { tab: 'analytics', label: 'Analytics & Intel', icon: BarChart3, badge: `${enquiryLogs.length} Enq` },
    { tab: 'products', label: 'Products Catalogue', icon: Package, badge: products.length },
    { tab: 'categories', label: 'Categories & Subs', icon: Layers, badge: categories.length },
    { tab: 'cms', label: 'Universal Site CMS', icon: Sparkles, badge: 'Full Edit' },
    { tab: 'banners', label: 'Hero Banners', icon: Image },
    { tab: 'settings', label: 'WhatsApp & Business', icon: Settings }
  ];

  // Calculate total catalogue value
  const totalCatalogueValue = products.reduce((acc, p) => acc + (p.price || 0), 0);

  return (
    <div className="min-h-screen bg-heritage-sand/30 dark:bg-heritage-darkSurface flex flex-col">
      {/* Top Studio Bar */}
      <header className="sticky top-0 z-30 bg-heritage-darkSurface text-white border-b border-heritage-gold/30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-heritage-crimson border border-heritage-gold flex items-center justify-center font-serif font-bold text-xs sm:text-base text-heritage-gold shrink-0">
            BD
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="font-serif font-bold text-xs sm:text-base text-heritage-gold tracking-wide truncate max-w-[150px] sm:max-w-none">
                Bandhanu Studio Atelier
              </h1>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-bold border border-emerald-500/30 whitespace-nowrap">
                Supabase Live Sync
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-gray-400 hidden xs:block truncate">
              Catalogue, CMS & WhatsApp Intelligence
            </p>
          </div>
        </div>

        {/* Right Stats & Lock / Sign Out */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-4 text-xs pr-4 border-r border-gray-700">
            <div>
              <span className="text-gray-400 block text-[10px]">Catalogue Value</span>
              <span className="font-serif font-bold text-heritage-gold">
                {profile.currencySymbol}{totalCatalogueValue.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Active WhatsApp</span>
              <span className="font-mono text-emerald-400">+{profile.whatsappNumber}</span>
            </div>
          </div>

          <a
            href="#/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-semibold transition-all shrink-0"
            title="Preview Customer Store in New Tab"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Preview Store</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>

          <button
            onClick={logoutStudio}
            className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-heritage-crimson hover:bg-heritage-ruby text-white text-[11px] sm:text-xs font-semibold shadow-md transition-all shrink-0 cursor-pointer"
            title="Lock Atelier & Sign Out"
          >
            <Lock className="w-3.5 h-3.5 text-heritage-gold" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </header>

      {/* Mobile Sticky Tab Ribbon */}
      <nav className="md:hidden sticky top-[49px] sm:top-[57px] z-20 bg-white dark:bg-heritage-darkCard border-b border-heritage-gold/25 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-xs">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = adminTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setAdminTab(item.tab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-heritage-crimson text-white shadow-xs'
                  : 'bg-heritage-sand/40 dark:bg-heritage-darkSurface text-heritage-charcoal dark:text-gray-200 hover:bg-heritage-sand'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-heritage-gold' : 'text-heritage-crimson dark:text-heritage-gold'}`} />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-heritage-sand dark:bg-heritage-darkCard text-gray-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Main Studio Body: Desktop Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar (Desktop Only) */}
        <aside className="hidden md:block w-64 bg-white dark:bg-heritage-darkCard border-r border-heritage-gold/20 p-4 shrink-0">
          <div className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = adminTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setAdminTab(item.tab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-heritage-crimson text-white shadow-md'
                      : 'text-heritage-charcoal dark:text-gray-200 hover:bg-heritage-sand/60 dark:hover:bg-heritage-darkSurface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-heritage-gold' : 'text-heritage-crimson dark:text-heritage-gold'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-white/25 text-white' : 'bg-heritage-sand dark:bg-heritage-darkSurface text-gray-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-heritage-sand to-heritage-cream dark:from-heritage-darkSurface dark:to-heritage-darkCard border border-heritage-gold/30 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-heritage-crimson dark:text-heritage-gold font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Supabase Cloud Sync</span>
            </div>
            <p className="text-[11px] text-heritage-charcoal/70 dark:text-gray-400 leading-relaxed">
              Every edit, photo upload, price change, and section modification is automatically saved into PostgreSQL in real time.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  if (confirm('Reset entire catalogue to factory demo data?')) {
                    resetToDemo();
                  }
                }}
                className="text-[10px] text-gray-500 hover:text-heritage-crimson flex items-center gap-1 underline cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo Showcase</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Dynamic Studio Tab Content */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
