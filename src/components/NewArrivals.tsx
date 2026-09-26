import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

export const NewArrivals: React.FC = () => {
  const { navigateToShop } = useStore();

  const newArrivals = PRODUCTS.filter(p => p.isNew);
  const displayItems = newArrivals.length >= 4 ? newArrivals : PRODUCTS.slice(0, 8);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 border-b border-[#E8E5DF] pb-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal tracking-tight">
              New arrivals
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#777777]">
              Recent imports and latest releases from French Avenue, Rasasi, Lattafa, Afnan, and Ahmed Al Maghribi.
            </p>
          </div>

          <button
            id="new-arrivals-view-all-top"
            onClick={() => navigateToShop({ sortBy: 'newest' })}
            className="mt-3 sm:mt-0 text-xs font-medium tracking-widest text-[#111111] hover:text-[#777777] transition-colors uppercase"
          >
            View all new arrivals →
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayItems.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
