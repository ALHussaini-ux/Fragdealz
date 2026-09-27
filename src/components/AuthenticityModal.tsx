import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Award, FileCheck2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthenticityModal: React.FC = () => {
  const { isAuthenticityModalOpen, setIsAuthenticityModalOpen } = useStore();

  if (!isAuthenticityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#F7F3EA] w-full max-w-2xl rounded-[2px] border border-[#1A1A1A] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] bg-[#0B0B0B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#BF8F4A]/40 bg-[#1A1A1A] text-[#BF8F4A] flex items-center justify-center rounded-[2px]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-lg text-[#F7F3EA] font-medium tracking-wide">
                Authenticity Guarantee
              </h3>
              <p className="text-xs text-[#8B877F] font-['Inter']">
                Official FragDealz sourcing and verification standards
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticityModalOpen(false)}
            className="p-1.5 text-[#8B877F] hover:text-[#BF8F4A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#0B0B0B] font-['Inter'] leading-relaxed bg-[#F7F3EA]">
          <div className="bg-white border border-[#E5DFD5] p-4 rounded-[2px]">
            <h4 className="font-['Playfair_Display'] text-sm text-[#0B0B0B] font-semibold mb-1.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#BF8F4A]" />
              <span>Direct Sourcing Promise</span>
            </h4>
            <p className="text-[#8B877F] leading-relaxed">
              FragDealz is an authorized multi-brand retailer representing genuine international and Middle Eastern fragrance houses. We do not sell imitations, testers without boxes, or unauthorized third-party formulations. Every single bottle is 100% genuine and batch-verifiable.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white p-3.5 border border-[#E5DFD5] rounded-[2px]">
              <div className="w-6 h-6 border border-[#BF8F4A]/50 bg-[#0B0B0B] flex items-center justify-center text-[#BF8F4A] shrink-0 font-semibold text-xs rounded-[2px]">
                1
              </div>
              <div>
                <h5 className="font-semibold text-[#0B0B0B] uppercase tracking-[0.1em] text-[11px] mb-1 font-['Inter']">
                  Original Batch Numbers
                </h5>
                <p className="text-[#8B877F]">
                  Every bottle carries an authentic, matching batch code stamped on the bottle base and exterior box. These codes can be verified via standard international fragrance databases (such as CheckFresh).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3.5 border border-[#E5DFD5] rounded-[2px]">
              <div className="w-6 h-6 border border-[#BF8F4A]/50 bg-[#0B0B0B] flex items-center justify-center text-[#BF8F4A] shrink-0 font-semibold text-xs rounded-[2px]">
                2
              </div>
              <div>
                <h5 className="font-semibold text-[#0B0B0B] uppercase tracking-[0.1em] text-[11px] mb-1 font-['Inter']">
                  Verified Distribution Channels
                </h5>
                <p className="text-[#8B877F]">
                  Direct procurement from certified brand manufacturers and official distributors across Dubai, Paris, and authorized European hubs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3.5 border border-[#E5DFD5] rounded-[2px]">
              <div className="w-6 h-6 border border-[#BF8F4A]/50 bg-[#0B0B0B] flex items-center justify-center text-[#BF8F4A] shrink-0 font-semibold text-xs rounded-[2px]">
                3
              </div>
              <div>
                <h5 className="font-semibold text-[#0B0B0B] uppercase tracking-[0.1em] text-[11px] mb-1 font-['Inter']">
                  Temperature-Controlled Warehousing
                </h5>
                <p className="text-[#8B877F]">
                  Fragrances are stored in dark, climate-stabilized storage maintained between 18°C and 21°C to preserve top notes and longevity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3.5 border border-[#E5DFD5] rounded-[2px]">
              <div className="w-6 h-6 border border-[#BF8F4A]/50 bg-[#0B0B0B] flex items-center justify-center text-[#BF8F4A] shrink-0 font-semibold text-xs rounded-[2px]">
                4
              </div>
              <div>
                <h5 className="font-semibold text-[#0B0B0B] uppercase tracking-[0.1em] text-[11px] mb-1 font-['Inter']">
                  Full Money-Back Guarantee
                </h5>
                <p className="text-[#8B877F]">
                  If any bottle purchased from FragDealz is verified as unauthentic by the brand principal, we provide a complete 100% refund immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E5DFD5] flex justify-end">
          <button
            onClick={() => setIsAuthenticityModalOpen(false)}
            className="px-6 py-2.5 bg-[#BF8F4A] hover:bg-[#a87d3f] text-[#0B0B0B] text-xs font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
