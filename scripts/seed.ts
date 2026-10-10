import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_BUSINESS_PROFILE } from '../src/data/initialData';

const SUPABASE_API_URL = process.env.SUPABASE_API_URL || 'https://api.supabase.com/v1/projects/hsxfnoqcwzwmksecrwep/database/query';
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN || '';

async function runQuery(sql: string) {
  const res = await fetch(SUPABASE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });
  const data = await res.json();
  if (data.message) {
    console.error('SQL Error:', data.message);
  }
  return data;
}

async function seed() {
  console.log('--- Seeding Categories & Sub-Categories ---');
  for (const cat of INITIAL_CATEGORIES) {
    const escName = cat.name.replace(/'/g, "''");
    const escDesc = (cat.description || '').replace(/'/g, "''");
    const escBadge = (cat.badge || '').replace(/'/g, "''");
    const escImg = (cat.image || '').replace(/'/g, "''");

    await runQuery(`
      INSERT INTO public.categories (id, name, slug, description, image, badge, is_active)
      VALUES ('${cat.id}', '${escName}', '${cat.slug}', '${escDesc}', '${escImg}', '${escBadge}', true)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        badge = EXCLUDED.badge;
    `);

    if (cat.subCategories && cat.subCategories.length > 0) {
      for (const sub of cat.subCategories) {
        const subName = sub.name.replace(/'/g, "''");
        const subDesc = (sub.description || '').replace(/'/g, "''");
        await runQuery(`
          INSERT INTO public.sub_categories (id, category_slug, name, slug, description)
          VALUES ('${sub.id}', '${cat.slug}', '${subName}', '${sub.slug}', '${subDesc}')
          ON CONFLICT (category_slug, slug) DO UPDATE SET
            name = EXCLUDED.name,
            description = EXCLUDED.description;
        `);
      }
    }
  }

  console.log('--- Seeding Products ---');
  for (const prod of INITIAL_PRODUCTS) {
    const title = prod.title.replace(/'/g, "''");
    const subtitle = (prod.subtitle || '').replace(/'/g, "''");
    const fabric = (prod.fabric || '').replace(/'/g, "''");
    const craft = (prod.craftTechnique || '').replace(/'/g, "''");
    const knot = (prod.knotCount || '').replace(/'/g, "''");
    const desc = (prod.description || '').replace(/'/g, "''");
    const wash = (prod.washCare || '').replace(/'/g, "''");
    const dim = (prod.dimensions || '').replace(/'/g, "''");
    const lead = (prod.leadTime || '').replace(/'/g, "''");
    const imagesJson = JSON.stringify(prod.images || []).replace(/'/g, "''");
    const colorsJson = JSON.stringify(prod.colors || []).replace(/'/g, "''");
    const featuresJson = JSON.stringify(prod.features || []).replace(/'/g, "''");
    const origPrice = prod.originalPrice ? prod.originalPrice : 'NULL';
    const subCat = prod.subCategory ? `'${prod.subCategory}'` : 'NULL';

    await runQuery(`
      INSERT INTO public.products (
        id, title, subtitle, sku, category, sub_category, price, original_price,
        fabric, craft_technique, knot_count, availability, lead_time, is_featured, is_new_drop,
        images, colors, description, features, wash_care, dimensions, views, enquiries_count
      ) VALUES (
        '${prod.id}', '${title}', '${subtitle}', '${prod.sku}', '${prod.category}', ${subCat}, ${prod.price}, ${origPrice},
        '${fabric}', '${craft}', '${knot}', '${prod.availability}', '${lead}', ${prod.isFeatured}, ${prod.isNewDrop || false},
        '${imagesJson}'::jsonb, '${colorsJson}'::jsonb, '${desc}', '${featuresJson}'::jsonb, '${wash}', '${dim}', ${prod.views || 0}, ${prod.enquiriesCount || 0}
      )
      ON CONFLICT (sku) DO UPDATE SET
        title = EXCLUDED.title,
        price = EXCLUDED.price,
        images = EXCLUDED.images;
    `);
  }

  console.log('--- Seeding Default Universal Site Content CMS ---');
  const siteContent = {
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
    }
  };

  for (const [key, val] of Object.entries(siteContent)) {
    const jsonStr = JSON.stringify(val).replace(/'/g, "''");
    await runQuery(`
      INSERT INTO public.site_content (key, value, updated_at)
      VALUES ('${key}', '${jsonStr}'::jsonb, now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
    `);
  }

  console.log('✅ Database Seeding Completed Successfully!');
}

seed().catch(err => console.error(err));
