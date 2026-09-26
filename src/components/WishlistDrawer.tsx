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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDE9E2] animate-slideLeft">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8E5DF] flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#111111]" />
              <h2 className="font-serif text-base sm:text-lg text-[#111111] font-normal">
                Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-[#777777] hover:text-[#111111] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-[#777777]">
                  <Heart className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#111111] mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#777777] mb-6 max-w-xs mx-auto">
                  Save fragrances you are considering to compare or purchase later.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigateToShop({});
                  }}
                  className="px-6 py-3 bg-[#111111] hover:bg-[#262626] text-white text-xs font-medium tracking-widest uppercase transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-[#E8E5DF]">
                  <span className="text-xs text-[#777777]">{wishlist.length} saved</span>
                  <button
                    onClick={handleMoveAllToCart}
                    className="text-xs text-[#111111] font-medium uppercase tracking-wider hover:underline"
                  >
                    Move All To Bag
                  </button>
                </div>

                <div className="space-y-4 divide-y divide-[#E8E5DF]">
                  {wishlist.map(product => (
                    <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                      <div 
                        onClick={() => {
                          setIsWishlistOpen(false);
                          navigateToProduct(product.slug);
                        }}
                        className="w-20 h-24 bg-[#FAF9F6] border border-[#E8E5DF] p-1.5 flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-contain" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[10px] uppercase font-medium text-[#777777] tracking-wider">
                                {product.brand}
                              </p>
                              <h4 
                                onClick={() => {
                                  setIsWishlistOpen(false);
                                  navigateToProduct(product.slug);
                                }}
                                className="font-serif text-sm font-normal text-[#111111] cursor-pointer hover:underline"
                              >
                                {product.name}
                              </h4>
                              <span className="text-[11px] text-[#777777]">
                                {product.concentration} • {product.selectedDefaultSize}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-[#777777] hover:text-red-600 transition-colors p-1"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-medium text-sm text-[#111111]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => moveToCartFromWishlist(product)}
                            className="px-3 py-1.5 bg-[#111111] hover:bg-[#262626] text-white text-[10px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
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
