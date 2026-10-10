import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { QuickViewModal } from './components/common/QuickViewModal';

// Dedicated Customer Pages (100% Public Storefront)
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { WishlistPage } from './pages/WishlistPage';

// Admin Studio Components (Secret / Private Access Only)
import { StudioAuthGate } from './components/admin/StudioAuthGate';
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardOverview } from './components/admin/DashboardOverview';
import { ProductList } from './components/admin/ProductList';
import { CategoryManager } from './components/admin/CategoryManager';
import { BannerManager } from './components/admin/BannerManager';
import { SiteContentCMS } from './components/admin/SiteContentCMS';
import { BusinessSettings } from './components/admin/BusinessSettings';

const AppContent: React.FC = () => {
  const {
    activeView,
    adminTab,
    currentPage,
    selectedProductId,
    isStudioAuthenticated,
    loginStudio,
    setCurrentPage
  } = useStore();

  // If in Secret Studio Atelier (#/studio-access)
  if (activeView === 'admin') {
    // 1. If not authenticated, show private access security gate
    if (!isStudioAuthenticated) {
      return (
        <StudioAuthGate
          onAuthenticate={loginStudio}
          onExit={() => setCurrentPage('home')}
        />
      );
    }

    // 2. If authenticated, unlock the full studio with Supabase CMS
    return (
      <AdminLayout>
        {adminTab === 'analytics' && <DashboardOverview />}
        {adminTab === 'products' && <ProductList />}
        {adminTab === 'categories' && <CategoryManager />}
        {adminTab === 'cms' && <SiteContentCMS />}
        {adminTab === 'banners' && <BannerManager />}
        {adminTab === 'settings' && <BusinessSettings />}
      </AdminLayout>
    );
  }

  // Determine Customer Page to render
  const renderCurrentPage = () => {
    // If a product is selected or page is 'product', show ProductDetailPage
    if (currentPage === 'product' || selectedProductId) {
      return <ProductDetailPage />;
    }

    switch (currentPage) {
      case 'catalogue':
        return <CataloguePage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  // Customer Storefront (100% Clean - Zero Admin Traces)
  return (
    <div className="min-h-screen flex flex-col bg-heritage-cream dark:bg-heritage-darkSurface text-heritage-charcoal selection:bg-heritage-gold/30 selection:text-heritage-crimson">
      <Navbar />

      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      <Footer />
      <FloatingWhatsApp />
      <QuickViewModal />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
