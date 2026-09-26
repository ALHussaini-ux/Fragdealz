import React from 'react';
import { FRAGRANCE_CONCENTRATIONS } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { FragranceConcentration } from '../types';

export const FragranceTypeSection: React.FC = () => {
  const { navigateToShop } = useStore();

  const handleConcentrationClick = (name: string) => {
    if (name === 'Discovery & Gift Sets') {
      navigateToShop({ category: ['Gift Sets'] });
    } else {
      navigateToShop({ concentration: [name as FragranceConcentration] });
    }
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FAF9F6] border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 border-b border-[#E8E5DF] pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal tracking-tight">
            Shop by concentration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#777777]">
            Understand the oil percentage and longevity behind each formulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FRAGRANCE_CONCENTRATIONS.map((type, idx) => (
            <div
              key={idx}
              id={`fragrance-type-card-${idx}`}
              onClick={() => handleConcentrationClick(type.name)}
              className="group bg-white border border-[#E8E5DF] hover:border-[#111111] p-5 transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#777777] font-medium">
                    {type.abbreviation}
                  </span>
                  <span className="text-xs text-[#111111] font-medium">
                    {type.oilPercentage}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-normal text-[#111111] mb-2">
                  {type.name}
                </h3>

                <p className="text-xs text-[#777777] leading-relaxed mb-4">
                  {type.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1EFEA] flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-wider uppercase text-[#111111] group-hover:underline">
                  Explore
                </span>
                <span className="text-xs text-[#111111]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

