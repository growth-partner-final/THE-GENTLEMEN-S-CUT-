import React from 'react';
import { hoursBarberPortrait } from '../../assets/images';
import { SHOP_INFO } from '../../data/mockData';
import { Clock, MapPin, Phone, ExternalLink, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScrollReveal } from '../common/ScrollReveal';

export const HoursLocationSection: React.FC = () => {
  const { openBooking } = useApp();

  return (
    <section id="hours" className="py-24 bg-[#0B0B0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Master Barber Portrait (5 cols on lg) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4A03A]/25 p-2 bg-[#121215] shadow-2xl">
              <div className="rounded-xl overflow-hidden aspect-[3/4]">
                <img
                  src={hoursBarberPortrait}
                  alt="Portrait of master barber in Soho studio"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-display font-semibold text-sm text-[#F6F6F6]">
                    "Punctuality is the courtesy of gentlemen."
                  </div>
                  <div className="font-mono text-xs text-[#D4A03A] mt-1">
                    — Marcus Vance, Founder
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Hours, Location & Directions (7 cols on lg) */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-[#D4A03A]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A]">
                  The Workshop
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F6F6] tracking-tight mb-6">
                Hours & Soho Atelier
              </h2>

              <p className="text-sm sm:text-base text-[#B8B4AA] mb-8 font-light leading-relaxed">
                Located on historic Mercer Street between Prince and Houston. A short walk from the Prince St (N/R/W) and Broadway-Lafayette (B/D/F/M) subway stations.
              </p>

              {/* Operating Hours Table */}
              <div className="rounded-2xl border border-[#222228] bg-[#121216] p-6 mb-8 shadow-md">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#1F1F24] text-sm font-semibold text-[#F6F6F6] font-display">
                  <Clock className="w-4 h-4 text-[#D4A03A]" />
                  <span>Weekly Operational Schedule</span>
                </div>

                <div className="space-y-3">
                  {SHOP_INFO.hours.map((schedule, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2 border-b border-[#1B1B20] last:border-none text-sm"
                    >
                      <span className="font-medium text-[#C5C1B6]">
                        {schedule.days}
                      </span>
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded ${
                          schedule.closed
                            ? 'bg-[#1E1E24] text-[#888]'
                            : 'bg-[#D4A03A]/10 text-[#D4A03A] border border-[#D4A03A]/20'
                        }`}
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address & Navigation Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-xl border border-[#222228] bg-[#121216]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4A03A] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Physical Address</span>
                  </div>
                  <div className="text-sm text-[#F6F6F6] font-medium leading-snug">
                    {SHOP_INFO.address}<br />
                    {SHOP_INFO.city}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-[#222228] bg-[#121216]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4A03A] mb-2">
                    <Phone className="w-4 h-4" />
                    <span>Concierge Direct</span>
                  </div>
                  <div className="text-sm text-[#F6F6F6] font-medium leading-snug">
                    <a href={`tel:${SHOP_INFO.phone}`} className="hover:text-[#D4A03A] transition-colors">
                      {SHOP_INFO.phone}
                    </a>
                    <div className="text-xs text-[#888] font-mono mt-0.5">
                      Call or Text for Assistance
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://maps.google.com/?q=142+Mercer+Street,+New+York,+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#F6F6F6] hover:text-[#0B0B0D] bg-[#1A1A20] hover:bg-[#D4A03A] border border-[#333] hover:border-[#D4A03A] rounded transition-all duration-200"
                >
                  <Compass className="w-4 h-4 text-[#D4A03A] group-hover:text-[#0B0B0D]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>

                <button
                  onClick={() => openBooking()}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-all duration-200 cursor-pointer"
                >
                  <span>Reserve Appointment</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
