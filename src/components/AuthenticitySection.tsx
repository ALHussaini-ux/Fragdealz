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
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#E8E5DF] p-8 sm:p-12 bg-[#FAF9F6]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest text-[#777777] font-medium block mb-2">
                Authentication Guarantee
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal tracking-tight mb-4">
                Authenticity & batch integrity
              </h2>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mb-6">
                As an independent multi-brand fragrance retailer, we maintain strict verification protocols for every bottle entering our distribution facility. We guarantee 100% original flacons with unbroken seals.
              </p>
              <button
                id="authenticity-read-policy-btn"
                onClick={() => setIsAuthenticityModalOpen(true)}
                className="text-xs font-medium uppercase tracking-widest text-[#111111] hover:underline"
              >
                Read our verification standards →
              </button>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {points.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div key={idx} className="bg-white border border-[#E8E5DF] p-5">
                    <Icon className="w-5 h-5 text-[#111111] mb-3 stroke-[1.5]" />
                    <h4 className="text-sm font-serif font-normal text-[#111111] mb-2">
                      {point.title}
                    </h4>
                    <p className="text-xs text-[#777777] leading-relaxed">
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

