import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Banner,
  BusinessProfile,
  EnquiryLog,
  ActiveView,
  CustomerPage,
  AdminTab,
  AvailabilityStatus,
  UniversalSiteContent,
  CartItem,
  CustomThemeSettings,
  SiteCraftJourney
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BANNERS,
  INITIAL_BUSINESS_PROFILE,
  INITIAL_ENQUIRIES_LOG
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { getWhatsAppDirectUrl, openWhatsAppDirect } from '../utils/whatsapp';

export const INITIAL_SITE_CONTENT: UniversalSiteContent = {
  announcement: {
    enabled: true,
    text: 'Welcome to Bandhanu • Where Heritage Meets Style',
    subtext: 'Every Knot, A Story',
    ctaText: 'WhatsApp Studio Concierge',
    ctaLink: 'https://wa.me/919876543210'
  },
  hero: {
    badge: 'BANDHANU: EVERY KNOT, A STORY',
    heading: 'Welcome to Bandhanu',
    highlight: 'where heritage meets style.',
    description: 'Explore our exclusive handcrafted Bandhani garments, stoles, and fabrics, designed for every occasion. Start your journey into a living heritage of knots, patterns, and timeless artistry.',
    primaryBtnText: 'Explore Collection',
    secondaryBtnText: 'Enquire via WhatsApp Concierge',
    knotBadgeText: '~25,000 Knots',
    knotBadgeSub: 'Micro Rai Bandhej',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    heroProductTitle: 'Royal Shikargah Gharchola',
    heroProductSub: 'Gajji Silk with 22,000 Micro-Dots & Pure Lagdi Patto'
  },
  about: {
    badge: 'ABOUT US',
    headline: 'A Celebration of Tradition, Artistry & Timeless Elegance',
    storyParagraph1: 'Bandhanu is a celebration of tradition, artistry, and timeless elegance. Rooted in the ancient craft of Bandhani (Bandhej), our brand brings forward the beauty of knots, patterns, and indigo hues that tell stories of heritage and culture.',
    storyParagraph2: 'Each piece is hand-tied and hand-dyed, carrying with it the patience, skill, and soul of artisans who have preserved this art for generations. At Bandhanu, we don’t just create products—we create experiences woven with history and designed for modern living.',
    quoteText: 'Every knot we tie is not just a design—it’s a promise of authenticity, sustainability, and love for handmade.',
    quoteAuthor: 'Bandhanu: Every Knot, A Story.',
    visionPillar1Title: 'Global Identity',
    visionPillar1Desc: 'To make Bandhani a global identity.',
    visionPillar2Title: 'Honor The Artisans',
    visionPillar2Desc: 'To honor the craft and the artisans behind it.',
    visionPillar3Title: 'Contemporary Designs',
    visionPillar3Desc: 'To blend traditional techniques with contemporary designs that suit today’s world.'
  },
  contact: {
    businessName: INITIAL_BUSINESS_PROFILE.businessName,
    tagline: INITIAL_BUSINESS_PROFILE.tagline,
    address: INITIAL_BUSINESS_PROFILE.address,
    whatsappNumber: INITIAL_BUSINESS_PROFILE.whatsappNumber,
    displayPhone: INITIAL_BUSINESS_PROFILE.displayPhone,
    email: INITIAL_BUSINESS_PROFILE.email,
    instagramHandle: INITIAL_BUSINESS_PROFILE.instagramHandle,
    visitingHours: 'Monday to Saturday: 10:30 AM – 8:00 PM IST',
    mapUrl: 'https://maps.google.com/?q=Darbargadh+Jamnagar+Gujarat'
  },
  toggles: {
    showAnnouncement: true,
    showLookbook: true,
    showCraftJourney: true,
    showTestimonials: true,
    showSimilarProducts: true
  },
  craftJourney: {
    badge: 'Living Craft In Action',
    heading: 'The Journey of a Hand-Tied Dot',
    description: 'From tying tiny knots to dyeing and opening, each Bandhani textile takes time, patience and skilled hands. We work with traditional methods, keeping the heritage alive.',
    techniqueNote1: 'Passed through Khatri families in Kutch since 400+ years.',
    techniqueNote2: 'Zero wax, zero petroleum—only fingertips & high-twist cotton thread.',
    stages: [
      {
        step: '01',
        phase: 'Bandhana',
        title: 'The Hand-Tied Resist',
        subtitle: 'Raw Mulberry Silk Pinched & Bound',
        description: 'Using a pointed silver ring, the artisan deft-gathers a minute pinch of raw silk fabric. High-twist cotton thread is wound tightly around the cone, creating an impervious mechanical seal against liquid dyes.',
        badge: 'Artisan Workshop • Bhadli, Kutch',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
        alt: 'Artisan hands tying Bandhani knots with cotton thread',
        caption: 'Artisan hands pinching 1mm silk knots with thread resist'
      },
      {
        step: '02',
        phase: 'Rangai',
        title: 'The Natural Dye Bath',
        subtitle: 'Capillary Liquid Dye Immersion',
        description: 'The fabric is submerged into warm fermented madder root and pomegranate rind vats. The rich crimson dye bleeds naturally through the porous silk fibers, stopped dead at the bound thread boundary.',
        badge: 'Natural Fermented Dye Vat',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
        alt: 'Natural dye vat process in Kutch',
        caption: 'Sequential immersion in vegetable & madder root dye vats'
      },
      {
        step: '03',
        phase: 'Khilana',
        title: 'The Crinkled Bloom',
        subtitle: 'Untying Reveals the Iconic Rosette',
        description: 'After drying under the Kutch sun, the fabric is gently pulled corner to corner. The threads pop open to reveal the legendary puckered Bandhani dot with its diamond core and signature textured crush.',
        badge: 'Finished Heirloom Silk',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
        alt: 'Opened Bandhani silk cloth with signature crinkle bloom',
        caption: 'The revealed crinkled Bandhani bloom with signature texture'
      }
    ]
  },
  theme: {
    textPrimary: '#241E1C',
    textMuted: '#6E6259',
    pageBackground: '#FBF8F3',
    cardBackground: '#F5EFE6',
    borderColor: '#E2D7C7',
    brandAccent: '#4A121A',
    brandAccentHover: '#380D13',
    sections: {
      navbar: { bg: '', text: '' },
      hero: { bg: '', titleColor: '', btnBg: '', btnText: '' },
      categories: { bg: '', titleColor: '', cardBg: '' },
      featured: { bg: '', titleColor: '', cardBg: '' },
      craft: { bg: '', cardBg: '', titleColor: '', textColor: '' },
      story: { bg: '', cardBg: '', titleColor: '', textColor: '', btnBg: '' },
      instagram: { bg: '', titleColor: '' },
      footer: { bg: '', textColor: '' }
    }
  }
};

