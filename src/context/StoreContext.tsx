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
import { useNotification } from './NotificationContext';

export const INITIAL_SITE_CONTENT: UniversalSiteContent = {
  announcement: {
    enabled: true,
    text: 'Welcome to Bandhanu • Where Heritage Meets Style',
    subtext: 'Every Knot, A Story',
    ctaText: 'WhatsApp Studio Concierge',
    ctaLink: ''
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
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    buttonText: 'Read Our Story',
    buttonLink: '',
    locationCity: 'Bhadli',
    locationState: 'Kutch, Gujarat',
    locationTagline: 'Visit Our Heritage Atelier • Get Directions',
    locationMapUrl: 'https://maps.app.goo.gl/86qCkie4AofH5xPQA',
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
  customOrder: {
    badge: 'Bespoke Atelier Service',
    heading: 'Custom Bandhani Commission',
    subtitle: 'Tailored Exclusively to Your Color, Fabric & Knot Density',
    description: 'Have a specific wedding theme, family heirloom motif, or bespoke drape in mind? Our master Khatri artisans tie and dye customized pieces to your exact vision.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    leadTime: '4 to 6 weeks handcrafting lead-time',
    whatsappCtaText: 'Discuss Custom Commission on WhatsApp',
    productTypes: [
      'Bridal Gharchola Saree',
      'Heirloom Shikargah Dupatta',
      'Bespoke Kurta & Stole',
      'Unstitched Silk Fabric (5m)'
    ],
    fabrics: ['Pure Gajji Silk', 'Modal Silk', 'Pure Georgette', 'Chanderi Silk', 'Mulberry Katan'],
    patterns: ['Micro Rai Bandhej (~25,000 knots)', 'Traditional Shikargah', 'Royal Bavan Baug', 'Chaukadi (4-Dot Grid)'],
    colors: [
      { name: 'Sindoor Crimson', hex: '#9B111E' },
      { name: 'Kutch Indigo', hex: '#1F2942' },
      { name: 'Haldi Ochre', hex: '#D4AF37' },
      { name: 'Gulabi Rani Pink', hex: '#D12D69' },
      { name: 'Forest Emerald', hex: '#1A5336' },
      { name: 'Custom Dye / Ombre', hex: '#C85A32' }
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
  triggerWhatsAppEnquiry: (product: Product, selectedColorName?: string, quantity?: number) => void;
  triggerMultiProductEnquiry: (items: Product[]) => void;

  // Management Utilities
  resetToDemo: () => void;
  clearAllProducts: () => void;
  exportDatabase: () => string;
  importDatabase: (jsonString: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const safeSetStorage = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn(`LocalStorage quota reached when saving ${key}. Purging non-essential media cache...`, e);
    try {
      localStorage.removeItem('bandhanu_media_library');
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }
};

const getStored = (key: string, legacyKey?: string): string | null => {
  try {
    const val = localStorage.getItem(key);
    if (val) return val;
    if (legacyKey) {
      const leg = localStorage.getItem(legacyKey);
      if (leg) return leg;
    }
    return null;
  } catch {
    return null;
  }
};

const STORAGE_KEYS = {
  PRODUCTS: 'bandhanu_products_v11',
  CATEGORIES: 'bandhanu_categories_v10',
  BANNERS: 'bandhanu_banners_v10',
  PROFILE: 'bandhanu_profile_v10',
  ENQUIRIES: 'bandhanu_enquiries_v10',
  WISHLIST: 'bandhanu_wishlist_v10',
  CART: 'bandhanu_cart_v10',
  SITE_CONTENT: 'bandhanu_site_content_v10',
  STUDIO_AUTH: 'bandhanu_studio_session'
};

// Purge truly obsolete legacy mock storage versions (never active versions)
try {
  ['v1', 'v2', 'v3', 'v4', 'v5'].forEach(ver => {
    ['products', 'categories', 'enquiries', 'profile', 'site_content', 'banners', 'cart', 'wishlist'].forEach(type => {
      localStorage.removeItem(`bandhanu_${type}_${ver}`);
    });
  });
} catch {}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notify } = useNotification();

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
      const saved = getStored(STORAGE_KEYS.WISHLIST, 'bandhanu_wishlist_v7');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = getStored(STORAGE_KEYS.CART, 'bandhanu_cart_v7');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.CART, JSON.stringify(cart));
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
    notify.royal('Added to Bag', `${product.title} (${color}) added to your bag.`, {
      thumbnail: product.images[0],
      action: {
        label: 'View Bag',
        onClick: () => setIsCartOpen(true)
      }
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(item => item.product.id !== productId));
    if (item) {
      notify.info('Removed from Bag', `${item.product.title} was removed.`);
    }
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
      const saved = getStored(STORAGE_KEYS.PRODUCTS, 'bandhanu_products_v9');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = getStored(STORAGE_KEYS.CATEGORIES, 'bandhanu_categories_v9');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const saved = getStored(STORAGE_KEYS.BANNERS, 'bandhanu_banners_v7');
      return saved ? JSON.parse(saved) : INITIAL_BANNERS;
    } catch {
      return INITIAL_BANNERS;
    }
  });

  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const saved = getStored(STORAGE_KEYS.PROFILE, 'bandhanu_profile_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.whatsappNumber === '919876543210' || !parsed.whatsappNumber) {
          parsed.whatsappNumber = INITIAL_BUSINESS_PROFILE.whatsappNumber;
          parsed.displayPhone = INITIAL_BUSINESS_PROFILE.displayPhone;
        }
        if (parsed.email === 'concierge@bandhanu.com' || !parsed.email) {
          parsed.email = INITIAL_BUSINESS_PROFILE.email;
        }
        if (parsed.businessName === 'BANDHANU' || !parsed.businessName) {
          parsed.businessName = INITIAL_BUSINESS_PROFILE.businessName;
        }
        return parsed;
      }
      return INITIAL_BUSINESS_PROFILE;
    } catch {
      return INITIAL_BUSINESS_PROFILE;
    }
  });

  const [siteContent, setSiteContent] = useState<UniversalSiteContent>(() => {
    try {
      const saved = getStored(STORAGE_KEYS.SITE_CONTENT, 'bandhanu_site_content_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.contact) {
          if (parsed.contact.whatsappNumber === '919876543210' || !parsed.contact.whatsappNumber) {
            parsed.contact.whatsappNumber = INITIAL_BUSINESS_PROFILE.whatsappNumber;
            parsed.contact.displayPhone = INITIAL_BUSINESS_PROFILE.displayPhone;
          }
          if (parsed.contact.email === 'concierge@bandhanu.com' || !parsed.contact.email) {
            parsed.contact.email = INITIAL_BUSINESS_PROFILE.email;
          }
          if (parsed.contact.businessName === 'BANDHANU' || !parsed.contact.businessName) {
            parsed.contact.businessName = INITIAL_BUSINESS_PROFILE.businessName;
          }
        }
        if (parsed?.about) {
          parsed.about = {
            ...INITIAL_SITE_CONTENT.about,
            ...parsed.about
          };
          if (!parsed.about.locationTagline || parsed.about.locationTagline.includes('Humse') || parsed.about.locationTagline === 'The Artisan Heartland') {
            parsed.about.locationTagline = 'Visit Our Heritage Atelier • Get Directions';
          }
          if (!parsed.about.locationMapUrl || parsed.about.locationMapUrl.includes('Darbargadh')) {
            parsed.about.locationMapUrl = 'https://maps.app.goo.gl/86qCkie4AofH5xPQA';
          }
        } else {
          parsed.about = INITIAL_SITE_CONTENT.about;
        }
        return parsed;
      }
      return INITIAL_SITE_CONTENT;
    } catch {
      return INITIAL_SITE_CONTENT;
    }
  });

  const [enquiryLogs, setEnquiryLogs] = useState<EnquiryLog[]>(() => {
    try {
      const saved = getStored(STORAGE_KEYS.ENQUIRIES, 'bandhanu_enquiries_v9');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_ENQUIRIES_LOG;
    } catch {
      return INITIAL_ENQUIRIES_LOG;
    }
  });

  // BroadcastChannel for instant real-time multi-tab synchronization
  const broadcastSync = (type: string, payload: any) => {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const channel = new BroadcastChannel('bandhanu_tab_sync');
        channel.postMessage({ type, payload });
        channel.close();
      }
    } catch {}
  };

  // Listen for real-time changes across open browser tabs
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel('bandhanu_tab_sync');
        channel.onmessage = (event) => {
          const { type, payload } = event.data || {};
          if (type === 'SITE_CONTENT' && payload) {
            setSiteContent(payload);
          } else if (type === 'PRODUCTS' && payload) {
            setProducts(payload);
          } else if (type === 'CATEGORIES' && payload) {
            setCategories(payload);
          } else if (type === 'PROFILE' && payload) {
            setProfile(payload);
          } else if (type === 'BANNERS' && payload) {
            setBanners(payload);
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if ((e.key === STORAGE_KEYS.SITE_CONTENT || e.key === 'bandhanu_site_content_v7') && e.newValue) {
        try {
          setSiteContent(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Sync to LocalStorage Cache (with safe quota handling)
  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    broadcastSync('PRODUCTS', products);
  }, [products]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    broadcastSync('CATEGORIES', categories);
  }, [categories]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    broadcastSync('BANNERS', banners);
  }, [banners]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    broadcastSync('PROFILE', profile);
  }, [profile]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(siteContent));
    broadcastSync('SITE_CONTENT', siteContent);
  }, [siteContent]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiryLogs));
  }, [enquiryLogs]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
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
    notify.success('Theme Applied', 'Palette colors updated across the storefront.');

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
    notify.info('Theme Reset', 'Restored default Bandhanu heritage palette.');
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

  // Load live data from Cloudflare D1 Cloud Database (and Supabase fallback)
  useEffect(() => {
    const fetchLiveCloudData = async () => {
      // 1. Try Cloudflare D1 backend API first
      try {
        const [prodRes, catRes, profRes, contentRes, enqRes] = await Promise.allSettled([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/profile'),
          fetch('/api/site-content'),
          fetch('/api/enquiries')
        ]);

        let connectedToD1 = false;
        const isJson = (res: Response) => res.headers.get('content-type')?.includes('application/json');

        // Process Products
        if (prodRes.status === 'fulfilled' && prodRes.value.ok && isJson(prodRes.value)) {
          const json = await prodRes.value.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setProducts(json.data);
            connectedToD1 = true;
          }
        }

        // Process Categories
        if (catRes.status === 'fulfilled' && catRes.value.ok && isJson(catRes.value)) {
          const json = await catRes.value.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setCategories(json.data);
            connectedToD1 = true;
          }
        }

        // Process Profile
        if (profRes.status === 'fulfilled' && profRes.value.ok && isJson(profRes.value)) {
          const json = await profRes.value.json();
          if (json.success && json.data && json.data.whatsappNumber) {
            setProfile(prev => ({ ...prev, ...json.data }));
            connectedToD1 = true;
          }
        }

        // Process Site Content
        if (contentRes.status === 'fulfilled' && contentRes.value.ok && isJson(contentRes.value)) {
          const json = await contentRes.value.json();
          if (json.success && json.data && Object.keys(json.data).length > 0) {
            setSiteContent(prev => ({ ...prev, ...json.data }));
            connectedToD1 = true;
          }
        }

        // Process Enquiries
        if (enqRes.status === 'fulfilled' && enqRes.value.ok && isJson(enqRes.value)) {
          const json = await enqRes.value.json();
          if (json.success && Array.isArray(json.data)) {
            setEnquiryLogs(json.data);
          }
        }

        if (connectedToD1) {
          setDbStatus('connected');
          return;
        }
      } catch (e) {
        console.log('D1 local notice:', e);
      }

      // 2. Supabase fallback if configured
      if (!isSupabaseConfigured) {
        setDbStatus('local');
        return;
      }

      try {
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
          setDbStatus('connected');
        }
      } catch (err) {
        console.warn('Supabase live fetch notice:', err);
      }
    };

    fetchLiveCloudData();
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
      if (raw === 'product' || raw.startsWith('product/') || raw.startsWith('product?')) {
        const id = raw.startsWith('product/')
          ? raw.replace('product/', '').split('?')[0].trim()
          : null;
        setCurrentPage('product');
        if (id) {
          setSelectedProductId(id);
        }
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

      // Unrecognized route fallback to custom 404 page
      setCurrentPage('404');
      setSelectedProductId(null);
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

  const handleSetCurrentPage = (page: CustomerPage, targetProductId?: string) => {
    setCurrentPage(page);
    setActiveView('store');
    if (page !== 'product') {
      setSelectedProductId(null);
    }
    if (page === 'product') {
      const pid = targetProductId || selectedProductId;
      window.location.hash = pid ? `#/product/${pid}` : '#/product';
    } else {
      window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    }
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
    const isSaved = wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);
    const title = prod ? prod.title : 'Piece';
    setWishlist(prev =>
      isSaved ? prev.filter(id => id !== productId) : [...prev, productId]
    );
    if (isSaved) {
      notify.info('Wishlist Updated', `${title} removed from your wishlist.`);
    } else {
      notify.royal('Saved to Wishlist ❤️', `${title} saved to your curated wishlist.`);
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Content CMS Update with Supabase & Cloudflare D1 Cloud Sync
  const updateSiteContent = async (newContent: UniversalSiteContent) => {
    setSiteContent(newContent);
    safeSetStorage(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(newContent));
    broadcastSync('SITE_CONTENT', newContent);
    notify.success('CMS Content Saved', 'Storefront sections and copy updated.');

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

    // Cloudflare D1 backend sync
    try {
      const res = await fetch('/api/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent)
      });
      if (res.ok) setDbStatus('connected');
    } catch (e) {
      console.warn('D1 content sync notice:', e);
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

  // Product Actions with Cloudflare D1 & Supabase Persistence
  const addProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'views' | 'enquiriesCount'>): Promise<Product> => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      views: 1,
      enquiriesCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);

    // Save to Cloudflare D1
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) setDbStatus('connected');
    } catch (e) {
      console.warn('D1 product save notice:', e);
    }

    if (isSupabaseConfigured) {
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
    }

    notify.success('Piece Added', `"${newProduct.title}" has been added to your catalogue.`);
    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));

    // Save to Cloudflare D1
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) setDbStatus('connected');
    } catch (e) {
      console.warn('D1 product update notice:', e);
    }

    if (isSupabaseConfigured) {
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
    }
    notify.success('Piece Updated', 'All specifications and changes have been saved.');
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProductId === id) setSelectedProductId(null);
    if (quickViewProductId === id) setQuickViewProductId(null);

    // Delete in Cloudflare D1
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) setDbStatus('connected');
    } catch (e) {
      console.warn('D1 product delete notice:', e);
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase product delete error:', err);
      }
    }
    notify.info('Piece Removed', 'The item was deleted from your catalogue.');
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

  // Category Actions with Cloudflare D1 & Supabase Persistence
  const addCategory = async (data: Omit<Category, 'id'>): Promise<Category> => {
    const newCategory: Category = {
      ...data,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCategory]);

    // Save to Cloudflare D1
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });
      if (res.ok) setDbStatus('connected');
    } catch (e) {
      console.warn('D1 category save notice:', e);
    }

    if (isSupabaseConfigured) {
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
    }
    notify.success('Category Created', `Category "${newCategory.name}" is now live.`);
    return newCategory;
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    let targetCategory: Category | undefined;
    setCategories(prev => {
      const next = prev.map(c => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          targetCategory = updated;
          return updated;
        }
        return c;
      });
      return next;
    });

    if (targetCategory) {
      // Save to Cloudflare D1
      try {
        await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetCategory)
        });
      } catch (e) {
        console.warn('D1 category update notice:', e);
      }
    }

    if (isSupabaseConfigured) {
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
    }
    notify.success('Category Updated', 'Category details and subcategories saved.');
  };

  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));

    // Delete in Cloudflare D1
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('D1 category delete notice:', e);
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase category delete error:', err);
      }
    }
    notify.info('Category Removed', 'The category was deleted.');
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

  // Profile Actions with Cloudflare D1 & Supabase Sync
  const updateProfile = (updates: Partial<BusinessProfile>) => {
    let updatedProfile: BusinessProfile | null = null;
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      updatedProfile = updated;
      try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      } catch {}

      // Cloudflare D1 sync
      fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }).then(() => setDbStatus('connected')).catch(e => console.warn('D1 profile sync notice:', e));

      if (isSupabaseConfigured) {
        supabase
          .from('business_profile')
          .upsert({ id: 'primary', ...updated, updated_at: new Date().toISOString() })
          .then(({ error }: any) => {
            if (!error) setDbStatus('connected');
          });
      }
      return updated;
    });

    // Synchronize to siteContent.contact so CMS and Frontend are 100% aligned
    setSiteContent(prev => {
      const cleanPhone = (updates.whatsappNumber || prev.contact.whatsappNumber || '').replace(/[^0-9]/g, '');
      const updatedContent: UniversalSiteContent = {
        ...prev,
        announcement: {
          ...prev.announcement,
          ctaLink: cleanPhone ? getWhatsAppDirectUrl(cleanPhone, prev.announcement.text || 'Hello Bandhanu!') : prev.announcement.ctaLink
        },
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
      try {
        localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(updatedContent));
      } catch {}

      // Attempt cloud sync if connected
      fetch('/api/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      }).catch(e => console.warn('D1 content sync notice:', e));

      if (isSupabaseConfigured) {
        (async () => {
          try {
            await supabase
              .from('site_content')
              .upsert({ key: 'contact', value: updatedContent.contact, updated_at: new Date().toISOString() });
            await supabase
              .from('site_content')
              .upsert({ key: 'announcement', value: updatedContent.announcement, updated_at: new Date().toISOString() });
            setDbStatus('connected');
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

  const triggerWhatsAppEnquiry = (product: Product, selectedColorName?: string, quantity: number = 1) => {
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

    // Update product enquiry count locally
    updateProduct(product.id, { enquiriesCount: (product.enquiriesCount || 0) + 1 });

    // Cloudflare D1 Enquiry Log
    try {
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog)
      }).catch(e => console.warn('D1 enquiry sync notice:', e));
    } catch {}

    if (isSupabaseConfigured) {
      try {
        supabase.from('enquiries').insert({
          id: newLog.id,
          product_id: product.id,
          product_title: product.title,
          customer_phone: 'Direct WhatsApp',
          category: product.category,
          notes: `Inquiry for ${newLog.color} shade (Qty: ${quantity})`,
          created_at: newLog.timestamp
        });
      } catch (err) {
        console.warn('Enquiry log sync notice:', err);
      }
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://bandhanu.com';
    let message = profile.customMessageTemplate
      .replace('{product_name}', product.title)
      .replace('{sku}', product.sku)
      .replace('{price}', `${profile.currencySymbol}${product.price.toLocaleString('en-IN')}`)
      .replace('{color}', chosenColor)
      .replace('{url}', currentUrl);

    if (quantity > 1) {
      message += `\n✦ Quantity: ${quantity}`;
      message += `\n✦ Estimated Total: ${profile.currencySymbol}${(product.price * quantity).toLocaleString('en-IN')}`;
    }

    message += `\n✦ Craft: ${product.craftTechnique}`;
    if (product.knotCount) {
      message += `\n✦ Knots: ${product.knotCount}`;
    }

    notify.royal('Opening WhatsApp Concierge', `Connecting you to reserve ${product.title}...`);
    // Direct jump into WhatsApp chat section (skips api.whatsapp.com landing page)
    openWhatsAppDirect(profile.whatsappNumber, message);
  };

  const triggerMultiProductEnquiry = (items: Product[]) => {
    if (items.length === 0) return;
    let message = `Hello ${profile.businessName || 'Bandhanu'} Concierge!\n\nI am interested in reserving the following handcrafted pieces from my curated Wishlist:\n`;
    items.forEach((item, idx) => {
      message += `\n${idx + 1}. *${item.title}* (SKU: ${item.sku})\n   Price: ${profile.currencySymbol}${item.price.toLocaleString('en-IN')}`;
      if (item.craftTechnique) message += ` | ${item.craftTechnique}`;
    });
    const totalVal = items.reduce((sum, p) => sum + p.price, 0);
    message += `\n\n✦ *Total Estimated Value:* ${profile.currencySymbol}${totalVal.toLocaleString('en-IN')}\n\nPlease let me know availability, craftsmanship details, and dispatch timeframe. Thank you!`;
    notify.royal('Opening WhatsApp Concierge', `Connecting you to enquire about ${items.length} wishlist pieces...`);
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
    notify.info('Catalogue Reset', 'All cached data and state restored to default.');
  };

  const clearAllProducts = () => {
    setProducts([]);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
    notify.warning('Catalogue Emptied', 'All products have been cleared from database.');
  };

  const exportDatabase = () => {
    const data = { products, categories, banners, profile, enquiryLogs, siteContent };
    notify.success('Catalogue Exported', 'JSON database backup downloaded.');
    return JSON.stringify(data, null, 2);
  };

  const importDatabase = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
        if (data.categories) setCategories(data.categories);
        if (data.banners) setBanners(data.banners);
        if (data.profile) setProfile(data.profile);
        if (data.siteContent) setSiteContent(data.siteContent);
        notify.success('Database Restored', 'All products, categories, and settings imported.');
        return true;
      }
      notify.error('Invalid Format', 'JSON file does not contain valid Bandhanu backup data.');
      return false;
    } catch {
      notify.error('Import Failed', 'Unable to parse JSON backup file.');
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
        triggerMultiProductEnquiry,
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
