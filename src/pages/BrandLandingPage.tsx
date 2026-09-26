import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  SlidersHorizontal,
  Star
} from 'lucide-react';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { SortOption } from '../types';

export const BrandLandingPage: React.FC = () => {
  const { activeBrandSlug, navigateToHome, navigateToShop, setIsAuthenticityModalOpen } = useStore();
  const [activeGender, setActiveGender] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('bestselling');

  const brand = BRANDS.find(b => b.slug === activeBrandSlug) || BRANDS[0];

  // Brand products
  const brandProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => p.brand.toLowerCase() === brand.name.toLowerCase());
    if (activeGender !== 'all') {
      list = list.filter(p => p.gender.toLowerCase() === activeGender.toLowerCase() || p.gender === 'Unisex');
    }

    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));

    return list;
  }, [brand, activeGender, sortBy]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-16">
      {/* Brand Hero Banner */}
      <div className="relative bg-[#111111] text-white overflow-hidden py-16 sm:py-20 border-b border-[#262626]">
        <div className="absolute inset-0 z-0">
          <img
            src={brand.bannerImage}
            alt={brand.name}
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-[#111111]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <button
            onClick={() => navigateToShop({})}
            className="inline-flex items-center gap-1.5 text-xs text-[#999999] hover:text-white mb-8 uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Houses</span>
          </button>

          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-widest text-[#999999] font-medium block mb-2">
              Official Stockist • {brand.originCountry}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
              {brand.name}
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-[#CCCCCC] mb-4">
              "{brand.heroQuote}"
            </p>

            <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed mb-6 max-w-2xl font-light">
              {brand.fullStory}
            </p>

            {/* Brand Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#888888] pt-4 border-t border-white/10">
              <span>{brand.originCountry}</span>
              <span>•</span>
              <span>Founded {brand.foundedYear}</span>
              <span>•</span>
              <span>{brand.type} Fragrance House</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog View for Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E5DF] mb-8 gap-4">
          <div>
            <h2 className="font-serif text-2xl font-normal text-[#111111]">
              {brand.name} Collection ({brandProducts.length})
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Directly imported original inventory with verifiable batch production codes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Gender Switcher */}
            <div className="flex items-center border border-[#E8E5DF] text-xs bg-white">
              <button
                onClick={() => setActiveGender('all')}
                className={`px-3 py-1.5 uppercase tracking-wider text-[11px] font-medium transition-colors ${
                  activeGender === 'all' ? 'bg-[#111111] text-white' : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveGender('men')}
                className={`px-3 py-1.5 uppercase tracking-wider text-[11px] font-medium transition-colors ${
                  activeGender === 'men' ? 'bg-[#111111] text-white' : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setActiveGender('women')}
                className={`px-3 py-1.5 uppercase tracking-wider text-[11px] font-medium transition-colors ${
                  activeGender === 'women' ? 'bg-[#111111] text-white' : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                Women
              </button>
            </div>

            {/* Sort */}
            <div className="bg-white border border-[#E8E5DF] px-3 py-1.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs font-medium text-[#111111] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="bestselling">Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {brandProducts.length === 0 ? (
          <div className="bg-white border border-[#E8E5DF] p-12 text-center">
            <p className="font-serif text-lg text-[#111111]">No fragrances match the selected filter.</p>
            <button
              onClick={() => setActiveGender('all')}
              className="mt-4 px-6 py-2.5 bg-[#111111] text-white text-xs uppercase font-medium tracking-widest"
            >
              Show All {brand.name} Perfumes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {brandProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Brand Authenticity & Trust banner */}
        <div className="mt-16 bg-white border border-[#E8E5DF] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#E8E5DF] flex items-center justify-center text-[#111111] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base text-[#111111] font-normal">
                Authentic {brand.name} Retail Guarantee
              </h3>
              <p className="text-xs text-[#777777] max-w-xl mt-1">
                All bottles are sourced directly from verified authorized European and Middle Eastern distributors in factory-sealed condition.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticityModalOpen(true)}
            className="px-6 py-3 bg-[#111111] hover:bg-[#262626] text-white text-xs font-medium uppercase tracking-widest transition-colors shrink-0"
          >
            Authenticity Details
          </button>
        </div>
      </div>
    </div>
  );
};
