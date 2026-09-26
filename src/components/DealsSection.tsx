import React from 'react';
import { DEALS_PROMOTIONS } from '../data/categories';
import { useStore } from '../context/StoreContext';

export const DealsSection: React.FC = () => {
  const { navigateToShop } = useStore();

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 border-b border-[#E8E5DF] pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal tracking-tight">
              Promotions & allocations
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#777777]">
              Selected seasonal pricing, gift sets, and complimentary samples on certified bottles.
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
              className="group cursor-pointer flex flex-col border border-[#E8E5DF] bg-[#FAF9F6] overflow-hidden"
            >
              {/* Product Photo */}
              <div className="aspect-[4/3] bg-white overflow-hidden relative p-4 flex items-center justify-center border-b border-[#E8E5DF]">
                <img
                  src={deal.image}
                  alt={deal.title}
                  loading="lazy"
                  className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-103"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium block mb-1">
                    {deal.subtitle}
                  </span>

                  <h3 className="font-serif text-lg text-[#111111] font-normal mb-2">
                    {deal.title}
                  </h3>

                  <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed mb-4">
                    {deal.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#111111]">
                  <span>Shop promotion</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

