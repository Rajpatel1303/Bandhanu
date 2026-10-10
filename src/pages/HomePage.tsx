import React from 'react';
import { useStore } from '../context/StoreContext';
import { getWhatsAppDirectUrl, openWhatsAppDirect } from '../utils/whatsapp';
import { HeroSection } from '../components/customer/HeroSection';
import { FeaturedCategories } from '../components/customer/FeaturedCategories';
import { ProductCard } from '../components/customer/ProductCard';
import { LookbookSection } from '../components/customer/LookbookSection';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  MessageCircle,
  Scissors,
  Droplet,
  Sun,
  Flame,
  Star,
  Quote
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage, navigateToCategory, profile } = useStore();

  // Flagship / Best of Bandhanu products (Featured or top enquired)
  const flagshipProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in pb-16">
      {/* 1. Hero Section with Interactive Silk Wave Canvas & Brand Motto */}
      <HeroSection />

      {/* 2. Artisanal Categories Showcase (SAREE, DUPATTA, STOLES, GARMENTS, FABRICS) */}
      <FeaturedCategories />

      {/* 3. "Best of Bandhanu" — Curated Flagship Heirloom Creations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-4 border-b border-heritage-gold/20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-gold/15 text-heritage-crimson dark:text-heritage-gold text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan Masterpieces</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white">
              Best of Bandhanu
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-400">
              Our most celebrated heirloom weaves, coveted bridal gharcholas, and fine Rai knotting
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('catalogue')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-heritage-crimson hover:bg-heritage-ruby text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto group"
          >
            <span>Explore Complete Catalogue ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Column Mobile, 4-Column Desktop Flagship Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {flagshipProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. The 4 Stages of Bandhej Craft Preview */}
      <section className="bg-heritage-sand/40 dark:bg-heritage-darkCard/50 py-16 border-y border-heritage-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-heritage-crimson dark:text-heritage-gold uppercase">
              Hand-Tied • Hand-Dyed • Preserved Since Centuries
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white mt-2">
              The Living Craft of Bandhej
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-heritage-charcoal/70 dark:text-gray-300">
              Every knot we tie is not just a design—it’s a promise of authenticity, sustainability, and love for handmade.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: '01',
                title: 'Bandhana',
                sub: 'The Sacred Micro-Knots',
                desc: '15,000 to 45,000 tiny dots individually pinched and tied with cotton thread.',
                icon: Scissors
              },
              {
                step: '02',
                title: 'Rangai',
                sub: 'Sequential Vat Dyeing',
                desc: 'Dipped in natural madder, indigo, and turmeric vats from lightest to deepest shade.',
                icon: Droplet
              },
              {
                step: '03',
                title: 'Khilana',
                sub: 'The Rhythmic Untying',
                desc: 'Gentle pulling that blooms the diamond-shaped white rings encased in vibrant color.',
                icon: Sun
              },
              {
                step: '04',
                title: 'Zari Weaving',
                sub: 'Pure Lagdi Patto',
                desc: 'Metallic gold zari woven seamlessly into heavy Gajji and mulberry silk selvages.',
                icon: Flame
              }
            ].map(stage => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-heritage-darkSurface border border-heritage-gold/30 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif font-bold text-2xl text-heritage-gold">
                        {stage.step}
                      </span>
                      <span className="p-2 rounded-xl bg-heritage-sand/60 dark:bg-heritage-darkCard text-heritage-crimson dark:text-heritage-gold">
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-heritage-charcoal dark:text-white">
                      {stage.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-heritage-crimson dark:text-heritage-gold mb-2">
                      {stage.sub}
                    </p>
                    <p className="text-xs text-heritage-charcoal/70 dark:text-gray-400 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentPage('about')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-heritage-crimson dark:text-heritage-gold hover:underline group"
            >
              <span>Explore Our Full Heritage Story & Artisan Mission</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Editorial Lookbook Showcase */}
      <LookbookSection />

      {/* 6. Client Experiences & Artisan Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-heritage-gold uppercase">
            Heirloom Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-charcoal dark:text-white mt-1">
            Cherished by Connoisseurs Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'My wedding Gharchola arrived in London looking even more breathtaking than photos. The knot density and pure Gajji silk lustre are unmistakable heirloom quality.',
              author: 'Pooja V.',
              location: 'London, UK',
              piece: 'Royal Shikargah Gharchola Saree'
            },
            {
              quote: 'Ordering directly on WhatsApp with Numan Khatri was seamless. He explained the natural dyeing process and customized the sleeve border blouse piece exactly to my measurements.',
              author: 'Meera D.',
              location: 'Ahmedabad, India',
              piece: 'Imperial Kutch Mirror Dupatta'
            },
            {
              quote: 'The drape of their pure Khaddi Georgette is like liquid air. You can instantly feel the patience and soul of the artisans in every single micro-knot.',
              author: 'Ananya S.',
              location: 'Dubai, UAE',
              piece: 'Heritage Rai Bandhej Georgette'
            }
          ].map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-heritage-darkCard border border-heritage-gold/25 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-heritage-gold/40 mb-3" />
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-heritage-charcoal/80 dark:text-gray-300 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-heritage-gold/15">
                <div className="font-serif font-bold text-sm text-heritage-charcoal dark:text-white">
                  {rev.author}
                </div>
                <div className="text-[10px] text-gray-400">
                  {rev.location} • <span className="text-heritage-crimson dark:text-heritage-gold font-medium">{rev.piece}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WhatsApp Studio Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-heritage-crimson via-heritage-ruby to-heritage-terracotta text-white p-6 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
              Direct Artisan Concierge
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Looking for Bespoke Bridal Bandhani or Custom Sizing?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Connect directly with our master Khatri studio in Jamnagar. Discuss custom madder color palettes, 32-kali lehengas, and worldwide courier dispatch via WhatsApp.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppDirectUrl(profile.whatsappNumber, 'Hello Bandhanu team! I would like to schedule a bespoke consultation for handcrafted Bandhani.')}
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsAppDirect(profile.whatsappNumber, 'Hello Bandhanu team! I would like to schedule a bespoke consultation for handcrafted Bandhani.');
                }}
                className="px-6 py-3 rounded-full bg-white text-heritage-crimson font-bold text-xs shadow-lg hover:bg-heritage-sand transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Chat on WhatsApp (+{profile.whatsappNumber})</span>
              </a>

              <button
                onClick={() => setCurrentPage('contact')}
                className="px-5 py-3 rounded-full bg-black/25 hover:bg-black/40 text-white font-semibold text-xs border border-white/30 transition-all"
              >
                <span>Studio Visit & Address &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
