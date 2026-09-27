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
    <div className="bg-[#F7F3EA] min-h-screen pb-28 md:pb-20">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-[#E5DFD5] bg-white py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-[11px] text-[#8B877F] uppercase tracking-wider overflow-x-auto scrollbar-none whitespace-nowrap font-sans">
          <button onClick={navigateToHome} className="hover:text-[#0B0B0B] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigateToShop({})} className="hover:text-[#0B0B0B] transition-colors">Fragrances</button>
          <span>/</span>
          <button onClick={() => navigateToBrand(product.brand.toLowerCase())} className="hover:text-[#0B0B0B] font-medium text-[#0B0B0B]">
            {product.brand}
          </button>
          <span>/</span>
          <span className="text-[#BF8F4A] font-medium truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Main Product Presentation (Mobile-Order Structured) */}
        <div className="bg-white border border-[#E5DFD5] rounded-[2px] p-5 sm:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* 1. PRODUCT GALLERY */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Viewport with Object-Contain & Neutral Backdrop */}
              <div className="relative aspect-square w-full bg-[#FAF8F5] border border-[#E5DFD5] rounded-[2px] flex items-center justify-center p-6 overflow-hidden">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {product.isBestseller && (
                    <span className="bg-[#0B0B0B] text-[#EAD1A6] text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-[2px]">
                      Bestseller
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-[#1A1A1A] text-[#BF8F4A] border border-[#2A2A2A] text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-[2px]">
                      {product.discount}% Off
                    </span>
                  )}
                </div>

                {/* Wishlist & Share buttons */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="w-9 h-9 rounded-[2px] bg-white border border-[#E5DFD5] flex items-center justify-center text-[#8B877F] hover:text-[#0B0B0B] transition-colors"
                    aria-label="Share perfume link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-[#BF8F4A]" /> : <Share2 className="w-4 h-4 stroke-[1.5]" />}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-9 h-9 rounded-[2px] bg-white border border-[#E5DFD5] flex items-center justify-center text-[#8B877F] hover:text-[#BF8F4A] transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 stroke-[1.5] ${inWishlist ? 'fill-[#BF8F4A] text-[#BF8F4A]' : 'text-[#8B877F]'}`} />
                  </button>
                </div>

                {/* The Flacon Image */}
                <img
                  src={imagesList[selectedImageIndex]}
                  alt={`${product.brand} — ${product.name}`}
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
                      className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 p-1.5 bg-[#FAF8F5] border rounded-[2px] transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#0B0B0B] ring-1 ring-[#0B0B0B]'
                          : 'border-[#E5DFD5] hover:border-[#BF8F4A]'
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
                  className="text-xs uppercase tracking-[0.15em] font-medium text-[#8B877F] hover:text-[#BF8F4A] block mb-1 text-left font-sans transition-colors"
                >
                  {product.brand}
                </button>

                {/* 3. Product Name */}
                <h1 
                  className="font-serif text-2xl sm:text-4xl font-bold text-[#0B0B0B] tracking-tight mb-2 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {product.name}
                </h1>

                {/* 4. Rating / Reviews */}
                <div className="flex items-center gap-2 mb-5 font-sans">
                  {product.reviewCount > 0 ? (
                    <>
                      <div className="flex text-[#BF8F4A]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-[#0B0B0B]">{product.rating}</span>
                      <span className="text-xs text-[#8B877F]">
                        ({product.reviewCount} Reviews)
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-[#8B877F]">
                      Verified factory batch allocation
                    </span>
                  )}
                </div>

                {/* 5. Price, 6. Discount & MRP */}
                <div className="p-4 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px] mb-6 flex items-baseline justify-between flex-wrap gap-2">
                  <div className="flex items-baseline gap-3">
                    <span 
                      className="text-2xl sm:text-3xl font-serif font-bold text-[#0B0B0B]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      ₹{selectedSize.price.toLocaleString('en-IN')}
                    </span>
                    {selectedSize.mrp > selectedSize.price && (
                      <span className="text-sm font-sans text-[#8B877F] line-through">
                        MRP ₹{selectedSize.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#0B0B0B] bg-[#BF8F4A] px-2.5 py-0.5 rounded-[2px]">
                      {product.discount}% Off • Incl. Taxes
                    </span>
                  )}
                </div>

                {/* 7. Size Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2 font-sans">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]">
                      Select Bottle Size
                    </span>
                    <span className="text-[11px] text-[#8B877F]">
                      Concentration: <strong className="text-[#0B0B0B]">{product.concentration}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s)}
                        className={`min-h-[44px] px-4 py-2 border text-xs font-semibold uppercase tracking-wider transition-colors rounded-[2px] font-sans ${
                          selectedSize.size === s.size
                            ? 'border-[#0B0B0B] bg-[#0B0B0B] text-[#F7F3EA]'
                            : 'border-[#E5DFD5] bg-[#F7F3EA] text-[#0B0B0B] hover:border-[#BF8F4A]'
                        }`}
                      >
                        {s.size} — ₹{s.price.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8. Stock Status */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#0B0B0B] bg-[#F7F3EA] border border-[#E5DFD5] p-3 rounded-[2px] mb-6 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#BF8F4A] shrink-0" />
                  <span>In Stock — Dispatches within 24 hours in temperature-controlled packaging</span>
                </div>

                {/* 9. Delivery / Pincode Checker */}
                <div className="p-4 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px] mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] mb-2 font-sans">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#BF8F4A]" />
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
                      className="flex-1 px-3 py-2 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px] font-sans"
                    />
                    <button
                      type="submit"
                      className="min-h-[40px] px-5 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F7F3EA] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 rounded-[2px] font-sans"
                    >
                      {pincodeLoading ? 'Checking...' : 'Check'}
                    </button>
                  </form>
                  {deliveryResult && (
                    <p className="text-xs text-[#0B0B0B] bg-white border border-[#E5DFD5] p-2.5 rounded-[2px] mt-2 flex items-center gap-1.5 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#BF8F4A] shrink-0" />
                      <span>{deliveryResult}</span>
                    </p>
                  )}
                </div>

                {/* 10. Add to Cart & 11. Buy Now Buttons */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper (min 44px height) */}
                    <div className="flex items-center border border-[#E5DFD5] bg-[#F7F3EA] rounded-[2px] h-12 font-sans">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-11 h-full flex items-center justify-center text-sm font-semibold text-[#0B0B0B] hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#0B0B0B]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-11 h-full flex items-center justify-center text-sm font-semibold text-[#0B0B0B] hover:bg-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Primary CTA: FragDealz Gold (#BF8F4A) with Obsidian Black Text & 2px radius */}
                    <button
                      id="pdp-add-to-cart-btn"
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-[2px] font-sans"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2]" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 stroke-[2]" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Secondary Button: Dark Charcoal with Gold Outline */}
                  <button
                    id="pdp-buy-now-btn"
                    onClick={handleBuyNow}
                    className="w-full h-12 bg-[#1A1A1A] hover:bg-[#242424] text-[#EAD1A6] border border-[#BF8F4A] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-[2px] font-sans"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span>Buy It Now (Express Checkout)</span>
                    <ArrowRight className="w-4 h-4 text-[#BF8F4A]" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8B877F] font-sans">
                  <div 
                    onClick={() => setIsAuthenticityModalOpen(true)}
                    className="flex items-center gap-2 p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px] cursor-pointer hover:border-[#BF8F4A] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#BF8F4A] shrink-0 stroke-[1.5]" />
                    <span className="text-[#0B0B0B]">100% Genuine Batch Code</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                    <ThermometerSnowflake className="w-4 h-4 text-[#BF8F4A] shrink-0 stroke-[1.5]" />
                    <span className="text-[#0B0B0B]">Climate-Controlled Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 12. Description, 13. Fragrance Notes & 14. Perfume Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Scent Description & Fragrance Pyramid (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5DFD5] rounded-[2px] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B877F] font-semibold block mb-1 font-sans">
                Olfactory Composition
              </span>
              <h3 
                className="font-serif text-xl sm:text-2xl font-bold text-[#0B0B0B]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Fragrance Pyramid
              </h3>
              <p className="text-xs sm:text-sm text-[#8B877F] mt-2 leading-relaxed font-sans">
                {product.shortDescription}
              </p>
            </div>

            {/* Pyramid Notes Visual Cards */}
            {(product.notes.top.length > 0 || product.notes.heart.length > 0 || product.notes.base.length > 0) ? (
              <div className="space-y-3 pt-2">
                {product.notes.top.length > 0 && (
                  <div className="p-4 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0B0B0B] font-sans">
                        Top Notes
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.notes.top.map((note, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px] font-sans">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.notes.heart.length > 0 && (
                  <div className="p-4 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0B0B0B] font-sans">
                        Heart Notes
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.notes.heart.map((note, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px] font-sans">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.notes.base.length > 0 && (
                  <div className="p-4 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0B0B0B] font-sans">
                        Base Notes
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.notes.base.map((note, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px] font-sans">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-[#F7F3EA] border border-[#E5DFD5] text-xs text-[#8B877F] leading-relaxed rounded-[2px] font-sans">
                Full bottle presentation imported with original manufacturer cellophane seal and verifiable batch code.
              </div>
            )}
          </div>

          {/* 14. Perfume Details / Product Specifications (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E5DFD5] rounded-[2px] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B877F] font-semibold block mb-1 font-sans">
                Authentic Specifications
              </span>
              <h3 
                className="font-serif text-xl sm:text-2xl font-bold text-[#0B0B0B]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Product Details
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans">
              {/* Longevity & Sillage info if available */}
              {product.longevity && (
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD5]">
                  <span className="flex items-center gap-1.5 text-[#8B877F]">
                    <Clock className="w-3.5 h-3.5 text-[#BF8F4A]" />
                    Reported Longevity
                  </span>
                  <span className="text-[#0B0B0B] font-medium">{product.longevity}</span>
                </div>
              )}

              {product.sillage && (
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD5]">
                  <span className="flex items-center gap-1.5 text-[#8B877F]">
                    <Wind className="w-3.5 h-3.5 text-[#BF8F4A]" />
                    Sillage & Projection
                  </span>
                  <span className="text-[#0B0B0B] font-medium">{product.sillage}</span>
                </div>
              )}

              {/* Origin & Details Grid */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                  <span className="text-[10px] uppercase font-semibold text-[#8B877F] block mb-0.5">Country of Origin</span>
                  <span className="font-serif font-bold text-sm text-[#0B0B0B]">{product.countryOfOrigin}</span>
                </div>
                <div className="p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                  <span className="text-[10px] uppercase font-semibold text-[#8B877F] block mb-0.5">Concentration</span>
                  <span className="font-serif font-bold text-sm text-[#0B0B0B]">{product.concentration}</span>
                </div>
                <div className="p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                  <span className="text-[10px] uppercase font-semibold text-[#8B877F] block mb-0.5">Gender</span>
                  <span className="font-serif font-bold text-sm text-[#0B0B0B]">{product.gender}</span>
                </div>
                <div className="p-3 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px]">
                  <span className="text-[10px] uppercase font-semibold text-[#8B877F] block mb-0.5">Batch Code</span>
                  <span className="font-sans font-bold text-xs text-[#0B0B0B]">Verifiable Original</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 15. Reviews Section */}
        <div className="bg-white border border-[#E5DFD5] rounded-[2px] p-6 sm:p-10 mb-12">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5] mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B877F] font-semibold block mb-1 font-sans">
                Customer Feedback
              </span>
              <h3 
                className="font-serif text-xl sm:text-2xl font-bold text-[#0B0B0B]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Customer Reviews ({product.reviewCount})
              </h3>
            </div>
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-1.5 text-[#BF8F4A]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-serif font-bold text-lg text-[#0B0B0B]">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Review Submission Form */}
          <div className="p-5 sm:p-6 bg-[#F7F3EA] border border-[#E5DFD5] rounded-[2px] mb-6">
            <h4 
              className="font-serif text-base font-bold text-[#0B0B0B] mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Add Your Verified Review
            </h4>
            <form onSubmit={handleReviewSubmit} className="space-y-3 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="p-2.5 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
                />
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="p-2.5 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
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
                className="w-full p-2.5 bg-white border border-[#E5DFD5] text-xs text-[#0B0B0B] focus:outline-none focus:border-[#BF8F4A] rounded-[2px]"
              />
              <button
                type="submit"
                className="min-h-[44px] px-6 py-2.5 bg-[#BF8F4A] hover:bg-[#AC7E3D] text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider transition-colors rounded-[2px]"
              >
                Submit Verified Review
              </button>
              {reviewSubmitted && (
                <p className="text-xs text-emerald-800 bg-white border border-emerald-200 p-2.5 rounded-[2px]">
                  Thank you! Your verified flacon review has been recorded.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 16. Related Products (2 columns on mobile, 4 on desktop) */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E5DFD5]">
            <h3 
              className="font-serif text-xl sm:text-2xl font-bold text-[#0B0B0B]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              You May Also Like
            </h3>
            <button
              onClick={() => navigateToShop({})}
              className="text-xs uppercase tracking-wider font-semibold text-[#0B0B0B] hover:text-[#BF8F4A] flex items-center gap-1 font-sans transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STICKY MOBILE PURCHASE BAR (SOLID OBSIDIAN BLACK, NO GLASSMORPHISM) */}
      {/* ========================================================================= */}
      <div 
        id="sticky-mobile-purchase-bar"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0B0B0B] border-t border-[#1A1A1A] px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-2xl flex items-center justify-between gap-3 animate-slideUp"
      >
        {/* Price & Selected Size */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span 
              className="font-serif text-lg font-bold text-[#F7F3EA]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              ₹{selectedSize.price.toLocaleString('en-IN')}
            </span>
            {selectedSize.mrp > selectedSize.price && (
              <span className="text-[10px] text-[#8B877F] line-through font-sans">
                ₹{selectedSize.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold text-[#BF8F4A] uppercase tracking-wider font-sans">
            {selectedSize.size} • In Stock
          </span>
        </div>

        {/* Action Buttons (min 44px touch targets) */}
        <div className="flex items-center gap-2 flex-1 max-w-[240px]">
          <button
            onClick={handleAddToCart}
            className="flex-1 min-h-[44px] py-2.5 px-2 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1 rounded-[2px] transition-colors font-sans"
          >
            {justAdded ? (
              <Check className="w-3.5 h-3.5 stroke-[2]" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
            )}
            <span>{justAdded ? 'Added' : 'Add'}</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 min-h-[44px] py-2.5 px-2 bg-[#1A1A1A] hover:bg-[#242424] text-[#EAD1A6] border border-[#BF8F4A] text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1 rounded-[2px] transition-colors font-sans"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-3 h-3 text-[#BF8F4A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
