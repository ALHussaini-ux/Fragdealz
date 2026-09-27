import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Instagram, Facebook, Twitter, Phone, MapPin } from 'lucide-react';
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
    <footer className="bg-[#111111] text-[#FAF9F6] pt-16 pb-24 lg:pb-16 border-t border-[#5C554D]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="border border-white/10 p-8 sm:p-10 mb-16 max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-widest text-[#999999] font-medium block mb-2">
            Newsletter
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 font-normal">
            New arrivals & allocations
          </h3>
          <p className="text-xs text-[#999999] max-w-md mx-auto mb-6">
            Receive updates on restocks, seasonal promotions, and newly imported designer and Middle Eastern fragrances.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/20 focus:border-white text-xs text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#111111] hover:bg-neutral-200 text-xs font-medium tracking-wider uppercase transition-colors shrink-0 flex items-center justify-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-white/80 mt-3 animate-fadeIn">
              Thank you for subscribing.
            </p>
          )}
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-white/10 text-xs">
          {/* Column 1: SHOP */}
          <div>
            <h4 className="font-serif text-sm font-bold tracking-widest uppercase text-white mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-[#EDE9E2]/70">
              <li>
                <button onClick={() => navigateToShop({})} className="hover:text-[#B89B5E] transition-colors">
                  All Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ gender: ['Men'] })} className="hover:text-[#B89B5E] transition-colors">
                  Men's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ gender: ['Women'] })} className="hover:text-[#B89B5E] transition-colors">
                  Women's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ gender: ['Unisex'] })} className="hover:text-[#B89B5E] transition-colors">
                  Unisex Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ category: ['Arabic'] })} className="hover:text-[#B89B5E] transition-colors">
                  Arabic Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ sortBy: 'bestselling' })} className="hover:text-white transition-colors">
                  Bestsellers
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ concentration: ['Parfum / Extrait'] })} className="hover:text-white transition-colors">
                  Parfum & Extraits
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ sortBy: 'newest' })} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ onSaleOnly: true })} className="hover:text-white transition-colors">
                  Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: POPULAR BRANDS */}
          <div>
            <h4 className="font-serif text-sm font-bold tracking-widest uppercase text-white mb-4">
              POPULAR BRANDS
            </h4>
            <ul className="space-y-2.5 text-[#EDE9E2]/70">
              {BRANDS.map(brand => (
                <li key={brand.id}>
                  <button 
                    onClick={() => navigateToBrand(brand.slug)} 
                    className="hover:text-[#B89B5E] transition-colors"
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: HELP & SUPPORT */}
          <div>
            <h4 className="font-serif text-sm font-bold tracking-widest uppercase text-white mb-4">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-2.5 text-[#EDE9E2]/70">
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-[#B89B5E] transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Shipping & Packaging Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Returns & Damage Replacement
                </span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Storage & Batch Care
                </span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Frequently Asked Questions
                </span>
              </li>
              <li className="pt-2 text-[11px] text-white/50 space-y-1">
                <div className="flex items-center gap-1.5 text-white/80">
                  <Phone className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Mon - Sat, 10 AM - 7 PM IST</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <MapPin className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Mumbai & Dubai Hubs</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT & AUTHENTICITY */}
          <div>
            <div className="mb-3">
              <FragDealzLogo className="h-6 w-auto" />
            </div>
            <h4 className="font-serif text-sm font-bold tracking-widest uppercase text-white mb-4">
              ABOUT FRAGDEALZ
            </h4>
            <ul className="space-y-2.5 text-[#EDE9E2]/70">
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Our Retail Story
                </span>
              </li>
              <li>
                <button onClick={() => setIsAuthenticityModalOpen(true)} className="text-[#B89B5E] hover:underline transition-colors font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticity Guarantee</span>
                </button>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Distribution Transparency
                </span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-3 text-white/70">
                <span className="hover:text-[#B89B5E] cursor-pointer"><Instagram className="w-4 h-4" /></span>
                <span className="hover:text-[#B89B5E] cursor-pointer"><Facebook className="w-4 h-4" /></span>
                <span className="hover:text-[#B89B5E] cursor-pointer"><Twitter className="w-4 h-4" /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#EDE9E2]/50 gap-4">
          <p>
            © {new Date().getFullYear()} FragDealz. All rights reserved. Authentic multi-brand fragrance retailer.
          </p>
          <div className="flex items-center gap-4">
            <span>All brand trademarks (French Avenue, Rasasi, Lattafa, Afnan, Ahmed Al Maghribi, Armaf, Riffs) belong to their respective proprietary houses.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
