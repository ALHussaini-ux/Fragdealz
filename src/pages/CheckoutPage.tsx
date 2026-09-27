import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote,
  Wallet,
  ArrowRight,
  ChevronLeft,
  ShoppingBag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    freeShippingThreshold, 
    navigateToHome, 
    navigateToShop, 
    placeOrder 
  } = useStore();

  // Form State
  const [email, setEmail] = useState('arjun.verma@example.com');
  const [phone, setPhone] = useState('+91 98200 12345');
  const [firstName, setFirstName] = useState('Arjun');
  const [lastName, setLastName] = useState('Verma');
  const [address, setAddress] = useState('Flat 402, Signature Heights, Perry Cross Road');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400050');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallets' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('arjun@okhdfcbank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Success state
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const extraDiscount = couponApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const finalSubtotal = Math.max(0, cartSubtotal - extraDiscount);
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping || cart.length === 0 ? 0 : 149;
  const finalTotal = finalSubtotal + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VAULT10') {
      setCouponApplied(true);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        fullName: `${firstName} ${lastName}`,
        email,
        phone,
        address: `${address}, ${city}, ${state} - ${pincode}`,
        paymentMethod: paymentMethod === 'wallets' ? 'card' : paymentMethod
      });
      setIsSubmitting(false);
      setConfirmedOrderId(order.id);
    }, 1200);
  };

  // If order was successfully placed, display the Order Confirmation view
  if (confirmedOrderId) {
    return (
      <div className="bg-[#F7F3EA] min-h-screen py-12 sm:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 bg-[#0B0B0B] text-[#BF8F4A] flex items-center justify-center mx-auto mb-5 rounded-[2px]">
            <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
          </div>

          <span 
            className="text-[11px] uppercase tracking-[0.15em] text-[#8B877F] font-semibold block mb-1 font-sans"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Order Confirmed
          </span>

          <h1 
            className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0B0B] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Thank you for your order
          </h1>

          <p className="text-xs sm:text-sm text-[#8B877F] mb-8 leading-relaxed font-sans">
            Your fragrance order has been placed successfully. An email confirmation has been sent to <strong className="text-[#0B0B0B] font-semibold">{email}</strong>. Order reference: <strong className="font-mono text-[#BF8F4A]">#{confirmedOrderId}</strong>
          </p>

          {/* Verification Box */}
          <div className="bg-white border border-[#E5DFD5] rounded-[2px] p-6 text-left mb-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#BF8F4A]" />
                <span 
                  className="font-serif text-sm text-[#0B0B0B] font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Order Details
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B877F] font-sans">
                Payment: {paymentMethod.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-[#8B877F] block text-[11px] mb-0.5 font-medium">Recipient</span>
                <span className="text-[#0B0B0B] font-semibold">{firstName} {lastName}</span>
              </div>
              <div>
                <span className="text-[#8B877F] block text-[11px] mb-0.5 font-medium">Delivery Address</span>
                <span className="text-[#0B0B0B]">{address}, {city}</span>
              </div>
              <div>
                <span className="text-[#8B877F] block text-[11px] mb-0.5 font-medium">Estimated Dispatch</span>
                <span className="text-[#0B0B0B] font-semibold">Within 24 Hours</span>
              </div>
              <div>
                <span className="text-[#8B877F] block text-[11px] mb-0.5 font-medium">Courier</span>
                <span className="text-[#0B0B0B]">BlueDart Express (Insured)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center font-sans">
            <button
              onClick={navigateToHome}
              className="min-h-[44px] px-8 py-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors"
            >
              Return Home
            </button>
            <button
              onClick={() => navigateToShop({})}
              className="min-h-[44px] px-8 py-3 bg-transparent hover:bg-[#BF8F4A]/10 text-[#0B0B0B] border border-[#BF8F4A] text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F3EA] min-h-screen py-20 text-center font-sans">
        <div className="max-w-md mx-auto px-4">
          <ShoppingBag className="w-12 h-12 text-[#BF8F4A] mx-auto mb-4 stroke-[1.5]" />
          <h2 
            className="font-serif text-2xl font-bold text-[#0B0B0B] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your Bag Is Empty
          </h2>
          <p className="text-xs text-[#8B877F] mb-6">Please add fragrances to your shopping bag before proceeding to checkout.</p>
          <button
            onClick={() => navigateToShop({})}
            className="min-h-[46px] px-8 py-3.5 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase transition-colors rounded-[2px]"
          >
            Explore Perfumes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Streamlined Mobile Header with Back button */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5] mb-6 font-sans">
          <button
            onClick={() => navigateToShop({})}
            className="inline-flex items-center gap-1.5 text-xs text-[#8B877F] hover:text-[#0B0B0B] uppercase tracking-wider font-semibold transition-colors min-h-[40px]"
          >
            <ChevronLeft className="w-4 h-4 text-[#BF8F4A]" />
            <span>Return to Catalog</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0B0B0B]">
            <Lock className="w-3.5 h-3.5 text-[#BF8F4A]" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Mobile Order Summary Accordion */}
        <div className="bg-white border border-[#E5DFD5] rounded-[2px] mb-6 p-4">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] font-sans"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#BF8F4A]" />
              <span>Order Summary ({cart.reduce((t, i) => t + i.quantity, 0)} Items)</span>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="font-serif text-sm font-bold text-[#0B0B0B]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
              {mobileSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {mobileSummaryOpen && (
            <div className="pt-4 mt-3 border-t border-[#E5DFD5] space-y-3 animate-fadeIn font-sans">
              <div className="divide-y divide-[#E5DFD5] max-h-56 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-2.5 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.thumbnail || item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain bg-[#FAF8F5] border border-[#E5DFD5] p-0.5 rounded-[2px]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-semibold text-[#8B877F] block">{item.product.brand}</span>
                      <span className="font-sans font-medium text-xs text-[#0B0B0B] truncate block">{item.product.name}</span>
                      <span className="text-[11px] text-[#8B877F]">Qty: {item.quantity} • {item.size}</span>
                    </div>
                    <span 
                      className="font-serif text-xs font-bold text-[#0B0B0B]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E5DFD5] space-y-1.5 text-xs text-[#8B877F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0B0B0B]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#0B0B0B]">{isFreeShipping ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SINGLE-COLUMN CHECKOUT FORM */}
        <form onSubmit={handlePlaceOrder} className="space-y-6 font-sans">
          
          {/* Section 1: Contact Details */}
          <div className="bg-white border border-[#E5DFD5] rounded-[2px] p-5 sm:p-7">
            <h2 
              className="font-serif text-base text-[#0B0B0B] font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              1. Contact Information
            </h2>

            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                  Mobile Number (For Courier OTP & Tracking) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white border border-[#E5DFD5] rounded-[2px] p-5 sm:p-7">
            <h2 
              className="font-serif text-base text-[#0B0B0B] font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              2. Delivery Address
            </h2>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px] font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8B877F] font-semibold block mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#E5DFD5] text-sm text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Indian Payment Options */}
          <div className="bg-white border border-[#E5DFD5] rounded-[2px] p-5 sm:p-7">
            <h2 
              className="font-serif text-base text-[#0B0B0B] font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              3. Payment Method
            </h2>

            <div className="space-y-3">
              {/* Option 1: UPI */}
              <label 
                className={`p-3.5 sm:p-4 border rounded-[2px] flex flex-col gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'upi' ? 'border-[#BF8F4A] bg-[#F7F3EA]' : 'border-[#E5DFD5] hover:border-[#BF8F4A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="w-4 h-4 accent-[#BF8F4A]"
                    />
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#BF8F4A]" />
                      <span className="text-xs sm:text-sm font-semibold text-[#0B0B0B]">
                        UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="pt-2 pl-7">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g. yourname@upi)"
                      className="w-full h-10 px-3 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                    />
                  </div>
                )}
              </label>

              {/* Option 2: Cards */}
              <label 
                className={`p-3.5 sm:p-4 border rounded-[2px] flex flex-col gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-[#BF8F4A] bg-[#F7F3EA]' : 'border-[#E5DFD5] hover:border-[#BF8F4A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 accent-[#BF8F4A]"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#BF8F4A]" />
                      <span className="text-xs sm:text-sm font-semibold text-[#0B0B0B]">
                        Credit / Debit Card (Visa, RuPay, Mastercard)
                      </span>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="pt-2 pl-7 space-y-2">
                    <input
                      type="text"
                      placeholder="Card Number"
                      defaultValue="4532 •••• •••• 8821"
                      className="w-full h-10 px-3 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="08/28"
                        className="h-10 px-3 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px]"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="•••"
                        className="h-10 px-3 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px]"
                      />
                    </div>
                  </div>
                )}
              </label>

              {/* Option 3: Net Banking */}
              <label 
                className={`p-3.5 sm:p-4 border rounded-[2px] flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'netbanking' ? 'border-[#BF8F4A] bg-[#F7F3EA]' : 'border-[#E5DFD5] hover:border-[#BF8F4A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="w-4 h-4 accent-[#BF8F4A]"
                  />
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#BF8F4A]" />
                    <span className="text-xs sm:text-sm font-semibold text-[#0B0B0B]">
                      Net Banking (HDFC, ICICI, SBI, Axis)
                    </span>
                  </div>
                </div>
              </label>

              {/* Option 4: Cash on Delivery */}
              <label 
                className={`p-3.5 sm:p-4 border rounded-[2px] flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-[#BF8F4A] bg-[#F7F3EA]' : 'border-[#E5DFD5] hover:border-[#BF8F4A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 accent-[#BF8F4A]"
                  />
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#BF8F4A]" />
                    <span className="text-xs sm:text-sm font-semibold text-[#0B0B0B]">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <div className="pt-2">
            <button
              id="checkout-place-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3.5 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 disabled:opacity-75 rounded-[2px]"
            >
              {isSubmitting ? (
                <span>Processing order...</span>
              ) : (
                <span>Place Order — ₹{finalTotal.toLocaleString('en-IN')}</span>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#8B877F]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#BF8F4A]" />
                Direct Sourced Authenticity Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#BF8F4A]" />
                Insured Dispatch
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
