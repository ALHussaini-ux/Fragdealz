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
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F7F3EA] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 border-b border-[#E5DFD5] pb-4">
          <h2 
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0B0B0B] font-semibold tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Shop by Concentration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#8B877F] font-sans">
            Understand the oil percentage and longevity behind each formulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FRAGRANCE_CONCENTRATIONS.map((type, idx) => (
            <div
              key={idx}
              id={`fragrance-type-card-${idx}`}
              onClick={() => handleConcentrationClick(type.name)}
              className="group bg-white border border-[#E5DFD5] hover:border-[#BF8F4A] rounded-[2px] p-5 transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-sans">
                  <span className="text-xs font-semibold text-[#8B877F]">
                    {type.abbreviation}
                  </span>
                  <span className="text-xs text-[#BF8F4A] font-semibold">
                    {type.oilPercentage}
                  </span>
                </div>

                <h3 
                  className="font-serif text-lg font-bold text-[#0B0B0B] mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {type.name}
                </h3>

                <p className="text-xs text-[#8B877F] leading-relaxed mb-4 font-sans">
                  {type.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between font-sans">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0B0B0B] group-hover:text-[#BF8F4A]">
                  Explore
                </span>
                <span className="text-xs text-[#BF8F4A]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
