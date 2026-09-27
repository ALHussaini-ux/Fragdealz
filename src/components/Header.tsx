import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRANDS } from '../data/brands';
import { FragDealzLogo } from './FragDealzLogo';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    setIsAccountOpen,
    setIsAuthenticityModalOpen,
    navigateToHome,
    navigateToShop,
    navigateToBrand
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBrandsExpanded, setMobileBrandsExpanded] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);

  const featuredBrands = BRANDS;

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0B] border-b border-[#1A1A1A] transition-all">
      {/* 1. Subtle Announcement Bar in Obsidian Black & Champagne/Gold */}
      <div className="bg-[#0B0B0B] border-b border-[#1A1A1A] text-[#8B877F] text-[11px] py-2 px-4 tracking-wide font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline text-[#8B877F]">
            100% authentic fragrances with verifiable batch codes
          </span>
          <span className="mx-auto sm:mx-0 font-medium text-[#EAD1A6]">
            Complimentary climate-controlled shipping on orders over ₹2,499
          </span>
          <button 
            id="header-authenticity-link"
            onClick={() => setIsAuthenticityModalOpen(true)}
            className="hidden md:inline text-[#BF8F4A] hover:text-[#EAD1A6] transition-colors underline underline-offset-4"
          >
            Authenticity guarantee
          </button>
        </div>
      </div>

      {/* 2. Main Header Bar on Obsidian Black / Charcoal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MOBILE TOP ROW */}
        <div className="flex md:hidden items-center justify-between h-16">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-[#EAD1A6] hover:text-[#BF8F4A] transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Logo on black bar */}
          <div 
            id="brand-logo-mobile-btn"
            onClick={navigateToHome}
            className="cursor-pointer flex items-center justify-center select-none py-1"
          >
            <FragDealzLogo className="h-7 w-auto" />
          </div>

          <div className="flex items-center -mr-2">
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-[#EAD1A6] hover:text-[#BF8F4A] transition-colors"
              aria-label="Search fragrances"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              id="mobile-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-[#BF8F4A] hover:text-[#EAD1A6] transition-colors relative"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 bg-[#BF8F4A] text-[#0B0B0B] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP ROW (MD and above) */}
        <div className="hidden md:flex items-center justify-between h-20 gap-8">
          {/* Brand Logo on left: Symbol + Wordmark */}
          <div 
            id="brand-logo-btn"
            onClick={navigateToHome}
            className="cursor-pointer flex items-center select-none group shrink-0"
          >
            <FragDealzLogo className="h-9 lg:h-10 w-auto" showSubtitle={true} />
          </div>

          {/* Center Search Input */}
          <div className="flex-1 max-w-md">
            <div 
              id="desktop-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="w-full relative flex items-center bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#BF8F4A] px-4 py-2.5 rounded-[2px] text-xs text-[#8B877F] cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 text-[#BF8F4A] mr-2.5 stroke-[1.5]" />
              <span className="flex-1 text-[#8B877F]">Search fragrances, houses, olfactory notes...</span>
              <span className="text-[10px] bg-[#0B0B0B] border border-[#2A2A2A] px-1.5 py-0.5 text-[#8B877F] font-mono rounded-[2px]">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Action Icons: Single-weight line icons with gold cart */}
          <div className="flex items-center gap-5 shrink-0">
            <button
              id="header-account-btn"
              onClick={() => setIsAccountOpen(true)}
              className="text-[#EAD1A6] hover:text-[#BF8F4A] transition-colors p-1"
              aria-label="User Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              id="header-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="text-[#EAD1A6] hover:text-[#BF8F4A] transition-colors p-1 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#BF8F4A] text-[#0B0B0B] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with Gold Cart Icon */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 py-2 px-4 bg-[#1A1A1A] hover:bg-[#242424] border border-[#2A2A2A] text-[#F7F3EA] transition-colors text-xs font-semibold tracking-wider uppercase rounded-[2px]"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#BF8F4A] stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#BF8F4A] text-[#0B0B0B] text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[#EAD1A6]">
                {cartCount > 0 ? `₹${cartSubtotal.toLocaleString('en-IN')}` : 'Bag'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Underneath Horizontal Navigation Bar in Obsidian Black / Charcoal */}
      <nav className="hidden md:block border-t border-[#1A1A1A] bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center space-x-9 text-xs font-medium tracking-widest text-[#EAD1A6] uppercase py-3 font-sans">
            <li>
              <button
                id="nav-shop-all"
                onClick={() => navigateToShop({})}
                className="hover:text-[#BF8F4A] transition-colors py-1"
              >
                Shop All
              </button>
            </li>

            {/* BRANDS with Mega Menu Dropdown */}
            <li 
              className="relative"
              onMouseEnter={() => setBrandsDropdownOpen(true)}
              onMouseLeave={() => setBrandsDropdownOpen(false)}
            >
              <button
                id="nav-brands-dropdown"
                onClick={() => navigateToShop({})}
                className="hover:text-[#BF8F4A] transition-colors py-1 flex items-center gap-1 group"
              >
                <span>Brands</span>
                <ChevronDown className={`w-3 h-3 text-[#8B877F] transition-transform duration-200 ${brandsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {brandsDropdownOpen && (
                <div 
                  id="brands-mega-menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-[#1A1A1A] border border-[#2A2A2A] shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 rounded-[2px]"
                >
                  <div className="col-span-2 border-r border-[#2A2A2A] pr-6">
                    <p className="text-[11px] tracking-wider text-[#8B877F] font-semibold uppercase mb-4 font-sans">
                      Authorized Fragrance Houses
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {featuredBrands.map(brand => (
                        <button
                          key={brand.id}
                          onClick={() => {
                            setBrandsDropdownOpen(false);
                            navigateToBrand(brand.slug);
                          }}
                          className="flex items-start gap-2 p-2 hover:bg-[#0B0B0B] border border-transparent hover:border-[#2A2A2A] rounded-[2px] text-left transition-colors"
                        >
                          <div>
                            <span className="font-serif text-sm text-[#F7F3EA] block">
                              {brand.name}
                            </span>
                            <span className="text-[11px] text-[#8B877F] font-sans">
                              {brand.originCountry} • {brand.type}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between bg-[#0B0B0B] p-5 border border-[#2A2A2A] rounded-[2px]">
                    <div>
                      <span className="text-[10px] tracking-wider text-[#BF8F4A] font-semibold uppercase block mb-1">
                        Sourcing Standard
                      </span>
                      <h4 className="font-serif text-base text-[#F7F3EA] mb-2 font-normal">
                        100% Authentic Flacons
                      </h4>
                      <p className="text-xs text-[#8B877F] leading-relaxed mb-4 font-sans">
                        Original factory seals, import credentials, and verifiable batch codes on all bottles.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setBrandsDropdownOpen(false);
                        setIsAuthenticityModalOpen(true);
                      }}
                      className="text-xs font-semibold text-[#BF8F4A] hover:text-[#EAD1A6] flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Verification charter</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </li>

            <li>
              <button
                id="nav-men"
                onClick={() => navigateToShop({ gender: ['Men'] })}
                className="hover:text-[#BF8F4A] transition-colors py-1"
              >
                Men
              </button>
            </li>
            <li>
              <button
                id="nav-women"
                onClick={() => navigateToShop({ gender: ['Women'] })}
                className="hover:text-[#BF8F4A] transition-colors py-1"
              >
                Women
              </button>
            </li>
            <li>
              <button
                id="nav-unisex"
                onClick={() => navigateToShop({ gender: ['Unisex'] })}
                className="hover:text-[#BF8F4A] transition-colors py-1"
              >
                Unisex
              </button>
            </li>
            <li>
              <button
                id="nav-bestsellers"
                onClick={() => navigateToShop({ sortBy: 'bestselling' })}
                className="hover:text-[#BF8F4A] transition-colors py-1"
              >
                Bestsellers
              </button>
            </li>
            <li>
              <button
                id="nav-extraits"
                onClick={() => navigateToShop({ concentration: ['Parfum / Extrait'] })}
                className="hover:text-[#BF8F4A] transition-colors py-1"
              >
                Parfum & Extraits
              </button>
            </li>
            <li>
              <button
                id="nav-new-arrivals"
                onClick={() => navigateToShop({ sortBy: 'newest' })}
                className="hover:text-[#BF8F4A] transition-colors py-1"
              >
                New Arrivals
              </button>
            </li>
            <li>
              <button
                id="nav-sale"
                onClick={() => navigateToShop({ onSaleOnly: true })}
                className="text-[#BF8F4A] hover:text-[#EAD1A6] transition-colors py-1 font-semibold underline underline-offset-4"
              >
                Sale
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. DEDICATED MOBILE FULL-SCREEN SLIDE-OUT NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-overlay"
          className="md:hidden fixed inset-0 z-50 flex flex-col bg-black/75 backdrop-blur-xs"
        >
          {/* Drawer Sheet in Obsidian Black / Charcoal */}
          <div className="w-full max-w-[320px] h-full bg-[#0B0B0B] border-r border-[#1A1A1A] flex flex-col justify-between shadow-2xl overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#1A1A1A] flex items-center justify-between">
              <FragDealzLogo className="h-7 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#8B877F] hover:text-[#EAD1A6]"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation Links list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 text-xs font-semibold tracking-wider uppercase text-[#EAD1A6]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({});
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] hover:text-[#BF8F4A]"
              >
                <span>Shop All</span>
                <ChevronRight className="w-4 h-4 text-[#8B877F]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({ gender: ['Men'] });
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] hover:text-[#BF8F4A]"
              >
                <span>Men</span>
                <ChevronRight className="w-4 h-4 text-[#8B877F]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({ gender: ['Women'] });
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] hover:text-[#BF8F4A]"
              >
                <span>Women</span>
                <ChevronRight className="w-4 h-4 text-[#8B877F]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({ gender: ['Unisex'] });
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] hover:text-[#BF8F4A]"
              >
                <span>Unisex</span>
                <ChevronRight className="w-4 h-4 text-[#8B877F]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({ sortBy: 'bestselling' });
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] hover:text-[#BF8F4A]"
              >
                <span>Bestsellers</span>
                <ChevronRight className="w-4 h-4 text-[#8B877F]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({ concentration: ['Parfum / Extrait'] });
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] hover:text-[#BF8F4A]"
              >
                <span>Parfum & Extraits</span>
                <ChevronRight className="w-4 h-4 text-[#8B877F]" />
              </button>

              {/* Brands Accordion */}
              <div className="border-b border-[#1A1A1A]">
                <button
                  onClick={() => setMobileBrandsExpanded(!mobileBrandsExpanded)}
                  className="w-full min-h-[44px] flex items-center justify-between py-2 text-left hover:text-[#BF8F4A]"
                >
                  <span>Brands ({BRANDS.length})</span>
                  <ChevronDown className={`w-4 h-4 text-[#8B877F] transition-transform ${mobileBrandsExpanded ? 'rotate-180' : ''}`} />
                </button>

                {mobileBrandsExpanded && (
                  <div className="pl-3 pr-1 pb-3 grid grid-cols-2 gap-2">
                    {BRANDS.map(brand => (
                      <button
                        key={brand.id}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigateToBrand(brand.slug);
                        }}
                        className="p-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] text-left hover:border-[#BF8F4A]"
                      >
                        <span className="font-serif text-xs text-[#F7F3EA] block">
                          {brand.name}
                        </span>
                        <span className="text-[10px] text-[#8B877F] block font-normal mt-0.5 font-sans">
                          {brand.originCountry}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({ sortBy: 'newest' });
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] hover:text-[#BF8F4A]"
              >
                <span>New Arrivals</span>
                <ChevronRight className="w-4 h-4 text-[#8B877F]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateToShop({ onSaleOnly: true });
                }}
                className="w-full min-h-[44px] flex items-center justify-between py-2 text-left border-b border-[#1A1A1A] text-[#BF8F4A]"
              >
                <span>Sale</span>
                <ChevronRight className="w-4 h-4 text-[#BF8F4A]" />
              </button>
            </div>

            {/* Drawer Bottom */}
            <div className="p-4 bg-[#1A1A1A] border-t border-[#2A2A2A]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthenticityModalOpen(true);
                }}
                className="w-full text-left text-xs font-semibold text-[#BF8F4A] hover:text-[#EAD1A6] py-1 uppercase tracking-wider"
              >
                Authenticity Guarantee Charter →
              </button>
            </div>
          </div>

          {/* Close tap outside */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
