import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { BookingPromptSection } from './components/sections/BookingPromptSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { BarbersSection } from './components/sections/BarbersSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { GallerySection } from './components/sections/GallerySection';
import { HoursLocationSection } from './components/sections/HoursLocationSection';
import { MembershipSection } from './components/sections/MembershipSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { ContactSection } from './components/sections/ContactSection';
import { BookingModal } from './components/booking/BookingModal';
import { OTPLoginModal as AuthModal } from './components/auth/OTPLoginModal';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  if (currentView === 'customer_dashboard') {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F6F6F6] font-sans selection:bg-[#D4A03A] selection:text-[#0B0B0D]">
        <Header />
        <CustomerDashboard />
        <Footer />
        <BookingModal />
        <AuthModal />
      </div>
    );
  }

  if (currentView === 'admin_dashboard') {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F6F6F6] font-sans selection:bg-[#D4A03A] selection:text-[#0B0B0D]">
        <Header />
        <AdminDashboard />
        <Footer />
        <BookingModal />
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F6F6F6] font-sans selection:bg-[#D4A03A] selection:text-[#0B0B0D] overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <BookingPromptSection />
        <ServicesSection />
        <BarbersSection />
        <ProductsSection />
        <GallerySection />
        <HoursLocationSection />
        <MembershipSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <BookingModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
