import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, orders, wishlist, setIsWishlistOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#F7F3EA] w-full max-w-2xl border border-[#1A1A1A] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] rounded-[2px]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1A1A1A] bg-[#0B0B0B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#BF8F4A]/40 bg-[#1A1A1A] text-[#BF8F4A] flex items-center justify-center font-['Playfair_Display'] text-sm font-semibold rounded-[2px]">
              AV
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-base text-[#F7F3EA] font-medium tracking-wide">
                Arjun Verma
              </h3>
              <p className="text-xs text-[#8B877F] font-['Inter']">
                FragDealz Member
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-[#8B877F] hover:text-[#BF8F4A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#1A1A1A] bg-[#0B0B0B] px-5 text-xs uppercase tracking-[0.1em] font-['Inter']">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 text-[11px] font-semibold ${
              activeTab === 'orders'
                ? 'border-[#BF8F4A] text-[#BF8F4A]'
                : 'border-transparent text-[#8B877F] hover:text-[#F7F3EA]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 text-[11px] font-semibold ${
              activeTab === 'addresses'
                ? 'border-[#BF8F4A] text-[#BF8F4A]'
                : 'border-transparent text-[#8B877F] hover:text-[#F7F3EA]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 text-[11px] font-semibold ${
              activeTab === 'profile'
                ? 'border-[#BF8F4A] text-[#BF8F4A]'
                : 'border-transparent text-[#8B877F] hover:text-[#F7F3EA]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Account Details</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F7F3EA]">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-10 text-[#8B877F]">
                  <p className="text-sm font-['Playfair_Display']">No orders found.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#E5DFD5] p-4 sm:p-5 space-y-4 rounded-[2px]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DFD5]">
                      <div>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-[#8B877F] block">
                          Order #{order.id}
                        </span>
                        <span className="text-xs text-[#8B877F] font-['Inter']">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#0B0B0B] font-semibold uppercase tracking-wider bg-[#F7F3EA] px-2 py-0.5 border border-[#E5DFD5] rounded-[2px]">
                          {order.status}
                        </span>
                        <span className="text-[#8B877F]">•</span>
                        <span className="text-sm font-bold text-[#0B0B0B] font-['Playfair_Display']">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-12 object-contain border border-[#E5DFD5] p-0.5 bg-[#F7F3EA]/50 rounded-[2px]"
                            />
                            <div>
                              <p className="font-['Playfair_Display'] font-medium text-[#0B0B0B]">{item.name}</p>
                              <p className="text-[11px] text-[#8B877F] font-['Inter']">{item.brand} • {item.size} • Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#0B0B0B] font-['Playfair_Display']">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking details */}
                    <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between text-xs text-[#8B877F] font-['Inter']">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#BF8F4A]" />
                        <span>Tracking: <strong className="font-mono text-[#0B0B0B]">{order.trackingNumber}</strong></span>
                      </div>
                      <span className="text-[11px] text-[#0B0B0B] font-medium">
                        BlueDart Express
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="bg-white border border-[#BF8F4A]/60 p-4 rounded-[2px]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#BF8F4A] font-semibold">
                    Default Shipping Address
                  </span>
                </div>
                <h4 className="font-['Playfair_Display'] font-medium text-sm text-[#0B0B0B]">Arjun Verma</h4>
                <p className="text-xs text-[#8B877F] mt-1 leading-relaxed font-['Inter']">
                  Flat 402, Signature Heights, Perry Cross Road<br />
                  Bandra West, Mumbai, Maharashtra - 400050<br />
                  Phone: +91 98200 12345
                </p>
              </div>

              <div className="bg-white border border-[#E5DFD5] p-4 rounded-[2px] opacity-80">
                <span className="text-[10px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold">
                  Office
                </span>
                <h4 className="font-['Playfair_Display'] font-medium text-sm text-[#0B0B0B] mt-2">Arjun Verma</h4>
                <p className="text-xs text-[#8B877F] mt-1 leading-relaxed font-['Inter']">
                  Level 14, Tower B, One BKC, G Block<br />
                  Bandra Kurla Complex, Mumbai - 400051<br />
                  Phone: +91 98200 12345
                </p>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#E5DFD5] p-5 space-y-4 text-xs rounded-[2px]">
              <div>
                <label className="text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value="Arjun Verma"
                  className="w-full p-2.5 bg-[#F7F3EA]/30 border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px] font-['Inter']"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value="arjun.verma@example.com"
                  className="w-full p-2.5 bg-[#F7F3EA]/30 border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px] font-['Inter']"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.1em] text-[#8B877F] font-semibold block mb-1">Phone Number</label>
                <input
                  type="text"
                  readOnly
                  value="+91 98200 12345"
                  className="w-full p-2.5 bg-[#F7F3EA]/30 border border-[#E5DFD5] text-xs text-[#0B0B0B] rounded-[2px] font-['Inter']"
                />
              </div>

              <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-between text-xs text-[#8B877F] font-['Inter']">
                <span>Member Since: October 2023</span>
                <span className="text-[#0B0B0B] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#BF8F4A]" />
                  Verified FragDealz Account
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E5DFD5] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              setIsAccountOpen(false);
              setIsWishlistOpen(true);
            }}
            className="text-[#8B877F] hover:text-[#BF8F4A] font-semibold flex items-center gap-1.5 transition-colors uppercase tracking-wider text-[11px]"
          >
            <Heart className="w-3.5 h-3.5 text-[#BF8F4A]" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="px-6 py-2.5 bg-[#BF8F4A] hover:bg-[#a87d3f] text-[#0B0B0B] uppercase text-[11px] font-semibold tracking-[0.12em] rounded-[2px] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
