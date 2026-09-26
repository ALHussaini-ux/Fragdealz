import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, Brand, CartItem, Order, FilterState, FragranceFamily } from '../types';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';

interface StoreContextType {
  // Navigation & Active View
  activeView: 'home' | 'shop' | 'product' | 'brand' | 'checkout';
  currentView: 'home' | 'shop' | 'product' | 'brand' | 'checkout';
  activeProductId: string | null;
  activeProductSlug: string | null;
  activeBrandSlug: string | null;
  navigateToHome: () => void;
  navigateToShop: (initialFilters?: Partial<FilterState>) => void;
  navigateToProduct: (productIdOrSlug: string) => void;
  navigateToBrand: (brandSlug: string) => void;
  navigateToCheckout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartMrpTotal: number;
  cartDiscount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product, size?: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Drawers & Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isScentFinderOpen: boolean;
  setIsScentFinderOpen: (open: boolean) => void;
  isAuthenticityModalOpen: boolean;
  setIsAuthenticityModalOpen: (open: boolean) => void;

  // Shop Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  updateFilters: (partial: Partial<FilterState>) => void;
  toggleBrandFilter: (brandName: string) => void;
  toggleFamilyFilter: (family: FragranceFamily) => void;
  toggleGenderFilter: (gender: string) => void;
  resetFilters: () => void;
  activeFilterCount: number;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Partial<Order>) => Order;
  activeOrderConfirmation: Order | null;
  setActiveOrderConfirmation: (order: Order | null) => void;

  // Toast
  toast: string | null;
  showToast: (message: string) => void;
}

