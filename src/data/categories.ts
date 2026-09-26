import { FragranceFamily } from '../types';

export const FRAGRANCE_FAMILIES: FragranceFamily[] = [
  'Woody',
  'Oud',
  'Musk',
  'Vanilla',
  'Citrus',
  'Rose',
  'Amber',
  'Spicy',
  'Floral',
  'Aquatic',
  'Leather',
  'Gourmand',
  'Oriental'
];

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  genderOrType: string;
  image: string;
  description: string;
  badge?: string;
  count: number;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'men',
    name: 'Men',
    slug: 'men',
    genderOrType: 'Pour Homme',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    description: 'Commanding woods, magnetic spices, fresh citrus, and smoky leathers.',
    count: 42
  },
  {
    id: 'women',
    name: 'Women',
    slug: 'women',
    genderOrType: 'Pour Femme',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    description: 'Velveteen vanilla, sensual florals, and radiant oriental gourmands.',
    count: 12
  },
  {
    id: 'unisex',
    name: 'Unisex',
    slug: 'unisex',
    genderOrType: 'Shared Elegance',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop',
    description: 'Harmonious blends transcending gender conventions for discerning fragrance enthusiasts.',
    count: 31
  },
  {
    id: 'bestsellers',
    name: 'Bestsellers',
    slug: 'bestsellers',
    genderOrType: 'Customer Favorites',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    description: 'Top-selling bottles including Khamrah, Hawas, 9PM, and Club de Nuit Intense Man.',
    badge: 'Popular',
    count: 15
  },
  {
    id: 'extraits',
    name: 'Parfum & Extraits',
    slug: 'extraits',
    genderOrType: 'Highest Concentration',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=800&auto=format&fit=crop',
    description: 'High oil concentration formulations for maximum depth, sillage, and longevity.',
    badge: 'High Performance',
    count: 18
  },
  {
    id: 'sale',
    name: 'Special Offers',
    slug: 'sale',
    genderOrType: 'Value Pricing',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    description: 'Special seasonal pricing and bundle values across authentic stock.',
    badge: 'Offers',
    count: 24
  }
];

export interface FragranceNoteItem {
  name: FragranceFamily;
  tagline: string;
  iconName: string;
  vibe: string;
  popularNotes: string[];
}

export const FRAGRANCE_NOTES: FragranceNoteItem[] = [
  { name: 'Oud', tagline: 'Dark, smoky, and deeply regal agarwood', iconName: 'Flame', vibe: 'Regal & Mysterious', popularNotes: ['Cambodian Oud', 'Smoky Agarwood', 'White Oud'] },
  { name: 'Woody', tagline: 'Rich cedarwood, creamy sandalwood, and vetiver', iconName: 'Trees', vibe: 'Grounded & Earthy', popularNotes: ['Sandalwood', 'Atlas Cedar', 'Birch'] },
  { name: 'Amber', tagline: 'Golden, glowing, and radiant warmth', iconName: 'Sun', vibe: 'Warm & Sensual', popularNotes: ['Ambergris', 'Golden Resin', 'Labdanum'] },
  { name: 'Vanilla', tagline: 'Madagascar bourbon vanilla and comforting warmth', iconName: 'Sparkles', vibe: 'Sweet & Alluring', popularNotes: ['Bourbon Vanilla', 'Tonka Bean', 'Benzoin'] },
  { name: 'Spicy', tagline: 'Black pepper, nutmeg, cinnamon, and cardamom', iconName: 'Zap', vibe: 'Bold & Intoxicating', popularNotes: ['Cardamom', 'Cinnamon', 'Black Pepper'] },
  { name: 'Gourmand', tagline: 'Decadent praline, chocolate, dates, and caramel', iconName: 'Coffee', vibe: 'Addictive & Warm', popularNotes: ['Praline', 'Caramel', 'Roasted Tonka'] },
  { name: 'Citrus', tagline: 'Sparkling Italian bergamot, grapefruit, and lemon', iconName: 'Citrus', vibe: 'Crisp & Energizing', popularNotes: ['Calabrian Bergamot', 'Grapefruit', 'Lemon'] },
  { name: 'Rose', tagline: 'Damask rose, Taif blossoms, and velvety petals', iconName: 'Flower2', vibe: 'Romantic & Classic', popularNotes: ['Taif Rose', 'Turkish Rose', 'May Rose'] },
  { name: 'Musk', tagline: 'Clean white musk, velvet cashmeran, and skin scent', iconName: 'Feather', vibe: 'Clean & Refined', popularNotes: ['White Musk', 'Cashmeran', 'Ambrette'] },
  { name: 'Aquatic', tagline: 'Cool sea breezes, salty driftwood, and crisp ozone', iconName: 'Droplets', vibe: 'Invigorating & Fresh', popularNotes: ['Sea Breeze', 'Driftwood', 'Watery Accord'] },
  { name: 'Leather', tagline: 'Supple suede, smoky birch, and deep resin', iconName: 'Shield', vibe: 'Commanding & Daring', popularNotes: ['Suede', 'Smoky Leather', 'Birch Tar'] },
  { name: 'Floral', tagline: 'Jasmine, creamy tuberose, and orange blossom', iconName: 'Flower', vibe: 'Radiant & Elegant', popularNotes: ['Jasmine', 'Tuberose', 'Orange Blossom'] }
];

