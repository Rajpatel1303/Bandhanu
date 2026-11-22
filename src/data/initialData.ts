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

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Bandhani Silk Saree',
    subtitle: 'A timeless hand-tied Bandhani saree in rich maroon, crafted in soft silk.',
    sku: 'BD-SAR-101',
    category: 'sarees',
    subCategory: 'silk-sarees',
    price: 14500,
    originalPrice: 17500,
    fabric: 'Pure Soft Mulberry Silk',
    craftTechnique: 'Authentic Rai Bandhej & Lagdi Patto Zari',
    knotCount: '~24,000 hand-tied micro knots',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Imperial Maroon', hex: '#4A121A', inStock: true },
      { name: 'Deep Crimson', hex: '#6A1A24', inStock: true },
      { name: 'Sunset Rust', hex: '#A6432D', inStock: true }
    ],
    description: 'A timeless hand-tied Bandhani saree in rich maroon, crafted in soft silk. Each dot is pinched with surgical precision by master artisans in Bhadli, Kutch, before undergoing natural dye bath immersion.',
    features: [
      'Handcrafted in Bhadli, Kutch by master artisans',
      '100% Pure Mulberry Silk with Silk Mark authentication',
      'Naturally dyed with plant and mineral pigments',
      'Pure metallic antique gold Lagdi Patto zari border',
      'Includes matching unstitched silk blouse piece (80 cm)'
    ],
    washCare: 'Strictly dry clean only. Wrap in soft unbleached muslin cloth. Avoid direct perfume or water sprays.',
    dimensions: 'Length: 5.5 metres + 0.8 metre blouse piece. Width: 44 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch within 24 Hours',
    isFeatured: true,
    isNewDrop: true,
    views: 1850,
    enquiriesCount: 112,
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-2',
    title: 'Gaji Silk Dupatta',
    subtitle: 'Vibrant celebratory dupatta hand-dyed in auspicious saffron and rich crimson red.',
    sku: 'BD-DUP-201',
    category: 'dupattas',
    subCategory: 'gaji-dupattas',
    price: 6500,
    originalPrice: 7800,
    fabric: 'Heavy 110 GSM Pure Gaji Silk',
    craftTechnique: 'Dual-Tone Ombre & Sacred Flower Motif Knots',
    knotCount: '~12,000 knots',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Saffron & Maroon', hex: '#C85A32', inStock: true },
      { name: 'Peacock Indigo', hex: '#1E2B45', inStock: true }
    ],
    description: 'Luxurious heavy Gaji silk drape boasting a brilliant gloss and supple hand-feel. Bordered with a delicate woven zari band and traditional hand-tied floral bunches.',
    features: [
      'Pure heavy glazed Gaji silk',
      'Dual shade ombre dye',
      'Hand-twisted tassel trims at both pallus'
    ],
    washCare: 'Dry clean only.',
    dimensions: 'Length: 2.5 metres. Width: 42 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: true,
    isNewDrop: true,
    views: 1420,
    enquiriesCount: 89,
    createdAt: '2026-03-03'
  },
  {
    id: 'prod-3',
    title: 'Kala Cotton Shirt',
    subtitle: 'Earthy breathable organic cotton shirt with subtle artisan Bandhej accents.',
    sku: 'BD-GAR-301',
    category: 'clothing',
    subCategory: 'kala-cotton-shirts',
    price: 3200,
    originalPrice: 3800,
    fabric: '100% Indigenous Kala Cotton',
    craftTechnique: 'Rain-fed Cotton Weaving & Hand-Tied Pocket Flap',
    knotCount: '~800 knots',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Kutch Sand', hex: '#E2D7C7', inStock: true },
      { name: 'Charcoal Black', hex: '#241E1C', inStock: true }
    ],
    description: 'Sustainably crafted from rain-fed Kala cotton native to Kutch. Naturally breathable and gentle against the skin, subtly finished with handcrafted Bandhani resist detailing.',
    features: [
      'Carbon-neutral, organic indigenous cotton',
      'Natural coconut shell buttons',
      'Relaxed resort silhouette'
    ],
    washCare: 'Machine wash gentle cycle cold or hand wash with mild soap.',
    dimensions: 'Sizes: S, M, L, XL available.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: false,
    isNewDrop: true,
    views: 890,
    enquiriesCount: 54,
    createdAt: '2026-03-08'
  },
  {
    id: 'prod-7',
    title: 'Cotton Bandhani Saree',
    subtitle: 'Earthy handspun cotton saree woven by master weavers and tied in Kutch.',
    sku: 'BD-SAR-701',
    category: 'sarees',
    subCategory: 'cotton-bandhani',
    price: 12000,
    originalPrice: 14000,
    fabric: 'Handspun 100% Kutch Cotton',
    craftTechnique: 'Traditional Madder Red Resist Dyeing',
    knotCount: '~20,000 knots',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Madder Wine', hex: '#4A121A', inStock: true },
      { name: 'Terracotta Ochre', hex: '#A6432D', inStock: true }
    ],
    description: 'A tribute to slow textiles. Woven from breathable handspun cotton yarns, this saree is adorned with all-over geometric Bandhej jaal, perfect for festive rituals, ceremonies, and elegant gatherings.',
    features: [
      'Handspun organic cotton with unmatched earthy softness',
      'Traditional Bhadli village artisan knotting',
      'Pure woven temple border',
      'Unstitched matching blouse fabric included'
    ],
    washCare: 'Dry clean recommended. Gentle hand wash in cold water.',
    dimensions: 'Length: 6.2 metres (with blouse piece). Width: 45 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: false,
    isNewDrop: true,
    views: 740,
    enquiriesCount: 39,
    createdAt: '2026-03-12'
  }
];

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
  businessName: 'Bandhanu',
  tagline: 'Tie and Dye Textile • Where Heritage Meets Style',
  whatsappNumber: '919662644625',
  displayPhone: '+91 96626 44625',
  email: 'badhanuart@gmail.com',
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
