import React from 'react';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const BrandShowcase: React.FC = () => {
  const { navigateToBrand, navigateToShop } = useStore();

  return (
    <section id="shop-by-brand-section" className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 border-b border-[#E8E5DF] pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal tracking-tight">
              Shop by brand
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#777777]">
              Official stockist of 7 premier fragrance houses with factory seals and verifiable batch codes.
            </p>
          </div>

          <button
            onClick={() => navigateToShop({})}
            className="mt-3 sm:mt-0 text-xs font-medium tracking-widest text-[#111111] hover:text-[#777777] transition-colors uppercase"
          >
            View all 85 fragrances →
          </button>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {BRANDS.map((brand) => {
            const count = PRODUCTS.filter(p => p.brand.toLowerCase() === brand.name.toLowerCase()).length;
            return (
              <div
                key={brand.id}
                id={`brand-showcase-tile-${brand.id}`}
                onClick={() => navigateToBrand(brand.slug)}
                className="group bg-white border border-[#E8E5DF] hover:border-[#111111] p-5 sm:p-7 flex flex-col justify-between transition-colors duration-200 cursor-pointer min-h-[160px] sm:min-h-[180px]"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium block mb-2">
                    {brand.originCountry} • {count} Fragrances
                  </span>

                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#111111] transition-colors">
                    {brand.name}
                  </h3>

                  <p className="text-xs text-[#777777] mt-1 line-clamp-2 font-normal">
                    {brand.tagline}
                  </p>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-[#F1EFEA] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-medium text-[#111111] group-hover:underline">
                    Browse Collection
                  </span>
                  <span className="text-xs text-[#111111]">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

