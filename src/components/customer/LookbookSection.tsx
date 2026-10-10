import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ExternalLink, Heart } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';

interface LookbookItem {
  id: string;
  image: string;
  title: string;
  tags: string[];
  likes: number;
  productId?: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    title: 'The Royal Gujarati Bride in Crimson Gharchola',
    tags: ['#VirasatBridal', '#GharcholaSaree', '#PureGajjiSilk'],
    likes: 1240,
    productId: 'prod-1'
  },
  {
    id: 'look-2',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    title: 'Contemporary Layering with Kutch Mirror Dupatta',
    tags: ['#ArtisanalDupatta', '#KutchCraft', '#FestiveLook'],
    likes: 890,
    productId: 'prod-3'
  },
  {
    id: 'look-3',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    title: '32-Kali Hand-Knotted Bridal Lehenga Grandeur',
    tags: ['#BridalBandhej', '#Shikargah', '#HeirloomCouture'],
    likes: 2180,
    productId: 'prod-4'
  },
  {
    id: 'look-4',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    title: 'Whispering Silk: Khaddi Georgette Floral Jaal',
    tags: ['#GeorgetteBandhani', '#JamnagarWeave', '#SlowFashion'],
    likes: 760,
    productId: 'prod-2'
  }
];

export const LookbookSection: React.FC = () => {
  const { setSelectedProductId, profile } = useStore();

  return (
    <section id="lookbook-section" className="py-20 bg-heritage-sand/30 dark:bg-heritage-darkCard/40 border-b border-heritage-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-heritage-crimson dark:text-heritage-gold text-xs font-bold tracking-widest uppercase mb-2">
              <InstagramIcon className="w-4 h-4 text-rose-600" />
              <span>Editorial Lookbook & Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-charcoal dark:text-white">
              The Living Royal Aesthetic
            </h2>
            <p className="mt-2 text-sm text-heritage-charcoal/70 dark:text-gray-400">
              Curated drapes and real bride portraits. Tag <span className="font-semibold text-heritage-crimson">{profile.instagramHandle}</span> to be featured.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-heritage-darkSurface border border-heritage-gold/30 hover:border-heritage-gold text-xs font-semibold text-heritage-charcoal dark:text-white shadow-xs hover:shadow-md transition-all"
          >
            <InstagramIcon className="w-4 h-4 text-rose-500" />
            <span>Follow {profile.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>

        {/* Masonry / Grid Lookbook */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {LOOKBOOK_ITEMS.map(item => (
            <div
              key={item.id}
              onClick={() => {
                if (item.productId) {
                  setSelectedProductId(item.productId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-heritage-darkSurface border border-heritage-gold/25 hover:border-heritage-gold shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Overlay Stats */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium border border-white/20">
                  <Heart className="w-3 h-3 text-rose-400 fill-current" />
                  <span>{item.likes}</span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-4 inset-x-4 text-white space-y-2">
                  <h3 className="font-serif font-bold text-sm leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] text-heritage-gold font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  {item.productId && (
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-heritage-crimson/90 hover:bg-heritage-crimson text-white text-[11px] font-semibold transition-all">
                        <Sparkles className="w-3 h-3 text-heritage-gold" />
                        <span>Inspect This Look</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
