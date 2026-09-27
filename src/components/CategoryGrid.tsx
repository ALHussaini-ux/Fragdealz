import React from 'react';
import { useStore } from '../context/StoreContext';

export const CategoryGrid: React.FC = () => {
  const { navigateToShop } = useStore();

  const categoriesToDisplay = [
    { label: 'Men', slug: 'men', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop', desc: 'Bold woods, marine fresh & spices', filter: { gender: ['Men'] } },
    { label: 'Women', slug: 'women', img: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop', desc: 'Velvet florals, vanilla & gourmand', filter: { gender: ['Women'] } },
    { label: 'Unisex', slug: 'unisex', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop', desc: 'Balanced signatures for all collectors', filter: { gender: ['Unisex'] } },
    { label: 'Parfum & Extraits', slug: 'extraits', img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop', desc: 'Highest oil concentration & longevity', filter: { concentration: ['Parfum / Extrait'] } },
    { label: 'Bestsellers', slug: 'bestsellers', img: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=800&auto=format&fit=crop', desc: 'Most requested bottles & top performers', filter: { sortBy: 'bestselling' as const } },
    { label: 'Special Offers', slug: 'sale', img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop', desc: 'Attractive pricing on genuine stock', filter: { onSaleOnly: true } },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F7F3EA] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-12 border-b border-[#E5DFD5] pb-4">
          <div>
            <h2 
              className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0B0B0B] font-semibold tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Shop by Category
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#8B877F] font-sans">
              Explore authentic fragrances by gender, oil concentration, and special allocations.
            </p>
          </div>

          <button
            onClick={() => navigateToShop({})}
            className="mt-3 sm:mt-0 text-xs font-semibold tracking-wider text-[#0B0B0B] hover:text-[#BF8F4A] uppercase transition-colors font-sans"
          >
            All Categories →
          </button>
        </div>

        {/* Clean Editorial Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoriesToDisplay.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigateToShop(cat.filter)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-white overflow-hidden border border-[#E5DFD5] group-hover:border-[#BF8F4A] rounded-[2px] transition-colors mb-3">
                <img
                  src={cat.img}
                  alt={cat.label}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103 brightness-95"
                />
              </div>

              <h3 
                className="font-serif text-base sm:text-lg font-bold text-[#0B0B0B] group-hover:text-[#BF8F4A] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {cat.label}
              </h3>
              <p className="text-[11px] text-[#8B877F] mt-0.5 line-clamp-1 font-normal font-sans">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
