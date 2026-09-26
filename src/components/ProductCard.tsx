import React, { useState } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigateToProduct } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const primaryImage = product.images[0] || product.thumbnail;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Badge determination - minimal, restrained
  const badgeText = product.isBestseller
    ? 'Bestseller'
    : product.isNew
    ? 'New'
    : product.discount >= 20
    ? `${product.discount}% Off`
    : null;

  const hasReviews = product.reviewCount > 0 && product.rating > 0;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => navigateToProduct(product.slug)}
      className="group relative flex flex-col bg-white border border-[#E8E5DF] hover:border-[#111111] transition-colors duration-200 cursor-pointer"
    >
      {/* 1. Large High-Quality Square Product Image */}
      <div className="relative aspect-square w-full bg-[#FAF9F6] flex items-center justify-center p-4 sm:p-5 overflow-hidden">
        {/* Minimalist Badge in top-left */}
        {badgeText && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-block bg-[#111111] text-white text-[10px] uppercase font-medium tracking-wider px-2 py-0.5">
              {badgeText}
            </span>
          </div>
        )}

        {/* Minimal Wishlist button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center text-[#111111] hover:text-black transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-[#111111] text-[#111111]' : 'text-[#777777] hover:text-[#111111]'
            }`}
          />
        </button>

        {/* Product Bottle Image */}
        <img
          src={primaryImage}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-102"
        />

        {/* Desktop Quick Add overlay */}
        <div className="hidden md:flex absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleAddToCart}
            className="w-full py-2.5 px-3 bg-[#111111] hover:bg-[#262626] text-white text-[11px] font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Product Information Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white border-t border-[#E8E5DF]">
        <div>
          {/* Brand */}
          <span className="text-[11px] uppercase tracking-wider text-[#777777] font-medium block mb-1 truncate">
            {product.brand}
          </span>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-[15px] font-normal leading-snug text-[#111111] line-clamp-2 min-h-[38px]">
            {product.name}
          </h3>

          {/* Availability / Status */}
          <div className="flex items-center gap-2 mt-1.5 mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              In Stock
            </span>
            {hasReviews && (
              <span className="text-[11px] text-[#777777]">
                ★ {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-2 border-t border-[#F1EFEA]">
          {/* Price, MRP, Discount */}
          <div className="flex items-baseline gap-2 flex-wrap mb-2.5">
            <span className="text-sm sm:text-[15px] font-medium text-[#111111]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-[#777777] line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-[11px] text-[#111111] font-medium">
                ({product.discount}% off)
              </span>
            )}
          </div>

          {/* Mobile Direct Add to Cart Button */}
          <button
            id={`mobile-add-${product.id}`}
            onClick={handleAddToCart}
            className="w-full md:hidden min-h-[42px] py-2 px-3 bg-[#111111] active:bg-[#262626] text-white text-[11px] font-medium tracking-widest uppercase flex items-center justify-center gap-2 transition-colors"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
