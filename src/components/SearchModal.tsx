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
    <div className="fixed inset-0 z-50 overflow-hidden bg-white md:bg-black/75 md:backdrop-blur-md flex flex-col justify-start animate-fadeIn">
      <div className="w-full max-w-4xl mx-auto md:px-6 md:pt-12 md:pb-12 h-full md:h-auto flex flex-col">
        {/* Search Interface Container */}
        <div className="bg-white md:shadow-xl md:border md:border-[#E8E5DF] flex-1 md:flex-initial flex flex-col overflow-hidden">
          {/* Top Search Bar (Safe-Area compliant & Thumb Friendly) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="p-3.5 sm:p-5 border-b border-[#E8E5DF] flex items-center gap-3 bg-white sticky top-0 z-10"
          >
            <Search className="w-4 h-4 text-[#111111] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fragrances, houses (Lattafa, Rasasi, Afnan), or notes..."
              className="flex-1 text-sm sm:text-base font-normal text-[#111111] placeholder:text-[#777777] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="w-8 h-8 flex items-center justify-center text-[#777777] hover:text-[#111111]"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="px-3 py-2 text-xs uppercase font-medium tracking-wider text-[#111111] hover:bg-neutral-100 border border-[#E8E5DF] shrink-0 min-h-[40px] flex items-center"
            >
              Close
            </button>
          </form>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-h-[calc(100vh-80px)] md:max-h-[68vh]">
            {trimmed === '' ? (
              <div className="space-y-6">
                {/* 1. Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#777777] font-medium mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#777777]" />
                        <span>Recent Searches</span>
                      </div>
                      <button 
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[10px] text-[#777777] hover:text-[#111111] uppercase underline"
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
                          className="px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#F1EFEA] border border-[#E8E5DF] text-xs text-[#111111] flex items-center gap-1.5"
                        >
                          <Clock className="w-3 h-3 text-[#777777]" />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Popular Searches */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#777777] font-medium mb-2.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#777777]" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="px-3 py-1.5 bg-white hover:bg-[#111111] hover:text-white border border-[#E8E5DF] text-xs text-[#111111] transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Brand Suggestions */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#777777] font-medium mb-2.5">
                    <span>Featured Fragrance Houses</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BRANDS.map(brand => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => handleSelectBrand(brand.slug)}
                        className="p-3 text-left bg-white hover:bg-[#FAF9F6] border border-[#E8E5DF] hover:border-[#111111] transition-colors"
                      >
                        <span className="font-serif text-sm text-[#111111] block leading-snug">
                          {brand.name}
                        </span>
                        <span className="text-[10px] text-[#777777]">
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
                    <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium block mb-2.5">
                      Houses ({matchedBrands.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matchedBrands.map(b => (
                        <div
                          key={b.id}
                          onClick={() => handleSelectBrand(b.slug)}
                          className="p-3 bg-white border border-[#E8E5DF] flex items-center justify-between cursor-pointer hover:border-[#111111]"
                        >
                          <div>
                            <span className="font-serif text-sm text-[#111111] block font-medium">
                              {b.name}
                            </span>
                            <span className="text-[11px] text-[#777777]">
                              {b.tagline}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#777777]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Matches */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium">
                      Fragrances ({matchedProducts.length})
                    </span>
                    {matchedProducts.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="text-xs font-medium text-[#111111] hover:underline"
                      >
                        View all results →
                      </button>
                    )}
                  </div>

                  {matchedProducts.length === 0 ? (
                    <div className="p-8 text-center bg-[#FAF9F6] border border-[#E8E5DF]">
                      <p className="text-sm font-serif text-[#111111] mb-1">
                        No fragrances matched "{query}"
                      </p>
                      <p className="text-xs text-[#777777] mb-4">
                        Try searching for notes like Oud, Amber, Vanilla, or brands like Lattafa, Rasasi, Afnan.
                      </p>
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="px-4 py-2 bg-[#111111] text-white text-xs font-medium uppercase tracking-wider"
                      >
                        Reset Search
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E8E5DF] border-y border-[#E8E5DF]">
                      {matchedProducts.map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.slug, p.name)}
                          className="py-3 flex items-center gap-3.5 hover:bg-[#FAF9F6] p-2 cursor-pointer transition-colors"
                        >
                          <div className="w-14 h-14 bg-white border border-[#E8E5DF] p-1 flex items-center justify-center shrink-0">
                            <img
                              src={p.thumbnail || p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-[#777777] font-medium block">
                              {p.brand}
                            </span>
                            <h4 className="font-serif text-sm text-[#111111] truncate">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-medium text-[#111111]">
                                ₹{p.price.toLocaleString('en-IN')}
                              </span>
                              {p.mrp > p.price && (
                                <span className="text-[11px] text-[#777777] line-through">
                                  ₹{p.mrp.toLocaleString('en-IN')}
                                </span>
                              )}
                              <span className="text-[10px] text-[#777777]">
                                • {p.concentration}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#777777] shrink-0" />
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
