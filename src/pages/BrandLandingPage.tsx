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
    <div className="bg-[#F7F3EA] min-h-screen pb-20">
      {/* Brand Hero Banner in Obsidian Black */}
      <div className="relative bg-[#0B0B0B] text-[#F7F3EA] overflow-hidden py-16 sm:py-20 border-b border-[#1A1A1A]">
        <div className="absolute inset-0 z-0">
          <img
            src={brand.bannerImage}
            alt={brand.name}
            className="w-full h-full object-cover object-center opacity-25 brightness-75"
          />
          <div className="absolute inset-0 bg-[#0B0B0B]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <button
            onClick={() => navigateToShop({})}
            className="inline-flex items-center gap-1.5 text-xs text-[#8B877F] hover:text-[#BF8F4A] mb-8 uppercase tracking-widest font-sans font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#BF8F4A]" />
            <span>All Houses</span>
          </button>

          <div className="max-w-3xl">
            <span 
              className="text-[11px] uppercase tracking-[0.15em] text-[#EAD1A6] font-semibold block mb-2 font-sans"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Official Stockist • {brand.originCountry}
            </span>

            <h1 
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F3EA] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {brand.name}
            </h1>

            <p 
              className="font-serif italic text-base sm:text-lg text-[#EAD1A6] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "{brand.heroQuote}"
            </p>

            <p className="text-xs sm:text-sm text-[#8B877F] leading-relaxed mb-6 max-w-2xl font-sans">
              {brand.fullStory}
            </p>

            {/* Brand Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B877F] pt-4 border-t border-[#1A1A1A] font-sans">
              <span>{brand.originCountry}</span>
              <span>•</span>
              <span>Founded {brand.foundedYear}</span>
              <span>•</span>
              <span className="text-[#EAD1A6]">{brand.type} Fragrance House</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog View for Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5DFD5] mb-8 gap-4">
          <div>
            <h2 
              className="font-serif text-2xl font-bold text-[#0B0B0B]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {brand.name} Collection ({brandProducts.length})
            </h2>
            <p className="text-xs text-[#8B877F] mt-1 font-sans">
              Directly imported original inventory with verifiable batch production codes.
            </p>
          </div>

          <div className="flex items-center gap-3 font-sans">
            {/* Gender Switcher */}
            <div className="flex items-center border border-[#E5DFD5] text-xs bg-white rounded-[2px] overflow-hidden">
              <button
                onClick={() => setActiveGender('all')}
                className={`px-3.5 py-2 uppercase tracking-wider text-[11px] font-semibold transition-colors ${
                  activeGender === 'all' ? 'bg-[#0B0B0B] text-[#F7F3EA]' : 'text-[#8B877F] hover:text-[#0B0B0B]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveGender('men')}
                className={`px-3.5 py-2 uppercase tracking-wider text-[11px] font-semibold transition-colors ${
                  activeGender === 'men' ? 'bg-[#0B0B0B] text-[#F7F3EA]' : 'text-[#8B877F] hover:text-[#0B0B0B]'
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setActiveGender('women')}
                className={`px-3.5 py-2 uppercase tracking-wider text-[11px] font-semibold transition-colors ${
                  activeGender === 'women' ? 'bg-[#0B0B0B] text-[#F7F3EA]' : 'text-[#8B877F] hover:text-[#0B0B0B]'
                }`}
              >
                Women
              </button>
            </div>

            {/* Sort */}
            <div className="bg-white border border-[#E5DFD5] px-3 py-2 rounded-[2px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs font-semibold text-[#0B0B0B] bg-transparent focus:outline-none cursor-pointer uppercase tracking-wider"
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
          <div className="bg-white border border-[#E5DFD5] p-12 text-center rounded-[2px]">
            <p 
              className="font-serif text-lg text-[#0B0B0B] mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              No fragrances match the selected filter.
            </p>
            <button
              onClick={() => setActiveGender('all')}
              className="mt-4 px-8 py-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs uppercase font-semibold tracking-wider rounded-[2px] transition-colors font-sans"
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
        <div className="mt-16 bg-white border border-[#E5DFD5] rounded-[2px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#E5DFD5] bg-[#F7F3EA] flex items-center justify-center text-[#BF8F4A] shrink-0 rounded-[2px]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h3 
                className="font-serif text-base text-[#0B0B0B] font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Authentic {brand.name} Retail Guarantee
              </h3>
              <p className="text-xs text-[#8B877F] max-w-xl mt-1 font-sans">
                All bottles are sourced directly from verified authorized European and Middle Eastern distributors in factory-sealed condition.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticityModalOpen(true)}
            className="px-6 py-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 rounded-[2px] font-sans"
          >
            Authenticity Details
          </button>
        </div>
      </div>
    </div>
  );
};
