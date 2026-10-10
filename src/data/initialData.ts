import { Category, Product, Banner, BusinessProfile, EnquiryLog } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'SAREE',
    slug: 'saree',
    description: 'Iconic Gharchola, Rai Bandhej, and Shikargah woven on pure Gajji and Mulberry silk.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    badge: 'Signature Craft',
    isActive: true,
    subCategories: [
      { id: 'sub-sar-1', name: 'Gharchola (Sacred Zari Grid)', slug: 'gharchola', description: 'Traditional 52-square golden zari grid with peacock & floral Bandhej' },
      { id: 'sub-sar-2', name: 'Shikargah (Royal Motifs)', slug: 'shikargah', description: 'Regal animal and forest motifs hand-knotted by master Khatris' },
      { id: 'sub-sar-3', name: 'Ekdali (Fine Rai Knotting)', slug: 'ekdali', description: 'Single fine mustard-seed Rai dots over flowing silks' },
      { id: 'sub-sar-4', name: 'Khaddi Georgette (Festive Drapes)', slug: 'khaddi-georgette', description: 'Lightweight fluid pure silk georgette with scalloped zari borders' }
    ]
  },
  {
    id: 'cat-2',
    name: 'DUPATTA',
    slug: 'dupatta',
    description: 'Statement handcrafted dupattas with heavy zari borders, mirror work & hand-tied dots.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    badge: 'Trending',
    isActive: true,
    subCategories: [
      { id: 'sub-dup-1', name: 'Kutch Mirror-Work', slug: 'mirror-work', description: 'Hand-sewn real Abhala mirrors with intricate Bharti borders' },
      { id: 'sub-dup-2', name: 'Heavy Bridal Zari', slug: 'bridal-zari', description: 'Heirloom trousseau pieces with dense metallic zari pallu' },
      { id: 'sub-dup-3', name: 'Ombre & Gota Patti', slug: 'ombre-gota', description: 'Dual-tone shaded transitions with delicate hand-applied Gota borders' }
    ]
  },
  {
    id: 'cat-3',
    name: 'STOLES',
    slug: 'stoles',
    description: 'Lightweight modal silk & organza stoles designed for contemporary everyday and evening layering.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    badge: 'Modern Heritage',
    isActive: true,
    subCategories: [
      { id: 'sub-stl-1', name: 'Pure Modal Silk', slug: 'modal-silk', description: 'Buttery soft eco-friendly modal silk stoles' },
      { id: 'sub-stl-2', name: 'Indigo Dip-Dye', slug: 'indigo-dip', description: 'Fermented natural plant indigo with crisp white dots' },
      { id: 'sub-stl-3', name: 'Contemporary Geometric', slug: 'geometric', description: 'Modern grid and chevron Bandhani patterns' }
    ]
  },
  {
    id: 'cat-4',
    name: 'GARMENTS',
    slug: 'garments',
    description: 'Effortless slow-fashion kurtis, angrakhas, kaftans, and bridal sets blending tradition with modern silhouettes.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    badge: 'Everyday Luxury',
    isActive: true,
    subCategories: [
      { id: 'sub-gar-1', name: 'Kurti & Angrakha Sets', slug: 'kurti-sets', description: 'Slow-fashion flared tunics with cotton mulmul linings' },
      { id: 'sub-gar-2', name: 'Bridal & Occasion Sets', slug: 'bridal-sets', description: 'Heavy 32-kali lehengas and festive sets with zardozi' },
      { id: 'sub-gar-3', name: 'Festive Kaftans', slug: 'kaftans', description: 'Breezy silk kaftans for celebrations and destination weddings' }
    ]
  },
  {
    id: 'cat-5',
    name: 'FABRICS',
    slug: 'fabrics',
    description: 'Unstitched running handloom Gajji, Mashru, and Modal silk fabrics for custom bespoke tailoring.',
    image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=900&q=80',
    badge: 'By The Metre',
    isActive: true,
    subCategories: [
      { id: 'sub-fab-1', name: 'Pure Gajji Silk (by metre)', slug: 'gajji-silk', description: 'Heavy 120 GSM running silk for bridal blouses and kurtas' },
      { id: 'sub-fab-2', name: 'Khaddi Georgette (by metre)', slug: 'khaddi-georgette-fabric', description: 'Flowing sheer fabric with continuous all-over dot jaal' },
      { id: 'sub-fab-3', name: 'Mashru Silk Weaves', slug: 'mashru-silk', description: 'Traditional satin-finish silk face with soft cotton back' }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Royal Shikargah Gharchola Gajji Silk Saree',
    subtitle: 'Pure Gajji Silk with Real Zari Grid & 22,000 Hand-Tied Micro Knots',
    sku: 'BD-SAR-001',
    category: 'saree',
    subCategory: 'gharchola',
    price: 24500,
    originalPrice: 28900,
    fabric: 'Pure Mulberry Gajji Silk',
    craftTechnique: 'Authentic Rai Bandhej (Micro-Dot) & Lagdi Patto Zari',
    knotCount: '~22,000 hand-tied micro knots',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Sindoor Crimson & Gold', hex: '#9B111E', inStock: true },
      { name: 'Kutch Sunset Rust', hex: '#C85A32', inStock: true },
      { name: 'Peacock Indigo', hex: '#1F2942', inStock: false }
    ],
    description: 'An heirloom piece created by master Khatri artisans. Featuring the sacred 52-square Gharchola grid woven with metallic gold zari, each square contains fine peacock and floral bandhani motifs individually pinched and tied with cotton thread before deep madder red immersion.',
    features: [
      'Authentic Rai Bandhej micro-knotting technique',
      'Pure heavy 110 GSM Gajji Silk with lustrous natural sheen',
      'Unstitched matching blouse piece with sleeve border included',
      'Hand-finished Gota edging & silk tassels',
      'Certified Handloom & Silk Mark guarantee'
    ],
    washCare: 'Strictly dry clean only. Wrap in unbleached muslin cloth and store in a cool, dry place. Avoid direct perfumed spray on zari.',
    dimensions: 'Length: 5.5 metres + 0.8 metre blouse piece. Width: 44 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch within 24 Hours',
    isFeatured: true,
    isNewDrop: true,
    views: 1420,
    enquiriesCount: 86,
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-2',
    title: 'Heritage Rai Bandhej Pure Georgette Saree',
    subtitle: 'Lightweight Pure Khaddi Georgette with Jaal Bandhani & Scallop Zari Border',
    sku: 'BD-SAR-002',
    category: 'saree',
    subCategory: 'khaddi-georgette',
    price: 18900,
    originalPrice: 22000,
    fabric: 'Pure Khaddi Georgette (100% Silk)',
    craftTechnique: 'All-over Ekdali Rai Bandhej',
    knotCount: '~18,500 knots',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Gulabi Rani Pink', hex: '#D12D69', inStock: true },
      { name: 'Marigold Turmeric', hex: '#F4A228', inStock: true },
      { name: 'Royal Emerald', hex: '#1A5336', inStock: true }
    ],
    description: 'Draped like liquid grace, this pure Khaddi Georgette saree embodies the delicate finesse of traditional tie-dye. The body is adorned with an all-over floral jaal hand-tied using fine mustard seed measurement (Rai), framed by a scalloped hand-cut antique gold zari border.',
    features: [
      'Fluid, feather-light georgette with exceptional drape',
      'Double-dip shaded body with harmonious ombre hues',
      'Includes custom dyed georgette blouse fabric with border',
      'Pure silk warp & weft'
    ],
    washCare: 'Dry clean only. Roll fold to protect the delicate hand-knotted crinkles.',
    dimensions: 'Length: 6.3 metres (including blouse piece). Width: 45 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: true,
    isNewDrop: false,
    views: 980,
    enquiriesCount: 54,
    createdAt: '2026-03-04'
  },
  {
    id: 'prod-3',
    title: 'Imperial Kutch Mirror-Work Bandhani Dupatta',
    subtitle: 'Modal Silk with Hand-Sewn Real Mirrors and Intricate Bharti Border',
    sku: 'BD-DUP-101',
    category: 'dupatta',
    subCategory: 'mirror-work',
    price: 8500,
    originalPrice: 9800,
    fabric: 'Pure Modal Silk',
    craftTechnique: 'Bharti Bandhani with Abhala (Mirror) Hand Embroidery',
    knotCount: '~12,000 knots',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Midnight Indigo & Rust', hex: '#1F2942', inStock: true },
      { name: 'Crimson Scarlet', hex: '#9B111E', inStock: true }
    ],
    description: 'Crafted as an artisanal showstopper, this dupatta blends two ancient crafts of Kutch: intricate tie-dye Bandhani and genuine mirror work (Abhala). Over 300 mirror florets are hand-stitched with silk floss along the borders.',
    features: [
      'Ultra-soft modal silk with natural cooling touch',
      'Hand-braided tassels at both pallu ends',
      'Versatile statement styling for suits, kurtas, or festive wear',
      'Naturally derived vegetable dye shades'
    ],
    washCare: 'Specialist dry clean only to preserve mirror integrity.',
    dimensions: 'Length: 2.5 metres. Width: 38 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: true,
    isNewDrop: true,
    views: 1240,
    enquiriesCount: 72,
    createdAt: '2026-03-07'
  },
  {
    id: 'prod-4',
    title: 'Noorani Shaded Georgette Bandhani Dupatta',
    subtitle: 'Dual-Tone Ombre with Rai Bandhej and Delicate Gota Patti Border',
    sku: 'BD-DUP-102',
    category: 'dupatta',
    subCategory: 'ombre-gota',
    price: 6200,
    originalPrice: 7200,
    fabric: 'Pure Viscose Georgette',
    craftTechnique: 'Gradated Ombre Dyeing with Fine Bandhej Dots',
    knotCount: '~9,800 knots',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Peach & Rani Pink Ombre', hex: '#D12D69', inStock: true },
      { name: 'Mint & Peacock Green', hex: '#1A5336', inStock: true },
      { name: 'Haldi Yellow & Terracotta', hex: '#C85A32', inStock: true }
    ],
    description: 'A summer festival favorite. The delicate ombre transition is achieved by dipping the tied fabric in successive lighter and darker natural dyes. Finished with fine hand-applied Gota patti borders.',
    features: [
      'Featherweight handfeel with soft bouncy drape',
      'Intricate dot density that opens softly on steaming',
      'Pairs elegantly with raw silk kurtas or pastel suits'
    ],
    washCare: 'Gentle dry clean.',
    dimensions: 'Length: 2.45 metres. Width: 36 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: false,
    isNewDrop: false,
    views: 520,
    enquiriesCount: 28,
    createdAt: '2026-03-11'
  },
  {
    id: 'prod-5',
    title: 'Artisanal Modal Silk Handcrafted Stole',
    subtitle: 'Contemporary Indigo & Madder Stole with Micro Dots & Fringed Edges',
    sku: 'BD-STL-201',
    category: 'stoles',
    subCategory: 'modal-silk',
    price: 3400,
    originalPrice: 4200,
    fabric: '100% Pure Modal Silk',
    craftTechnique: 'Contemporary Geometric Bandhani & Indigo Dip Dye',
    knotCount: '~6,500 knots',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Indigo Blue & White', hex: '#1F2942', inStock: true },
      { name: 'Terracotta & Beige', hex: '#C85A32', inStock: true },
      { name: 'Mustard Amber', hex: '#F4A228', inStock: true }
    ],
    description: 'Designed for modern styling, this Bandhanu stole transitions effortlessly from casual ethnic layering to chic evening wear. Made with breathable, fluid modal silk and hand-tied geometric dots.',
    features: [
      'Lightweight, breathable, and year-round wearable',
      'Pure natural indigo and madder dyeing',
      'Hand-twisted fringe tassels',
      'Compact styling accessory for global wardrobes'
    ],
    washCare: 'Gentle hand wash in cold water with mild liquid detergent or dry clean.',
    dimensions: 'Length: 2.0 metres. Width: 28 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch within 24 Hours',
    isFeatured: true,
    isNewDrop: true,
    views: 890,
    enquiriesCount: 65,
    createdAt: '2026-03-14'
  },
  {
    id: 'prod-6',
    title: 'Aarohi Flared Pure Silk Bandhani Garment Set',
    subtitle: 'Contemporary Angrakha Silhouette with Zari Neckline & Mulmul Cotton Lining',
    sku: 'BD-GAR-301',
    category: 'garments',
    subCategory: 'kurti-sets',
    price: 6800,
    originalPrice: 7900,
    fabric: 'Pure Modal Silk with Mulmul Cotton Lining',
    craftTechnique: 'Geometric Chokda Bandhani',
    knotCount: '~8,500 knots',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Turmeric Yellow', hex: '#E6A117', inStock: true },
      { name: 'Peacock Deep Teal', hex: '#0D5C75', inStock: true },
      { name: 'Kutch Coral', hex: '#C85A32', inStock: true }
    ],
    description: 'Blending regal Gujarati craftsmanship with everyday effortless chic. This Angrakha silhouette features tie-up tassels, handmade fabric potli buttons, and delicate zari border along the cuffs and flare hemline.',
    features: [
      'Breathable organic mulmul lining for all-day comfort',
      'Deep side pockets seamlessly integrated',
      'Flattering empire-line cut suitable for festive dinners and rituals',
      'Pre-shrunk and color-locked silk'
    ],
    washCare: 'Gentle hand wash with mild silk detergent or gentle dry clean.',
    dimensions: 'Sizes: S (36), M (38), L (40), XL (42), XXL (44). Length: 48 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch within 24 Hours',
    isFeatured: false,
    isNewDrop: true,
    views: 640,
    enquiriesCount: 38,
    createdAt: '2026-03-09'
  },
  {
    id: 'prod-7',
    title: 'Devyani Bridal Bandhani & Zardozi Garment Set',
    subtitle: 'Custom Masterpiece with 32-Kali Flare & Heavy Dabka Handwork',
    sku: 'BD-GAR-302',
    category: 'garments',
    subCategory: 'bridal-sets',
    price: 54000,
    originalPrice: 62000,
    fabric: 'Pure Gajji Silk & Tissue Chanderi',
    craftTechnique: 'Fine Shikari Bandhani with Zardozi, Pearls & Gota Patti',
    knotCount: '~45,000 handmade micro-knots',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Heritage Vermilion Red', hex: '#9B111E', inStock: true },
      { name: 'Royal Rajputana Ochre', hex: '#E6A117', inStock: false }
    ],
    description: 'A bridal heirloom that takes over 4 months of dedicated artisan labor. Featuring 32 individual kalis of hand-knotted Gajji silk Bandhej depicting elephant and dancing peacock folklore (Shikargah). Enriched with French knots, beaten gold dabka, and river pearls.',
    features: [
      'Grand 5.5 metre circular flare (gher) with canvas & double cancan',
      'Includes unstitched heavy zardozi blouse fabric (1.2m)',
      'Double dupatta styling: 1 heavy Bandhani Gajji dupatta + 1 pure organza head veil',
      'Custom waist & length tailoring available upon WhatsApp consultation'
    ],
    washCare: 'Bridal preservation dry clean only.',
    dimensions: 'Semi-stitched, customizable up to 44 waist and 43 length.',
    availability: 'made_to_order',
    leadTime: 'Handcrafted on Order (21-28 Days Dispatch)',
    isFeatured: true,
    isNewDrop: true,
    views: 2150,
    enquiriesCount: 112,
    createdAt: '2026-03-02'
  },
  {
    id: 'prod-8',
    title: 'Pure Gajji Silk Unstitched Bandhani Fabric',
    subtitle: '100% Mulberry Silk running fabric with traditional Bavan Bagh Bandhej',
    sku: 'BD-FAB-401',
    category: 'fabrics',
    subCategory: 'gajji-silk',
    price: 3200,
    originalPrice: 3800,
    fabric: '100% Pure Gajji Silk (Heavy Weave)',
    craftTechnique: 'Allover Rai Bandhani Dot Work',
    knotCount: '~4,000 knots per metre',
    images: [
      'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Royal Crimson Red', hex: '#9B111E', inStock: true },
      { name: 'Emerald Forest', hex: '#1A5336', inStock: true },
      { name: 'Gold Ochre', hex: '#D4AF37', inStock: true }
    ],
    description: 'Sold by the metre for bespoke bridal blouses, jackets, kurtas, or custom menswear bandhgalas. This heavy 120 GSM Gajji silk fabric has natural satin lustre and holds intricate knife-pleats beautifully.',
    features: [
      'Priced per 2.5 metres cut (standard suit/kurti cut)',
      'High-twist zari selvage edges',
      'Uniform dot spacing achieved by master knotters',
      'Custom length orders accepted via WhatsApp'
    ],
    washCare: 'Dry clean recommended.',
    dimensions: 'Width: 44 inches. Standard pack: 2.5 metres cut.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: false,
    isNewDrop: false,
    views: 430,
    enquiriesCount: 22,
    createdAt: '2026-03-10'
  },
  {
    id: 'prod-9',
    title: 'Shikargah Royal Heritage Pure Gajji Saree',
    subtitle: 'Forest and Animal Motifs with 25,000 Micro-Dots and Heavy Zari Pallu',
    sku: 'BD-SAR-003',
    category: 'saree',
    subCategory: 'shikargah',
    price: 26800,
    originalPrice: 31000,
    fabric: 'Pure Mulberry Gajji Silk',
    craftTechnique: 'Shikargah Rai Bandhej with Lagdi Patto',
    knotCount: '~25,000 knots',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Peacock Indigo & Gold', hex: '#1F2942', inStock: true },
      { name: 'Sindoor Crimson', hex: '#9B111E', inStock: true }
    ],
    description: 'An ode to ancient royal hunts and sacred Gujarati animal folklore. Features deer, peacocks, and floral creepers tied by Khatri families in Jamnagar.',
    features: [
      'Rare Shikargah allover body motifs',
      'Solid pure gold zari tissue pallu',
      'Unstitched blouse piece included'
    ],
    washCare: 'Strictly dry clean only.',
    dimensions: 'Length: 5.5m + 0.8m blouse piece. Width: 44 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch within 24 Hours',
    isFeatured: true,
    isNewDrop: true,
    views: 1110,
    enquiriesCount: 47,
    createdAt: '2026-03-05'
  },
  {
    id: 'prod-10',
    title: 'Festive Silk Bandhani Kaftan',
    subtitle: 'Breezy Relaxed Silhouette with Hand-Tied Dots and Zari Trim',
    sku: 'BD-GAR-303',
    category: 'garments',
    subCategory: 'kaftans',
    price: 5200,
    originalPrice: 6200,
    fabric: 'Pure Modal Silk',
    craftTechnique: 'Rai Bandhani Dip Dye',
    knotCount: '~7,200 knots',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Kutch Coral & Gold', hex: '#C85A32', inStock: true },
      { name: 'Midnight Indigo', hex: '#1F2942', inStock: true }
    ],
    description: 'Modern destination resort and festive luxury. Free-flowing, breathable silhouette cinched with silk drawstrings and tassels.',
    features: [
      'Comfort-fit free size with inner waist tie',
      'Contrast hand-twisted tassels',
      'Ultra-soft pure modal silk touch'
    ],
    washCare: 'Hand wash cold or gentle dry clean.',
    dimensions: 'Free size (fits up to bust 46). Length: 50 inches.',
    availability: 'in_stock',
    leadTime: 'Ready to Dispatch',
    isFeatured: false,
    isNewDrop: true,
    views: 730,
    enquiriesCount: 31,
    createdAt: '2026-03-12'
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Welcome to Bandhanu – Where Heritage Meets Style',
    subtitle: 'Explore our exclusive handcrafted Bandhani garments, stoles, and fabrics, designed for every occasion.',
    ctaText: 'Explore Exclusive Collection',
    ctaCategory: 'saree',
    badge: 'Bandhanu: Every Knot, A Story',
    bgGradient: 'from-heritage-crimson via-heritage-ruby to-heritage-indigo',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    isActive: true
  },
  {
    id: 'banner-2',
    title: 'Handcrafted Heritage Dupattas & Stoles',
    subtitle: 'Modal Silk & Khaddi Georgette woven with real gold zari borders and natural dyes',
    ctaText: 'View Stoles & Dupattas',
    ctaCategory: 'stoles',
    badge: 'Artisanal Drop',
    bgGradient: 'from-heritage-peacock via-heritage-indigo to-heritage-crimson',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
    isActive: true
  }
];

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  businessName: 'Bandhanu',
  tagline: 'Where Heritage Meets Style • Every Knot, A Story',
  whatsappNumber: '919876543210',
  displayPhone: '+91 98765 43210',
  email: 'concierge@bandhanu.com',
  address: 'Artisan Heritage Enclave, Near Darbargadh, Jamnagar - 361001, Gujarat, India',
  city: 'Jamnagar',
  state: 'Gujarat',
  instagramHandle: '@bandhanu.official',
  currencySymbol: '₹',
  customMessageTemplate: `Hello Bandhanu team! 👋

I would like to enquire / place an order for this handcrafted piece:

✦ Product: {product_name}
✦ SKU: {sku}
✦ Price: {price}
✦ Selected Color: {color}
✦ Link: {url}

Could you please confirm the availability and estimated dispatch time? Thank you!`
};

