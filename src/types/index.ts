export type AvailabilityStatus = 'in_stock' | 'made_to_order' | 'sold_out';

export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  craftTechnique: string;
  knotCount?: string;
  images: string[];
  colors: ProductColor[];
  description: string;
  features: string[];
  washCare: string;
  dimensions?: string;
  availability: AvailabilityStatus;
  leadTime?: string;
  isFeatured: boolean;
  isNewDrop?: boolean;
  subCategory?: string;
  views: number;
  enquiriesCount: number;
  createdAt: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
  subCategories?: SubCategory[];
  isActive: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaCategory?: string;
  badge: string;
  bgGradient: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface BusinessProfile {
  businessName: string;
  tagline: string;
  whatsappNumber: string; // digits only e.g. 919876543210
  displayPhone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  instagramHandle: string;
  currencySymbol: string;
  customMessageTemplate: string; // Supports tokens: {product_name}, {sku}, {price}, {color}, {url}
}

export interface EnquiryLog {
  id: string;
  productId: string;
  productTitle: string;
  sku: string;
  price: number;
  color: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'converted';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type ActiveView = 'store' | 'admin';
export type CustomerPage = 'home' | 'catalogue' | 'product' | 'contact' | 'about' | 'wishlist' | '404';
export type AdminTab = 'analytics' | 'products' | 'categories' | 'banners' | 'cms' | 'theme' | 'settings';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'royal';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, defaults to 4000
  action?: ToastAction;
  thumbnail?: string;
}

export type DialogVariant = 'danger' | 'warning' | 'info' | 'royal';

export interface ConfirmationDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface AlertDialogOptions {
  title: string;
  message: string;
  buttonText?: string;
  variant?: DialogVariant;
  onClose?: () => void;
}

export interface SiteAnnouncement {
  enabled: boolean;
  text: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
}

export interface SiteHero {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  knotBadgeText: string;
  knotBadgeSub: string;
  heroImage: string;
  heroProductTitle: string;
  heroProductSub: string;
}

export interface SiteAbout {
  badge: string;
  headline: string;
  storyParagraph1: string;
  storyParagraph2: string;
  quoteText: string;
  quoteAuthor: string;
  visionPillar1Title: string;
  visionPillar1Desc: string;
  visionPillar2Title: string;
  visionPillar2Desc: string;
  visionPillar3Title: string;
  visionPillar3Desc: string;
}

export interface SiteContact {
  businessName: string;
  tagline: string;
  address: string;
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  instagramHandle: string;
  visitingHours: string;
  mapUrl: string;
}

export interface SectionToggles {
  showAnnouncement: boolean;
  showLookbook: boolean;
  showCraftJourney: boolean;
  showTestimonials: boolean;
  showSimilarProducts: boolean;
  showCustomOrders?: boolean;
}

export interface SiteCustomOrder {
  badge: string;
  heading: string;
  subtitle: string;
  description: string;
  image: string;
  leadTime: string;
  whatsappCtaText: string;
  productTypes?: string[];
  fabrics: string[];
  patterns: string[];
  colors: { name: string; hex: string }[];
}

export interface CraftStageItem {
  step: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  image: string;
  alt: string;
  caption: string;
}

export interface SiteCraftJourney {
  badge: string;
  heading: string;
  description: string;
  stages: CraftStageItem[];
  techniqueNote1: string;
  techniqueNote2: string;
}

export interface CustomThemeSettings {
  textPrimary: string;
  textMuted: string;
  pageBackground: string;
  cardBackground: string;
  borderColor: string;
  brandAccent: string;
  brandAccentHover: string;
  sections: {
    navbar: {
      bg?: string;
      text?: string;
    };
    hero: {
      bg?: string;
      titleColor?: string;
      btnBg?: string;
      btnText?: string;
    };
    categories: {
      bg?: string;
      titleColor?: string;
      cardBg?: string;
    };
    featured: {
      bg?: string;
      titleColor?: string;
      cardBg?: string;
    };
    craft: {
      bg?: string;
      cardBg?: string;
      titleColor?: string;
      textColor?: string;
    };
    story: {
      bg?: string;
      cardBg?: string;
      titleColor?: string;
      textColor?: string;
      btnBg?: string;
    };
    instagram: {
      bg?: string;
      titleColor?: string;
    };
    footer: {
      bg?: string;
      textColor?: string;
    };
  };
}

export interface UniversalSiteContent {
  announcement: SiteAnnouncement;
  hero: SiteHero;
  about: SiteAbout;
  contact: SiteContact;
  toggles: SectionToggles;
  craftJourney?: SiteCraftJourney;
  customOrder?: SiteCustomOrder;
  theme?: CustomThemeSettings;
}
