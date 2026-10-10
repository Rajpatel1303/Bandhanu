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

export type ActiveView = 'store' | 'admin';
export type CustomerPage = 'home' | 'catalogue' | 'product' | 'contact' | 'about' | 'wishlist';
export type AdminTab = 'analytics' | 'products' | 'categories' | 'banners' | 'cms' | 'settings';

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
}

export interface UniversalSiteContent {
  announcement: SiteAnnouncement;
  hero: SiteHero;
  about: SiteAbout;
  contact: SiteContact;
  toggles: SectionToggles;
}
