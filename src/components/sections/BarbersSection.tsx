import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { BARBERS } from '../../data/mockData';
import { Barber } from '../../types';
import { Star, Calendar } from 'lucide-react';

export const BarbersSection: React.FC = () => {
  const { openBooking } = useApp();

  return (
    <section id="barbers" className="py-24 bg-[#0E0E11] border-t border-[#1C1C22] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with whileInView scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#D4A03A]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A]">
                The Craftsmen
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F6F6] tracking-tight">
              Master Barbers at Soho
            </h2>
          </div>
          <p className="text-sm text-[#B8B4AA] max-w-md font-light leading-relaxed">
            Every barber at The Gentlemen’s Cut is a career artisan with a minimum of eight years specialized training in traditional grooming architecture.
          </p>
        </motion.div>

        {/* Barber Profiles Grid with whileInView and viewport scroll reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BARBERS.map((barber: Barber, index: number) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-[#26262C] bg-[#121216] overflow-hidden hover:border-[#D4A03A]/50 transition-colors duration-300 flex flex-col justify-between shadow-xl h-full"
            >
              <div>
                {/* Barber Portrait */}
                <div className="relative aspect-square overflow-hidden bg-[#1A1A20]">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent pointer-events-none" />

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-[#0B0B0D]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#333] flex items-center gap-1.5 text-xs">
                    <Star className="w-3.5 h-3.5 text-[#D4A03A] fill-[#D4A03A]" />
                    <span className="font-mono font-medium text-[#F6F6F6]">{barber.rating}</span>
                  </div>
                </div>

                {/* Barber Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-display font-bold text-xl text-[#F6F6F6] group-hover:text-[#D4A03A] transition-colors">
                      {barber.name}
                    </h3>
                    <p className="font-mono text-xs text-[#D4A03A] mt-0.5">
                      {barber.role} · {barber.experienceYears} Yrs Exp.
                    </p>
                  </div>

                  <p className="text-xs text-[#8F8B82] leading-relaxed mb-6 font-light">
                    {barber.bio}
                  </p>

                  {/* Specialties List */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#666] block">
                      Specialties
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {barber.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-[#C5C1B6] bg-[#18181E] px-2.5 py-1 rounded border border-[#2B2B33]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openBooking()}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#F6F6F6] hover:text-[#0B0B0D] bg-[#18181E] hover:bg-[#D4A03A] border border-[#333] hover:border-[#D4A03A] rounded transition-all duration-200 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
