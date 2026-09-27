import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    moveToCartFromWishlist,
    navigateToProduct,
    navigateToShop 
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach(p => {
      moveToCartFromWishlist(p);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsWishlistOpen(false)} 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#1A1A1A] animate-slideLeft">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0B0B0B]">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#BF8F4A] fill-[#BF8F4A]/20" />
              <h2 className="font-['Playfair_Display'] text-base sm:text-lg text-[#F7F3EA] font-medium tracking-wide">
                Saved Fragrances ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-[#8B877F] hover:text-[#BF8F4A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#F7F3EA]/30">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 bg-[#0B0B0B] text-[#BF8F4A] flex items-center justify-center mx-auto mb-4 rounded-[2px]">
                  <Heart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-lg font-medium text-[#0B0B0B] mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#8B877F] mb-6 max-w-xs mx-auto font-['Inter'] leading-relaxed">
                  Save fragrances you are considering to compare or purchase later.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigateToShop({});
                  }}
                  className="px-6 py-3 bg-[#BF8F4A] hover:bg-[#a87d3f] text-[#0B0B0B] text-xs font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-colors"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5]">
                  <span className="text-xs text-[#8B877F] font-['Inter']">{wishlist.length} saved</span>
                  <button
                    onClick={handleMoveAllToCart}
                    className="text-xs text-[#0B0B0B] font-semibold uppercase tracking-wider hover:text-[#BF8F4A] transition-colors"
                  >
                    Move All To Bag
                  </button>
                </div>

                <div className="space-y-3">
                  {wishlist.map(product => (
                    <div key={product.id} className="bg-white border border-[#E5DFD5] p-3 rounded-[2px] flex gap-3.5">
                      <div 
                        onClick={() => {
                          setIsWishlistOpen(false);
                          navigateToProduct(product.slug);
                        }}
                        className="w-20 h-24 bg-[#F7F3EA]/50 border border-[#E5DFD5]/60 p-1.5 flex items-center justify-center shrink-0 cursor-pointer rounded-[2px]"
                      >
                        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-contain" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <p className="text-[10px] uppercase font-semibold text-[#8B877F] tracking-[0.1em]">
                                {product.brand}
                              </p>
                              <h4 
                                onClick={() => {
                                  setIsWishlistOpen(false);
                                  navigateToProduct(product.slug);
                                }}
                                className="font-['Playfair_Display'] text-sm font-medium text-[#0B0B0B] cursor-pointer hover:text-[#BF8F4A] transition-colors"
                              >
                                {product.name}
                              </h4>
                              <span className="text-[11px] text-[#8B877F] font-['Inter']">
                                {product.concentration} • {product.selectedDefaultSize}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-[#8B877F] hover:text-red-600 transition-colors p-1"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E5DFD5]/40">
                          <span className="font-['Playfair_Display'] font-bold text-sm text-[#0B0B0B]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => moveToCartFromWishlist(product)}
                            className="px-3 py-1.5 bg-[#BF8F4A] hover:bg-[#a87d3f] text-[#0B0B0B] text-[10px] font-semibold uppercase tracking-[0.1em] rounded-[2px] transition-colors flex items-center gap-1.5"
                          >
                            <ShoppingBag className="w-3 h-3 text-[#0B0B0B]" />
                            <span>Move To Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
