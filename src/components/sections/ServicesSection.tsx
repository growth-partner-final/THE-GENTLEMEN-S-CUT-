import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';
import { servicesBarberWorking } from '../../assets/images';
import { Service } from '../../types';
import { Clock, ArrowRight, Check } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { openBooking } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hair', 'Beard', 'Combos', 'Treatments'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-24 bg-[#0B0B0D] relative">
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
                The Service Roster
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F6F6] tracking-tight">
              Bespoke Haircut & Shave Menu
            </h2>
          </div>
          <p className="text-sm text-[#B8B4AA] max-w-md font-light leading-relaxed">
            Every service includes a consultation, warm essential-oil scented towel, neck shave, and tailored styling advice.
          </p>
        </motion.div>

        {/* Category Tabs (Segmented control) with whileInView */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#1F1F24] scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C1C20] text-[#D4A03A] border border-[#D4A03A]/40'
                  : 'text-[#888] hover:text-[#F6F6F6] hover:bg-[#141416]'
              }`}
            >
              {cat === 'All' ? 'All Services' : cat}
            </button>
          ))}
        </motion.div>

        {/* 2-Column Grid: Featured Craft Visual & Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Showcase Feature with whileInView slide-up */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 rounded-xl overflow-hidden border border-[#222226] bg-[#121214] p-3 flex flex-col justify-between"
          >
            <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-4">
              <img
                src={servicesBarberWorking}
                alt="Master barber performing straight razor line out"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-[#F6F6F6] font-display font-semibold">
                Traditional Straight-Razor Detailing
              </div>
            </div>

            <div className="p-2 space-y-3">
              <h3 className="font-display font-semibold text-base text-[#F6F6F6]">
                Our Standard of Grooming
              </h3>
              <p className="text-xs text-[#8F8B82] leading-relaxed">
                We never rush appointments. Every cut is measured against your natural growth patterns and head shape to ensure lasting structure for weeks.
              </p>
              <div className="pt-3 border-t border-[#1F1F24] space-y-2 text-xs text-[#B8B4AA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4A03A]" />
                  <span>Complimentary beverage from our private bar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4A03A]" />
                  <span>Organic botanical shampoos & tonics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4A03A]" />
                  <span>Steam towel & straight razor neck finish</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Service Cards with individual whileInView & viewport stagger */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredServices.map((service: Service, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-xl border border-[#222228] bg-[#131317] hover:bg-[#18181E] hover:border-[#D4A03A]/40 transition-colors duration-300 p-6 flex flex-col justify-between shadow-lg h-full"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      {service.popular && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4A03A] bg-[#D4A03A]/10 px-2 py-0.5 rounded border border-[#D4A03A]/20 inline-block mb-1.5">
                          Signature Service
                        </span>
                      )}
                      <h3 className="font-display font-bold text-lg text-[#F6F6F6] group-hover:text-[#D4A03A] transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-xl font-bold text-[#F6F6F6]">
                        ${service.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#8F8B82] leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E1E24] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#666] font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#D4A03A]" />
                    <span>{service.durationMinutes} mins</span>
                  </div>

                  <button
                    onClick={() => openBooking(service)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-all transform group-hover:scale-105 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
