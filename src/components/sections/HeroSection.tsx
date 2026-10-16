import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { heroBarberClient } from '../../assets/images';
import { Scissors, ArrowRight, Award, Clock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { openBooking } = useApp();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 lg:py-28 overflow-hidden bg-[#0B0B0D]"
    >
      {/* Subtle ambient gold radial background glow with parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/4 -left-48 w-96 h-96 bg-[#D4A03A]/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#D4A03A]/3 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Overline Kicker */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-[1px] bg-[#D4A03A]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4A03A]">
                Soho Manhattan · Est. 2018
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F6F6F6] leading-[1.08] mb-6">
              The Craft of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A03A] via-[#E5B14B] to-[#C89530]">
                Timeless Grooming
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-[#B8B4AA] leading-relaxed max-w-2xl mb-8 font-light">
              Elevating the ritual of modern masculine refinement. Experience bespoke scissor architecture, traditional hot towel straight-razor tapers, and restorative lounge hospitality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-all duration-200 transform hover:scale-[1.02] shadow-[0_4px_20px_rgba(212,160,58,0.3)] cursor-pointer"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#F6F6F6] hover:text-[#D4A03A] bg-[#141416] hover:bg-[#1A1A1E] border border-[#2E2E33] hover:border-[#D4A03A]/50 rounded transition-all duration-200"
              >
                <span>Explore Services & Rates</span>
              </a>
            </div>

            {/* Single-Line Micro Trust Indicators */}
            <div className="pt-6 border-t border-[#1F1F24] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#8F8B82]">
              <div className="flex items-center gap-2">
                <Scissors className="w-3.5 h-3.5 text-[#D4A03A]" />
                <span>Master Craftsmen Only</span>
              </div>
              <span className="text-[#333]" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4A03A]" />
                <span>Zero Wait Policy</span>
              </div>
              <span className="text-[#333]" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#D4A03A]" />
                <span>Soho Grooming Award 2025</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Cinematic Photography with Parallax (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Decorative Gold Border Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D4A03A]/30 p-2 bg-[#121214] shadow-2xl">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                  <motion.img
                    style={{ y: imageY }}
                    src={heroBarberClient}
                    alt="Master barber providing precision haircut in Belmont leather chair"
                    className="w-full h-full object-cover object-center transform scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B0B0D]/90 backdrop-blur-md p-3.5 rounded-lg border border-[#333] flex items-center justify-between">
                    <div>
                      <div className="font-display font-semibold text-xs text-[#F6F6F6]">
                        Signature Fade & Sculpt
                      </div>
                      <div className="font-mono text-[11px] text-[#D4A03A]">
                        By Marcus Vance · Soho
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-bold text-[#F6F6F6]">
                        $35
                      </div>
                      <div className="text-[10px] text-[#888]">
                        45 Minutes
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Ring */}
              <div className="hidden sm:block absolute -bottom-5 -right-5 -z-10 w-full h-full rounded-2xl border border-[#D4A03A]/15 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