export const INITIAL_ENQUIRIES_LOG: EnquiryLog[] = [
  {
    id: 'enq-101',
    productId: 'prod-1',
    productTitle: 'Royal Shikargah Gharchola Gajji Silk Saree',
    sku: 'BD-SAR-001',
    price: 24500,
    color: 'Sindoor Crimson & Gold',
    timestamp: '2026-03-20 14:24',
    status: 'converted'
  },
  {
    id: 'enq-102',
    productId: 'prod-7',
    productTitle: 'Devyani Bridal Bandhani & Zardozi Garment Set',
    sku: 'BD-GAR-302',
    price: 54000,
    color: 'Heritage Vermilion Red',
    timestamp: '2026-03-20 16:02',
    status: 'contacted'
  },
  {
    id: 'enq-103',
    productId: 'prod-3',
    productTitle: 'Imperial Kutch Mirror-Work Bandhani Dupatta',
    sku: 'BD-DUP-101',
    price: 8500,
    color: 'Midnight Indigo & Rust',
    timestamp: '2026-03-21 09:15',
    status: 'new'
  },
  {
    id: 'enq-104',
    productId: 'prod-5',
    productTitle: 'Artisanal Modal Silk Handcrafted Stole',
    sku: 'BD-STL-201',
    price: 3400,
    color: 'Indigo Blue & White',
    timestamp: '2026-03-21 11:30',
    status: 'new'
  }
];
