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
    if (couponCode.trim().toUpperCase() === 'VAULT10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "VAULT10" for 10% off.');
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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Drawer Panel: Full screen on mobile, right-docked on desktop */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDE9E2] animate-slideLeft">
          
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8E5DF] flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
              <h2 className="font-serif text-base sm:text-lg text-[#111111] font-normal">
                Shopping Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-[#777777] hover:text-[#111111] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Progress Bar */}
          <div className="px-4 py-3 bg-white border-b border-[#E8E5DF]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#111111]" />
                <span className="text-[#111111]">
                  {isFreeShipping ? (
                    <span className="text-emerald-700 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Free Delivery Unlocked
                    </span>
                  ) : (
                    <span>Add ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} more for free delivery</span>
                  )}
                </span>
              </div>
              <span className="text-[11px] text-[#777777]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-[#F1EFEA] overflow-hidden">
              <div 
                className="h-full bg-[#111111] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 3. Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#EDE9E2]/60">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#EDE9E2] flex items-center justify-center mx-auto mb-4 text-[#5C554D]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#5C554D] mb-6 max-w-xs mx-auto">
                  Discover authentic designer and Middle Eastern fragrances ready for direct dispatch.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToShop({});
                  }}
                  className="min-h-[44px] px-6 py-3 bg-[#111111] hover:bg-[#B89B5E] text-white text-xs font-bold tracking-widest uppercase transition-colors rounded-xs"
                >
                  Explore Bestsellers
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${index}`} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Square Contain Image */}
                  <div className="w-20 h-20 bg-white border border-[#EDE9E2] rounded-xs p-1 flex items-center justify-center shrink-0">
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
                          <span className="text-[10px] uppercase tracking-wider text-[#5C554D] font-bold block">
                            {item.product.brand}
                          </span>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#111111] line-clamp-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="w-8 h-8 flex items-center justify-center text-[#5C554D] hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#5C554D] font-medium block mt-0.5">
                        Size: <strong className="text-[#111111]">{item.size}</strong> • {item.product.concentration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity buttons (min 36px) */}
                      <div className="flex items-center border border-[#EDE9E2] rounded-xs bg-[#FAF9F6]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#111111] hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#111111] hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-[#111111]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Order Summary & Easy-to-Reach Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EDE9E2] bg-[#FAF9F6] space-y-3 pb-[max(16px,env(safe-area-inset-bottom))]">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (Try: VAULT10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-[#EDE9E2] text-xs text-[#111111] uppercase focus:outline-none focus:border-[#B89B5E] rounded-xs"
                />
                <button
                  type="submit"
                  className="min-h-[40px] px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B89B5E] transition-colors rounded-xs"
                >
                  Apply
                </button>
              </form>

              {couponError && (
                <p className="text-[11px] text-red-600">{couponError}</p>
              )}
              {couponApplied && (
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Code VAULT10 applied (10% Off)
                </p>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C554D] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111111]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount (10%)</span>
                    <span>-₹{extraDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Climate-Controlled Shipping</span>
                  <span className="font-semibold text-[#111111]">
                    {isFreeShipping ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#EDE9E2]">
                  <span>Total Amount</span>
                  <span className="font-serif text-base font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Prominent, easy-to-reach CHECKOUT button (min 48px height) */}
              <button
                id="cart-drawer-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateToCheckout();
                }}
                className="w-full min-h-[48px] py-3.5 bg-[#111111] hover:bg-[#262626] text-white text-xs font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>Checkout — ₹{finalTotal.toLocaleString('en-IN')}</span>
              </button>

              <div className="text-[10px] text-center text-[#777777] flex items-center justify-center gap-2 pt-1">
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
