import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { SERVICES, BARBERS } from '../../data/mockData';
import { Service, Barber, Booking } from '../../types';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    bookingModalOpen,
    closeBooking,
    bookingInitialService,
    createBooking,
    currentUser,
    setCurrentView,
    joinWaitlist,
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarberId, setSelectedBarberId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Waitlist state
  const [waitlistModalSlot, setWaitlistModalSlot] = useState<{ time: string } | null>(null);
  const [waitlistName, setWaitlistName] = useState<string>(currentUser?.name || '');
  const [waitlistPhone, setWaitlistPhone] = useState<string>(currentUser?.phone || '');
  const [waitlistEmail, setWaitlistEmail] = useState<string>(currentUser?.email || '');
  const [waitlistSuccess, setWaitlistSuccess] = useState<boolean>(false);

  // Customer form details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [whatsappOptIn, setWhatsappOptIn] = useState<boolean>(false); // MUST start unchecked

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Initialize service from prop or default
  useEffect(() => {
    if (bookingInitialService) {
      setSelectedService(bookingInitialService);
      setStep(2); // Skip to barber step if service was already chosen from homepage
    } else {
      setSelectedService(SERVICES[0]);
      setStep(1);
    }
  }, [bookingInitialService, bookingModalOpen]);

  // Pre-fill user details if logged in
  useEffect(() => {
    if (currentUser?.isLoggedIn) {
      setCustomerName(currentUser.name || '');
      setCustomerPhone(currentUser.phone || '');
      setCustomerEmail(currentUser.email || '');
    }
  }, [currentUser]);

  // Reset modal state on close
  const handleClose = () => {
    setConfirmedBooking(null);
    setStep(1);
    closeBooking();
  };

  // Generate valid upcoming dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates: { dateString: string; label: string; weekday: string; isSunday: boolean }[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      const dateString = d.toISOString().split('T')[0];
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      dates.push({ dateString, label, weekday, isSunday });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  // Set default date to first non-Sunday date if not selected
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      const firstValid = availableDates.find((d) => !d.isSunday);
      if (firstValid) {
        setSelectedDate(firstValid.dateString);
      }
    }
  }, [availableDates, selectedDate]);

  // Deterministic time slots
  const TIME_SLOTS = [
    { time: '09:30 AM', period: 'Morning' },
    { time: '10:15 AM', period: 'Morning' },
    { time: '11:00 AM', period: 'Morning' },
    { time: '11:45 AM', period: 'Morning' },
    { time: '01:30 PM', period: 'Afternoon' },
    { time: '02:15 PM', period: 'Afternoon' },
    { time: '03:00 PM', period: 'Afternoon' },
    { time: '03:45 PM', period: 'Afternoon' },
    { time: '04:30 PM', period: 'Afternoon' },
    { time: '05:15 PM', period: 'Afternoon' },
    { time: '06:00 PM', period: 'Afternoon' },
  ];

  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!customerName.trim()) errors.name = 'Full name is required';
    if (!customerPhone.trim() || customerPhone.trim().length < 7)
      errors.phone = 'Valid phone number is required for booking confirmation';
    if (customerEmail && !/\S+@\S+\.\S+/.test(customerEmail))
      errors.email = 'Please provide a valid email format';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Resolve barber name
    let barberName = 'First Available Master Barber';
    if (selectedBarberId !== 'any') {
      const found = BARBERS.find((b) => b.id === selectedBarberId);
      if (found) barberName = found.name;
    }

    if (!selectedService) return;

    const newBooking = createBooking({
      service: selectedService,
      barberId: selectedBarberId,
      barberName,
      date: selectedDate,
      time: selectedTime || '11:00 AM',
      customerName,
      customerPhone,
      customerEmail,
      notes: customerNotes,
      whatsappOptIn,
    });

    setConfirmedBooking(newBooking);
  };

  return (
    <AnimatePresence>
      {bookingModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#111115] border border-[#2B2B33] rounded-2xl max-w-2xl w-full my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#222228] flex items-center justify-between bg-[#141419] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#1A1A1E] border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A]">
              <Scissors className="w-3.5 h-3.5 transform -rotate-45" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-[#F6F6F6] block">
                {confirmedBooking ? 'Reservation Received' : 'Reserve Your Chair'}
              </span>
              <span className="font-mono text-[10px] text-[#D4A03A] uppercase tracking-wider block">
                {confirmedBooking ? 'Status: Pending Approval' : `Step ${step} of 4`}
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#888] hover:text-[#F6F6F6] transition-colors rounded-lg hover:bg-[#1F1F24]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Progress Indicator (hidden when confirmation shown) */}
        {!confirmedBooking && (
          <div className="grid grid-cols-4 border-b border-[#1E1E24] bg-[#0E0E12] text-center text-xs font-mono shrink-0">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Barber' },
              { num: 3, label: 'Date & Time' },
              { num: 4, label: 'Details' },
            ].map((s) => (
              <div
                key={s.num}
                className={`py-2.5 px-1 border-r border-[#1E1E24] last:border-none flex items-center justify-center gap-1.5 ${
                  step === s.num
                    ? 'text-[#D4A03A] bg-[#14141A] font-semibold border-b-2 border-b-[#D4A03A]'
                    : step > s.num
                    ? 'text-[#999]'
                    : 'text-[#555]'
                }`}
              >
                <span className="w-4 h-4 rounded-full border border-current text-[10px] flex items-center justify-center">
                  {s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body / Steps */}
        <div className="p-6 overflow-y-auto flex-1">
          {confirmedBooking ? (
            /* --- CONFIRMATION SCREEN --- */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#D4A03A]/15 border-2 border-[#D4A03A] flex items-center justify-center text-[#D4A03A] mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="inline-block px-3 py-1 rounded bg-[#D4A03A]/10 border border-[#D4A03A]/30 text-[#D4A03A] text-xs font-mono uppercase tracking-widest mb-3">
                Request Status: Pending Shop Approval
              </div>

              <h3 className="font-display font-bold text-2xl text-[#F6F6F6] mb-2">
                Booking Reference: {confirmedBooking.publicReference}
              </h3>

              <p className="text-xs sm:text-sm text-[#B8B4AA] max-w-md mx-auto mb-6 leading-relaxed font-light">
                Your appointment request has been transmitted to our Soho master barbers. Per shop policy, your slot is held as <strong className="text-[#F6F6F6]">Pending</strong> until confirmed by shop staff.
              </p>

              {/* Summary Card */}
              <div className="rounded-xl border border-[#2B2B33] bg-[#141418] p-5 text-left max-w-md mx-auto mb-6 text-xs space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-[#222]">
                  <span className="text-[#888]">Service:</span>
                  <span className="text-[#F6F6F6] font-medium">
                    {confirmedBooking.serviceName} (${confirmedBooking.servicePrice})
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222]">
                  <span className="text-[#888]">Master Barber:</span>
                  <span className="text-[#F6F6F6] font-medium">
                    {confirmedBooking.barberName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222]">
                  <span className="text-[#888]">Date & Time:</span>
                  <span className="text-[#D4A03A] font-mono font-semibold">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222]">
                  <span className="text-[#888]">Client Contact:</span>
                  <span className="text-[#F6F6F6]">
                    {confirmedBooking.customerName} ({confirmedBooking.customerPhone})
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#888]">WhatsApp Opt-in:</span>
                  <span className="text-[#C5C1B6]">
                    {confirmedBooking.whatsappOptIn ? 'Consented (Demo Mode: Queued)' : 'Not requested'}
                  </span>
                </div>
              </div>

              {/* Prototype Truthful Note */}
              <div className="p-3 bg-[#0B0B0D] rounded border border-[#222] text-[11px] text-[#888] max-w-md mx-auto mb-6">
                <span className="font-mono text-[#D4A03A] uppercase block mb-0.5">
                  Phase 1 Demo Confirmation Notice:
                </span>
                This demo booking is stored locally in your browser state. You can inspect it in <strong className="text-[#C5C1B6]">My Appointments</strong> or toggle to <strong className="text-[#C5C1B6]">Admin Preview</strong> to simulate staff approval.
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    handleClose();
                    setCurrentView('customer_dashboard');
                  }}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-colors"
                >
                  View in My Appointments
                </button>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-medium text-[#B8B4AA] hover:text-[#F6F6F6] bg-[#18181E] border border-[#333] rounded transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* --- STEP 1: SELECT SERVICE --- */
            <div>
              <h3 className="font-display font-semibold text-lg text-[#F6F6F6] mb-1">
                Select Your Desired Service
              </h3>
              <p className="text-xs text-[#888] mb-5">
                Every service includes a tailored consultation, hot towel finish, and styling advice.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {SERVICES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedService?.id === s.id
                        ? 'bg-[#1C1C24] border-[#D4A03A] shadow-md'
                        : 'bg-[#131317] border-[#222228] hover:border-[#444]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="font-display font-bold text-sm text-[#F6F6F6]">
                        {s.name}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#D4A03A]">
                        ${s.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#888] line-clamp-2 mb-2 leading-relaxed">
                      {s.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#666]">
                      <Clock className="w-3 h-3 text-[#D4A03A]" />
                      <span>{s.durationMinutes} Minutes</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#1E1E24]">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedService}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] disabled:opacity-50 rounded transition-colors"
                >
                  <span>Continue to Barber</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            /* --- STEP 2: CHOOSE BARBER --- */
            <div>
              <h3 className="font-display font-semibold text-lg text-[#F6F6F6] mb-1">
                Choose Your Master Barber
              </h3>
              <p className="text-xs text-[#888] mb-5">
                Select a specific craftsman or pick First Available for the earliest opening.
              </p>

              {/* Any Available Option */}
              <div
                onClick={() => setSelectedBarberId('any')}
                className={`p-4 rounded-xl border mb-3 cursor-pointer transition-all flex items-center justify-between ${
                  selectedBarberId === 'any'
                    ? 'bg-[#1C1C24] border-[#D4A03A]'
                    : 'bg-[#131317] border-[#222228] hover:border-[#444]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1F1F26] border border-[#333] flex items-center justify-center text-[#D4A03A]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-[#F6F6F6]">
                      First Available Master Barber
                    </div>
                    <div className="text-xs text-[#888]">
                      Optimal for prompt booking across all chairs
                    </div>
                  </div>
                </div>
                {selectedBarberId === 'any' && (
                  <CheckCircle2 className="w-5 h-5 text-[#D4A03A]" />
                )}
              </div>

              {/* Specific Barbers */}
              <div className="space-y-3 mb-6">
                {BARBERS.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBarberId(b.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedBarberId === b.id
                        ? 'bg-[#1C1C24] border-[#D4A03A]'
                        : 'bg-[#131317] border-[#222228] hover:border-[#444]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={b.avatar}
                        alt={b.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#333]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-display font-bold text-sm text-[#F6F6F6]">
                          {b.name}
                        </div>
                        <div className="text-xs text-[#D4A03A] font-mono">
                          {b.role} · {b.experienceYears} Yrs Exp.
                        </div>
                        <div className="text-[11px] text-[#777] mt-0.5">
                          {b.specialties.join(' · ')}
                        </div>
                      </div>
                    </div>
                    {selectedBarberId === b.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#D4A03A]" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1E1E24]">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#888] hover:text-[#F6F6F6] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-colors"
                >
                  <span>Continue to Date & Time</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : step === 3 ? (
            /* --- STEP 3: PICK DATE AND TIME --- */
            <div>
              <h3 className="font-display font-semibold text-lg text-[#F6F6F6] mb-1">
                Select Appointment Date & Time
              </h3>
              <p className="text-xs text-[#888] mb-4">
                Sundays are closed for craft maintenance. Future dates are shown below.
              </p>

              {/* Date Selector Row */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#777] block mb-2">
                  Select Date (Next 14 Days)
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {availableDates.map((d, i) => (
                    <button
                      key={i}
                      disabled={d.isSunday}
                      onClick={() => !d.isSunday && setSelectedDate(d.dateString)}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-2.5 px-2 rounded-xl border text-xs transition-all ${
                        d.isSunday
                          ? 'opacity-30 bg-[#0E0E12] border-[#222] cursor-not-allowed text-[#555]'
                          : selectedDate === d.dateString
                          ? 'bg-[#1F1F28] border-[#D4A03A] text-[#F6F6F6] font-bold shadow-md'
                          : 'bg-[#131317] border-[#222228] text-[#888] hover:border-[#444] hover:text-[#F6F6F6]'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-[#D4A03A]">
                        {d.weekday}
                      </span>
                      <span className="font-display font-semibold text-sm mt-0.5">
                        {d.label}
                      </span>
                      {d.isSunday && (
                        <span className="text-[9px] text-red-400 mt-0.5">Closed</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#777]">
                    Select Time Slot ({selectedService?.durationMinutes} min session)
                  </span>
                  <span className="text-[10px] text-[#D4A03A] font-mono">
                    * Some high-demand slots show 'Fully Booked' (Join Waitlist available)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot, i) => {
                    const fullyBooked = (i + selectedDate.length) % 5 === 2;
                    return fullyBooked ? (
                      <div
                        key={i}
                        className="py-2.5 px-3 rounded-lg border border-[#332211] bg-[#1A1410] flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono text-[#D4A03A] block font-semibold">
                            {slot.time}
                          </span>
                          <span className="text-[10px] text-amber-500/90 font-mono">
                            Fully Booked
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setWaitlistModalSlot({ time: slot.time })}
                          className="px-2.5 py-1 rounded bg-[#D4A03A]/20 hover:bg-[#D4A03A]/30 text-[#D4A03A] border border-[#D4A03A]/40 text-[10px] font-mono font-bold transition-colors cursor-pointer"
                        >
                          Join Waitlist
                        </button>
                      </div>
                    ) : (
                      <button
                        key={i}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2.5 px-3 rounded-lg border text-xs font-mono transition-all text-left flex items-center justify-between ${
                          selectedTime === slot.time
                            ? 'bg-[#D4A03A] text-[#0B0B0D] font-bold border-[#D4A03A]'
                            : 'bg-[#131317] border-[#222228] text-[#B8B4AA] hover:border-[#444] hover:text-[#F6F6F6]'
                        }`}
                      >
                        <span>{slot.time}</span>
                        <span className="text-[10px] text-emerald-400/90 font-sans">Available</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Waitlist Modal Overlay */}
              {waitlistModalSlot && (
                <div className="absolute inset-0 bg-[#0B0B0D]/95 backdrop-blur-md z-30 flex items-center justify-center p-6">
                  <div className="bg-[#141419] border border-[#2B2B33] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                    {waitlistSuccess ? (
                      <div className="text-center py-4">
                        <div className="w-14 h-14 rounded-full bg-[#D4A03A]/15 border-2 border-[#D4A03A] flex items-center justify-center text-[#D4A03A] mx-auto mb-4 animate-bounce">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h3 className="font-display font-bold text-xl text-[#F6F6F6] mb-2">
                          You're on the Waitlist!
                        </h3>
                        <p className="text-xs text-[#B8B4AA] mb-6 leading-relaxed font-light">
                          We have added you to the waitlist for <strong className="text-[#D4A03A] font-mono">{selectedDate}</strong> at <strong className="text-[#D4A03A] font-mono">{waitlistModalSlot.time}</strong>. If a spot opens up, you will be notified instantly via SMS or email.
                        </p>
                        <button
                          onClick={() => {
                            setWaitlistSuccess(false);
                            setWaitlistModalSlot(null);
                          }}
                          className="w-full py-3 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-semibold text-xs rounded transition-colors"
                        >
                          Return to Booking
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#222]">
                          <div>
                            <h3 className="font-display font-bold text-base text-[#F6F6F6]">
                              Join Time Slot Waitlist
                            </h3>
                            <p className="text-[11px] text-[#888] font-mono">
                              {selectedDate} · {waitlistModalSlot.time} ({selectedService?.name})
                            </p>
                          </div>
                          <button
                            onClick={() => setWaitlistModalSlot(null)}
                            className="text-[#888] hover:text-[#F6F6F6]"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!waitlistName.trim() || !waitlistPhone.trim()) {
                              alert('Please enter your name and phone number');
                              return;
                            }
                            let barberName = 'First Available Master Barber';
                            if (selectedBarberId !== 'any') {
                              const b = BARBERS.find((item) => item.id === selectedBarberId);
                              if (b) barberName = b.name;
                            }
                            if (!selectedService) return;

                            joinWaitlist({
                              service: selectedService,
                              barberId: selectedBarberId,
                              barberName,
                              date: selectedDate,
                              time: waitlistModalSlot.time,
                              customerName: waitlistName,
                              customerPhone: waitlistPhone,
                              customerEmail: waitlistEmail,
                            });
                            setWaitlistSuccess(true);
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-xs font-medium text-[#C5C1B6] mb-1">
                              Full Name <span className="text-[#D4A03A]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={waitlistName}
                              onChange={(e) => setWaitlistName(e.target.value)}
                              placeholder="e.g. Thomas Wright"
                              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#C5C1B6] mb-1">
                              Phone Number <span className="text-[#D4A03A]">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={waitlistPhone}
                              onChange={(e) => setWaitlistPhone(e.target.value)}
                              placeholder="+1 (555) 000-0000"
                              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#C5C1B6] mb-1">
                              Email Address (Optional)
                            </label>
                            <input
                              type="email"
                              value={waitlistEmail}
                              onChange={(e) => setWaitlistEmail(e.target.value)}
                              placeholder="e.g. thomas@example.com"
                              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
                            />
                          </div>
                          <div className="pt-2">
                            <button
                              type="submit"
                              className="w-full py-3 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-semibold text-xs rounded transition-colors shadow-md cursor-pointer"
                            >
                              Join Waitlist for This Slot
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#1E1E24]">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#888] hover:text-[#F6F6F6] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] disabled:opacity-50 rounded transition-colors"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* --- STEP 4: CUSTOMER DETAILS & CONSENT --- */
            <form onSubmit={handleStep4Submit}>
              <h3 className="font-display font-semibold text-lg text-[#F6F6F6] mb-1">
                Guest & Customer Details
              </h3>
              <p className="text-xs text-[#888] mb-5">
                No account required. Enter your contact information for reservation verification.
              </p>

              {/* Summary Reminder Bar */}
              <div className="p-3 bg-[#16161C] border border-[#262630] rounded-xl mb-5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Scissors className="w-3.5 h-3.5 text-[#D4A03A]" />
                  <span className="text-[#F6F6F6] font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[#D4A03A]">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{selectedDate} · {selectedTime}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-[#C5C1B6] mb-1.5">
                    Full Name <span className="text-[#D4A03A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thomas Wright"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C5C1B6] mb-1.5">
                      Phone Number <span className="text-[#D4A03A]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#C5C1B6] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. thomas@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C5C1B6] mb-1.5">
                    Special Cut / Beard Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Skin fade with low drop, trimming beard 1/2 inch"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0B0B0D] border border-[#2B2B33] text-sm text-[#F6F6F6] placeholder-[#555] focus:outline-none focus:border-[#D4A03A]"
                  />
                </div>

                {/* Explicit WhatsApp Opt-in Checkbox (Mandatory Unchecked Default) */}
                <div className="p-3.5 rounded-xl border border-[#2A2A33] bg-[#0E0E12] flex items-start gap-3">
                  <input
                    id="whatsapp-consent"
                    type="checkbox"
                    checked={whatsappOptIn}
                    onChange={(e) => setWhatsappOptIn(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#444] text-[#D4A03A] focus:ring-[#D4A03A] bg-[#141418]"
                  />
                  <label htmlFor="whatsapp-consent" className="text-xs text-[#B8B4AA] cursor-pointer">
                    <span className="text-[#F6F6F6] font-medium flex items-center gap-1.5 mb-0.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Optional: Receive booking status updates via WhatsApp</span>
                    </span>
                    <span>
                      I explicitly consent to receive transactional booking reminders on this mobile number. (Demo: simulation only in Phase 1).
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1E1E24]">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#888] hover:text-[#F6F6F6] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-colors shadow-lg cursor-pointer"
                >
                  <span>Submit Booking Request</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
);
};