export const FRAGRANCE_CONCENTRATIONS = [
  { name: 'Eau de Parfum', abbreviation: 'EDP', oilPercentage: '15 - 20%', description: 'Daily projection and 8-10+ hours longevity.' },
  { name: 'Parfum / Extrait', abbreviation: 'EXTRAIT', oilPercentage: '25 - 40%', description: 'Highest concentration for maximum depth, lingering sillage, and all-day longevity.' },
  { name: 'Eau de Toilette', abbreviation: 'EDT', oilPercentage: '8 - 14%', description: 'Crisp, sparkling, and refreshing daytime wear.' }
];

export const DEALS_PROMOTIONS = [
  {
    id: 'deal-under-2499',
    title: 'UNDER ₹2,499',
    subtitle: 'Daily Signatures',
    description: 'High-performing fragrances that punch far above their retail price.',
    filterParam: { maxPrice: 2499 },
    image: 'https://images.shopify.com/s/files/1/0014/6590/9313/files/khamrahlattafa.jpg?v=1738612154'
  },
  {
    id: 'deal-bestsellers',
    title: 'BESTSELLERS',
    subtitle: 'Customer Favorites',
    description: 'The most popular bottles from Rasasi, Lattafa, Afnan, and Armaf.',
    filterParam: { sortBy: 'bestselling' },
    image: 'https://images.shopify.com/s/files/1/0268/8267/0792/products/15_f31dd7ea-7a74-4862-86c1-dd230c45559a.jpg?v=1666603064'
  },
  {
    id: 'deal-extraits',
    title: 'EXTRAIT DE PARFUM',
    subtitle: 'High Concentration',
    description: 'Rich extraits and high-oil formulations for maximum performance.',
    filterParam: { concentration: ['Parfum / Extrait'] },
    image: 'https://images.shopify.com/s/files/1/0772/1448/2736/files/supremacy-not-only-intense-e1635343273876.jpg?v=1742373975'
  },
  {
    id: 'deal-new-arrivals',
    title: 'NEW RELEASES',
    subtitle: 'Latest Shipments',
    description: 'Freshly arrived batches including Liquid Brun Limited Edition, Hawas Black, and 9PM Rebel.',
    filterParam: { sortBy: 'newest' },
    image: 'https://images.shopify.com/s/files/1/0268/8267/0792/files/12_7f13b569-366f-4ef2-ac3a-455e7eb8ce19.png?v=1780924122'
  }
];

export const TRUST_INDICATORS = [
  {
    title: 'AUTHENTIC PRODUCTS',
    subtitle: '100% genuine fragrances sourced directly through authorized brand distributors.',
    icon: 'ShieldCheck'
  },
  {
    title: 'SECURE PAYMENTS',
    subtitle: 'Encrypted checkout supporting UPI, Credit/Debit Cards, Net Banking, and Wallets.',
    icon: 'Lock'
  },
  {
    title: 'FAST SHIPPING',
    subtitle: 'Protective packaging dispatched with tracking across all delivery pincodes.',
    icon: 'Truck'
  },
  {
    title: 'VERIFIED BATCH CODES',
    subtitle: 'Every flacon features original box seals and verifiable factory batch stamps.',
    icon: 'CheckCircle2'
  }
];
