import React from 'react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { navigateToShop } = useStore();

  return (
    <section className="relative bg-[#111111] text-[#FAF9F6]">
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden">
        {/* Cinematic Background Photography */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=900&auto=format&fit=crop"
            />
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2000&auto=format&fit=crop"
              alt="Authentic perfume flacons"
              className="w-full h-full object-cover object-center brightness-55 contrast-105"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-20 w-full">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B89B5E] font-medium block mb-3">
              100% Genuine Bottled Fragrances
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15] mb-4">
              Shop authentic perfumes from top fragrance houses
            </h1>

            <p className="text-sm sm:text-base text-[#EDE9E2]/90 font-light leading-relaxed mb-7 max-w-lg">
              Authorized retailer of French Avenue, Rasasi, Lattafa, Afnan, Ahmed Al Maghribi, Armaf, and Riffs. Complete with factory seals and verifiable batch codes.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-shop-perfumes-btn"
                onClick={() => navigateToShop({})}
                className="min-h-[46px] px-7 py-3 bg-white hover:bg-[#FAF9F6] text-[#111111] font-medium text-xs tracking-widest uppercase transition-colors"
              >
                Shop All Fragrances
              </button>
              <button
                id="hero-bestsellers-btn"
                onClick={() => navigateToShop({ sortBy: 'bestselling' })}
                className="min-h-[46px] px-7 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs tracking-widest uppercase font-medium transition-colors"
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
