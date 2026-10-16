import React from 'react';
import { membershipWaiting } from '../../assets/images';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles, ArrowRight, Check } from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const { openBooking } = useApp();

  const benefits = [
    'Unlimited Signature Fades & Executive Haircuts',
    'Priority Booking Window (7 Days in Advance)',
    'Complimentary Single-Malt Whiskey & Espresso Bar',
    'Dedicated Personal Master Barber Assignment',
    'Complimentary Beard Trim & Hot Towel Finish',
    'Guest Pass (2 Guest Cuts per Quarter)',
  ];

  return (
    <section id="membership" className="py-24 bg-[#0E0E12] relative overflow-hidden border-t border-[#1F1F24]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4A03A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A03A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#D4A03A]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A]">
                The Black Card Circle
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F6F6] tracking-tight mb-6">
              Exclusive Gentleman Membership
            </h2>

            <p className="text-sm sm:text-base text-[#B8B4AA] mb-8 font-light leading-relaxed">
              Designed for the discerning executive who demands immaculate grooming without compromise. Experience unhurried luxury with guaranteed priority scheduling, curated privileges, and private lounge access.
            </p>

            <div className="space-y-3.5 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4A03A]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#D4A03A]/30">
                    <Check className="w-3.5 h-3.5 text-[#D4A03A]" />
                  </div>
                  <span className="text-sm text-[#E2DFD8] font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-[0_4px_20px_rgba(212,160,58,0.25)] hover:scale-[1.02]"
              >
                <span>Request Membership</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-[#999] font-mono">
                Limited to 100 members<br />
                <span className="text-[#D4A03A]">28 spots currently available</span>
              </div>
            </div>
          </div>

          {/* Right image/badge card column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4A03A]/30 bg-[#141418] p-3 shadow-2xl">
              <div className="rounded-xl overflow-hidden aspect-[16/10] relative">
                <img
                  src={membershipWaiting}
                  alt="Gentlemen lounge and whiskey bar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-black/40 to-transparent" />
                
                {/* Floating gold badge */}
                <div className="absolute top-4 right-4 bg-[#0B0B0D]/85 backdrop-blur-md border border-[#D4A03A]/40 px-4 py-2 rounded-xl">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#D4A03A]">
                    Annual Tier
                  </div>
                  <div className="font-display font-bold text-lg text-[#F6F6F6]">
                    $2,400 <span className="text-xs font-normal text-[#999]">/ yr</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 bg-[#D4A03A] text-[#0B0B0D] px-3 py-1 rounded-md text-xs font-display font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Private Lounge Access</span>
                  </div>
                  <div className="font-display font-medium text-base text-[#F6F6F6]">
                    Immaculate grooming paired with absolute privacy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
