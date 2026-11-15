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
    knotCount: '~12,000 hand-tied knots',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Saffron & Maroon', hex: '#D97706', inStock: true },
      { name: 'Kutch Madder Red', hex: '#4A121A', inStock: true }
    ],
    description: 'Crafted with premium high-luster Gaji silk, this statement dupatta features vibrant saffron and maroon blocks crowned by delicate hand-tied Bandhani dots and pure gold zari borders.',
    features: [
      'Lustrous pure Gaji silk with fluid festive weight',
      'Traditional double-dip sequential dye technique',
      'Embellished with hand-twisted silk tassels on corners',
      'Authentic Kutch artisan heritage weave'
    ],
    washCare: 'Dry clean only. Roll softly to maintain texture.',
    dimensions: 'Length: 2.5 metres. Width: 38 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: true,
    isNewDrop: false,
    views: 1220,
    enquiriesCount: 68,
    createdAt: '2026-03-02'
  },
  {
    id: 'prod-3',
    title: 'Fine Cotton Stole',
    subtitle: 'Lightweight breathable stole woven from fine modal cotton with delicate white dots.',
    sku: 'BD-STL-301',
    category: 'stoles-scarves',
    subCategory: 'modal-silk',
    price: 2200,
    originalPrice: 2800,
    fabric: 'Fine Breathable Cotton Modal',
    craftTechnique: 'Micro Rai Bandhani on Ivory Ground',
    knotCount: '~8,500 knots',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Warm Ivory & Maroon', hex: '#F5EFE6', inStock: true },
      { name: 'Sandy Taupe', hex: '#6E6259', inStock: true }
    ],
    description: 'An everyday luxury accent piece. Buttery soft, sustainably crafted fine cotton modal provides all-day comfort while showcasing delicate micro-knots pinched by hand.',
    features: [
      'Ultra-breathable all-season comfort',
      'Featherweight feel with subtle fringe detail',
      'Skin-friendly AZO-free hypoallergenic dyes'
    ],
    washCare: 'Gentle hand wash in cold water with mild liquid detergent. Dry in shade.',
    dimensions: 'Length: 2.0 metres. Width: 28 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: true,
    isNewDrop: true,
    views: 890,
    enquiriesCount: 42,
    createdAt: '2026-03-05'
  },
  {
    id: 'prod-4',
    title: 'Bandhani Kurta',
    subtitle: 'Contemporary relaxed-fit kurta crafted with artisanal tie-dye geometric patterns.',
    sku: 'BD-GAR-401',
    category: 'clothing',
    subCategory: 'kurtas',
    price: 2800,
    originalPrice: 3500,
    fabric: 'Pure Handloom Chanderi Cotton',
    craftTechnique: 'All-over Diamond Jaal Bandhani',
    knotCount: '~9,200 knots',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Olive Forest', hex: '#2D3A29', inStock: true },
      { name: 'Earthy Indigo', hex: '#1E2B45', inStock: true }
    ],
    description: 'Designed for the modern connoisseur, this Bandhani kurta bridges heirloom textile art with effortless contemporary silhouette. Finished with handmade fabric potli buttons.',
    features: [
      'Breathable handwoven Chanderi cotton with soft mulmul lining',
      'Contemporary Mandarin V-neckline',
      'Handcrafted fabric potli button accents'
    ],
    washCare: 'Cold gentle hand wash or dry clean. Iron on reverse side.',
    dimensions: 'Available in XS, S, M, L, XL, XXL. Regular relaxed fit.',
    availability: 'in_stock',
    leadTime: 'Ships in 48 Hours',
    isFeatured: true,
    isNewDrop: false,
    views: 1150,
    enquiriesCount: 56,
    createdAt: '2026-03-08'
  },
  {
    id: 'prod-5',
    title: 'Kala Cotton Shirt',
    subtitle: 'Organic indigenous Kala cotton shirt naturally dip-dyed in authentic plant indigo.',
    sku: 'BD-GAR-501',
    category: 'clothing',
    subCategory: 'kala-cotton-shirts',
    price: 2300,
    originalPrice: 2900,
    fabric: '100% Organic Rain-Fed Kutch Kala Cotton',
    craftTechnique: 'Natural Indigo Vat Dyeing & Hand-Resist Dots',
    knotCount: '~6,000 dots',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Midnight Indigo', hex: '#1E2B45', inStock: true },
      { name: 'Raw Natural Ecru', hex: '#F5EFE6', inStock: true }
    ],
    description: 'Woven from organic rain-fed Kala cotton native to Kutch. Naturally dyed using fermented plant indigo, this timeless unisex shirt breathes easily in warm climates and softens with every wash.',
    features: [
      'Pure organic Kutch Kala cotton (carbon-neutral farming)',
      '100% plant-based living indigo vat dye',
      'Natural coconut shell buttons',
      'Tailored casual button-down collar'
    ],
    washCare: 'Hand wash separately in cold water with mild detergent. Do not bleach.',
    dimensions: 'Sizes: S (38), M (40), L (42), XL (44).',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: true,
    isNewDrop: true,
    views: 1410,
    enquiriesCount: 78,
    createdAt: '2026-03-10'
  },
  {
    id: 'prod-6',
    title: 'Bandhani Dupatta',
    subtitle: 'Festive celebration dupatta in traditional multi-color sunset tie-dye gradients.',
    sku: 'BD-DUP-601',
    category: 'dupattas',
    subCategory: 'bridal-zari',
    price: 5800,
    originalPrice: 6900,
    fabric: 'Pure Mulberry Chiffon Silk',
    craftTechnique: 'Multi-Dip Bandhani with Antique Zari Kiran Border',
    knotCount: '~15,000 knots',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Sunset Yellow & Maroon', hex: '#D97706', inStock: true },
      { name: 'Royal Sindoor', hex: '#4A121A', inStock: true }
    ],
    description: 'The epitome of traditional celebratory charm. Fine silk chiffon is sequentially dipped in warm turmeric yellow and deep maroon baths to produce radiating concentric circular motifs.',
    features: [
      'Lightweight floating silk chiffon drape',
      'Traditional kiran fringe lace edging',
      'Intricate floral ring knot patterns'
    ],
    washCare: 'Dry clean only. Store wrapped in tissue paper.',
    dimensions: 'Length: 2.4 metres. Width: 40 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: true,
    isNewDrop: false,
    views: 990,
    enquiriesCount: 47,
    createdAt: '2026-03-11'
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
  },
  {
    id: 'prod-8',
    title: 'Bandhani Stole',
    subtitle: 'Artisanal modal stole with fine indigo geometric bandhani rows.',
    sku: 'BD-STL-801',
    category: 'stoles-scarves',
    subCategory: 'indigo-shibori',
    price: 2800,
    originalPrice: 3400,
    fabric: 'Pure Modal Silk',
    craftTechnique: 'Indigo Dip-Dye & Precision Dot Resists',
    knotCount: '~10,500 knots',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Indigo & White', hex: '#1E2B45', inStock: true },
      { name: 'Imperial Maroon', hex: '#4A121A', inStock: true }
    ],
    description: 'Clean geometric lines meet ancient resist-dyeing. The deep natural indigo is contrasted against sparkling white micro-rings, finished with neat hemmed selvedges.',
    features: [
      'Silky smooth hand-feel with gentle shine',
      'Authentic fermented indigo bath',
      'Versatile styling for coats, dresses, and ethnic wear'
    ],
    washCare: 'Hand wash gently in cold water with mild detergent.',
    dimensions: 'Length: 2.1 metres. Width: 30 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: false,
    isNewDrop: false,
    views: 620,
    enquiriesCount: 28,
    createdAt: '2026-03-14'
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

export const INITIAL_ENQUIRIES_LOG: EnquiryLog[] = [
  {
    id: 'enq-101',
    productId: 'prod-1',
    productTitle: 'Bandhani Silk Saree',
    sku: 'BD-SAR-101',
    price: 14500,
    color: 'Imperial Maroon',
    timestamp: '2026-03-20 14:24',
    status: 'converted'
  },
  {
    id: 'enq-102',
    productId: 'prod-2',
    productTitle: 'Gaji Silk Dupatta',
    sku: 'BD-DUP-201',
    price: 6500,
    color: 'Saffron & Maroon',
    timestamp: '2026-03-20 16:02',
    status: 'contacted'
  }
];
