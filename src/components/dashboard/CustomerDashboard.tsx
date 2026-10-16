import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, User, ArrowLeft, CheckCircle2, MessageSquare, ShieldCheck, Plus, Bell, Mail, Smartphone, Send, Settings } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    waitlistEntries,
    cancelBooking,
    cancelWaitlist,
    openBooking,
    setCurrentView,
    updateReminderPreferences,
    toggleBookingReminders,
    sendTestReminder,
  } = useApp();

  const [emailReminders, setEmailReminders] = useState<boolean>(currentUser?.emailReminders ?? true);
  const [smsReminders, setSmsReminders] = useState<boolean>(currentUser?.smsReminders ?? true);
  const [reminderTiming, setReminderTiming] = useState<'24h' | '2h' | 'both'>(currentUser?.reminderTiming || 'both');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const userBookings = currentUser
    ? bookings.filter(
        (b) =>
          b.clientEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
          b.clientName?.toLowerCase() === currentUser.name.toLowerCase() ||
          b.customerEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
          b.customerName?.toLowerCase() === currentUser.name.toLowerCase()
      )
    : bookings;

  const userWaitlists = currentUser
    ? waitlistEntries.filter(
        (w) =>
          w.customerEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
          w.customerName?.toLowerCase() === currentUser.name.toLowerCase()
      )
    : waitlistEntries;

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateReminderPreferences({
      emailReminders,
      smsReminders,
      reminderTiming,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F6F6F6] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with back to home */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#222228]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('home')}
              className="w-10 h-10 rounded-xl bg-[#16161A] border border-[#2A2A32] hover:border-[#D4A03A] text-[#999] hover:text-[#F6F6F6] flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#D4A03A]">
                Client Portal
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#F6F6F6]">
                Welcome, {currentUser ? currentUser.name : 'Valued Guest'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openBooking()}
              className="px-6 py-3 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(212,160,58,0.2)] flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Appointment</span>
            </button>
          </div>
        </div>

        {/* Membership Profile Card */}
        <div className="rounded-2xl border border-[#D4A03A]/30 bg-gradient-to-r from-[#16161B] to-[#111114] p-8 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A03A]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#D4A03A] mb-1">
                Membership Status
              </div>
              <div className="font-display font-bold text-xl text-[#F6F6F6]">
                {currentUser?.membershipTier || 'Black Card Member'}
              </div>
              <div className="text-xs text-[#999] mt-1">Soho Atelier Priority Access</div>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#999] mb-1">
                Registered Contact
              </div>
              <div className="text-sm font-medium text-[#F6F6F6]">
                {currentUser ? currentUser.phone : '+1 (555) 382-9100'}
              </div>
              <div className="text-xs text-[#999] mt-0.5">
                {currentUser ? currentUser.email : 'marcus.sterling@example.com'}
              </div>
            </div>

            <div className="flex md:justify-end">
              <div className="p-4 rounded-xl border border-[#222228] bg-[#0E0E12] text-right">
                <div className="font-mono text-[10px] uppercase text-[#999]">Total Visits</div>
                <div className="font-display font-bold text-xl text-[#D4A03A]">12 Sessions</div>
              </div>
            </div>
          </div>
        </div>

        {/* GET REMINDERS & NOTIFICATION CENTER */}
        <div className="rounded-2xl border border-[#2A2A32] bg-[#121216] p-8 mb-12 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#222228]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4A03A]/10 border border-[#D4A03A]/30 flex items-center justify-center text-[#D4A03A]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-[#F6F6F6]">
                  Get Reminders & Notifications
                </h2>
                <p className="text-xs text-[#999]">
                  Never miss a session. Opt-in for instant email or SMS reminders prior to your chair time.
                </p>
              </div>
            </div>

            {savedSuccess && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Preferences Saved Successfully</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Reminders Toggle */}
              <div className="p-5 rounded-xl border border-[#222228] bg-[#16161A] flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#D4A03A]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#F6F6F6]">Email Reminders</h3>
                    <p className="text-xs text-[#999] mt-0.5">
                      Receive calendar invites and detailed visit confirmations at {currentUser?.email || 'your email'}.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailReminders}
                    onChange={(e) => setEmailReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#222228] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A03A]"></div>
                </label>
              </div>

              {/* SMS / Text Reminders Toggle */}
              <div className="p-5 rounded-xl border border-[#222228] bg-[#16161A] flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#D4A03A]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#F6F6F6]">SMS & WhatsApp Alerts</h3>
                    <p className="text-xs text-[#999] mt-0.5">
                      Receive instant text notifications at {currentUser?.phone || 'your phone'}.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsReminders}
                    onChange={(e) => setSmsReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#222228] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A03A]"></div>
                </label>
              </div>
            </div>

            {/* Timing selection */}
            <div className="p-5 rounded-xl border border-[#222228] bg-[#16161A]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#999] mb-3">
                Reminder Schedule Timing
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setReminderTiming('24h')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    reminderTiming === '24h'
                      ? 'border-[#D4A03A] bg-[#D4A03A]/10 text-[#F6F6F6]'
                      : 'border-[#222228] bg-[#111114] text-[#999] hover:border-[#444]'
                  }`}
                >
                  <div className="font-display font-bold text-xs uppercase">24 Hours Prior</div>
                  <div className="text-[10px] text-[#888] mt-0.5">Day before reminder</div>
                </button>

                <button
                  type="button"
                  onClick={() => setReminderTiming('2h')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    reminderTiming === '2h'
                      ? 'border-[#D4A03A] bg-[#D4A03A]/10 text-[#F6F6F6]'
                      : 'border-[#222228] bg-[#111114] text-[#999] hover:border-[#444]'
                  }`}
                >
                  <div className="font-display font-bold text-xs uppercase">2 Hours Prior</div>
                  <div className="text-[10px] text-[#888] mt-0.5">Same-day alert</div>
                </button>

                <button
                  type="button"
                  onClick={() => setReminderTiming('both')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    reminderTiming === 'both'
                      ? 'border-[#D4A03A] bg-[#D4A03A]/10 text-[#F6F6F6]'
                      : 'border-[#222228] bg-[#111114] text-[#999] hover:border-[#444]'
                  }`}
                >
                  <div className="font-display font-bold text-xs uppercase">Both (24h & 2h)</div>
                  <div className="text-[10px] text-[#888] mt-0.5">Recommended coverage</div>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => sendTestReminder('email')}
                  className="px-4 py-2.5 rounded-xl border border-[#2A2A32] bg-[#18181C] hover:border-[#D4A03A] text-[#ccc] text-xs font-mono transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4A03A]" />
                  <span>Test Email Reminder</span>
                </button>
                <button
                  type="button"
                  onClick={() => sendTestReminder('sms')}
                  className="px-4 py-2.5 rounded-xl border border-[#2A2A32] bg-[#18181C] hover:border-[#D4A03A] text-[#ccc] text-xs font-mono transition-colors flex items-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#D4A03A]" />
                  <span>Test SMS Alert</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#D4A03A] hover:bg-[#E5B14B] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(212,160,58,0.2)]"
              >
                Save Reminder Preferences
              </button>
            </div>
          </form>
        </div>

        {/* Upcoming & Past Bookings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-[#F6F6F6]">
              Your Appointments ({userBookings.length})
            </h2>
            <span className="font-mono text-xs text-[#999]">
              Soho Studio • 142 Mercer St
            </span>
          </div>

          {userBookings.length === 0 ? (
            <div className="rounded-2xl border border-[#222228] bg-[#121216] p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#1C1C22] flex items-center justify-center mx-auto text-[#777]">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#F6F6F6]">No Active Appointments</h3>
              <p className="text-xs text-[#999] max-w-sm mx-auto font-light">
                You currently have no scheduled grooming sessions at our Soho studio.
              </p>
              <button
                onClick={() => openBooking()}
                className="mt-4 px-6 py-2.5 bg-[#D4A03A] text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                Book Chair Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {userBookings.map((booking) => {
                const remindersActive = booking.remindersOptIn ?? true;
                return (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-[#222228] bg-[#121216] p-6 flex flex-col gap-6 shadow-lg hover:border-[#D4A03A]/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#D4A03A] bg-[#D4A03A]/10 px-2.5 py-1 rounded border border-[#D4A03A]/20">
                            {booking.id}
                          </span>
                          <span className="font-display font-bold text-lg text-[#F6F6F6]">
                            {booking.serviceName}
                          </span>
                          <span className="font-display font-bold text-base text-[#D4A03A]">
                            ${booking.price || booking.servicePrice}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#B8B4AA] font-light pt-1">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#D4A03A]" />
                            <span>{booking.date} at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#D4A03A]" />
                            <span>Barber: {booking.barberName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#D4A03A]" />
                            <span>{booking.serviceDuration || booking.duration || 45} mins</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {booking.status === 'confirmed' ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase">
                            Confirmed
                          </span>
                        ) : booking.status === 'pending' ? (
                          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono uppercase">
                            Pending Approval
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono uppercase">
                            {booking.status}
                          </span>
                        )}

                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="px-4 py-2 rounded-xl border border-red-500/30 hover:border-red-500 text-red-400 text-xs font-mono transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Per-booking Reminder Status Bar */}
                    <div className="pt-4 border-t border-[#1E1E24] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <Bell className={`w-4 h-4 ${remindersActive ? 'text-[#D4A03A]' : 'text-[#777]'}`} />
                        <span className="text-[#B8B4AA]">
                          Reminders:{' '}
                          <span className={remindersActive ? 'text-[#D4A03A] font-medium' : 'text-[#888]'}>
                            {remindersActive ? 'Active (Email & SMS)' : 'Disabled'}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleBookingReminders(booking.id, !remindersActive, booking.reminderMethod || 'both')}
                          className="px-3 py-1.5 rounded-lg border border-[#2A2A32] bg-[#18181C] hover:border-[#D4A03A] text-[#ccc] font-mono transition-colors"
                        >
                          {remindersActive ? 'Turn Off Reminders' : 'Enable Reminders'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Waitlist Section */}
        <div className="space-y-6 mt-16 pt-12 border-t border-[#222228]">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-[#F6F6F6]">
              Your Active Waitlist Spots ({userWaitlists.length})
            </h2>
            <span className="font-mono text-xs text-[#D4A03A]">
              Priority Notification Queue
            </span>
          </div>

          {userWaitlists.length === 0 ? (
            <div className="rounded-2xl border border-[#222228] bg-[#121216] p-8 text-center space-y-3">
              <p className="text-xs text-[#888] font-light">
                You are not currently on any fully booked time slot waitlists. When booking a fully booked slot, you can join the waitlist to be notified if a spot opens up.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userWaitlists.map((wl) => (
                <div
                  key={wl.id}
                  className="rounded-xl border border-[#D4A03A]/30 bg-[#141419] p-5 flex flex-col justify-between gap-4 shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-display font-bold text-sm text-[#F6F6F6]">
                        {wl.serviceName}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono uppercase">
                        Waitlist Active
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#B8B4AA] font-mono">
                      <div className="flex items-center gap-1 text-[#D4A03A]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{wl.date} at {wl.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#999]">
                        <User className="w-3.5 h-3.5" />
                        <span>{wl.barberName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#222] text-xs">
                    <span className="text-[11px] text-[#888]">
                      Notified via SMS / Email on opening
                    </span>
                    <button
                      onClick={() => cancelWaitlist(wl.id)}
                      className="px-3 py-1.5 rounded-lg border border-red-500/30 hover:border-red-500 text-red-400 font-mono transition-colors"
                    >
                      Leave Waitlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
