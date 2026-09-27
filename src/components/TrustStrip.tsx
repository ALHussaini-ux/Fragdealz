import React from 'react';
import { useStore } from '../context/StoreContext';

export const TrustStrip: React.FC = () => {
  const { setIsAuthenticityModalOpen } = useStore();

  return (
    <section className="bg-[#1A1A1A] border-b border-[#2A2A2A] py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between text-xs font-sans text-[#EAD1A6] gap-y-3">
          <button
            onClick={() => setIsAuthenticityModalOpen(true)}
            className="flex items-center gap-2 text-[#EAD1A6] hover:text-[#BF8F4A] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF8F4A]" />
            <span className="font-medium tracking-wide">100% Authentic Fragrances</span>
          </button>

          <span className="hidden md:inline text-[#2A2A2A]">•</span>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF8F4A]" />
            <span className="font-medium tracking-wide text-[#EAD1A6]">Climate-Controlled Storage</span>
          </div>

          <span className="hidden md:inline text-[#2A2A2A]">•</span>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF8F4A]" />
            <span className="font-medium tracking-wide text-[#EAD1A6]">Verifiable Factory Batch Codes</span>
          </div>

          <span className="hidden md:inline text-[#2A2A2A]">•</span>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF8F4A]" />
            <span className="font-medium tracking-wide text-[#EAD1A6]">Encrypted & Secure Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
};
