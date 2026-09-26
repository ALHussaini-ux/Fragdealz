import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { BrandShowcase } from '../components/BrandShowcase';
import { Bestsellers } from '../components/Bestsellers';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedBrand } from '../components/FeaturedBrand';
import { FragranceTypeSection } from '../components/FragranceTypeSection';
import { FragranceNotesGrid } from '../components/FragranceNotesGrid';
import { NewArrivals } from '../components/NewArrivals';
import { DealsSection } from '../components/DealsSection';
import { AuthenticitySection } from '../components/AuthenticitySection';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Shop by Brand (7 Authorized Houses) */}
      <BrandShowcase />

      {/* 4. Customer Bestsellers */}
      <Bestsellers />

      {/* 5. Shop by Category */}
      <CategoryGrid />

      {/* 6. Featured House Editorial Spotlight */}
      <FeaturedBrand />

      {/* 7. Shop by Fragrance Type / Concentration */}
      <FragranceTypeSection />

      {/* 8. Olfactory Families */}
      <FragranceNotesGrid />

      {/* 9. Latest Releases & Restocks */}
      <NewArrivals />

      {/* 10. Featured Value Selections */}
      <DealsSection />

      {/* 11. Authenticity Guarantee & Storage */}
      <AuthenticitySection />
    </div>
  );
};
