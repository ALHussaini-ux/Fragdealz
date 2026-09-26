import React from 'react';
import { useStore } from '../context/StoreContext';

export const TrustStrip: React.FC = () => {
  const { setIsAuthenticityModalOpen } = useStore();

  return (
    <section className="bg-white border-b border-[#E8E5DF] py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-[#111111] gap-y-3">
          <button
            onClick={() => setIsAuthenticityModalOpen(true)}
            className="flex items-center gap-2 hover:text-[#777777] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="font-medium tracking-wide">100% Authentic fragrances</span>
          </button>

          <span className="hidden md:inline text-[#E8E5DF]">•</span>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="font-medium tracking-wide">Climate-controlled storage</span>
          </div>

          <span className="hidden md:inline text-[#E8E5DF]">•</span>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="font-medium tracking-wide">Fast dispatch across India</span>
          </div>

          <span className="hidden md:inline text-[#E8E5DF]">•</span>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="font-medium tracking-wide">Encrypted & secure checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
};

