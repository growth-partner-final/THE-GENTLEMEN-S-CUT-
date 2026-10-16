import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, closeAuth, loginUser } = useApp();

  if (!authModalOpen) return null;

  const [email, setEmail] = useState('marcus.sterling@example.com');
  const [name, setName] = useState('Marcus Sterling');
  const [phone, setPhone] = useState('+1 (555) 382-9100');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      phone,
      role: 'customer',
      membershipTier: 'Black Card Member',
      createdAt: new Date().toISOString(),
    });
    closeAuth();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121216] border border-[#2A2A32] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#222228]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4A03A]/10 border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-[#F6F6F6]">
                Client Portal Login
              </div>
              <div className="font-mono text-xs text-[#999]">
                The Gentlemen's Cut
              </div>
            </div>
          </div>
          <button
            onClick={closeAuth}
            className="w-8 h-8 rounded-full bg-[#1F1F24] hover:bg-[#2A2A32] text-[#999] hover:text-[#F6F6F6] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(212,160,58,0.25)] flex items-center justify-center gap-2"
            >
              <span>Access Portal & Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2">
            <span className="text-[11px] text-[#777] font-mono">
              Demo Authentication Simulator • Instant Access
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
