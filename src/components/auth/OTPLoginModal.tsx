import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { X, Phone, KeyRound, User, ArrowRight, ShieldAlert, Sparkles, Check } from 'lucide-react';

export const OTPLoginModal: React.FC = () => {
  const { authModalOpen, closeAuth, loginDemo } = useApp();

  const [authStep, setAuthStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number (min 8 digits)');
      return;
    }
    setErrorMsg('');
    setAuthStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length !== 6) {
      setErrorMsg('Please enter a 6-digit verification code');
      return;
    }
    setErrorMsg('');
    // For demo convenience, check if name already entered or go to profile step
    setAuthStep('profile');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = customerName.trim() || 'Valued Client';
    const finalEmail = customerEmail.trim() || 'client@example.com';
    loginDemo(phoneNumber, finalName, finalEmail);
    // Reset state
    setAuthStep('phone');
    setPhoneNumber('');
    setOtpCode('');
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#121216] border border-[#2B2B33] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative"
          >
        <button
          onClick={() => {
            closeAuth();
            setAuthStep('phone');
          }}
          className="absolute top-4 right-4 p-1.5 text-[#888] hover:text-[#F6F6F6] rounded-lg hover:bg-[#1A1A20]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#D4A03A]/10 border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A] mx-auto mb-3">
            {authStep === 'phone' ? (
              <Phone className="w-5 h-5" />
            ) : authStep === 'otp' ? (
              <KeyRound className="w-5 h-5" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>

          <h3 className="font-display font-bold text-xl text-[#F6F6F6] tracking-tight">
            {authStep === 'phone'
              ? 'Client Phone Sign-In'
              : authStep === 'otp'
              ? 'Enter Verification Code'
              : 'Complete Client Profile'}
          </h3>

          <p className="text-xs text-[#888] mt-1">
            Access your upcoming Soho chair reservations and appointment history.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-200 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {authStep === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#C5C1B6] mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                autoFocus
                placeholder="e.g. +1 (555) 234-5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
              />
            </div>

            {/* Explicit Phase 1 Simulation Note */}
            <div className="p-3 bg-[#0E0E12] border border-[#222] rounded text-[11px] text-[#888]">
              <span className="font-mono text-[#D4A03A] uppercase block mb-0.5">
                Phase 1 Demo Simulation:
              </span>
              No real SMS OTP is dispatched in Phase 1. You may enter any 6 digits (e.g. <span className="font-mono text-[#D4A03A]">123456</span>) in the next step.
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-colors shadow-md"
            >
              <span>Send Verification Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {authStep === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-[#C5C1B6]">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => setAuthStep('phone')}
                  className="text-[11px] text-[#D4A03A] hover:underline"
                >
                  Change {phoneNumber}
                </button>
              </div>
              <input
                type="text"
                required
                maxLength={6}
                autoFocus
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-center font-mono text-xl tracking-[0.3em] text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
              />
            </div>

            <div className="p-2.5 bg-[#0E0E12] border border-[#222] rounded text-[11px] text-[#888] flex items-center justify-between">
              <span>Demo Auto-Fill:</span>
              <button
                type="button"
                onClick={() => setOtpCode('123456')}
                className="px-2 py-0.5 rounded bg-[#1A1A22] text-[#D4A03A] font-mono text-[10px] border border-[#333] hover:border-[#D4A03A]"
              >
                Use 123456
              </button>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-colors"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {authStep === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#C5C1B6] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. Thomas Wright"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C5C1B6] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. thomas@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-colors shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Complete Login & Enter Dashboard</span>
            </button>
          </form>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
