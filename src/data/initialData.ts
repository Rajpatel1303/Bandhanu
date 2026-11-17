import { Category, Product, Banner, BusinessProfile, EnquiryLog } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-sarees',
    name: 'Sarees',
    slug: 'sarees',
    description: 'Grace in every drape',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    badge: 'Signature',
    isActive: true,
    subCategories: [
      { id: 'sub-sar-1', name: 'Silk Sarees', slug: 'silk-sarees', description: 'Pure Gaji & Mulberry silk drapes' },
      { id: 'sub-sar-2', name: 'Cotton Bandhani', slug: 'cotton-bandhani', description: 'Handspun natural cotton drapes' },
      { id: 'sub-sar-3', name: 'Khaddi Georgette', slug: 'khaddi-georgette', description: 'Flowing lightweight party drapes' }
    ]
  },
  {
    id: 'cat-dupattas',
    name: 'Dupattas',
    slug: 'dupattas',
    description: 'Add a touch of tradition',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    badge: 'Trending',
    isActive: true,
    subCategories: [
      { id: 'sub-dup-1', name: 'Gaji Silk Dupattas', slug: 'gaji-dupattas', description: 'Rich heavy silk dupattas' },
      { id: 'sub-dup-2', name: 'Bridal Zari Dupattas', slug: 'bridal-zari', description: 'Heirloom lagdi patto zari borders' }
    ]
  },
  {
    id: 'cat-stoles',
    name: 'Stoles & Scarves',
    slug: 'stoles-scarves',
    description: 'Lightweight. Versatile. Timeless.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    badge: 'Modern Heritage',
    isActive: true,
    subCategories: [
      { id: 'sub-stl-1', name: 'Modal Silk Stoles', slug: 'modal-silk', description: 'Soft breathable evening stoles' },
      { id: 'sub-stl-2', name: 'Indigo Shibori', slug: 'indigo-shibori', description: 'Natural plant indigo dip-dyes' }
    ]
  },
  {
    id: 'cat-clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'For everyday & beyond',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
    badge: 'Everyday Luxury',
    isActive: true,
    subCategories: [
      { id: 'sub-gar-1', name: 'Kurtas & Tunics', slug: 'kurtas', description: 'Handcrafted artisan everyday kurtas' },
      { id: 'sub-gar-2', name: 'Kala Cotton Shirts', slug: 'kala-cotton-shirts', description: 'Pure organic rain-fed cotton shirts' }
    ]
  }
];

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
