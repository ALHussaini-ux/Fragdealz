import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartMrpTotal, 
    cartDiscount,
    freeShippingThreshold, 
    amountNeededForFreeShipping,
    navigateToCheckout,
    navigateToShop,
    addToCart
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'FRAGDEALZ10' || code === 'VAULT10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "FRAGDEALZ10" for 10% off.');
    }
  };

  const extraDiscount = couponApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const finalSubtotal = Math.max(0, cartSubtotal - extraDiscount);
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping || cart.length === 0 ? 0 : 149;
  const finalTotal = finalSubtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)} 
        className="absolute inset-0 bg-black/70 transition-opacity animate-fadeIn"
      />

      {/* Drawer Panel: Full screen on mobile, right-docked on desktop */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E5DFD5] animate-slideLeft">
          
          {/* 1. Header in Obsidian Black */}
          <div className="p-4 sm:p-5 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0B0B0B] text-[#F7F3EA]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#BF8F4A] stroke-[1.5]" />
              <h2 
                className="font-serif text-base sm:text-lg font-bold text-[#F7F3EA]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Shopping Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-[#8B877F] hover:text-[#F7F3EA] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* 2. Free Shipping Progress Bar */}
          <div className="px-4 py-3 bg-[#F7F3EA] border-b border-[#E5DFD5] font-sans">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#BF8F4A]" />
                <span className="text-[#0B0B0B]">
                  {isFreeShipping ? (
                    <span className="text-emerald-800 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Free Delivery Unlocked
                    </span>
                  ) : (
                    <span>Add ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} more for free delivery</span>
                  )}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#8B877F]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-[#E5DFD5] overflow-hidden rounded-full">
              <div 
                className="h-full bg-[#BF8F4A] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 3. Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#E5DFD5] font-sans">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-[2px] bg-[#F7F3EA] border border-[#E5DFD5] flex items-center justify-center mx-auto mb-4 text-[#BF8F4A]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 
                  className="font-serif text-xl font-bold text-[#0B0B0B] mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#8B877F] mb-6 max-w-xs mx-auto">
                  Discover authentic designer and Middle Eastern fragrances ready for direct dispatch.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToShop({});
                  }}
                  className="min-h-[44px] px-8 py-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase transition-colors rounded-[2px]"
                >
                  Explore Bestsellers
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${index}`} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Square Contain Image */}
                  <div className="w-20 h-20 bg-[#FAF8F5] border border-[#E5DFD5] rounded-[2px] p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.thumbnail || item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8B877F] font-semibold block">
                            {item.product.brand}
                          </span>
                          <h4 className="font-sans font-medium text-xs sm:text-sm text-[#0B0B0B] line-clamp-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="w-7 h-7 flex items-center justify-center text-[#8B877F] hover:text-[#0B0B0B] transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#8B877F] font-medium block mt-0.5">
                        Size: <strong className="text-[#0B0B0B] font-semibold">{item.size}</strong> • {item.product.concentration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-[#E5DFD5] rounded-[2px] bg-[#F7F3EA]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-[#0B0B0B] hover:bg-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#0B0B0B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-[#0B0B0B] hover:bg-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span 
                          className="font-serif text-sm font-bold text-[#0B0B0B]"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Order Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E5DFD5] bg-[#F7F3EA] space-y-3 pb-[max(16px,env(safe-area-inset-bottom))] font-sans">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (Try: FRAGDEALZ10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] uppercase focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                />
                <button
                  type="submit"
                  className="min-h-[40px] px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F7F3EA] text-xs font-semibold uppercase tracking-wider transition-colors rounded-[2px]"
                >
                  Apply
                </button>
              </form>

              {couponError && (
                <p className="text-[11px] text-red-600">{couponError}</p>
              )}
              {couponApplied && (
                <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#BF8F4A]" />
                  Code applied (10% Off)
                </p>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#8B877F] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0B0B0B]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Voucher Discount (10%)</span>
                    <span>-₹{extraDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Climate-Controlled Shipping</span>
                  <span className="font-semibold text-[#0B0B0B]">
                    {isFreeShipping ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B0B0B] pt-2 border-t border-[#E5DFD5]">
                  <span>Total Amount</span>
                  <span 
                    className="font-serif text-base font-bold text-[#0B0B0B]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Primary Button: FragDealz Gold with Obsidian Black text */}
              <button
                id="cart-drawer-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateToCheckout();
                }}
                className="w-full min-h-[48px] py-3.5 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-[2px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>Checkout — ₹{finalTotal.toLocaleString('en-IN')}</span>
              </button>

              <div className="text-[10px] text-center text-[#8B877F] flex items-center justify-center gap-2 pt-1 font-sans">
                <span>100% Genuine</span>
                <span>•</span>
                <span>Direct Authorized Importers</span>
                <span>•</span>
                <span>Secure Payment</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
