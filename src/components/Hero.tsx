import React from 'react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { navigateToShop } = useStore();

  return (
    <section className="relative bg-[#0B0B0B] text-[#F7F3EA]">
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden">
        {/* Dark Moody Cinematic Background Photography */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=900&auto=format&fit=crop"
            />
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2000&auto=format&fit=crop"
              alt="FragDealz Authentic Fragrance Collection"
              className="w-full h-full object-cover object-center brightness-45 contrast-110"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/70 to-[#0B0B0B]/30" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20 w-full">
          <div className="max-w-xl">
            <span 
              className="text-[12px] font-sans uppercase tracking-[0.15em] text-[#EAD1A6] font-semibold block mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Premium Fragrances • Attractive Pricing
            </span>

            <h1 
              className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#F7F3EA] leading-[1.12] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Discover your next signature scent
            </h1>

            <p 
              className="text-sm sm:text-base text-[#EAD1A6]/80 font-normal leading-relaxed mb-8 max-w-lg font-sans"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Authorized retailer of French Avenue, Rasasi, Lattafa, Afnan, Ahmed Al Maghribi, Armaf, and Riffs. 100% original flacons with unbroken seals and verifiable batch codes.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Primary Button: FragDealz Gold with Obsidian Black text */}
              <button
                id="hero-shop-perfumes-btn"
                onClick={() => navigateToShop({})}
                className="min-h-[46px] px-8 py-3.5 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] font-sans font-semibold text-xs tracking-wider uppercase rounded-[2px] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Shop All Fragrances
              </button>

              {/* Secondary Button: Dark with Gold Outline */}
              <button
                id="hero-bestsellers-btn"
                onClick={() => navigateToShop({ sortBy: 'bestselling' })}
                className="min-h-[46px] px-8 py-3.5 bg-transparent hover:bg-[#BF8F4A]/10 text-[#F7F3EA] border border-[#BF8F4A] text-xs tracking-wider uppercase font-semibold font-sans rounded-[2px] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                View Bestsellers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
