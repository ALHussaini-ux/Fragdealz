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
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E5DF] px-2 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] flex items-center justify-around text-[#111111]"
    >
      {/* 1. HOME */}
      <button
        onClick={navigateToHome}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 transition-colors ${
          currentView === 'home' ? 'text-[#111111]' : 'text-[#777777] hover:text-[#111111]'
        }`}
        aria-label="Home"
      >
        <Home className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
          Home
        </span>
      </button>

      {/* 2. SHOP */}
      <button
        onClick={() => navigateToShop({})}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 transition-colors ${
          currentView === 'shop' || currentView === 'brand' ? 'text-[#111111]' : 'text-[#777777] hover:text-[#111111]'
        }`}
        aria-label="Shop Catalog"
      >
        <Compass className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
          Shop
        </span>
      </button>

      {/* 3. SEARCH */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 text-[#777777] hover:text-[#111111] transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
          Search
        </span>
      </button>

      {/* 4. WISHLIST */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="relative flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 text-[#777777] hover:text-[#111111] transition-colors"
        aria-label="Wishlist"
      >
        <div className="relative">
          <Heart className="w-5 h-5 stroke-[1.5]" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#111111] text-white text-[9px] font-medium rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
          Wishlist
        </span>
      </button>

      {/* 5. ACCOUNT */}
      <button
        onClick={() => setIsAccountOpen(true)}
        className="flex-1 min-h-[44px] flex flex-col items-center justify-center p-1 text-[#777777] hover:text-[#111111] transition-colors"
        aria-label="Account"
      >
        <User className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
          Account
        </span>
      </button>
    </nav>
  );
};
