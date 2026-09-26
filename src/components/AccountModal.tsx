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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl border border-[#E8E5DF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E8E5DF] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#E8E5DF] bg-[#FAF9F6] text-[#111111] flex items-center justify-center font-serif text-sm font-medium">
              AV
            </div>
            <div>
              <h3 className="font-serif text-base text-[#111111] font-normal">
                Arjun Verma
              </h3>
              <p className="text-xs text-[#777777]">
                Customer Account
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-[#777777] hover:text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E5DF] bg-white px-5 text-xs uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 text-[11px] font-medium ${
              activeTab === 'orders'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 text-[11px] font-medium ${
              activeTab === 'addresses'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 text-[11px] font-medium ${
              activeTab === 'profile'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FAF9F6]/50">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-10 text-[#777777]">
                  <p className="text-sm font-serif">No orders found.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#E8E5DF] p-4 sm:p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8E5DF]">
                      <div>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-[#777777] block">
                          Order #{order.id}
                        </span>
                        <span className="text-xs text-[#777777]">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#111111] font-medium">
                          {order.status}
                        </span>
                        <span>•</span>
                        <span className="text-xs font-medium text-[#111111]">
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
                              className="w-10 h-12 object-contain border border-[#E8E5DF] p-0.5 bg-[#FAF9F6]"
                            />
                            <div>
                              <p className="font-serif text-[#111111]">{item.name}</p>
                              <p className="text-[11px] text-[#777777]">{item.brand} • {item.size} • Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-medium text-[#111111]">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking details */}
                    <div className="pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-xs text-[#777777]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#111111]" />
                        <span>Tracking: <strong className="font-mono text-[#111111]">{order.trackingNumber}</strong></span>
                      </div>
                      <span className="text-[11px] text-[#111111]">
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
              <div className="bg-white border border-[#E8E5DF] p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#777777]">
                    Default Shipping Address
                  </span>
                </div>
                <h4 className="font-serif font-medium text-sm text-[#111111]">Arjun Verma</h4>
                <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                  Flat 402, Signature Heights, Perry Cross Road<br />
                  Bandra West, Mumbai, Maharashtra - 400050<br />
                  Phone: +91 98200 12345
                </p>
              </div>

              <div className="bg-white border border-[#E8E5DF] p-4 opacity-75">
                <span className="text-[10px] uppercase tracking-wider text-[#777777]">
                  Office
                </span>
                <h4 className="font-serif font-medium text-sm text-[#111111] mt-2">Arjun Verma</h4>
                <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                  Level 14, Tower B, One BKC, G Block<br />
                  Bandra Kurla Complex, Mumbai - 400051<br />
                  Phone: +91 98200 12345
                </p>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#E8E5DF] p-5 space-y-4 text-xs">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#777777] font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value="Arjun Verma"
                  className="w-full p-2.5 bg-white border border-[#E8E5DF] text-xs text-[#111111]"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#777777] font-medium block mb-1">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value="arjun.verma@example.com"
                  className="w-full p-2.5 bg-white border border-[#E8E5DF] text-xs text-[#111111]"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#777777] font-medium block mb-1">Phone Number</label>
                <input
                  type="text"
                  readOnly
                  value="+91 98200 12345"
                  className="w-full p-2.5 bg-white border border-[#E8E5DF] text-xs text-[#111111]"
                />
              </div>

              <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-between text-xs text-[#777777]">
                <span>Member Since: October 2023</span>
                <span className="text-[#111111] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Account
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E5DF] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              setIsAccountOpen(false);
              setIsWishlistOpen(true);
            }}
            className="text-[#777777] hover:text-[#111111] font-medium flex items-center gap-1 transition-colors"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="px-5 py-2.5 bg-[#111111] hover:bg-[#262626] text-white uppercase text-[11px] font-medium tracking-widest transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
