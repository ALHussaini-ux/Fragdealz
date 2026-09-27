import React from 'react';
import { Home, Compass, Search, Heart, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    currentView, 
    navigateToHome, 
    navigateToShop, 
    setIsSearchOpen,
    setIsWishlistOpen, 
    setIsAccountOpen,
    wishlist
  } = useStore();

  // On Product Detail Page, the dedicated sticky purchase bar takes priority at the bottom of the screen
  if (currentView === 'product') {
    return null;
  }

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0B0B] border-t border-[#1A1A1A] px-2 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] flex items-center justify-around text-[#F7F3EA]"
    >
      {/* 1. HOME */}
      <button
        onClick={navigateToHome}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 transition-colors ${
          currentView === 'home' ? 'text-[#BF8F4A]' : 'text-[#8B877F] hover:text-[#F7F3EA]'
        }`}
        aria-label="Home"
      >
        <Home className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-[0.1em] uppercase font-semibold mt-1 font-['Inter']">
          Home
        </span>
      </button>

      {/* 2. SHOP */}
      <button
        onClick={() => navigateToShop({})}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 transition-colors ${
          currentView === 'shop' || currentView === 'brand' ? 'text-[#BF8F4A]' : 'text-[#8B877F] hover:text-[#F7F3EA]'
        }`}
        aria-label="Shop Catalog"
      >
        <Compass className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-[0.1em] uppercase font-semibold mt-1 font-['Inter']">
          Shop
        </span>
      </button>

      {/* 3. SEARCH */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 text-[#8B877F] hover:text-[#BF8F4A] transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-[0.1em] uppercase font-semibold mt-1 font-['Inter']">
          Search
        </span>
      </button>

      {/* 4. WISHLIST */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="relative flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 text-[#8B877F] hover:text-[#BF8F4A] transition-colors"
        aria-label="Wishlist"
      >
        <div className="relative">
          <Heart className="w-5 h-5 stroke-[1.5]" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#BF8F4A] text-[#0B0B0B] text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-[0.1em] uppercase font-semibold mt-1 font-['Inter']">
          Wishlist
        </span>
      </button>

      {/* 5. ACCOUNT */}
      <button
        onClick={() => setIsAccountOpen(true)}
        className="flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 text-[#8B877F] hover:text-[#BF8F4A] transition-colors"
        aria-label="Account"
      >
        <User className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-[0.1em] uppercase font-semibold mt-1 font-['Inter']">
          Account
        </span>
      </button>
    </nav>
  );
};
