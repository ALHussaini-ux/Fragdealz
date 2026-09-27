import React from 'react';
import { DEALS_PROMOTIONS } from '../data/categories';
import { useStore } from '../context/StoreContext';

export const DealsSection: React.FC = () => {
  const { navigateToShop } = useStore();

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F7F3EA] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 border-b border-[#E5DFD5] pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 
              className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0B0B0B] font-semibold tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Promotions & Special Allocations
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#8B877F] font-sans">
              Selected seasonal pricing and curated offers on authenticated inventory.
            </p>
          </div>
        </div>

        {/* 4 Promotional Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEALS_PROMOTIONS.map((deal) => (
            <div
              key={deal.id}
              id={`deal-card-${deal.id}`}
              onClick={() => navigateToShop(deal.filterParam as any)}
              className="group cursor-pointer flex flex-col border border-[#E5DFD5] hover:border-[#BF8F4A] bg-white rounded-[2px] overflow-hidden transition-colors"
            >
              {/* Product Photo */}
              <div className="aspect-[4/3] bg-[#FAF8F5] overflow-hidden relative p-4 flex items-center justify-center border-b border-[#F0EBE1]">
                <img
                  src={deal.image}
                  alt={deal.title}
                  loading="lazy"
                  className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-102"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-[0.1em] text-[#8B877F] font-medium block mb-1">
                    {deal.subtitle}
                  </span>

                  <h3 
                    className="font-serif text-lg text-[#0B0B0B] font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {deal.title}
                  </h3>

                  <p className="text-xs text-[#8B877F] line-clamp-2 leading-relaxed mb-4 font-sans">
                    {deal.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] group-hover:text-[#BF8F4A] font-sans transition-colors">
                  <span>Shop Promotion</span>
                  <span className="text-[#BF8F4A]">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
