import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, ArrowLeft, Calendar, User, CheckCircle2, XCircle, MessageSquare, Clock, Filter } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { bookings, updateBookingStatus, setCurrentView } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [whatsappSimulationLog, setWhatsappSimulationLog] = useState<string | null>(null);

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === statusFilter);

  const triggerWhatsAppSimulation = (bookingId: string, clientName: string, time: string) => {
    setWhatsappSimulationLog(
      `[WhatsApp API Simulation Sent to ${clientName}]: "Hello ${clientName}, your appointment at The Gentlemen's Cut is confirmed for ${time} at 142 Mercer St, Soho. See you soon!"`
    );
    setTimeout(() => {
      setWhatsappSimulationLog(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F6F6F6] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Alert for Admin Preview */}
        <div className="mb-8 p-4 rounded-2xl bg-[#D4A03A]/10 border border-[#D4A03A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4A03A]/20 flex items-center justify-center text-[#D4A03A] shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#F6F6F6]">
                ADMINISTRATIVE WORKSPACE PREVIEW
              </div>
              <div className="text-xs text-[#B8B4AA] font-light">
                Manage Soho studio appointments, verify WhatsApp reminder queues, and review customer reservations.
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="px-5 py-2.5 bg-[#1A1A1E] hover:bg-[#222228] border border-[#333] text-xs font-mono text-[#F6F6F6] rounded-xl transition-colors flex items-center gap-2 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </button>
        </div>

        {whatsappSimulationLog && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fadeIn">
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span>{whatsappSimulationLog}</span>
          </div>
        )}

        {/* Dashboard KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl border border-[#222228] bg-[#121216]">
            <div className="text-xs font-mono uppercase text-[#999] mb-1">Total Bookings</div>
            <div className="font-display font-bold text-3xl text-[#F6F6F6]">{bookings.length}</div>
            <div className="text-xs text-[#D4A03A] mt-1 font-mono">Soho Studio Active</div>
          </div>

          <div className="p-6 rounded-2xl border border-[#222228] bg-[#121216]">
            <div className="text-xs font-mono uppercase text-[#999] mb-1">Confirmed Reservations</div>
            <div className="font-display font-bold text-3xl text-emerald-400">
              {bookings.filter((b) => b.status === 'confirmed').length}
            </div>
            <div className="text-xs text-[#999] mt-1 font-mono">Ready for service</div>
          </div>

          <div className="p-6 rounded-2xl border border-[#222228] bg-[#121216]">
            <div className="text-xs font-mono uppercase text-[#999] mb-1">WhatsApp Status</div>
            <div className="font-display font-bold text-3xl text-amber-400">Queued</div>
            <div className="text-xs text-[#999] mt-1 font-mono">Automated reminders ready</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="font-display font-bold text-xl text-[#F6F6F6]">
            Appointment Queue ({filteredBookings.length})
          </h2>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#D4A03A]" />
            <span className="text-xs font-mono text-[#999]">Filter Status:</span>
            {['all', 'confirmed', 'completed', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-colors ${
                  statusFilter === st
                    ? 'bg-[#D4A03A] text-[#0B0B0D] font-bold'
                    : 'bg-[#18181C] text-[#999] hover:text-[#F6F6F6]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="rounded-2xl border border-[#222228] bg-[#121216] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222228] bg-[#16161A] text-[11px] font-mono uppercase text-[#999]">
                  <th className="py-4 px-6">ID & Client</th>
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Master Barber</th>
                  <th className="py-4 px-6">Date & Time</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E24] text-sm">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#16161A]/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-mono text-xs text-[#D4A03A]">{b.id}</div>
                      <div className="font-display font-bold text-[#F6F6F6]">{b.clientName}</div>
                      <div className="text-xs text-[#999]">{b.clientPhone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#F6F6F6]">{b.serviceName}</div>
                      <div className="font-mono text-xs text-[#D4A03A]">${b.price} ({b.duration}m)</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[#C5C1B6]">{b.barberName}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[#F6F6F6] font-medium">{b.date}</div>
                      <div className="font-mono text-xs text-[#999]">{b.time}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono uppercase ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : b.status === 'completed'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => triggerWhatsAppSimulation(b.id, b.clientName, b.time)}
                        title="Simulate WhatsApp confirmation"
                        className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors inline-flex items-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'completed')}
                          title="Mark Completed"
                          className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors inline-flex items-center"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}

                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'cancelled')}
                          title="Cancel Booking"
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors inline-flex items-center"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
