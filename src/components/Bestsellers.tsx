import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

export const Bestsellers: React.FC = () => {
  const { navigateToShop } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'extraits' | 'budget'>('all');

  const allBestsellers = PRODUCTS.filter(p => p.isBestseller || p.isFeatured);

  const filteredProducts = allBestsellers.filter(product => {
    if (activeTab === 'men') return product.gender === 'Men';
    if (activeTab === 'extraits') return product.concentration === 'Parfum / Extrait';
    if (activeTab === 'budget') return product.price <= 2500;
    return true;
  });

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 sm:mb-12 border-b border-[#E8E5DF] pb-4 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal tracking-tight">
              Bestsellers
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#777777]">
              Customer favorite fragrances with exceptional performance and sillage.
            </p>
          </div>

          {/* Clean Editorial Text Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-1 uppercase tracking-wider font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'all'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`pb-1 uppercase tracking-wider font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'men'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              Men's Favorites
            </button>
            <button
              onClick={() => setActiveTab('extraits')}
              className={`pb-1 uppercase tracking-wider font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'extraits'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              Extraits & Parfums
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`pb-1 uppercase tracking-wider font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'budget'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              Under ₹2,500
            </button>
          </div>
        </div>

        {/* 2 columns on Mobile (375px+), 3 on Tablet, 4 on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            id="bestsellers-view-all-btn"
            onClick={() => navigateToShop({ sortBy: 'bestselling' })}
            className="inline-flex items-center justify-center min-h-[46px] px-8 py-3 bg-[#111111] hover:bg-[#262626] text-white text-xs font-medium tracking-widest uppercase transition-colors"
          >
            View all bestsellers
          </button>
        </div>
      </div>
    </section>
  );
};
