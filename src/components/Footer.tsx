import React, { useState } from 'react';
import { Check, ShieldCheck, Instagram, Facebook, Twitter, Phone, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRANDS } from '../data/brands';
import { FragDealzLogo } from './FragDealzLogo';

export const Footer: React.FC = () => {
  const { navigateToShop, navigateToBrand, setIsAuthenticityModalOpen, setIsAccountOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#0B0B0B] text-[#F7F3EA] pt-16 pb-24 lg:pb-16 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="border border-[#2A2A2A] bg-[#1A1A1A] p-8 sm:p-10 mb-16 max-w-2xl mx-auto text-center rounded-[2px]">
          <span 
            className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#BF8F4A] font-semibold block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Exclusive Allocations
          </span>
          <h3 
            className="font-serif text-xl sm:text-2xl text-[#F7F3EA] mb-2 font-semibold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            New Arrivals & Private Deals
          </h3>
          <p className="text-xs text-[#8B877F] max-w-md mx-auto mb-6 font-sans">
            Receive updates on restocks, seasonal promotions, and newly imported Middle Eastern and designer fragrances.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-[#0B0B0B] border border-[#2A2A2A] focus:border-[#BF8F4A] text-xs text-[#F7F3EA] placeholder:text-[#8B877F] focus:outline-none rounded-[2px] font-sans"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#BF8F4A] hover:bg-[#AC7E3D] active:bg-[#996F34] text-[#0B0B0B] text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 flex items-center justify-center gap-1.5 rounded-[2px] font-sans"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Subscribed</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-[#EAD1A6] mt-3 font-sans">
              Thank you for subscribing to FragDealz allocations.
            </p>
          )}
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-[#1A1A1A] text-xs font-sans">
          {/* Column 1: SHOP */}
          <div>
            <h4 
              className="font-serif text-sm font-bold tracking-widest uppercase text-[#F7F3EA] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Shop Fragrances
            </h4>
            <ul className="space-y-2.5 text-[#8B877F]">
              <li>
                <button onClick={() => navigateToShop({})} className="hover:text-[#BF8F4A] transition-colors">
                  All Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ gender: ['Men'] })} className="hover:text-[#BF8F4A] transition-colors">
                  Men's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ gender: ['Women'] })} className="hover:text-[#BF8F4A] transition-colors">
                  Women's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ gender: ['Unisex'] })} className="hover:text-[#BF8F4A] transition-colors">
                  Unisex Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ category: ['Arabic'] })} className="hover:text-[#BF8F4A] transition-colors">
                  Arabic Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ sortBy: 'bestselling' })} className="hover:text-[#BF8F4A] transition-colors">
                  Bestsellers
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ concentration: ['Parfum / Extrait'] })} className="hover:text-[#BF8F4A] transition-colors">
                  Parfum & Extraits
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ sortBy: 'newest' })} className="hover:text-[#BF8F4A] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ onSaleOnly: true })} className="hover:text-[#BF8F4A] transition-colors font-medium text-[#EAD1A6]">
                  Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: POPULAR BRANDS */}
          <div>
            <h4 
              className="font-serif text-sm font-bold tracking-widest uppercase text-[#F7F3EA] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Fragrance Houses
            </h4>
            <ul className="space-y-2.5 text-[#8B877F]">
              {BRANDS.map(brand => (
                <li key={brand.id}>
                  <button 
                    onClick={() => navigateToBrand(brand.slug)} 
                    className="hover:text-[#BF8F4A] transition-colors"
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: HELP & SUPPORT */}
          <div>
            <h4 
              className="font-serif text-sm font-bold tracking-widest uppercase text-[#F7F3EA] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-[#8B877F]">
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-[#BF8F4A] transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Shipping & Packaging Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Damage Replacement Charter
                </span>
              </li>
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Climate Storage Standards
                </span>
              </li>
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Frequently Asked Questions
                </span>
              </li>
              <li className="pt-2 text-[11px] text-[#8B877F] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#EAD1A6]">
                  <Phone className="w-3.5 h-3.5 text-[#BF8F4A]" />
                  <span>Mon - Sat, 10 AM - 7 PM IST</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#EAD1A6]">
                  <MapPin className="w-3.5 h-3.5 text-[#BF8F4A]" />
                  <span>Mumbai & Dubai Hubs</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT & AUTHENTICITY */}
          <div>
            <div className="mb-4">
              <FragDealzLogo className="h-7 w-auto" />
            </div>
            <h4 
              className="font-serif text-sm font-bold tracking-widest uppercase text-[#F7F3EA] mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              About FragDealz
            </h4>
            <ul className="space-y-2.5 text-[#8B877F]">
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Our Retail Story
                </span>
              </li>
              <li>
                <button onClick={() => setIsAuthenticityModalOpen(true)} className="text-[#BF8F4A] hover:underline transition-colors font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticity Guarantee</span>
                </button>
              </li>
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Distribution Transparency
                </span>
              </li>
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#BF8F4A] transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#1A1A1A]">
              <span className="text-[10px] uppercase tracking-wider text-[#8B877F] block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-3 text-[#EAD1A6]">
                <span className="hover:text-[#BF8F4A] cursor-pointer"><Instagram className="w-4 h-4" /></span>
                <span className="hover:text-[#BF8F4A] cursor-pointer"><Facebook className="w-4 h-4" /></span>
                <span className="hover:text-[#BF8F4A] cursor-pointer"><Twitter className="w-4 h-4" /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8B877F] gap-4 font-sans">
          <p>
            © {new Date().getFullYear()} FragDealz. All rights reserved. Premium multi-brand fragrance retailer.
          </p>
          <div className="flex items-center gap-4 text-center sm:text-right">
            <span>All brand trademarks (French Avenue, Rasasi, Lattafa, Afnan, Ahmed Al Maghribi, Armaf, Riffs) belong to their respective proprietary houses.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
