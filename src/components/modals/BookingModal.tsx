import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES, BARBERS } from '../../data/mockData';
import { Service, Barber } from '../../types';
import { X, Calendar as CalendarIcon, Clock, User, Scissors, CheckCircle2, MessageSquare, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    bookingModalOpen,
    closeBooking,
    bookingInitialService,
    addBooking,
    currentUser,
  } = useApp();

  if (!bookingModalOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service>(
    bookingInitialService || SERVICES[0]
  );
  const [selectedBarber, setSelectedBarber] = useState<Barber | 'any'>(
    BARBERS[0]
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  
  // Customer details
  const [customerName, setCustomerName] = useState<string>(
    currentUser ? currentUser.name : ''
  );
  const [customerEmail, setCustomerEmail] = useState<string>(
    currentUser ? currentUser.email : ''
  );
  const [customerPhone, setCustomerPhone] = useState<string>(
    currentUser ? currentUser.phone : ''
  );
  const [requestWhatsApp, setRequestWhatsApp] = useState<boolean>(true);
  const [completedBookingId, setCompletedBookingId] = useState<string | null>(null);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM'
  ];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      duration: selectedService.duration,
      barberId: selectedBarber === 'any' ? 'any' : selectedBarber.id,
      barberName: selectedBarber === 'any' ? 'Any Available Master Barber' : selectedBarber.name,
      date: selectedDate,
      time: selectedTime,
      clientName: customerName,
      clientEmail: customerEmail || 'guest@gentlemenscut.com',
      clientPhone: customerPhone,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
      whatsappStatus: requestWhatsApp ? ('demo_queued' as const) : ('not_requested' as const),
    };

    addBooking(newBooking);
    setCompletedBookingId(newBooking.id);
    setStep(5); // Success step
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#121216] border border-[#2A2A32] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222228] bg-[#16161A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4A03A]/10 border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A]">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-[#F6F6F6]">
                Reserve Your Chair
              </div>
              <div className="font-mono text-xs text-[#999]">
                {step === 5 ? 'Reservation Confirmed' : `Step ${step} of 4 — The Gentlemen's Cut`}
              </div>
            </div>
          </div>
          <button
            onClick={closeBooking}
            className="w-8 h-8 rounded-full bg-[#1F1F24] hover:bg-[#2A2A32] text-[#999] hover:text-[#F6F6F6] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="w-full bg-[#1B1B22] h-1">
            <div
              className="bg-[#D4A03A] h-1 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-[#F6F6F6] mb-1">
                  Select Grooming Service
                </h3>
                <p className="text-xs text-[#999] font-light">
                  Choose the signature treatment for your visit.
                </p>
              </div>

              <div className="space-y-3">
                {SERVICES.map((service) => {
                  const isSelected = selectedService.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#D4A03A] bg-[#D4A03A]/10 shadow-[0_0_15px_rgba(212,160,58,0.15)]'
                          : 'border-[#222228] bg-[#18181C] hover:border-[#333]'
                      }`}
                    >
                      <div>
                        <div className="font-display font-bold text-sm text-[#F6F6F6] flex items-center gap-2">
                          <span>{service.name}</span>
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#222] text-[#D4A03A]">
                            {service.duration} mins
                          </span>
                        </div>
                        <p className="text-xs text-[#999] font-light mt-1">
                          {service.description}
                        </p>
                      </div>
                      <div className="font-display font-bold text-base text-[#D4A03A]">
                        ${service.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Continue to Barber</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Barber & Date/Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-[#F6F6F6] mb-1">
                  Select Master Barber & Schedule
                </h3>
                <p className="text-xs text-[#999] font-light">
                  Pick your preferred specialist and appointment slot.
                </p>
              </div>

              {/* Barber choice */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-3">
                  Master Barber
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div
                    onClick={() => setSelectedBarber('any')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      selectedBarber === 'any'
                        ? 'border-[#D4A03A] bg-[#D4A03A]/10 text-[#F6F6F6]'
                        : 'border-[#222228] bg-[#18181C] text-[#999] hover:border-[#333]'
                    }`}
                  >
                    <div className="font-display font-bold text-xs">Any Available</div>
                    <div className="text-[10px] font-mono text-[#D4A03A] mt-1">Fastest Slot</div>
                  </div>

                  {BARBERS.map((barber) => {
                    const isSelected = selectedBarber !== 'any' && selectedBarber.id === barber.id;
                    return (
                      <div
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#D4A03A] bg-[#D4A03A]/10 text-[#F6F6F6]'
                            : 'border-[#222228] bg-[#18181C] text-[#999] hover:border-[#333]'
                        }`}
                      >
                        <div className="font-display font-bold text-xs">{barber.name}</div>
                        <div className="text-[10px] font-mono text-[#D4A03A] mt-1">{barber.role}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-[#333] hover:border-[#D4A03A] text-xs font-mono text-[#F6F6F6] transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Enter Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-[#F6F6F6] mb-1">
                  Your Contact Information
                </h3>
                <p className="text-xs text-[#999] font-light">
                  We'll send your appointment confirmation and SMS reminders here.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                    Full Name <span className="text-[#D4A03A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Marcus Sterling"
                    className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                    Phone Number (SMS / WhatsApp Reminders) <span className="text-[#D4A03A]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C5C1B6] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full bg-[#18181C] border border-[#2A2A32] rounded-xl px-4 py-3 text-sm text-[#F6F6F6] focus:outline-none focus:border-[#D4A03A]"
                  />
                </div>

                {/* WhatsApp simulated checkbox */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-[#222228] bg-[#16161A]">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    checked={requestWhatsApp}
                    onChange={(e) => setRequestWhatsApp(e.target.checked)}
                    className="w-4 h-4 accent-[#D4A03A] rounded cursor-pointer"
                  />
                  <label htmlFor="whatsapp" className="text-xs text-[#E2DFD8] cursor-pointer flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    <span>Send automated WhatsApp confirmation & reminder (Demo simulation)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border border-[#333] hover:border-[#D4A03A] text-xs font-mono text-[#F6F6F6] transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => {
                    if (!customerName || !customerPhone) {
                      alert('Please provide your name and phone number.');
                      return;
                    }
                    setStep(4);
                  }}
                  className="px-6 py-3 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review Summary */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-[#F6F6F6] mb-1">
                  Review & Confirm Reservation
                </h3>
                <p className="text-xs text-[#999] font-light">
                  Please check your appointment details before finalizing.
                </p>
              </div>

              <div className="rounded-xl border border-[#222228] bg-[#18181C] p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-[#222228]">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#999]">Service</div>
                    <div className="font-display font-bold text-base text-[#F6F6F6]">{selectedService.name}</div>
                  </div>
                  <div className="font-display font-bold text-lg text-[#D4A03A]">${selectedService.price}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#222228]">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#999]">Master Barber</div>
                    <div className="text-sm font-medium text-[#F6F6F6] mt-0.5">
                      {selectedBarber === 'any' ? 'Any Available Master Barber' : selectedBarber.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#999]">Duration</div>
                    <div className="text-sm font-medium text-[#F6F6F6] mt-0.5">{selectedService.duration} Minutes</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#222228]">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#999]">Date & Time</div>
                    <div className="text-sm font-medium text-[#F6F6F6] mt-0.5">{selectedDate} at {selectedTime}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#999]">Client</div>
                    <div className="text-sm font-medium text-[#F6F6F6] mt-0.5">{customerName} ({customerPhone})</div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#888] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4A03A] shrink-0" />
                  <span>No cancellation fee up to 4 hours prior. Pay at the Soho studio upon completion.</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl border border-[#333] hover:border-[#D4A03A] text-xs font-mono text-[#F6F6F6] transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleCompleteBooking}
                  className="px-8 py-3.5 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(212,160,58,0.25)] flex items-center gap-2"
                >
                  <span>Confirm Reservation</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Success Confirmation */}
          {step === 5 && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#D4A03A]/20 border border-[#D4A03A]/40 flex items-center justify-center mx-auto text-[#D4A03A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs text-[#D4A03A] uppercase tracking-widest">
                  Reservation Successful
                </span>
                <h3 className="font-display font-bold text-2xl text-[#F6F6F6] mt-1">
                  We Look Forward to Your Visit
                </h3>
                <p className="text-xs text-[#999] mt-2 max-w-sm mx-auto font-light">
                  Your booking ID is <span className="font-mono text-[#D4A03A]">{completedBookingId}</span>. A confirmation SMS has been dispatched to {customerPhone}.
                </p>
              </div>

              {requestWhatsApp && (
                <div className="max-w-md mx-auto p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-[#E2DFD8]">
                    <span className="font-bold text-emerald-400">WhatsApp Simulation Queued:</span> Automated reminder will be sent 2 hours before your appointment at {selectedTime} on {selectedDate}.
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={closeBooking}
                  className="px-6 py-3 rounded-xl border border-[#333] hover:border-[#D4A03A] text-xs font-mono text-[#F6F6F6] transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
