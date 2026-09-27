import React from 'react';
import { ShieldCheck, QrCode, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthenticitySection: React.FC = () => {
  const { setIsAuthenticityModalOpen } = useStore();

  const points = [
    {
      icon: ShieldCheck,
      title: 'Direct Authorized Importers',
      desc: 'All inventory is sourced through certified national distributors and verified brand representatives in France, UAE, and India.'
    },
    {
      icon: QrCode,
      title: 'Verifiable Batch Codes',
      desc: 'Original manufacturer batch codes are stamped on bottle bases and outer packaging, verifiable on official brand databases.'
    },
    {
      icon: Truck,
      title: 'Temperature-Regulated Storage',
      desc: 'Stored in dark, climate-controlled warehousing at 18°C–20°C to safeguard aromatic oils against heat or UV oxidation.'
    }
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#1A1A1A] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#2A2A2A] p-8 sm:p-12 bg-[#0B0B0B] rounded-[2px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <span 
                className="text-xs uppercase tracking-widest text-[#BF8F4A] font-semibold block mb-2 font-sans"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Authentication Guarantee
              </span>
              <h2 
                className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F3EA] font-semibold tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Authenticity & Batch Integrity
              </h2>
              <p className="text-xs sm:text-sm text-[#8B877F] leading-relaxed mb-6 font-sans">
                As an independent multi-brand fragrance retailer, we maintain strict verification protocols for every bottle entering our distribution facility. We guarantee 100% original flacons with unbroken factory cellophane.
              </p>
              <button
                id="authenticity-read-policy-btn"
                onClick={() => setIsAuthenticityModalOpen(true)}
                className="text-xs font-semibold uppercase tracking-widest text-[#BF8F4A] hover:text-[#EAD1A6] font-sans transition-colors"
              >
                Read our verification standards →
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {points.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] p-5">
                    <Icon className="w-5 h-5 text-[#BF8F4A] mb-3 stroke-[1.5]" />
                    <h4 
                      className="text-sm font-serif font-bold text-[#F7F3EA] mb-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {point.title}
                    </h4>
                    <p className="text-xs text-[#8B877F] leading-relaxed font-sans">
                      {point.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
