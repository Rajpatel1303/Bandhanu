import React from 'react';
import { useStore } from '../../context/StoreContext';
import { InstagramIcon } from '../common/InstagramIcon';
import { BandhaniMotifDivider } from '../common/BandhaniMotifDivider';

export const InstagramGallery: React.FC = () => {
  const { profile, theme } = useStore();
  const igStyles = theme?.sections?.instagram;
  const sectionBg = igStyles?.bg || undefined;
  const titleColor = igStyles?.titleColor || undefined;

  const handle = profile.instagramHandle
    ? (profile.instagramHandle.startsWith('@') ? profile.instagramHandle : `@${profile.instagramHandle}`)
    : '@bandhanu';

  const instagramUrl = profile.instagramHandle
    ? (profile.instagramHandle.startsWith('http')
        ? profile.instagramHandle
        : `https://instagram.com/${profile.instagramHandle.replace('@', '')}`)
    : 'https://instagram.com';

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      alt: 'Maroon Bandhani dots fabric'
    },
    {
      src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      alt: 'Artisan wearing blue silk saree'
    },
    {
      src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      alt: 'Hands tying micro knots'
    },
    {
      src: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      alt: 'Yellow and red festive dupatta'
    },
    {
      src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      alt: 'Artisan model in yellow kurta'
    },
    {
      src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      alt: 'Indigo tie-dye shibori pattern'
    },
    {
      src: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=600&q=80',
      alt: 'Artisan women in Kutch workshop'
    },
    {
      src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      alt: 'Olive green fine Bandhej textile'
    }
  ];

  return (
    <section
      style={{ backgroundColor: sectionBg }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 transition-colors duration-300"
    >
      {/* Header with Horizontal Rule */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-4 flex-grow">
          <h2
            style={{ color: titleColor }}
            className="text-xl sm:text-2xl font-serif text-[#241E1C] whitespace-nowrap"
          >
            Follow Our Journey
          </h2>
          <BandhaniMotifDivider />
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-medium text-[#241E1C] hover:text-[#4A121A] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>{handle}</span>
          <InstagramIcon className="w-4 h-4" />
        </a>
      </div>

      {/* 8-Photo Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
        {images.map((item, idx) => (
          <a
            key={idx}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-[#F5EFE6] block"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-[#4A121A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
              <InstagramIcon className="w-5 h-5 drop-shadow-md" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
