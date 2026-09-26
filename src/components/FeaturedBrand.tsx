import React, { useState } from 'react';
import { BRANDS } from '../data/brands';
import { useStore } from '../context/StoreContext';

export const FeaturedBrand: React.FC = () => {
  const { navigateToBrand } = useStore();
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);

  const featuredHouses = BRANDS.slice(0, 4);
  const activeBrand = featuredHouses[selectedBrandIndex] || featuredHouses[0];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E5DF] pb-4 mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#777777] font-medium">
            Featured Fragrance House
          </span>
          <div className="flex items-center gap-4 text-xs font-medium overflow-x-auto pb-1 sm:pb-0">
            {featuredHouses.map((brand, idx) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrandIndex(idx)}
                className={`transition-colors uppercase tracking-wider pb-1 border-b-2 whitespace-nowrap ${
                  idx === selectedBrandIndex
                    ? 'border-[#111111] text-[#111111]'
                    : 'border-transparent text-[#777777] hover:text-[#111111]'
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
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#FAF9F6] border border-[#E8E5DF] overflow-hidden">
              <img
                src={activeBrand.bannerImage}
                alt={activeBrand.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
            </div>
          </div>

          {/* Brand Narrative */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-wider text-[#777777] font-medium block mb-2">
              {activeBrand.originCountry} • Founded {activeBrand.foundedYear}
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal tracking-tight mb-3">
              {activeBrand.name}
            </h3>

            <p className="font-serif italic text-base text-[#111111] mb-4">
              "{activeBrand.heroQuote}"
            </p>

            <p className="text-sm text-[#777777] font-normal leading-relaxed mb-6">
              {activeBrand.fullStory}
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#E8E5DF] mb-6 text-xs text-[#111111]">
              <div>
                <span className="text-[#777777] block mb-0.5">Classification</span>
                <span className="font-medium">{activeBrand.type} Parfumerie</span>
              </div>
              <div>
                <span className="text-[#777777] block mb-0.5">Catalog Size</span>
                <span className="font-medium">{activeBrand.productCount} Fragrances</span>
              </div>
            </div>

            <button
              id={`featured-brand-shop-${activeBrand.id}`}
              onClick={() => navigateToBrand(activeBrand.slug)}
              className="min-h-[46px] px-8 py-3 bg-[#111111] hover:bg-[#262626] text-white text-xs font-medium tracking-widest uppercase transition-colors"
            >
              Shop {activeBrand.name} Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
