import React, { useState } from 'react';
import { BRANDS } from '../data/brands';
import { useStore } from '../context/StoreContext';

export const FeaturedBrand: React.FC = () => {
  const { navigateToBrand } = useStore();
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);

  const featuredHouses = BRANDS.slice(0, 4);
  const activeBrand = featuredHouses[selectedBrandIndex] || featuredHouses[0];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#0B0B0B] border-b border-[#1A1A1A] text-[#F7F3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A] pb-4 mb-8 sm:mb-12">
          <span 
            className="text-xs uppercase tracking-widest text-[#BF8F4A] font-semibold font-sans"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Featured House Spotlight
          </span>
          <div className="flex items-center gap-5 text-xs font-sans font-semibold overflow-x-auto pb-1 sm:pb-0">
            {featuredHouses.map((brand, idx) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrandIndex(idx)}
                className={`transition-colors uppercase tracking-wider pb-1 border-b-2 whitespace-nowrap ${
                  idx === selectedBrandIndex
                    ? 'border-[#BF8F4A] text-[#F7F3EA]'
                    : 'border-transparent text-[#8B877F] hover:text-[#EAD1A6]'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Brand Visual Photography */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] overflow-hidden">
              <img
                src={activeBrand.bannerImage}
                alt={activeBrand.name}
                className="w-full h-full object-cover object-center transition-all duration-500 brightness-90"
              />
            </div>
          </div>

          {/* Brand Narrative */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-wider text-[#8B877F] font-medium font-sans block mb-2">
              {activeBrand.originCountry} • Founded {activeBrand.foundedYear}
            </span>

            <h3 
              className="font-serif text-3xl sm:text-4xl text-[#F7F3EA] font-bold tracking-tight mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {activeBrand.name}
            </h3>

            <p 
              className="font-serif italic text-base sm:text-lg text-[#EAD1A6] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "{activeBrand.heroQuote}"
            </p>

            <p className="text-sm text-[#8B877F] font-normal leading-relaxed mb-6 font-sans">
              {activeBrand.fullStory}
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#1A1A1A] mb-6 text-xs text-[#F7F3EA] font-sans">
              <div>
                <span className="text-[#8B877F] block mb-0.5">Classification</span>
                <span className="font-semibold text-[#EAD1A6]">{activeBrand.type} Parfumerie</span>
              </div>
              <div>
                <span className="text-[#8B877F] block mb-0.5">Catalog Size</span>
                <span className="font-semibold text-[#EAD1A6]">{activeBrand.productCount} Fragrances</span>
              </div>
            </div>

            <button
              id={`featured-brand-shop-${activeBrand.id}`}
              onClick={() => navigateToBrand(activeBrand.slug)}
              className="min-h-[46px] px-8 py-3.5 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors font-sans"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Shop {activeBrand.name} Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
