import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Scissors, Menu, X, Calendar, ShieldAlert, LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    openBooking,
    openAuth,
    currentUser,
    logout,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0D]/95 backdrop-blur-md border-b border-[#262626] py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4A03A]"
              >
                <div className="w-9 h-9 rounded bg-[#1A1A1A] border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A] group-hover:border-[#D4A03A] transition-colors">
                  <Scissors className="w-4 h-4 transform -rotate-45" />
                </div>
                <div>
                  <span className="font-display font-bold tracking-tight text-lg text-[#F6F6F6] block leading-none">
                    THE GENTLEMEN’S CUT
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-[#D4A03A] uppercase block mt-0.5">
                    EST. 2018 · SOHO
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#B8B4AA]">
              <button
                onClick={() => handleNavClick('services')}
                className="hover:text-[#F6F6F6] transition-colors whitespace-nowrap cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick('barbers')}
                className="hover:text-[#F6F6F6] transition-colors whitespace-nowrap cursor-pointer"
              >
                Barbers
              </button>
              <button
                onClick={() => handleNavClick('products')}
                className="hover:text-[#F6F6F6] transition-colors whitespace-nowrap cursor-pointer"
              >
                Apothecary
              </button>
              <button
                onClick={() => handleNavClick('gallery')}
                className="hover:text-[#F6F6F6] transition-colors whitespace-nowrap cursor-pointer"
              >
                Interior
              </button>
              <button
                onClick={() => handleNavClick('hours')}
                className="hover:text-[#F6F6F6] transition-colors whitespace-nowrap cursor-pointer"
              >
                Hours & Location
              </button>
              <button
                onClick={() => handleNavClick('membership')}
                className="hover:text-[#F6F6F6] transition-colors whitespace-nowrap cursor-pointer"
              >
                Membership
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="hover:text-[#F6F6F6] transition-colors whitespace-nowrap cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Zone 3: Actions (Appointments / Admin Preview / Book Primary CTA) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {currentUser?.isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentView('customer_dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded border transition-colors ${
                      currentView === 'customer_dashboard'
                        ? 'bg-[#1A1A1A] text-[#D4A03A] border-[#D4A03A]'
                        : 'text-[#B8B4AA] hover:text-[#F6F6F6] border-[#333333] hover:border-[#555]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#D4A03A]" />
                    <span>My Appointments</span>
                  </button>
                  <button
                    onClick={logout}
                    title="Log Out Demo Session"
                    className="p-2 text-[#888] hover:text-[#F6F6F6] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openAuth}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#B8B4AA] hover:text-[#F6F6F6] border border-[#333333] hover:border-[#555] rounded transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Client Login</span>
                </button>
              )}

              {/* Explicit Admin Preview Trigger */}
              <button
                onClick={() => setCurrentView(currentView === 'admin_dashboard' ? 'home' : 'admin_dashboard')}
                title="Switch to Staff Admin Dashboard View"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded border transition-colors ${
                  currentView === 'admin_dashboard'
                    ? 'bg-[#D4A03A]/20 text-[#D4A03A] border-[#D4A03A]'
                    : 'text-[#888] hover:text-[#D4A03A] border-dashed border-[#444] hover:border-[#D4A03A]/60'
                }`}
              >
                <ShieldAlert className="w-3 h-3 text-[#D4A03A]" />
                <span>Admin Preview</span>
              </button>

              {/* Primary Book CTA */}
              <button
                onClick={() => openBooking()}
                className="px-4 py-2 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-all duration-200 transform hover:scale-[1.02] shadow-[0_2px_12px_rgba(212,160,58,0.25)] whitespace-nowrap cursor-pointer"
              >
                Book a Chair
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openBooking()}
                className="sm:hidden px-3 py-1.5 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] rounded whitespace-nowrap"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#B8B4AA] hover:text-[#F6F6F6] focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#0B0B0D]/98 backdrop-blur-xl flex flex-col p-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#1A1A1A] border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A]">
                <Scissors className="w-4 h-4 transform -rotate-45" />
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-[#F6F6F6]">
                THE GENTLEMEN’S CUT
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#B8B4AA] hover:text-[#F6F6F6]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-6 text-base font-medium">
            <button
              onClick={() => handleNavClick('services')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              Services & Pricing
            </button>
            <button
              onClick={() => handleNavClick('barbers')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              Master Barbers
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              Apothecary Shelf
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              Shop Interior
            </button>
            <button
              onClick={() => handleNavClick('hours')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              Hours & Location
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              Client Reviews
            </button>
            <button
              onClick={() => handleNavClick('membership')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              The Regulars Club
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left text-[#F6F6F6] hover:text-[#D4A03A] py-1 border-b border-[#1A1A1A]"
            >
              Contact & Inquiries
            </button>
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#262626]">
            {currentUser?.isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('customer_dashboard');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded border border-[#333333] text-sm text-[#F6F6F6] bg-[#1A1A1A]"
              >
                <Calendar className="w-4 h-4 text-[#D4A03A]" />
                <span>My Appointments ({currentUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuth();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded border border-[#333333] text-sm text-[#F6F6F6] bg-[#111111]"
              >
                <User className="w-4 h-4 text-[#D4A03A]" />
                <span>Client Login</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('admin_dashboard');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-dashed border-[#444] text-xs font-mono text-[#D4A03A] bg-[#111111]"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Preview Dashboard</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full py-3.5 text-center text-sm font-semibold text-[#0B0B0D] bg-[#D4A03A] rounded shadow-lg"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
};