const initialFilterState: FilterState = {
  brands: [],
  gender: [],
  category: [],
  fragranceFamily: [],
  concentration: [],
  minPrice: 0,
  maxPrice: 20000,
  inStockOnly: false,
  onSaleOnly: false,
  searchQuery: '',
  sortBy: 'featured'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY_CART = 'scent_vault_cart_v1';
const STORAGE_KEY_WISHLIST = 'scent_vault_wishlist_v1';
const STORAGE_KEY_ORDERS = 'scent_vault_orders_v1';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'product' | 'brand' | 'checkout'>('home');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeBrandSlug, setActiveBrandSlug] = useState<string | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isScentFinderOpen, setIsScentFinderOpen] = useState(false);
  const [isAuthenticityModalOpen, setIsAuthenticityModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(prev => (prev === message ? null : prev));
    }, 3200);
  };

  // Cart State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Filter State
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Orders State with initial mock order for realistic account view
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'SV-89421',
        date: '12 Nov 2024',
        items: [
          {
            id: 'item-1',
            productId: 'lattafa-khamrah',
            name: 'Khamrah Eau de Parfum',
            brand: 'Lattafa',
            size: '100 ML',
            quantity: 1,
            price: 2299,
            image: PRODUCTS[0].thumbnail
          }
        ],
        subtotal: 2299,
        discount: 0,
        shipping: 0,
        total: 2299,
        paymentMethod: 'UPI (Google Pay)',
        status: 'Delivered',
        trackingNumber: 'BLUEDART-8829104',
        deliveryAddress: {
          fullName: 'Arjun Verma',
          street: 'Flat 402, Signature Heights, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050',
          phone: '+91 98200 12345'
        }
      }
    ];
  });

  const [activeOrderConfirmation, setActiveOrderConfirmation] = useState<Order | null>(null);

  // Navigation handlers
  const navigateToHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (initialFilters?: Partial<FilterState>) => {
    if (initialFilters) {
      setFilters(prev => ({ ...prev, ...initialFilters }));
    }
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productIdOrSlug: string) => {
    const matched = PRODUCTS.find(p => p.id === productIdOrSlug || p.slug === productIdOrSlug);
    if (matched) {
      setActiveProductId(matched.id);
      setActiveView('product');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToBrand = (brandSlug: string) => {
    const brand = BRANDS.find(b => b.slug === brandSlug || b.id === brandSlug);
    if (brand) {
      setActiveBrandSlug(brand.slug);
      setActiveView('brand');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const freeShippingThreshold = 2499;

  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const chosenSize = size || product.selectedDefaultSize || product.sizes[0]?.size || '100 ML';
    const sizeObj = product.sizes.find(s => s.size === chosenSize) || product.sizes[0];
    const price = sizeObj ? sizeObj.price : product.price;
    const mrp = sizeObj ? sizeObj.mrp : product.mrp;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.size === chosenSize);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, size: chosenSize, quantity, price, mrp }];
      }
    });

    showToast(`Added ${product.name} (${chosenSize}) to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartMrpTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    return Math.max(0, cartMrpTotal - cartSubtotal);
  }, [cartMrpTotal, cartSubtotal]);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Wishlist operations
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlist(prev => [product, ...prev]);
      showToast(`Added to Wishlist`);
    }
  };

  const moveToCartFromWishlist = (product: Product, size?: string) => {
    addToCart(product, size, 1);
    setWishlist(prev => prev.filter(p => p.id !== product.id));
  };

  // Filter helpers
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleBrandFilter = (brandName: string) => {
    setFilters(prev => {
      const exists = prev.brands.includes(brandName);
      return {
        ...prev,
        brands: exists ? prev.brands.filter(b => b !== brandName) : [...prev.brands, brandName]
      };
    });
  };

  const toggleFamilyFilter = (family: FragranceFamily) => {
    setFilters(prev => {
      const exists = prev.fragranceFamily.includes(family);
      return {
        ...prev,
        fragranceFamily: exists ? prev.fragranceFamily.filter(f => f !== family) : [...prev.fragranceFamily, family]
      };
    });
  };

  const toggleGenderFilter = (gender: string) => {
    setFilters(prev => {
      const exists = prev.gender.includes(gender);
      return {
        ...prev,
        gender: exists ? prev.gender.filter(g => g !== gender) : [...prev.gender, gender]
      };
    });
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.brands.length) count += filters.brands.length;
    if (filters.gender.length) count += filters.gender.length;
    if (filters.category.length) count += filters.category.length;
    if (filters.fragranceFamily.length) count += filters.fragranceFamily.length;
    if (filters.concentration.length) count += filters.concentration.length;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.minPrice > 0 || filters.maxPrice < 20000) count++;
    return count;
  }, [filters]);

  // Order Placement
  const placeOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: `SV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart.map(item => ({
        id: `item-${Date.now()}-${Math.random()}`,
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        image: item.product.thumbnail
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartSubtotal >= freeShippingThreshold ? 0 : 149,
      total: cartSubtotal + (cartSubtotal >= freeShippingThreshold ? 0 : 149),
      paymentMethod: orderData.paymentMethod || 'UPI',
      status: 'Processing',
      trackingNumber: `EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
      deliveryAddress: orderData.deliveryAddress || {
        fullName: 'Valued Customer',
        street: '123 Luxury Boulevard',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '+91 99999 99999'
      },
      ...orderData
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updatedOrders));
    } catch {
      // ignore
    }

    clearCart();
    setActiveOrderConfirmation(newOrder);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        currentView: activeView,
        activeProductId,
        activeProductSlug: activeProductId,
        activeBrandSlug,
        navigateToHome,
        navigateToShop,
        navigateToProduct,
        navigateToBrand,
        navigateToCheckout,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartMrpTotal,
        cartDiscount,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        isCartOpen,
        setIsCartOpen,

        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlisted: isInWishlist,
        moveToCartFromWishlist,
        isWishlistOpen,
        setIsWishlistOpen,

        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        isScentFinderOpen,
        setIsScentFinderOpen,
        isAuthenticityModalOpen,
        setIsAuthenticityModalOpen,

        filters,
        setFilters,
        updateFilter,
        updateFilters: (partial: Partial<FilterState>) => setFilters(prev => ({ ...prev, ...partial })),
        toggleBrandFilter,
        toggleFamilyFilter,
        toggleGenderFilter,
        resetFilters,
        activeFilterCount,

        orders,
        placeOrder,
        activeOrderConfirmation,
        setActiveOrderConfirmation,

        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
