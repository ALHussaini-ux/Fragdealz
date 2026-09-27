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
  const defaultSize = product.selectedDefaultSize || product.sizes?.[0]?.size || '100ml';

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

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => navigateToProduct(product.slug)}
      className="group relative flex flex-col bg-white border border-[#E5DFD5] hover:border-[#BF8F4A] rounded-[2px] transition-colors duration-200 cursor-pointer overflow-hidden"
    >
      {/* 1. Product Image on Clean Neutral Ivory Background */}
      <div className="relative aspect-square w-full bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-5 overflow-hidden">
        {/* Wishlist button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center text-[#8B877F] hover:text-[#0B0B0B] transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-[#BF8F4A] text-[#BF8F4A]' : 'text-[#8B877F] hover:text-[#BF8F4A]'
            }`}
          />
        </button>

        {/* Product Bottle Image */}
        <img
          src={primaryImage}
          alt={`${product.brand} — ${product.name}`}
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-102"
        />
      </div>

      {/* 2. Structured Product Information (Strict Top-to-Bottom Order) */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white border-t border-[#F0EBE1]">
        <div>
          {/* Brand Name (small, warm gray, uppercase) */}
          <span className="text-[11px] font-sans uppercase tracking-[0.1em] text-[#8B877F] font-medium block mb-1 truncate">
            {product.brand}
          </span>

          {/* Product Name + Size (Inter, medium weight, formatted: Brand — Product Name, Size) */}
          <h3 
            className="font-sans text-[14px] sm:text-[15px] font-medium text-[#0B0B0B] leading-snug line-clamp-2 min-h-[38px] mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {product.brand} — {product.name}, {defaultSize}
          </h3>

          {/* Hero Price (Playfair Display, bold) + Muted MRP */}
          <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
            <span 
              className="font-serif text-lg sm:text-xl font-bold text-[#0B0B0B]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="font-sans text-xs text-[#8B877F] line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Optional Discount / Offer Badge */}
          {product.discount >= 10 ? (
            <div className="mb-3">
              <span className="inline-block bg-[#1A1A1A] text-[#EAD1A6] text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px]">
                {product.discount}% Off
              </span>
            </div>
          ) : (
            <div className="mb-3">
              <span className="text-[11px] font-sans text-emerald-800 font-medium">
                In Stock • Sealed Flacon
              </span>
            </div>
          )}
        </div>

        {/* Primary CTA: FragDealz Gold (#BF8F4A) with Obsidian Black Text & 2px radius */}
        <div className="pt-2">
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            className="w-full min-h-[42px] py-2.5 px-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] font-sans text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors flex items-center justify-center gap-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