interface StoreContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  currentPage: CustomerPage;
  setCurrentPage: (page: CustomerPage) => void;
  selectedCategory: string | null;
  setSelectedCategory: (categorySlug: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCatSlug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  quickViewProductId: string | null;
  setQuickViewProductId: (id: string | null) => void;
  navigateToProduct: (productId: string) => void;
  navigateToCategory: (categorySlug: string | null, subCategorySlug?: string | null) => void;

  // Studio Private Access
  isStudioAuthenticated: boolean;
  loginStudio: (passcode: string) => boolean;
  logoutStudio: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCartItems: number;
  totalCartPrice: number;

  // Data
  products: Product[];
  categories: Category[];
  banners: Banner[];
  profile: BusinessProfile;
  enquiryLogs: EnquiryLog[];
  siteContent: UniversalSiteContent;
  dbStatus: 'connected' | 'local';
  setSupabaseCredentials: (url: string, anonKey: string) => Promise<boolean>;

  // Content CMS
  updateSiteContent: (content: UniversalSiteContent) => Promise<void>;

  // Custom Theme & Colors
  theme: CustomThemeSettings;
  updateTheme: (newTheme: Partial<CustomThemeSettings>) => void;
  resetTheme: () => void;

  // Product Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'views' | 'enquiriesCount'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  toggleAvailability: (id: string, status: AvailabilityStatus) => Promise<void>;

  // Category Actions
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Banner Actions
  updateBanners: (banners: Banner[]) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  deleteBanner: (id: string) => void;
  toggleBannerStatus: (id: string) => void;

  // Profile Actions
  updateProfile: (updates: Partial<BusinessProfile>) => void;

  // WhatsApp Enquiry Flow
  generateWhatsAppUrl: (product: Product, selectedColorName?: string) => string;
  triggerWhatsAppEnquiry: (product: Product, selectedColorName?: string) => void;

  // Management Utilities
  resetToDemo: () => void;
  clearAllProducts: () => void;
  exportDatabase: () => string;
  importDatabase: (jsonString: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'bandhanu_products_v8',
  CATEGORIES: 'bandhanu_categories_v8',
  BANNERS: 'bandhanu_banners_v6',
  PROFILE: 'bandhanu_profile_v6',
  ENQUIRIES: 'bandhanu_enquiries_v8',
  WISHLIST: 'bandhanu_wishlist_v6',
  CART: 'bandhanu_cart_v6',
  SITE_CONTENT: 'bandhanu_site_content_v6',
  STUDIO_AUTH: 'bandhanu_studio_session'
};

// Purge legacy mock storage from user browsers
try {
  ['v6', 'v7'].forEach(ver => {
    ['products', 'categories', 'enquiries'].forEach(type => {
      localStorage.removeItem(`bandhanu_${type}_${ver}`);
    });
  });
} catch {}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View States
  const [activeView, setActiveView] = useState<ActiveView>('store');
  const [adminTab, setAdminTab] = useState<AdminTab>('analytics');
  const [currentPage, setCurrentPage] = useState<CustomerPage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null);

  // Studio Private Auth State
  const [isStudioAuthenticated, setIsStudioAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.STUDIO_AUTH) === 'authenticated';
    } catch {
      return false;
    }
  });

  const loginStudio = (passcode: string): boolean => {
    const clean = passcode.trim();
    if (clean === 'bandhanu@2026' || clean === '7860') {
      setIsStudioAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.STUDIO_AUTH, 'authenticated');
      return true;
    }
    return false;
  };

  const logoutStudio = () => {
    setIsStudioAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.STUDIO_AUTH);
    setActiveView('store');
    setCurrentPage('home');
    window.location.hash = '#/';
  };

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedColor === color);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Persistent Domain States (Local cache defaults)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BANNERS);
      return saved ? JSON.parse(saved) : INITIAL_BANNERS;
    } catch {
      return INITIAL_BANNERS;
    }
  });

  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_PROFILE;
    } catch {
      return INITIAL_BUSINESS_PROFILE;
    }
  });

  const [siteContent, setSiteContent] = useState<UniversalSiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_CONTENT);
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT;
    } catch {
      return INITIAL_SITE_CONTENT;
    }
  });

  const [enquiryLogs, setEnquiryLogs] = useState<EnquiryLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES_LOG;
    } catch {
      return INITIAL_ENQUIRIES_LOG;
    }
  });

  // Sync to LocalStorage Cache
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiryLogs));
  }, [enquiryLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Dynamic Theme Management
  const [dbStatus, setDbStatus] = useState<'connected' | 'local'>('local');

  const setSupabaseCredentials = async (url: string, anonKey: string): Promise<boolean> => {
    try {
      localStorage.setItem('bandhanu_supabase_url', url.trim());
      localStorage.setItem('bandhanu_supabase_anon_key', anonKey.trim());
      window.location.reload();
      return true;
    } catch {
      return false;
    }
  };

  const theme: CustomThemeSettings = siteContent.theme || INITIAL_SITE_CONTENT.theme!;

  const updateTheme = (newTheme: Partial<CustomThemeSettings>) => {
    const merged: CustomThemeSettings = {
      ...theme,
      ...newTheme,
      sections: {
        ...theme.sections,
        ...(newTheme.sections || {})
      }
    };
    const updatedContent: UniversalSiteContent = {
      ...siteContent,
      theme: merged
    };
    setSiteContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(updatedContent));

    if (isSupabaseConfigured) {
      (async () => {
        try {
          const { error } = await supabase
            .from('site_content')
            .upsert({ key: 'theme', value: merged, updated_at: new Date().toISOString() });
          if (!error) setDbStatus('connected');
        } catch {
          // safe fallback
        }
      })();
    }
  };

  const resetTheme = () => {
    const defaultTheme = INITIAL_SITE_CONTENT.theme!;
    const updatedContent: UniversalSiteContent = {
      ...siteContent,
      theme: defaultTheme
    };
    setSiteContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(updatedContent));
  };

  // Sync custom theme colors to CSS custom properties and document body
  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      if (theme.textPrimary) {
        root.style.setProperty('--brand-charcoal', theme.textPrimary);
        document.body.style.color = theme.textPrimary;
      }
      if (theme.textMuted) root.style.setProperty('--brand-muted', theme.textMuted);
      if (theme.pageBackground) {
        root.style.setProperty('--brand-cream', theme.pageBackground);
        document.body.style.backgroundColor = theme.pageBackground;
      }
      if (theme.cardBackground) root.style.setProperty('--brand-sand', theme.cardBackground);
      if (theme.borderColor) root.style.setProperty('--brand-sand-border', theme.borderColor);
      if (theme.brandAccent) root.style.setProperty('--brand-maroon', theme.brandAccent);
      if (theme.brandAccentHover) root.style.setProperty('--brand-maroon-dark', theme.brandAccentHover);
    }
  }, [theme]);

  // Load live data from Supabase Cloud Database (when valid credentials configured)
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setDbStatus('local');
      return;
    }

    const fetchFromSupabase = async () => {
      try {
        // 1. Fetch Categories & Subcategories
        const { data: dbCategories, error: catErr } = await supabase
          .from('categories')
          .select('*, sub_categories(*)');

        if (!catErr && dbCategories) {
          setDbStatus('connected');
          if (dbCategories.length > 0) {
            const mappedCats: Category[] = dbCategories.map((c: any) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              description: c.description || '',
              image: c.image || '',
              badge: c.badge || undefined,
              isActive: c.is_active ?? true,
              subCategories: (c.sub_categories || []).map((s: any) => ({
                id: s.id,
                name: s.name,
                slug: s.slug,
                description: s.description
              }))
            }));
            setCategories(mappedCats);
          }
        } else {
          setDbStatus('local');
        }

        // 2. Fetch Products
        const { data: dbProducts, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!prodErr && dbProducts && dbProducts.length > 0) {
          const mappedProds: Product[] = dbProducts.map((p: any) => ({
            id: p.id,
            title: p.title,
            subtitle: p.subtitle || '',
            sku: p.sku,
            category: p.category,
            subCategory: p.sub_category || undefined,
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            fabric: p.fabric || '',
            craftTechnique: p.craft_technique || '',
            knotCount: p.knot_count || undefined,
            availability: p.availability || 'in_stock',
            leadTime: p.lead_time || undefined,
            isFeatured: p.is_featured ?? false,
            isNewDrop: p.is_new_drop ?? false,
            images: Array.isArray(p.images) ? p.images : [],
            colors: Array.isArray(p.colors) ? p.colors : [],
            description: p.description || '',
            features: Array.isArray(p.features) ? p.features : [],
            washCare: p.wash_care || '',
            dimensions: p.dimensions || undefined,
            views: p.views || 0,
            enquiriesCount: p.enquiries_count || 0,
            createdAt: p.created_at || new Date().toISOString()
          }));
          setProducts(mappedProds);
        }

        // 3. Fetch Universal Site Content
        const { data: dbContent, error: contentErr } = await supabase
          .from('site_content')
          .select('*');

        if (!contentErr && dbContent && dbContent.length > 0) {
          setSiteContent((prev) => {
            const merged = { ...prev };
            dbContent.forEach((row: any) => {
              if (row.key in merged) {
                (merged as any)[row.key] = row.value;
              }
            });
            return merged;
          });

          // Sync profile details if contact row present
          const contactRow = dbContent.find((r: any) => r.key === 'contact');
          if (contactRow && contactRow.value) {
            const c = contactRow.value;
            setProfile((prev) => ({
              ...prev,
              businessName: c.businessName || prev.businessName,
              tagline: c.tagline || prev.tagline,
              address: c.address || prev.address,
              whatsappNumber: c.whatsappNumber || prev.whatsappNumber,
              displayPhone: c.displayPhone || prev.displayPhone,
              email: c.email || prev.email,
              instagramHandle: c.instagramHandle || prev.instagramHandle
            }));
          }
        }
      } catch (err) {
        console.warn('Supabase live fetch notice:', err);
      }
    };

    fetchFromSupabase();
  }, []);

  // URL Hash Routing Synchronization (Dedicated routes & Secret studio route)
  useEffect(() => {
    const parseRouteFromHash = () => {
      const raw = window.location.hash.replace(/^#\/?/, '').trim();

      // Secret Studio Access Route
      if (raw === 'studio-access' || raw.startsWith('studio-access')) {
        setActiveView('admin');
        const parts = raw.split('/');
        const tab = parts[1] as AdminTab;
        if (tab) setAdminTab(tab);
        return;
      }

      // Legacy admin route redirects to studio-access
      if (raw.startsWith('admin')) {
        window.location.hash = '#/studio-access';
        return;
      }

      // Customer Storefront Routes (Zero Admin Footprint)
      setActiveView('store');

      if (!raw || raw === 'home') {
        setCurrentPage('home');
        setSelectedProductId(null);
        return;
      }
      if (raw.startsWith('product/')) {
        const id = raw.replace('product/', '');
        setCurrentPage('product');
        setSelectedProductId(id);
        return;
      }
      if (raw.startsWith('catalogue')) {
        setCurrentPage('catalogue');
        setSelectedProductId(null);
        return;
      }
      if (raw === 'contact') {
        setCurrentPage('contact');
        setSelectedProductId(null);
        return;
      }
      if (raw === 'about') {
        setCurrentPage('about');
        setSelectedProductId(null);
        return;
      }
      if (raw === 'wishlist') {
        setCurrentPage('wishlist');
        setSelectedProductId(null);
        return;
      }

      setCurrentPage('home');
    };

    parseRouteFromHash();
    window.addEventListener('hashchange', parseRouteFromHash);
    return () => window.removeEventListener('hashchange', parseRouteFromHash);
  }, []);

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    setActiveView('store');
    window.location.hash = `#/product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToCategory = (categorySlug: string | null, subCategorySlug?: string | null) => {
    setSelectedCategory(categorySlug);
    setSelectedSubCategory(subCategorySlug || null);
    setSelectedProductId(null);
    setCurrentPage('catalogue');
    setActiveView('store');
    window.location.hash = '#/catalogue';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetCurrentPage = (page: CustomerPage) => {
    setCurrentPage(page);
    setActiveView('store');
    if (page !== 'product') {
      setSelectedProductId(null);
    }
    window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetActiveView = (view: ActiveView) => {
    setActiveView(view);
    if (view === 'admin') {
      window.location.hash = '#/studio-access';
    } else {
      window.location.hash = currentPage === 'home' ? '#/' : `#/${currentPage}`;
    }
  };

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Content CMS Update with Supabase Cloud Sync
  const updateSiteContent = async (newContent: UniversalSiteContent) => {
    setSiteContent(newContent);

    // Sync profile
    if (newContent.contact) {
      setProfile((prev) => ({
        ...prev,
        businessName: newContent.contact.businessName || prev.businessName,
        tagline: newContent.contact.tagline || prev.tagline,
        address: newContent.contact.address || prev.address,
        whatsappNumber: newContent.contact.whatsappNumber || prev.whatsappNumber,
        displayPhone: newContent.contact.displayPhone || prev.displayPhone,
        email: newContent.contact.email || prev.email,
        instagramHandle: newContent.contact.instagramHandle || prev.instagramHandle
      }));
    }

    if (isSupabaseConfigured) {
      try {
        for (const [key, val] of Object.entries(newContent)) {
          await supabase
            .from('site_content')
            .upsert({ key, value: val, updated_at: new Date().toISOString() });
        }
      } catch (err) {
        console.warn('Cloud sync notice:', err);
      }
    }
  };

  // Product Actions with Supabase Persistence
  const addProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'views' | 'enquiriesCount'>): Promise<Product> => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      views: 1,
      enquiriesCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);

    try {
      await supabase.from('products').insert({
        id: newProduct.id,
        title: newProduct.title,
        subtitle: newProduct.subtitle,
        sku: newProduct.sku,
        category: newProduct.category,
        sub_category: newProduct.subCategory || null,
        price: newProduct.price,
        original_price: newProduct.originalPrice || null,
        fabric: newProduct.fabric,
        craft_technique: newProduct.craftTechnique,
        knot_count: newProduct.knotCount || null,
        availability: newProduct.availability,
        lead_time: newProduct.leadTime || null,
        is_featured: newProduct.isFeatured,
        is_new_drop: newProduct.isNewDrop || false,
        images: newProduct.images,
        colors: newProduct.colors,
        description: newProduct.description,
        features: newProduct.features,
        wash_care: newProduct.washCare,
        dimensions: newProduct.dimensions || null,
        views: 1,
        enquiries_count: 0
      });
    } catch (err) {
      console.error('Supabase product insert error:', err);
    }

    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));

    try {
      const dbUpdates: any = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.subtitle !== undefined) dbUpdates.subtitle = updates.subtitle;
      if (updates.sku !== undefined) dbUpdates.sku = updates.sku;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.subCategory !== undefined) dbUpdates.sub_category = updates.subCategory || null;
      if (updates.price !== undefined) dbUpdates.price = updates.price;
      if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice;
      if (updates.fabric !== undefined) dbUpdates.fabric = updates.fabric;
      if (updates.craftTechnique !== undefined) dbUpdates.craft_technique = updates.craftTechnique;
      if (updates.knotCount !== undefined) dbUpdates.knot_count = updates.knotCount;
      if (updates.availability !== undefined) dbUpdates.availability = updates.availability;
      if (updates.leadTime !== undefined) dbUpdates.lead_time = updates.leadTime;
      if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
      if (updates.isNewDrop !== undefined) dbUpdates.is_new_drop = updates.isNewDrop;
      if (updates.images !== undefined) dbUpdates.images = updates.images;
      if (updates.colors !== undefined) dbUpdates.colors = updates.colors;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.features !== undefined) dbUpdates.features = updates.features;
      if (updates.washCare !== undefined) dbUpdates.wash_care = updates.washCare;
      if (updates.dimensions !== undefined) dbUpdates.dimensions = updates.dimensions;

      if (Object.keys(dbUpdates).length > 0) {
        await supabase.from('products').update(dbUpdates).eq('id', id);
      }
    } catch (err) {
      console.error('Supabase product update error:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProductId === id) setSelectedProductId(null);
    if (quickViewProductId === id) setQuickViewProductId(null);

    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase product delete error:', err);
    }
  };

  const toggleFeatured = async (id: string) => {
    const prod = products.find(p => p.id === id);
    if (prod) {
      await updateProduct(id, { isFeatured: !prod.isFeatured });
    }
  };

  const toggleAvailability = async (id: string, status: AvailabilityStatus) => {
    await updateProduct(id, { availability: status });
  };

  // Category Actions with Supabase Persistence
  const addCategory = async (data: Omit<Category, 'id'>): Promise<Category> => {
    const newCategory: Category = {
      ...data,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCategory]);

    try {
      await supabase.from('categories').insert({
        id: newCategory.id,
        name: newCategory.name,
        slug: newCategory.slug,
        description: newCategory.description,
        image: newCategory.image,
        badge: newCategory.badge || null,
        is_active: newCategory.isActive
      });
    } catch (err) {
      console.error('Supabase category insert error:', err);
    }

    return newCategory;
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));

    try {
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.image !== undefined) dbUpdates.image = updates.image;
      if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
      if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

      if (Object.keys(dbUpdates).length > 0) {
        await supabase.from('categories').update(dbUpdates).eq('id', id);
      }
    } catch (err) {
      console.error('Supabase category update error:', err);
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    try {
      await supabase.from('categories').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase category delete error:', err);
    }
  };

  // Banner Actions
  const updateBanners = (newBanners: Banner[]) => setBanners(newBanners);
  const addBanner = (data: Omit<Banner, 'id'>) => {
    const newBanner: Banner = { ...data, id: `banner-${Date.now()}` };
    setBanners(prev => [...prev, newBanner]);
    if (newBanner.isActive) {
      updateSiteContent({
        ...siteContent,
        hero: {
          ...siteContent.hero,
          heading: newBanner.title,
          description: newBanner.subtitle,
          primaryBtnText: newBanner.ctaText,
          badge: newBanner.badge,
          heroImage: newBanner.imageUrl || siteContent.hero.heroImage
        }
      });
    }
  };
  const deleteBanner = (id: string) => setBanners(prev => prev.filter(b => b.id !== id));
  const toggleBannerStatus = (id: string) => {
    setBanners(prev => {
      const next = prev.map(b => (b.id === id ? { ...b, isActive: !b.isActive } : b));
      const newlyActive = next.find(b => b.id === id && b.isActive);
      if (newlyActive) {
        updateSiteContent({
          ...siteContent,
          hero: {
            ...siteContent.hero,
            heading: newlyActive.title,
            description: newlyActive.subtitle,
            primaryBtnText: newlyActive.ctaText,
            badge: newlyActive.badge,
            heroImage: newlyActive.imageUrl || siteContent.hero.heroImage
          }
        });
      }
      return next;
    });
  };

  // Profile Actions
  const updateProfile = (updates: Partial<BusinessProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      return updated;
    });

    // Synchronize to siteContent.contact so CMS and Frontend are 100% aligned
    setSiteContent(prev => {
      const updatedContent: UniversalSiteContent = {
        ...prev,
        contact: {
          ...prev.contact,
          businessName: updates.businessName ?? prev.contact.businessName,
          tagline: updates.tagline ?? prev.contact.tagline,
          address: updates.address ?? prev.contact.address,
          whatsappNumber: updates.whatsappNumber ?? prev.contact.whatsappNumber,
          displayPhone: updates.displayPhone ?? prev.contact.displayPhone,
          email: updates.email ?? prev.contact.email,
          instagramHandle: updates.instagramHandle ?? prev.contact.instagramHandle
        }
      };
      localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(updatedContent));

      // Attempt cloud sync if connected
      if (isSupabaseConfigured) {
        (async () => {
          try {
            const { error } = await supabase
              .from('site_content')
              .upsert({ key: 'contact', value: updatedContent.contact, updated_at: new Date().toISOString() });
            if (!error) setDbStatus('connected');
          } catch {
            // safe fallback
          }
        })();
      }

      return updatedContent;
    });
  };

  // WhatsApp Enquiry Flow
  const generateWhatsAppUrl = (product: Product, selectedColorName?: string): string => {
    const cleanNumber = profile.whatsappNumber.replace(/[^0-9]/g, '');
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://bandhanu.com';
    const chosenColor = selectedColorName || product.colors?.[0]?.name || 'Standard Shade';

    let message = profile.customMessageTemplate
      .replace('{product_name}', product.title)
      .replace('{sku}', product.sku)
      .replace('{price}', `${profile.currencySymbol}${product.price.toLocaleString('en-IN')}`)
      .replace('{color}', chosenColor)
      .replace('{url}', currentUrl);

    message += `\n✦ Craft: ${product.craftTechnique}`;
    if (product.knotCount) {
      message += `\n✦ Knots: ${product.knotCount}`;
    }

    return getWhatsAppDirectUrl(cleanNumber, message);
  };

  const triggerWhatsAppEnquiry = (product: Product, selectedColorName?: string) => {
    const chosenColor = selectedColorName || product.colors?.[0]?.name || 'Standard Shade';
    const newLog: EnquiryLog = {
      id: `enq-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      sku: product.sku,
      price: product.price,
      color: chosenColor,
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    setEnquiryLogs(prev => [newLog, ...prev]);

    // Update product enquiry count locally and in Supabase
    updateProduct(product.id, { enquiriesCount: (product.enquiriesCount || 0) + 1 });

    try {
      supabase.from('enquiries').insert({
        id: newLog.id,
        product_id: product.id,
        product_title: product.title,
        customer_phone: 'Direct WhatsApp',
        category: product.category,
        notes: `Inquiry for ${newLog.color} shade`,
        created_at: newLog.timestamp
      });
    } catch (err) {
      console.warn('Enquiry log sync notice:', err);
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://bandhanu.com';
    let message = profile.customMessageTemplate
      .replace('{product_name}', product.title)
      .replace('{sku}', product.sku)
      .replace('{price}', `${profile.currencySymbol}${product.price.toLocaleString('en-IN')}`)
      .replace('{color}', chosenColor)
      .replace('{url}', currentUrl);

    message += `\n✦ Craft: ${product.craftTechnique}`;
    if (product.knotCount) {
      message += `\n✦ Knots: ${product.knotCount}`;
    }

    // Direct jump into WhatsApp chat section (skips api.whatsapp.com landing page)
    openWhatsAppDirect(profile.whatsappNumber, message);
  };

  // Factory reset utility
  const resetToDemo = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBanners(INITIAL_BANNERS);
    setProfile(INITIAL_BUSINESS_PROFILE);
    setEnquiryLogs(INITIAL_ENQUIRIES_LOG);
    setSiteContent(INITIAL_SITE_CONTENT);
    localStorage.clear();
  };

  const clearAllProducts = () => {
    setProducts([]);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
  };

  const exportDatabase = () => {
    const data = { products, categories, banners, profile, enquiryLogs, siteContent };
    return JSON.stringify(data, null, 2);
  };

  const importDatabase = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.products) setProducts(data.products);
      if (data.categories) setCategories(data.categories);
      if (data.banners) setBanners(data.banners);
      if (data.profile) setProfile(data.profile);
      if (data.siteContent) setSiteContent(data.siteContent);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView: handleSetActiveView,
        adminTab,
        setAdminTab,
        currentPage,
        setCurrentPage: handleSetCurrentPage,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        searchQuery,
        setSearchQuery,
        selectedProductId,
        setSelectedProductId,
        quickViewProductId,
        setQuickViewProductId,
        navigateToProduct,
        navigateToCategory,
        isStudioAuthenticated,
        loginStudio,
        logoutStudio,
        wishlist,
        toggleWishlist,
        isWishlisted,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCartItems,
        totalCartPrice,
        products,
        categories,
        banners,
        profile,
        enquiryLogs,
        siteContent,
        dbStatus,
        setSupabaseCredentials,
        updateSiteContent,
        theme,
        updateTheme,
        resetTheme,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        toggleAvailability,
        addCategory,
        updateCategory,
        deleteCategory,
        updateBanners,
        addBanner,
        deleteBanner,
        toggleBannerStatus,
        updateProfile,
        generateWhatsAppUrl,
        triggerWhatsAppEnquiry,
        resetToDemo,
        clearAllProducts,
        exportDatabase,
        importDatabase
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
