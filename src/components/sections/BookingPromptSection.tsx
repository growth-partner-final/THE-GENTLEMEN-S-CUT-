import React from 'react';
import { useApp } from '../../context/AppContext';
import { bookChairCloseup } from '../../assets/images';
import { Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const BookingPromptSection: React.FC = () => {
  const { openBooking } = useApp();

  return (
    <section className="py-16 bg-[#0E0E11] border-y border-[#1F1F24] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#141418] to-[#1A1A20] border border-[#2B2B33] p-8 sm:p-12 shadow-xl">
            {/* Subtle background image watermark */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-25 md:opacity-40 overflow-hidden pointer-events-none">
              <img
                src={bookChairCloseup}
                alt="Vintage Belmont barber chair closeup"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141418] via-[#141418]/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D4A03A]/10 border border-[#D4A03A]/25 mb-4 text-[#D4A03A] text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Appointment Queue</span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#F6F6F6] mb-4 tracking-tight leading-snug">
                Reserve Your Chair in Soho
              </h2>

              <p className="text-sm sm:text-base text-[#B8B4AA] mb-8 font-light leading-relaxed">
                Skip the queue. Select your preferred master barber, choose a guaranteed time slot, and enjoy relaxed hospitality with zero waiting.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => openBooking()}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-all duration-200 transform hover:scale-[1.02] shadow-[0_2px_15px_rgba(212,160,58,0.25)] cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Select Date & Master Barber</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="flex items-center gap-2 text-xs text-[#8F8B82] px-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4A03A]" />
                  <span>Instant Confirmation & Flexible Rescheduling</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
