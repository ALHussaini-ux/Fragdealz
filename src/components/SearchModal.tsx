import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star, TrendingUp, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, navigateToBrand, navigateToShop } = useStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Lattafa Khamrah',
    'Rasasi Hawas',
    'Liquid Brun'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Matched products
  const matchedProducts: Product[] = trimmed
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(trimmed) ||
        p.brand.toLowerCase().includes(trimmed) ||
        p.shortDescription.toLowerCase().includes(trimmed) ||
        p.fragranceFamily.some(f => f.toLowerCase().includes(trimmed)) ||
        p.notes.top.some(n => n.toLowerCase().includes(trimmed)) ||
        p.notes.heart.some(n => n.toLowerCase().includes(trimmed)) ||
        p.notes.base.some(n => n.toLowerCase().includes(trimmed))
      )
    : [];

  // Matched brands
  const matchedBrands = trimmed
    ? BRANDS.filter(b => b.name.toLowerCase().includes(trimmed) || b.tagline.toLowerCase().includes(trimmed))
    : [];

  const popularSearches = [
    'Hawas',
    'Liquid Brun',
    'Khamrah',
    '9PM',
    'Club de Nuit',
    'Kaaf',
    'Asad',
    'Yara'
  ];

  const handleSelectProduct = (slug: string, term?: string) => {
    if (term && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
    setIsSearchOpen(false);
    navigateToProduct(slug);
  };

  const handleSelectBrand = (slug: string) => {
    setIsSearchOpen(false);
    navigateToBrand(slug);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    if (!recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
    setIsSearchOpen(false);
    navigateToShop({ searchQuery: query });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-white md:bg-black/80 md:backdrop-blur-xs flex flex-col justify-start animate-fadeIn">
      <div className="w-full max-w-4xl mx-auto md:px-6 md:pt-12 md:pb-12 h-full md:h-auto flex flex-col">
        {/* Search Interface Container */}
        <div className="bg-white md:shadow-2xl md:border md:border-[#1A1A1A] rounded-[2px] flex-1 md:flex-initial flex flex-col overflow-hidden">
          {/* Top Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="p-3.5 sm:p-5 border-b border-[#E5DFD5] flex items-center gap-3 bg-[#0B0B0B] sticky top-0 z-10"
          >
            <Search className="w-4 h-4 text-[#BF8F4A] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fragrances, houses (Lattafa, Rasasi, Afnan), or notes..."
              className="flex-1 text-sm sm:text-base font-['Inter'] text-[#F7F3EA] placeholder:text-[#8B877F] bg-transparent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="w-8 h-8 flex items-center justify-center text-[#8B877F] hover:text-[#F7F3EA]"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="px-3.5 py-2 text-xs uppercase font-semibold tracking-[0.1em] text-[#F7F3EA] hover:text-[#BF8F4A] border border-[#1A1A1A] hover:border-[#BF8F4A] bg-[#1A1A1A] shrink-0 min-h-[40px] flex items-center rounded-[2px] transition-colors"
            >
              Close
            </button>
          </form>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-h-[calc(100vh-80px)] md:max-h-[68vh] bg-[#F7F3EA]/30">
            {trimmed === '' ? (
              <div className="space-y-6">
                {/* 1. Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#BF8F4A]" />
                        <span>Recent Searches</span>
                      </div>
                      <button 
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[10px] text-[#8B877F] hover:text-[#0B0B0B] uppercase tracking-wider underline"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 bg-white hover:border-[#BF8F4A] hover:text-[#BF8F4A] border border-[#E5DFD5] text-xs text-[#0B0B0B] flex items-center gap-1.5 rounded-[2px] transition-colors"
                        >
                          <Clock className="w-3 h-3 text-[#8B877F]" />
                          <span className="font-['Inter']">{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Popular Searches */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold mb-2.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#BF8F4A]" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="px-3 py-1.5 bg-white hover:bg-[#0B0B0B] hover:text-[#F7F3EA] border border-[#E5DFD5] text-xs text-[#0B0B0B] font-['Inter'] rounded-[2px] transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Brand Suggestions */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold mb-2.5">
                    <span>Featured Fragrance Houses</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BRANDS.map(brand => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => handleSelectBrand(brand.slug)}
                        className="p-3 text-left bg-white hover:border-[#BF8F4A] border border-[#E5DFD5] rounded-[2px] transition-colors group"
                      >
                        <span className="font-['Playfair_Display'] text-sm text-[#0B0B0B] group-hover:text-[#BF8F4A] block leading-snug font-medium transition-colors">
                          {brand.name}
                        </span>
                        <span className="text-[10px] text-[#8B877F] font-['Inter']">
                          {brand.originCountry} • {brand.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Live Results View */
              <div className="space-y-6">
                {/* Brand Matches */}
                {matchedBrands.length > 0 && (
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold block mb-2.5">
                      Houses ({matchedBrands.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matchedBrands.map(b => (
                        <div
                          key={b.id}
                          onClick={() => handleSelectBrand(b.slug)}
                          className="p-3 bg-white border border-[#E5DFD5] rounded-[2px] flex items-center justify-between cursor-pointer hover:border-[#BF8F4A] transition-colors group"
                        >
                          <div>
                            <span className="font-['Playfair_Display'] text-sm text-[#0B0B0B] group-hover:text-[#BF8F4A] block font-medium transition-colors">
                              {b.name}
                            </span>
                            <span className="text-[11px] text-[#8B877F] font-['Inter']">
                              {b.tagline}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#8B877F] group-hover:text-[#BF8F4A] transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Matches */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold">
                      Fragrances ({matchedProducts.length})
                    </span>
                    {matchedProducts.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="text-xs font-semibold uppercase tracking-wider text-[#BF8F4A] hover:underline"
                      >
                        View all results →
                      </button>
                    )}
                  </div>

                  {matchedProducts.length === 0 ? (
                    <div className="p-8 text-center bg-white border border-[#E5DFD5] rounded-[2px]">
                      <p className="text-base font-['Playfair_Display'] text-[#0B0B0B] mb-1 font-medium">
                        No fragrances matched "{query}"
                      </p>
                      <p className="text-xs text-[#8B877F] mb-4 font-['Inter']">
                        Try searching for notes like Oud, Amber, Vanilla, or brands like Lattafa, Rasasi, Afnan.
                      </p>
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="px-4 py-2 bg-[#BF8F4A] hover:bg-[#a87d3f] text-[#0B0B0B] text-xs font-semibold uppercase tracking-[0.1em] rounded-[2px] transition-colors"
                      >
                        Reset Search
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {matchedProducts.map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.slug, p.name)}
                          className="bg-white border border-[#E5DFD5] p-2.5 rounded-[2px] flex items-center gap-3.5 hover:border-[#BF8F4A] cursor-pointer transition-colors group"
                        >
                          <div className="w-14 h-14 bg-[#F7F3EA]/50 border border-[#E5DFD5]/60 p-1 flex items-center justify-center shrink-0 rounded-[2px]">
                            <img
                              src={p.thumbnail || p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold block">
                              {p.brand}
                            </span>
                            <h4 className="font-['Playfair_Display'] text-sm text-[#0B0B0B] group-hover:text-[#BF8F4A] truncate font-medium transition-colors">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5 font-['Inter']">
                              <span className="text-xs font-bold text-[#0B0B0B] font-['Playfair_Display']">
                                ₹{p.price.toLocaleString('en-IN')}
                              </span>
                              {p.mrp > p.price && (
                                <span className="text-[11px] text-[#8B877F] line-through">
                                  ₹{p.mrp.toLocaleString('en-IN')}
                                </span>
                              )}
                              <span className="text-[10px] text-[#8B877F]">
                                • {p.concentration}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#8B877F] group-hover:text-[#BF8F4A] transition-colors shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
