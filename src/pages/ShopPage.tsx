import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  RotateCcw,
  ArrowUpDown,
  Check,
  ChevronDown
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { FRAGRANCE_FAMILIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { FragranceFamily, FragranceConcentration, SortOption } from '../types';

export const ShopPage: React.FC = () => {
  const { filters, setFilters, resetFilters, navigateToHome } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  // Concentrations
  const concentrations: FragranceConcentration[] = [
    'Eau de Parfum',
    'Eau de Toilette',
    'Parfum / Extrait',
    'Attar / Oil',
    'Discovery Set'
  ];

  // Gender options
  const genders: ('Men' | 'Women' | 'Unisex')[] = ['Men', 'Women', 'Unisex'];

  // Categories
  const categories: ('Arabic' | 'Designer' | 'Niche' | 'Gift Sets')[] = [
    'Arabic',
    'Designer',
    'Niche',
    'Gift Sets'
  ];

  // Key fragrance notes for filter
  const fragranceNotesList = [
    'Oud',
    'Vanilla',
    'Amber',
    'Rose',
    'Bergamot',
    'Cardamom',
    'Sandalwood',
    'Cinnamon'
  ];

  // Sizes for filter
  const sizesList = ['50ml', '100ml', '125ml', '200ml'];

  // Price presets
  const pricePresets = [
    { label: 'All Prices', min: 0, max: 25000 },
    { label: 'Under ₹2,000', min: 0, max: 2000 },
    { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000+', min: 10000, max: 25000 }
  ];

  // Filter products based on state
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQ = 
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
          product.notes.top.some(n => n.toLowerCase().includes(q)) ||
          product.notes.heart.some(n => n.toLowerCase().includes(q)) ||
          product.notes.base.some(n => n.toLowerCase().includes(q));
        if (!matchesQ) return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0) {
        const matchesCategory = filters.category.some(cat => {
          if (cat === 'Arabic') return product.isArabic;
          if (cat === 'Designer') return product.isDesigner;
          if (cat === 'Niche') return product.category === 'Niche' || product.isNiche;
          if (cat === 'Gift Sets') return product.tags.includes('Gift Set') || product.tags.includes('Discovery');
          return false;
        });
        if (!matchesCategory) return false;
      }

      // Gender filter
      if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) {
        return false;
      }

      // Fragrance family filter
      if (filters.fragranceFamily.length > 0) {
        const hasFamily = product.fragranceFamily.some(f => filters.fragranceFamily.includes(f));
        if (!hasFamily) return false;
      }

      // Concentration filter
      if (filters.concentration.length > 0 && !filters.concentration.includes(product.concentration)) {
        return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // On Sale Only
      if (filters.onSaleOnly && product.discount <= 0 && !product.isSale) {
        return false;
      }

      // In Stock Only
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (filters.sortBy) {
      case 'price-asc':
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'bestselling':
      default:
        return list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
  }, [filteredProducts, filters.sortBy]);

  // Toggle helper
  const toggleArrayFilter = <T,>(key: 'brands' | 'gender' | 'category' | 'fragranceFamily' | 'concentration', value: T) => {
    setFilters(prev => {
      const current = prev[key] as T[];
      const exists = current.includes(value);
      const updated = exists ? current.filter(item => item !== value) : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const activeFilterCount = 
    filters.brands.length + 
    filters.gender.length + 
    filters.category.length + 
    filters.fragranceFamily.length + 
    filters.concentration.length + 
    (filters.searchQuery ? 1 : 0) + 
    (filters.onSaleOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 20000 ? 1 : 0);

  const sortLabelMap: Record<SortOption, string> = {
    'bestselling': 'Bestsellers',
    'featured': 'Featured Flacons',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    'rating': 'Highest Rated',
    'newest': 'New Arrivals'
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* 1. Top Banner */}
      <div className="bg-[#111111] text-white py-6 sm:py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#EDE9E2]/70 uppercase tracking-widest mb-2">
            <button onClick={navigateToHome} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <span className="text-[#B89B5E]">Fragrance Catalog</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white mb-2">
            Fragrance Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#EDE9E2]/80 max-w-2xl font-light">
            Browse authentic stock across all 7 authorized houses: French Avenue, Rasasi, Lattafa, Afnan, Ahmed Al Maghribi, Armaf, and Riffs.
          </p>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div 
        id="sticky-mobile-filter-sort-bar"
        className="sticky top-14 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#EDE9E2] px-4 py-2 flex items-center justify-between shadow-2xs"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
          {/* FILTER Button */}
          <button
            id="mobile-open-filters-btn"
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 min-h-[44px] px-4 py-2 bg-[#FAF9F6] hover:bg-[#EDE9E2] border border-[#EDE9E2] rounded-xs text-xs font-medium uppercase tracking-wider text-[#111111] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#111111]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-[#111111] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Vertical divider */}
          <span className="text-[#EDE9E2]">|</span>

          {/* SORT Button / Dropdown */}
          <div className="flex-1 relative">
            <button
              id="mobile-sort-toggle-btn"
              onClick={() => setMobileSortOpen(!mobileSortOpen)}
              className="w-full min-h-[44px] px-3 py-2 bg-[#FAF9F6] hover:bg-[#EDE9E2] border border-[#EDE9E2] rounded-xs text-xs font-medium uppercase tracking-wider text-[#111111] flex items-center justify-between gap-1 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-1.5 truncate">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#5C554D] shrink-0" />
                <span className="truncate">Sort: {sortLabelMap[filters.sortBy]}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[#5C554D] transition-transform ${mobileSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort Dropdown Menu */}
            {mobileSortOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-[#EDE9E2] shadow-xl rounded-sm p-1.5 z-40 animate-fadeIn">
                {(['bestselling', 'price-asc', 'price-desc', 'rating', 'newest'] as SortOption[]).map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, sortBy: option }));
                      setMobileSortOpen(false);
                    }}
                    className={`w-full min-h-[40px] px-3 py-2 text-left text-xs font-semibold rounded-xs flex items-center justify-between transition-colors ${
                      filters.sortBy === option
                        ? 'bg-[#111111] text-white'
                        : 'hover:bg-[#FAF9F6] text-[#111111]'
                    }`}
                  >
                    <span>{sortLabelMap[option]}</span>
                    {filters.sortBy === option && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Quick Brand Filter Tabs */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setFilters(prev => ({ ...prev, brands: [] }))}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                filters.brands.length === 0
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#111111] border-[#E8E5DF] hover:border-[#111111]'
              }`}
            >
              All Brands ({PRODUCTS.length})
            </button>
            {BRANDS.map(brand => {
              const isSelected = filters.brands.length === 1 && filters.brands[0] === brand.name;
              const count = PRODUCTS.filter(p => p.brand.toLowerCase() === brand.name.toLowerCase()).length;
              return (
                <button
                  key={brand.id}
                  onClick={() => setFilters(prev => ({ ...prev, brands: [brand.name] }))}
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-white text-[#111111] border-[#E8E5DF] hover:border-[#111111]'
                  }`}
                >
                  {brand.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Count and Active Filters bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E2]/60 mb-4 text-xs text-[#5C554D]">
          <span className="font-normal text-[#111111]">
            Showing <strong className="font-semibold">{sortedProducts.length}</strong> fragrances
          </span>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[#111111] hover:underline font-medium uppercase tracking-wider text-[11px] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-5 animate-fadeIn">
            {filters.brands.map((b: string) => (
              <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE9E2] text-[11px] font-bold text-[#111111] rounded-full shadow-2xs">
                {b}
                <X className="w-3 h-3 cursor-pointer text-[#5C554D] hover:text-[#111111]" onClick={() => toggleArrayFilter('brands', b)} />
              </span>
            ))}
            {filters.gender.map(g => (
              <span key={g} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE9E2] text-[11px] font-bold text-[#111111] rounded-full shadow-2xs">
                {g}
                <X className="w-3 h-3 cursor-pointer text-[#5C554D] hover:text-[#111111]" onClick={() => toggleArrayFilter('gender', g)} />
              </span>
            ))}
            {filters.fragranceFamily.map(f => (
              <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE9E2] text-[11px] font-bold text-[#111111] rounded-full shadow-2xs">
                {f}
                <X className="w-3 h-3 cursor-pointer text-[#5C554D] hover:text-[#111111]" onClick={() => toggleArrayFilter('fragranceFamily', f)} />
              </span>
            ))}
            {filters.concentration.map(co => (
              <span key={co} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE9E2] text-[11px] font-bold text-[#111111] rounded-full shadow-2xs">
                {co}
                <X className="w-3 h-3 cursor-pointer text-[#5C554D] hover:text-[#111111]" onClick={() => toggleArrayFilter('concentration', co)} />
              </span>
            ))}
            {filters.onSaleOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#B89B5E]/15 border border-[#B89B5E]/30 text-[11px] font-bold text-[#B89B5E] rounded-full">
                On Sale
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, onSaleOnly: false }))} />
              </span>
            )}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800 rounded-full">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, inStockOnly: false }))} />
              </span>
            )}
          </div>
        )}

        {/* 3. PRODUCT GRID: STRICT 2 COLUMNS ON MOBILE (375px+), 3 on Tablet/Desktop */}
        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#EDE9E2] rounded-sm p-8">
            <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">
              No fragrances matched the selected criteria
            </h3>
            <p className="text-xs text-[#5C554D] mb-6 max-w-md mx-auto">
              Try adjusting or resetting your filters to discover authentic perfumes from FragDealz.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-[#111111] hover:bg-[#B89B5E] text-white text-xs font-bold uppercase tracking-widest transition-colors rounded-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. FULL-SCREEN / BOTTOM-SHEET FILTER INTERFACE (CRITICAL USER MANDATE) */}
      {/* ========================================================================= */}
      {mobileFilterOpen && (
        <div 
          id="mobile-filter-drawer-modal"
          className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex flex-col justify-end sm:justify-center animate-fadeIn"
        >
          {/* Filter Sheet Container */}
          <div className="w-full sm:max-w-lg sm:mx-auto bg-white max-h-[90vh] sm:max-h-[85vh] rounded-t-xl sm:rounded-sm shadow-2xl flex flex-col overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="p-4 border-b border-[#EDE9E2] flex items-center justify-between bg-[#FAF9F6]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#B89B5E]" />
                <h3 className="font-serif font-bold text-base text-[#111111] uppercase tracking-wider">
                  FILTERS & REFINEMENTS
                </h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#5C554D] hover:text-[#111111] rounded-full active:bg-black/5"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* 1. BRAND */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#5C554D] font-bold block mb-2.5">
                  Brand / Fragrance House
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {BRANDS.map(brand => {
                    const isSelected = filters.brands.includes(brand.name);
                    return (
                      <button
                        key={brand.id}
                        onClick={() => toggleArrayFilter('brands', brand.name)}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-xs border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-[#FAF9F6] text-[#111111] border-[#EDE9E2] hover:border-[#B89B5E]'
                        }`}
                      >
                        <span className="truncate">{brand.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. PRICE */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#5C554D] font-bold block mb-2.5">
                  Price Range
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {pricePresets.map((preset, idx) => {
                    const isSelected = filters.minPrice === preset.min && filters.maxPrice === preset.max;
                    return (
                      <button
                        key={idx}
                        onClick={() => setFilters(prev => ({ ...prev, minPrice: preset.min, maxPrice: preset.max }))}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-xs border text-center transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-[#FAF9F6] text-[#111111] border-[#EDE9E2] hover:border-[#B89B5E]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. GENDER */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#5C554D] font-bold block mb-2.5">
                  Gender
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {genders.map(g => {
                    const isSelected = filters.gender.includes(g);
                    return (
                      <button
                        key={g}
                        onClick={() => toggleArrayFilter('gender', g)}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-xs border text-center transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-[#FAF9F6] text-[#111111] border-[#EDE9E2] hover:border-[#B89B5E]'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. FRAGRANCE FAMILY */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#5C554D] font-bold block mb-2.5">
                  Fragrance Family
                </span>
                <div className="flex flex-wrap gap-2">
                  {FRAGRANCE_FAMILIES.map(family => {
                    const isSelected = filters.fragranceFamily.includes(family);
                    return (
                      <button
                        key={family}
                        onClick={() => toggleArrayFilter('fragranceFamily', family)}
                        className={`px-3 py-2 min-h-[38px] text-xs font-semibold rounded-full border transition-all ${
                          isSelected
                            ? 'bg-[#B89B5E] text-white border-[#B89B5E]'
                            : 'bg-[#FAF9F6] text-[#111111] border-[#EDE9E2]'
                        }`}
                      >
                        {family}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. FRAGRANCE NOTES */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#5C554D] font-bold block mb-2.5">
                  Signature Notes
                </span>
                <div className="flex flex-wrap gap-2">
                  {fragranceNotesList.map(note => {
                    const isSelected = filters.searchQuery.toLowerCase() === note.toLowerCase();
                    return (
                      <button
                        key={note}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          searchQuery: isSelected ? '' : note
                        }))}
                        className={`px-3 py-2 min-h-[38px] text-xs font-semibold rounded-full border transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-[#FAF9F6] text-[#111111] border-[#EDE9E2]'
                        }`}
                      >
                        {note}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. CONCENTRATION */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#5C554D] font-bold block mb-2.5">
                  Concentration
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {concentrations.map(conc => {
                    const isSelected = filters.concentration.includes(conc);
                    return (
                      <button
                        key={conc}
                        onClick={() => toggleArrayFilter('concentration', conc)}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-xs border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-[#FAF9F6] text-[#111111] border-[#EDE9E2] hover:border-[#B89B5E]'
                        }`}
                      >
                        <span className="truncate">{conc}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. AVAILABILITY & OFFERS */}
              <div className="pt-2 border-t border-[#EDE9E2] space-y-3">
                <label className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#EDE9E2] rounded cursor-pointer">
                  <span className="text-xs font-bold text-[#111111]">In Stock Flacons Only</span>
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="w-4 h-4 accent-[#B89B5E]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#EDE9E2] rounded cursor-pointer">
                  <span className="text-xs font-bold text-[#111111]">On Sale & Promotional Offers</span>
                  <input
                    type="checkbox"
                    checked={filters.onSaleOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, onSaleOnly: e.target.checked }))}
                    className="w-4 h-4 accent-[#B89B5E]"
                  />
                </label>
              </div>
            </div>

            {/* Sticky Bottom Actions Bar (CLEAR ALL & APPLY FILTERS) */}
            <div className="p-4 border-t border-[#EDE9E2] bg-white flex items-center gap-3 pb-[max(16px,env(safe-area-inset-bottom))]">
              <button
                onClick={resetFilters}
                className="flex-1 min-h-[48px] px-4 py-3 bg-[#FAF9F6] hover:bg-[#EDE9E2] text-[#111111] text-xs font-bold uppercase tracking-wider border border-[#EDE9E2] rounded-xs transition-colors"
              >
                CLEAR ALL
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 min-h-[48px] px-6 py-3 bg-[#111111] hover:bg-[#B89B5E] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>APPLY FILTERS</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
                  {sortedProducts.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
