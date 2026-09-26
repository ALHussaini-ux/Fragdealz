import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Award, FileCheck2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthenticityModal: React.FC = () => {
  const { isAuthenticityModalOpen, setIsAuthenticityModalOpen } = useStore();

  if (!isAuthenticityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-sm border border-[#EDE9E2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E5DF] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#E8E5DF] text-[#111111] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#111111] font-normal">
                Authenticity Guarantee
              </h3>
              <p className="text-xs text-[#777777]">
                Official sourcing and verification standards
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticityModalOpen(false)}
            className="p-1.5 text-[#777777] hover:text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#555555] leading-relaxed">
          <div className="bg-[#FAF9F6] border border-[#E8E5DF] p-4">
            <h4 className="font-serif text-sm text-[#111111] font-medium mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#111111]" />
              <span>Direct Sourcing Promise</span>
            </h4>
            <p>
              We are an authorized multi-brand retailer representing genuine international and Middle Eastern fragrance houses. We do not sell imitations, testers without boxes, or unauthorized third-party formulations. Every item is 100% original.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 border border-[#E8E5DF] bg-[#FAF9F6] flex items-center justify-center text-[#111111] shrink-0 font-medium text-xs">
                1
              </div>
              <div>
                <h5 className="font-medium text-[#111111] uppercase tracking-wider text-[11px] mb-1">
                  Original Batch Numbers
                </h5>
                <p>
                  Every bottle carries an authentic, matching batch code stamped on the bottle base and exterior box. These codes can be verified via standard international fragrance databases (such as CheckFresh).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 border border-[#E8E5DF] bg-[#FAF9F6] flex items-center justify-center text-[#111111] shrink-0 font-medium text-xs">
                2
              </div>
              <div>
                <h5 className="font-medium text-[#111111] uppercase tracking-wider text-[11px] mb-1">
                  Verified Distribution Channels
                </h5>
                <p>
                  Direct procurement from certified brand manufacturers and official distributors across Dubai, Paris, and authorized European hubs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 border border-[#E8E5DF] bg-[#FAF9F6] flex items-center justify-center text-[#111111] shrink-0 font-medium text-xs">
                3
              </div>
              <div>
                <h5 className="font-medium text-[#111111] uppercase tracking-wider text-[11px] mb-1">
                  Temperature-Controlled Warehousing
                </h5>
                <p>
                  Fragrances are stored in dark, climate-stabilized storage maintained between 18°C and 21°C to preserve top notes and longevity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 border border-[#E8E5DF] bg-[#FAF9F6] flex items-center justify-center text-[#111111] shrink-0 font-medium text-xs">
                4
              </div>
              <div>
                <h5 className="font-medium text-[#111111] uppercase tracking-wider text-[11px] mb-1">
                  Full Money-Back Guarantee
                </h5>
                <p>
                  If any bottle purchased from us is verified as unauthentic by the brand principal, we provide a complete 100% refund immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E5DF] flex justify-end">
          <button
            onClick={() => setIsAuthenticityModalOpen(false)}
            className="px-6 py-2.5 bg-[#111111] hover:bg-[#262626] text-white text-xs font-medium tracking-widest uppercase transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
