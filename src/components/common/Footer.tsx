import React from 'react';
import { Scissors, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SHOP_INFO } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, openBooking } = useApp();

  return (
    <footer className="bg-[#070709] border-t border-[#222222] text-[#B8B4AA] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand & Craft */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded bg-[#1A1A1A] border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A]">
                <Scissors className="w-4 h-4 transform -rotate-45" />
              </div>
              <span className="font-display font-bold tracking-tight text-lg text-[#F6F6F6]">
                THE GENTLEMEN’S CUT
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-[#8F8B82]">
              A timeless sanctuary of classic barbering, precision straight-razor craft, and bespoke men’s grooming located in the heart of historic Soho.
            </p>
            <div className="font-mono text-xs text-[#D4A03A] tracking-wider uppercase">
              By Appointment & Walk-In
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[#F6F6F6] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A03A] transition-colors"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    document.getElementById('barbers')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A03A] transition-colors"
                >
                  Master Barbers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A03A] transition-colors"
                >
                  Grooming Apothecary
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4A03A] transition-colors"
                >
                  The Regulars Club
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBooking()}
                  className="text-[#D4A03A] hover:underline font-medium"
                >
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[#F6F6F6] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4A03A]" />
              <span>Shop Hours</span>
            </h4>
            <ul className="space-y-2 text-sm text-[#8F8B82]">
              {SHOP_INFO.hours.map((h, i) => (
                <li key={i} className="flex justify-between items-center py-1 border-b border-[#1A1A1A]">
                  <span className="text-[#C5C1B6]">{h.days}</span>
                  <span className={h.closed ? 'text-[#888] italic' : 'text-[#D4A03A] font-mono text-xs'}>
                    {h.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Location */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[#F6F6F6] uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4A03A]" />
              <span>Soho Atelier</span>
            </h4>
            <p className="text-sm text-[#8F8B82] mb-3 leading-relaxed">
              {SHOP_INFO.address}<br />
              {SHOP_INFO.city}
            </p>
            <div className="space-y-1.5 text-sm mb-4">
              <div className="flex items-center gap-2 text-[#C5C1B6]">
                <Phone className="w-3.5 h-3.5 text-[#D4A03A]" />
                <a href={`tel:${SHOP_INFO.phone}`} className="hover:text-[#D4A03A] font-mono text-xs">
                  {SHOP_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#C5C1B6]">
                <Mail className="w-3.5 h-3.5 text-[#D4A03A]" />
                <a href={`mailto:${SHOP_INFO.email}`} className="hover:text-[#D4A03A] font-mono text-xs">
                  {SHOP_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Prototype Notice */}
        <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
          <div>
            © 2026 The Gentlemen’s Cut Soho LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#888] bg-[#111111] px-3 py-1.5 rounded border border-[#222]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A03A]" />
            <span>PHASE 1: FRONTEND UI PROTOTYPE · LOCAL DEMO PERSISTENCE ONLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
