export type FragranceGender = 'Men' | 'Women' | 'Unisex';

export type FragranceConcentration = 
  | 'Eau de Parfum' 
  | 'Eau de Toilette' 
  | 'Parfum / Extrait' 
  | 'Attar / Oil' 
  | 'Attar / Concentrated Oil'
  | 'Discovery Set'
  | 'Eau de Cologne';

export type FragranceFamily = 
  | 'Woody' 
  | 'Oud' 
  | 'Musk' 
  | 'Vanilla' 
  | 'Citrus' 
  | 'Rose' 
  | 'Amber' 
  | 'Spicy' 
  | 'Floral' 
  | 'Aquatic' 
  | 'Leather' 
  | 'Gourmand'
  | 'Oriental';

export type SortOption = 
  | 'featured' 
  | 'bestselling' 
  | 'newest' 
  | 'price-asc' 
  | 'price-desc' 
  | 'price-low'
  | 'price-high'
  | 'rating';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ScentMetrics {
  longevity: number; // scale 1-10
  sillage: number;   // scale 1-10
  sweetness: number; // scale 1-10
  freshness: number; // scale 1-10
  spiciness: number; // scale 1-10
  woody: number;     // scale 1-10
}

export interface ProductSize {
  size: string;
  price: number;
  mrp: number;
  inStock: boolean;
  isDefault?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  title: string;
  comment: string;
  helpfulCount: number;
  location?: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  slug: string;
  category: 'Men' | 'Women' | 'Unisex' | 'Arabic' | 'Designer' | 'Gift Sets' | 'Niche';
  gender: FragranceGender;
  description: string;
  shortDescription: string;
  price: number;
  mrp: number;
  discount: number;
  discountPercentage?: number;
  currency: string;
  images: string[];
  thumbnail: string;
  sizes: ProductSize[];
  selectedDefaultSize: string;
  stock: number;
  inStock?: boolean;
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  fragranceFamily: FragranceFamily[];
  notes: FragranceNotes;
  concentration: FragranceConcentration;
  countryOfOrigin: string;
  longevity: string; // e.g. "8 - 12 Hours"
  sillage: string;   // e.g. "Intense / Strong"
  season?: string;
  occasion?: string;
  batchCodePrefix?: string;
  metrics: ScentMetrics;
  perfumer?: string;
  tags: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  isArabic?: boolean;
  isDesigner?: boolean;
  isNiche?: boolean;
  reviews?: ProductReview[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  originCountry: string;
  foundedYear?: string;
  description: string;
  fullStory: string;
  bannerImage: string;
  logo: string;
  type: 'Middle Eastern' | 'Designer' | 'Niche' | 'Luxury';
  featured: boolean;
  heroQuote: string;
  productCount?: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  price: number;
  mrp: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  deliveryAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface FilterState {
  brands: string[];
  gender: string[];
  category: string[];
  fragranceFamily: string[];
  concentration: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  sortBy: SortOption;
}
