import { Category, Product, Banner, BusinessProfile, EnquiryLog } from '../types';

export const INITIAL_CATEGORIES: Category[] = [];

export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'ban-1',
    title: 'Where Heritage Meets Style',
    subtitle: 'Hand-tied. Hand-dyed. Timeless.',
    ctaText: 'EXPLORE COLLECTION',
    ctaCategory: 'sarees',
    badge: 'HANDCRAFTED BANDHANI TEXTILES',
    bgGradient: 'from-[#4A121A] via-[#380D13] to-[#241E1C]',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85',
    isActive: true
  }
];

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  businessName: 'BANDHANU',
  tagline: 'Tie and Dye Textile • Where Heritage Meets Style',
  whatsappNumber: '919876543210',
  displayPhone: '+91 98765 43210',
  email: 'concierge@bandhanu.com',
  address: 'Artisan Heritage Atelier, Bhadli, Kutch - 370485, Gujarat, India',
  city: 'Bhadli, Kutch',
  state: 'Gujarat',
  instagramHandle: '@bandhanu',
  currencySymbol: '₹',
  customMessageTemplate: `Hello Bandhanu Concierge! 👋

I would like to enquire / order this handcrafted piece:

✦ Product: {product_name}
✦ SKU: {sku}
✦ Price: {price}
✦ Color: {color}
✦ Link: {url}

Could you please confirm availability and dispatch timeline? Thank you!`
};

export const INITIAL_ENQUIRIES_LOG: EnquiryLog[] = [];
