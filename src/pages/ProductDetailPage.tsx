import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Clock, 
  Wind, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Share2,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { Product, ProductSize } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { 
    activeProductSlug, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateToShop, 
    navigateToBrand,
    setIsCartOpen,
    navigateToCheckout,
    setIsAuthenticityModalOpen,
    navigateToHome
  } = useStore();

  const product = PRODUCTS.find(p => p.slug === activeProductSlug) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.find(s => s.isDefault) || product.sizes[0] || { size: '100ml', price: product.price, mrp: product.mrp, inStock: true }
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'story' | 'authenticity' | 'reviews'>('story');
  const [justAdded, setJustAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIndex(0);
    const def = product.sizes.find(s => s.isDefault) || product.sizes[0];
    if (def) setSelectedSize(def);
    setDeliveryResult(null);
  }, [product.slug]);

  const inWishlist = isInWishlist(product.id);

  // Check pincode handler
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    setPincodeLoading(true);
    setTimeout(() => {
      setPincodeLoading(false);
      setDeliveryResult('Delivers by Tuesday, Oct 24 • Climate-Controlled Dispatch Guaranteed');
    }, 450);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart(product, selectedSize.size, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Express checkout
  const handleBuyNow = () => {
    addToCart(product, selectedSize.size, quantity);
    navigateToCheckout();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewName('');
      setReviewComment('');
    }, 2000);
  };

  // Related products from same brand or same fragrance family
  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.brand === product.brand || p.fragranceFamily.some(f => product.fragranceFamily.includes(f)))
  ).slice(0, 4);

  const imagesList = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-28 md:pb-20">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-[#EDE9E2] bg-white py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-[11px] text-[#5C554D] uppercase tracking-wider overflow-x-auto scrollbar-none whitespace-nowrap">
          <button onClick={navigateToHome} className="hover:text-[#111111] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigateToShop({})} className="hover:text-[#111111] transition-colors">Fragrances</button>
          <span>/</span>
          <button onClick={() => navigateToBrand(product.brand.toLowerCase())} className="hover:text-[#111111] font-semibold text-[#111111]">
            {product.brand}
          </button>
          <span>/</span>
          <span className="text-[#B89B5E] font-medium truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* Main Product Presentation (Mobile-Order Structured) */}
        <div className="bg-white border border-[#EDE9E2] rounded-sm p-4 sm:p-8 lg:p-10 mb-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* 1. PRODUCT GALLERY */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Viewport with Object-Contain & Whitespace */}
              <div className="relative aspect-square w-full bg-white border border-[#EDE9E2] rounded-sm flex items-center justify-center p-6 overflow-hidden">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  {product.isBestseller && (
                    <span className="bg-[#111111] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                      BESTSELLER
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-[#B89B5E] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Wishlist & Share buttons */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-white/95 border border-[#EDE9E2] shadow-xs flex items-center justify-center text-[#5C554D] hover:text-[#111111]"
                    aria-label="Share perfume link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-10 h-10 rounded-full bg-white/95 border border-[#EDE9E2] shadow-xs flex items-center justify-center text-[#111111] hover:text-[#B89B5E]"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#B89B5E] text-[#B89B5E]' : ''}`} />
                  </button>
                </div>

                {/* The Flacon Image */}
                <img
                  src={imagesList[selectedImageIndex]}
                  alt={`${product.brand} ${product.name}`}
                  className="w-full h-full object-contain object-center transition-all duration-300"
                />
              </div>

              {/* Thumbnail selector */}
              {imagesList.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 p-1.5 bg-white border rounded-sm transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#111111] ring-1 ring-[#111111]'
                          : 'border-[#EDE9E2] hover:border-[#B89B5E]'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT ESSENTIAL DETAILS & PURCHASE CONTROLS */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* 2. Brand */}
                <button
                  onClick={() => navigateToBrand(product.brand.toLowerCase())}
                  className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#B89B5E] hover:underline block mb-1 text-left"
                >
                  {product.brand}
                </button>

                {/* 3. Product Name */}
                <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-2 leading-tight">
                  {product.name}
                </h1>

                {/* 4. Rating / Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  {product.reviewCount > 0 ? (
                    <>
                      <div className="flex text-[#B89B5E]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-[#111111]">{product.rating}</span>
                      <span className="text-xs text-[#777777]">
                        ({product.reviewCount} Reviews)
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-[#777777]">
                      No reviews yet • Genuine verified purchase reviews welcome
                    </span>
                  )}
                </div>

                {/* 5. Price, 6. Discount & MRP */}
                <div className="p-4 bg-[#FAF9F6] border border-[#EDE9E2] rounded-sm mb-6 flex items-baseline justify-between flex-wrap gap-2">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
                      ₹{selectedSize.price.toLocaleString('en-IN')}
                    </span>
                    {selectedSize.mrp > selectedSize.price && (
                      <span className="text-sm text-[#5C554D] line-through">
                        MRP ₹{selectedSize.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <span className="text-xs font-bold text-[#B89B5E] bg-[#B89B5E]/15 border border-[#B89B5E]/30 px-2 py-0.5 rounded">
                      SAVE {product.discount}% • INCL. OF ALL TAXES
                    </span>
                  )}
                </div>

                {/* 7. Size Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                      Select Bottle Size
                    </span>
                    <span className="text-[11px] text-[#5C554D]">
                      Concentration: <strong className="text-[#111111]">{product.concentration}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s)}
                        className={`min-h-[44px] px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all rounded-xs ${
                          selectedSize.size === s.size
                            ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                            : 'border-[#EDE9E2] bg-[#FAF9F6] text-[#111111] hover:border-[#B89B5E]'
                        }`}
                      >
                        {s.size} — ₹{s.price.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8. Stock Status */}
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 p-2.5 rounded-sm mb-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>In Stock — Dispatches within 24 hours in temperature-controlled packaging</span>
                </div>

                {/* 9. Delivery / Pincode Checker */}
                <div className="p-3.5 sm:p-4 bg-[#FAF9F6] border border-[#EDE9E2] rounded-sm mb-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#B89B5E]" />
                      Estimate Delivery & Availability
                    </span>
                  </div>
                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit PIN code..."
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-3 py-2 bg-white border border-[#EDE9E2] text-xs text-[#111111] focus:outline-none focus:border-[#B89B5E] rounded-xs"
                    />
                    <button
                      type="submit"
                      className="min-h-[40px] px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B89B5E] transition-colors shrink-0 rounded-xs"
                    >
                      {pincodeLoading ? 'Checking...' : 'Check'}
                    </button>
                  </form>
                  {deliveryResult && (
                    <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded mt-2 animate-fadeIn flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{deliveryResult}</span>
                    </p>
                  )}
                </div>

                {/* 10. Add to Cart & 11. Buy Now Buttons */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper (min 44px height) */}
                    <div className="flex items-center border border-[#EDE9E2] bg-[#FAF9F6] rounded-xs h-12">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-11 h-full flex items-center justify-center text-sm font-bold text-[#111111] hover:bg-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-[#111111]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-11 h-full flex items-center justify-center text-sm font-bold text-[#111111] hover:bg-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart button */}
                    <button
                      id="pdp-add-to-cart-btn"
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-[#111111] hover:bg-[#B89B5E] text-white text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-sm rounded-xs"
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED TO BAG</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>ADD TO CART</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Buy Now (Express Checkout) */}
                  <button
                    id="pdp-buy-now-btn"
                    onClick={handleBuyNow}
                    className="w-full h-12 bg-[#B89B5E] hover:bg-[#a3874c] text-[#111111] text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-md rounded-xs"
                  >
                    <span>BUY IT NOW (EXPRESS CHECKOUT)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5C554D]">
                  <div 
                    onClick={() => setIsAuthenticityModalOpen(true)}
                    className="flex items-center gap-2 p-2.5 bg-[#FAF9F6] border border-[#EDE9E2] rounded cursor-pointer hover:border-[#B89B5E]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#B89B5E] shrink-0" />
                    <span>100% Genuine with Verifiable Batch Code</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-[#FAF9F6] border border-[#EDE9E2] rounded">
                    <ThermometerSnowflake className="w-4 h-4 text-[#B89B5E] shrink-0" />
                    <span>Climate-Controlled Vault Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 12. Description, 13. Fragrance Notes & 14. Perfume Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Scent Description & Fragrance Pyramid (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#EDE9E2] rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B5E] font-bold block mb-1">
                Olfactory Composition
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                THE FRAGRANCE PYRAMID
              </h3>
              <p className="text-xs sm:text-sm text-[#5C554D] mt-2 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Pyramid Notes Visual Cards */}
            {(product.notes.top.length > 0 || product.notes.heart.length > 0 || product.notes.base.length > 0) ? (
              <div className="space-y-3 pt-2">
                {product.notes.top.length > 0 && (
                  <div className="p-4 bg-[#FAF9F6] border border-[#EDE9E2]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] uppercase tracking-wider font-medium text-[#111111]">
                        Top Notes
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.notes.top.map((note, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white border border-[#EDE9E2] text-xs text-[#111111]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.notes.heart.length > 0 && (
                  <div className="p-4 bg-[#FAF9F6] border border-[#EDE9E2]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] uppercase tracking-wider font-medium text-[#111111]">
                        Heart Notes
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.notes.heart.map((note, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white border border-[#EDE9E2] text-xs text-[#111111]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.notes.base.length > 0 && (
                  <div className="p-4 bg-[#FAF9F6] border border-[#EDE9E2]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] uppercase tracking-wider font-medium text-[#111111]">
                        Base Notes
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.notes.base.map((note, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white border border-[#EDE9E2] text-xs text-[#111111]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-[#FAF9F6] border border-[#EDE9E2] text-xs text-[#777777] leading-relaxed">
                Full bottle presentation imported with original manufacturer cellophane seal and verifiable batch code.
              </div>
            )}
          </div>

          {/* 14. Perfume Details / Product Specifications (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#EDE9E2] rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B5E] font-bold block mb-1">
                Authentic Specifications
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                PRODUCT DETAILS
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              {/* Longevity & Sillage info if available */}
              {product.longevity && (
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE9E2]">
                  <span className="flex items-center gap-1.5 text-[#5C554D]">
                    <Clock className="w-3.5 h-3.5 text-[#B89B5E]" />
                    Reported Longevity
                  </span>
                  <span className="text-[#111111] font-medium">{product.longevity}</span>
                </div>
              )}

              {product.sillage && (
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE9E2]">
                  <span className="flex items-center gap-1.5 text-[#5C554D]">
                    <Wind className="w-3.5 h-3.5 text-[#B89B5E]" />
                    Sillage & Projection
                  </span>
                  <span className="text-[#111111] font-medium">{product.sillage}</span>
                </div>
              )}

              {/* Origin & Details Grid */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#FAF9F6] border border-[#EDE9E2] rounded">
                  <span className="text-[10px] uppercase font-bold text-[#5C554D] block mb-0.5">Country of Origin</span>
                  <span className="font-serif font-bold text-sm text-[#111111]">{product.countryOfOrigin}</span>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#EDE9E2] rounded">
                  <span className="text-[10px] uppercase font-bold text-[#5C554D] block mb-0.5">Concentration</span>
                  <span className="font-serif font-bold text-sm text-[#111111]">{product.concentration}</span>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#EDE9E2] rounded">
                  <span className="text-[10px] uppercase font-bold text-[#5C554D] block mb-0.5">Gender</span>
                  <span className="font-serif font-bold text-sm text-[#111111]">{product.gender}</span>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#EDE9E2] rounded">
                  <span className="text-[10px] uppercase font-bold text-[#5C554D] block mb-0.5">Batch Code</span>
                  <span className="font-mono font-bold text-xs text-[#111111]">Verifiable Original</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 15. Reviews Section */}
        <div className="bg-white border border-[#EDE9E2] rounded-sm p-6 sm:p-10 mb-12 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE9E2] mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#777777] font-medium block mb-1">
                Customer Feedback
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111]">
                Customer Reviews ({product.reviewCount})
              </h3>
            </div>
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-1 text-[#B89B5E]">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-serif font-bold text-xl text-[#111111]">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Review Submission Form */}
          <div className="p-4 sm:p-6 bg-[#FAF9F6] border border-[#EDE9E2] rounded-sm mb-6">
            <h4 className="font-serif text-base font-bold text-[#111111] mb-2">
              Add Your Verified Review
            </h4>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="p-2.5 bg-white border border-[#EDE9E2] text-xs text-[#111111] focus:outline-none focus:border-[#B89B5E]"
                />
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="p-2.5 bg-white border border-[#EDE9E2] text-xs text-[#111111] focus:outline-none focus:border-[#B89B5E]"
                >
                  <option value={5}>5 Stars - Outstanding Projection</option>
                  <option value={4}>4 Stars - Great Scent Profile</option>
                  <option value={3}>3 Stars - Average Longevity</option>
                </select>
              </div>
              <textarea
                required
                rows={3}
                placeholder="Describe the opening, projection, and occasion you wear this fragrance for..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#EDE9E2] text-xs text-[#111111] focus:outline-none focus:border-[#B89B5E]"
              />
              <button
                type="submit"
                className="min-h-[44px] px-6 py-2.5 bg-[#111111] hover:bg-[#B89B5E] text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-xs"
              >
                Submit Verified Review
              </button>
              {reviewSubmitted && (
                <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded animate-fadeIn">
                  Thank you! Your verified flacon review has been recorded.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 16. Related Products (2 columns on mobile, 4 on desktop) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
              YOU MAY ALSO LIKE
            </h3>
            <button
              onClick={() => navigateToShop({})}
              className="text-xs uppercase tracking-wider font-bold text-[#111111] hover:text-[#B89B5E] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STICKY MOBILE PURCHASE BAR (CRITICAL USER MANDATE) */}
      {/* ========================================================================= */}
      <div 
        id="sticky-mobile-purchase-bar"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#EDE9E2] px-4 py-2.5 pb-[max(12px,env(safe-area-inset-bottom))] shadow-2xl flex items-center justify-between gap-3 animate-slideUp"
      >
        {/* Price & Selected Size */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-bold text-[#111111]">
              ₹{selectedSize.price.toLocaleString('en-IN')}
            </span>
            {selectedSize.mrp > selectedSize.price && (
              <span className="text-[10px] text-[#5C554D] line-through">
                ₹{selectedSize.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-[#B89B5E] uppercase tracking-wider">
            {selectedSize.size} • In Stock
          </span>
        </div>

        {/* Action Buttons (min 44px touch targets) */}
        <div className="flex items-center gap-2 flex-1 max-w-[240px]">
          <button
            onClick={handleAddToCart}
            className="flex-1 min-h-[44px] py-2.5 px-2 bg-[#111111] active:bg-[#B89B5E] text-white text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1 rounded-xs transition-colors shadow-xs"
          >
            {justAdded ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
            <span>{justAdded ? 'Added' : 'Add'}</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 min-h-[44px] py-2.5 px-2 bg-[#B89B5E] active:bg-[#a3874c] text-[#111111] text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1 rounded-xs transition-colors shadow-md"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
