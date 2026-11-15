import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { BandhaniBloomInteractive } from './BandhaniBloomInteractive';

export const OurCraftSection: React.FC = () => {
  const { setCurrentPage } = useStore();

  const handleDiscoverCraft = () => {
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    {
      title: 'Tying',
      subtitle: 'Every knot tells a story',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Dyeing',
      subtitle: 'Natural colours, lasting beauty',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'The Final Fabric',
      subtitle: 'A masterpiece in every fold',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="our-craft-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Top Section: Story and 3 Step Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Narrative & CTA */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#6E6259] uppercase block">
            Our Craft
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#241E1C] leading-tight">
            The Art Behind Every Dot
          </h2>

          <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed font-normal">
            From tying tiny knots to dyeing and opening, each Bandhani textile takes time, patience and skilled hands. We work with traditional methods, keeping the heritage alive.
          </p>

          <div className="pt-2">
            <button
              onClick={handleDiscoverCraft}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
            >
              <span>Discover Our Craft</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: 3 Process Visual Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col group">
              <div className="aspect-[4/3] overflow-hidden bg-[#F5EFE6] border border-[#E2D7C7]/50 mb-3">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="font-serif font-bold text-base text-[#241E1C] group-hover:text-[#4A121A] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-[#6E6259] mt-0.5">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Living Interactive Bandhani Bloom Simulation */}
      <div className="pt-2">
        <BandhaniBloomInteractive />
      </div>
    </section>
  );
};
