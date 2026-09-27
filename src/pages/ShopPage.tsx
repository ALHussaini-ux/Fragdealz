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
    <div className="bg-[#F7F3EA] min-h-screen pb-20">
      {/* 1. Top Banner in Obsidian Black */}
      <div className="bg-[#0B0B0B] text-[#F7F3EA] py-8 sm:py-12 border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-[11px] text-[#8B877F] uppercase tracking-wider mb-2 font-sans">
            <button onClick={navigateToHome} className="hover:text-[#F7F3EA] transition-colors">Home</button>
            <span>/</span>
            <span className="text-[#BF8F4A] font-medium">Fragrance Catalog</span>
          </div>
          <h1 
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F7F3EA] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Fragrance Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#8B877F] max-w-2xl font-normal font-sans">
            Browse authentic stock across all 7 authorized houses: French Avenue, Rasasi, Lattafa, Afnan, Ahmed Al Maghribi, Armaf, and Riffs.
          </p>
        </div>
      </div>

      {/* 2. Filter & Sort Bar in Charcoal */}
      <div 
        id="sticky-mobile-filter-sort-bar"
        className="sticky top-14 md:top-20 z-30 bg-[#1A1A1A] border-b border-[#2A2A2A] px-4 py-2.5 shadow-sm"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
          {/* FILTER Button */}
          <button
            id="mobile-open-filters-btn"
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 min-h-[42px] px-4 py-2 bg-[#0B0B0B] hover:bg-[#222222] border border-[#2A2A2A] rounded-[2px] text-xs font-semibold uppercase tracking-wider text-[#F7F3EA] flex items-center justify-center gap-2 transition-colors font-sans"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#BF8F4A]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-[#BF8F4A] text-[#0B0B0B] text-[10px] rounded-full flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Vertical divider */}
          <span className="text-[#2A2A2A]">|</span>

          {/* SORT Button / Dropdown */}
          <div className="flex-1 relative">
            <button
              id="mobile-sort-toggle-btn"
              onClick={() => setMobileSortOpen(!mobileSortOpen)}
              className="w-full min-h-[42px] px-3 py-2 bg-[#0B0B0B] hover:bg-[#222222] border border-[#2A2A2A] rounded-[2px] text-xs font-semibold uppercase tracking-wider text-[#F7F3EA] flex items-center justify-between gap-1 transition-colors font-sans"
            >
              <div className="flex items-center gap-1.5 truncate">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#BF8F4A] shrink-0" />
                <span className="truncate">Sort: {sortLabelMap[filters.sortBy]}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[#8B877F] transition-transform ${mobileSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort Dropdown Menu */}
            {mobileSortOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-[#1A1A1A] border border-[#2A2A2A] shadow-xl rounded-[2px] p-1.5 z-40 animate-fadeIn">
                {(['bestselling', 'price-asc', 'price-desc', 'rating', 'newest'] as SortOption[]).map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, sortBy: option }));
                      setMobileSortOpen(false);
                    }}
                    className={`w-full min-h-[38px] px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider rounded-[2px] flex items-center justify-between transition-colors font-sans ${
                      filters.sortBy === option
                        ? 'bg-[#BF8F4A] text-[#0B0B0B]'
                        : 'hover:bg-[#0B0B0B] text-[#F7F3EA]'
                    }`}
                  >
                    <span>{sortLabelMap[option]}</span>
                    {filters.sortBy === option && <Check className="w-3.5 h-3.5 text-[#0B0B0B]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Quick Brand Filter Tabs */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-none font-sans">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setFilters(prev => ({ ...prev, brands: [] }))}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold border rounded-[2px] transition-colors ${
                filters.brands.length === 0
                  ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                  : 'bg-white text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
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
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold border rounded-[2px] transition-colors ${
                    isSelected
                      ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                      : 'bg-white text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
                  }`}
                >
                  {brand.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Count and Active Filters bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] mb-4 text-xs text-[#8B877F] font-sans">
          <span className="font-normal text-[#0B0B0B]">
            Showing <strong className="font-semibold">{sortedProducts.length}</strong> fragrances
          </span>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[#0B0B0B] hover:text-[#BF8F4A] font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}
        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5 font-sans">
            {filters.brands.map((b: string) => (
              <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DFD5] text-[11px] font-semibold text-[#0B0B0B] rounded-[2px]">
                {b}
                <X className="w-3 h-3 cursor-pointer text-[#8B877F] hover:text-[#0B0B0B]" onClick={() => toggleArrayFilter('brands', b)} />
              </span>
            ))}
            {filters.gender.map(g => (
              <span key={g} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DFD5] text-[11px] font-semibold text-[#0B0B0B] rounded-[2px]">
                {g}
                <X className="w-3 h-3 cursor-pointer text-[#8B877F] hover:text-[#0B0B0B]" onClick={() => toggleArrayFilter('gender', g)} />
              </span>
            ))}
            {filters.fragranceFamily.map(f => (
              <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DFD5] text-[11px] font-semibold text-[#0B0B0B] rounded-[2px]">
                {f}
                <X className="w-3 h-3 cursor-pointer text-[#8B877F] hover:text-[#0B0B0B]" onClick={() => toggleArrayFilter('fragranceFamily', f)} />
              </span>
            ))}
            {filters.concentration.map(co => (
              <span key={co} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DFD5] text-[11px] font-semibold text-[#0B0B0B] rounded-[2px]">
                {co}
                <X className="w-3 h-3 cursor-pointer text-[#8B877F] hover:text-[#0B0B0B]" onClick={() => toggleArrayFilter('concentration', co)} />
              </span>
            ))}
            {filters.onSaleOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] border border-[#2A2A2A] text-[11px] font-semibold text-[#BF8F4A] rounded-[2px]">
                On Sale
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, onSaleOnly: false }))} />
              </span>
            )}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800 rounded-[2px]">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, inStockOnly: false }))} />
              </span>
            )}
          </div>
        )}

        {/* 3. PRODUCT GRID */}
        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#E5DFD5] rounded-[2px] p-8">
            <h3 
              className="font-serif text-xl font-bold text-[#0B0B0B] mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              No fragrances matched the selected criteria
            </h3>
            <p className="text-xs text-[#8B877F] mb-6 max-w-md mx-auto font-sans">
              Try adjusting or resetting your filters to discover authentic perfumes from FragDealz.
            </p>
            <button
              onClick={resetFilters}
              className="px-8 py-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider transition-colors rounded-[2px] font-sans"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* 4. BOTTOM-SHEET / DRAWER FILTER INTERFACE */}
      {mobileFilterOpen && (
        <div 
          id="mobile-filter-drawer-modal"
          className="fixed inset-0 z-50 overflow-hidden bg-black/70 flex flex-col justify-end sm:justify-center animate-fadeIn"
        >
          {/* Filter Sheet Container */}
          <div className="w-full sm:max-w-lg sm:mx-auto bg-white max-h-[90vh] sm:max-h-[85vh] rounded-[2px] shadow-2xl flex flex-col overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5DFD5] flex items-center justify-between bg-[#F7F3EA]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#BF8F4A]" />
                <h3 
                  className="font-serif font-bold text-base text-[#0B0B0B] uppercase tracking-wider"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Filters & Refinements
                </h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#8B877F] hover:text-[#0B0B0B]"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 font-sans">
              {/* 1. BRAND */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8B877F] font-semibold block mb-2.5">
                  Brand / Fragrance House
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {BRANDS.map(brand => {
                    const isSelected = filters.brands.includes(brand.name);
                    return (
                      <button
                        key={brand.id}
                        onClick={() => toggleArrayFilter('brands', brand.name)}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-[2px] border text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                            : 'bg-[#F7F3EA] text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
                        }`}
                      >
                        <span className="truncate">{brand.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#BF8F4A]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. PRICE */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8B877F] font-semibold block mb-2.5">
                  Price Range
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {pricePresets.map((preset, idx) => {
                    const isSelected = filters.minPrice === preset.min && filters.maxPrice === preset.max;
                    return (
                      <button
                        key={idx}
                        onClick={() => setFilters(prev => ({ ...prev, minPrice: preset.min, maxPrice: preset.max }))}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-[2px] border text-center transition-colors ${
                          isSelected
                            ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                            : 'bg-[#F7F3EA] text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
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
                <span className="text-xs uppercase tracking-widest text-[#8B877F] font-semibold block mb-2.5">
                  Gender
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {genders.map(g => {
                    const isSelected = filters.gender.includes(g);
                    return (
                      <button
                        key={g}
                        onClick={() => toggleArrayFilter('gender', g)}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-[2px] border text-center transition-colors ${
                          isSelected
                            ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                            : 'bg-[#F7F3EA] text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
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
                <span className="text-xs uppercase tracking-widest text-[#8B877F] font-semibold block mb-2.5">
                  Fragrance Family
                </span>
                <div className="flex flex-wrap gap-2">
                  {FRAGRANCE_FAMILIES.map(family => {
                    const isSelected = filters.fragranceFamily.includes(family);
                    return (
                      <button
                        key={family}
                        onClick={() => toggleArrayFilter('fragranceFamily', family)}
                        className={`px-3 py-2 min-h-[38px] text-xs font-semibold rounded-[2px] border transition-colors ${
                          isSelected
                            ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                            : 'bg-[#F7F3EA] text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
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
                <span className="text-xs uppercase tracking-widest text-[#8B877F] font-semibold block mb-2.5">
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
                        className={`px-3 py-2 min-h-[38px] text-xs font-semibold rounded-[2px] border transition-colors ${
                          isSelected
                            ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                            : 'bg-[#F7F3EA] text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
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
                <span className="text-xs uppercase tracking-widest text-[#8B877F] font-semibold block mb-2.5">
                  Concentration
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {concentrations.map(conc => {
                    const isSelected = filters.concentration.includes(conc);
                    return (
                      <button
                        key={conc}
                        onClick={() => toggleArrayFilter('concentration', conc)}
                        className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-[2px] border text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#0B0B0B] text-[#F7F3EA] border-[#0B0B0B]'
                            : 'bg-[#F7F3EA] text-[#0B0B0B] border-[#E5DFD5] hover:border-[#BF8F4A]'
                        }`}
                      >
                        <span className="truncate">{conc}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#BF8F4A]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. AVAILABILITY & OFFERS */}
              <div className="pt-2 border-t border-[#E5DFD5] space-y-3">
                <label className="flex items-center justify-between p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px] cursor-pointer">
                  <span className="text-xs font-semibold text-[#0B0B0B]">In Stock Flacons Only</span>
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="w-4 h-4 accent-[#BF8F4A]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px] cursor-pointer">
                  <span className="text-xs font-semibold text-[#0B0B0B]">On Sale & Promotional Offers</span>
                  <input
                    type="checkbox"
                    checked={filters.onSaleOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, onSaleOnly: e.target.checked }))}
                    className="w-4 h-4 accent-[#BF8F4A]"
                  />
                </label>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 border-t border-[#E5DFD5] bg-white flex items-center gap-3 pb-[max(16px,env(safe-area-inset-bottom))] font-sans">
              <button
                onClick={resetFilters}
                className="flex-1 min-h-[46px] px-4 py-3 bg-[#F7F3EA] hover:bg-[#E5DFD5] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider border border-[#E5DFD5] rounded-[2px] transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 min-h-[46px] px-6 py-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors flex items-center justify-center gap-2"
              >
                <span>Apply Filters</span>
                <span className="bg-[#0B0B0B] text-[#F7F3EA] px-2 py-0.5 rounded-[2px] text-[11px]">
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
