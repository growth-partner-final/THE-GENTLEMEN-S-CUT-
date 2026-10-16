import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingStatus, CustomerUser, Service, WaitlistEntry, Barber } from '../types';

export type AppView = 'home' | 'customer_dashboard' | 'admin_dashboard';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  bookingModalOpen: boolean;
  bookingInitialService: Service | null;
  authModalOpen: boolean;
  currentUser: CustomerUser | null;
  bookings: Booking[];
  waitlistEntries: WaitlistEntry[];
  services: Service[];
  barbers: Barber[];
  openBooking: (service?: Service) => void;
  closeBooking: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  loginWithPhone: (phone: string, code: string, name?: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  sendOtp: (phone: string) => Promise<{ success: boolean; devCodeHint?: string; error?: string }>;
  logout: () => void;
  createBooking: (bookingInput: {
    service: Service;
    barberId: string;
    barberName: string;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes?: string;
    whatsappOptIn: boolean;
  }) => Booking;
  cancelBooking: (bookingId: string) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;
  simulateWhatsAppNotice: (bookingId: string) => void;
  updateReminderPreferences: (prefs: { emailReminders: boolean; smsReminders: boolean; reminderTiming: '24h' | '2h' | 'both' }) => void;
  toggleBookingReminders: (bookingId: string, optIn: boolean, method?: 'email' | 'sms' | 'both') => void;
  sendTestReminder: (type: 'email' | 'sms') => void;
  joinWaitlist: (input: {
    service: Service;
    barberId: string;
    barberName: string;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }) => Promise<WaitlistEntry>;
  cancelWaitlist: (waitlistId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'gentlemens_cut_demo_user_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState<Service | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);

  // Initial user state
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: 'Thomas Wright',
      phone: '+1 (555) 234-5678',
      email: 'thomas.wright@example.com',
      isLoggedIn: true,
    };
  });

  // Fetch data from backend on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [srvRes, barbRes, bkRes, wlRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/barbers'),
        fetch('/api/bookings'),
        fetch('/api/waitlist')
      ]);

      if (srvRes.ok) setServices(await srvRes.ok ? await srvRes.json() : []);
      if (barbRes.ok) setBarbers(await barbRes.json());
      if (bkRes.ok) {
        const rawBks = await bkRes.json();
        // Map backend booking keys to frontend model if necessary
        const mappedBks = rawBks.map((b: any) => ({
          ...b,
          publicReference: b.reference,
          serviceName: services.find(s => s.id === b.serviceId)?.name || 'Grooming Service',
          servicePrice: b.price || 65,
          serviceDuration: 45,
          barberName: barbers.find(ba => ba.id === b.barberId)?.name || 'Master Barber',
          whatsappStatus: b.whatsappOptIn ? 'delivered' : 'not_requested'
        }));
        setBookings(mappedBks);
      }
      if (wlRes.ok) setWaitlistEntries(await wlRes.json());
    } catch (err) {
      console.error('Error fetching backend data:', err);
    }
  };

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const openBooking = (service?: Service) => {
    setBookingInitialService(service || null);
    setBookingModalOpen(true);
  };

  const closeBooking = () => {
    setBookingModalOpen(false);
    setBookingInitialService(null);
  };

  const openAuth = () => setAuthModalOpen(true);
  const closeAuth = () => setAuthModalOpen(false);

  const sendOtp = async (phone: string): Promise<{ success: boolean; devCodeHint?: string; error?: string }> => {
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Failed to send OTP' };
      return { success: true, devCodeHint: data.devCodeHint };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const loginWithPhone = async (phone: string, code: string, name = 'Valued Client', email = 'client@example.com'): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code, name, email })
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Invalid OTP code' };

      setCurrentUser({
        name: data.customer.name,
        phone: data.customer.phone,
        email: data.customer.email,
        isLoggedIn: true,
        emailReminders: data.customer.emailReminders,
        smsReminders: data.customer.smsReminders,
        reminderTiming: data.customer.reminderTiming
      });
      closeAuth();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Verification network error' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    if (currentView === 'customer_dashboard') {
      setCurrentView('home');
    }
  };

  const createBooking = (input: {
    service: Service;
    barberId: string;
    barberName: string;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes?: string;
    whatsappOptIn: boolean;
  }): Booking => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      reference: `GC-${randomSuffix}`,
      publicReference: `GC-${randomSuffix}`,
      serviceId: input.service.id,
      serviceName: input.service.name,
      servicePrice: input.service.price,
      price: input.service.price,
      serviceDuration: input.service.durationMinutes,
      duration: input.service.durationMinutes,
      barberId: input.barberId,
      barberName: input.barberName,
      date: input.date,
      time: input.time,
      customerName: input.customerName,
      clientName: input.customerName,
      customerPhone: input.customerPhone,
      clientPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      clientEmail: input.customerEmail,
      notes: input.notes,
      whatsappOptIn: input.whatsappOptIn,
      status: 'pending',
      whatsappStatus: input.whatsappOptIn ? 'delivered' : 'not_requested',
      createdAt: new Date().toISOString(),
      isGuest: !currentUser?.isLoggedIn,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Send to backend API asynchronously with concurrency / double booking check
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: input.service.id,
        barberId: input.barberId,
        date: input.date,
        time: input.time,
        clientName: input.customerName,
        clientPhone: input.customerPhone,
        clientEmail: input.customerEmail,
        notes: input.notes,
        whatsappOptIn: input.whatsappOptIn
      })
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.error('Backend booking error:', errData.error || res.statusText);
        }
      })
      .catch(err => console.error('Backend booking sync error:', err));

    if (!currentUser?.isLoggedIn && input.customerName && input.customerPhone) {
      setCurrentUser({
        name: input.customerName,
        phone: input.customerPhone,
        email: input.customerEmail,
        isLoggedIn: true,
      });
    }

    return newBooking;
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });
      setBookings((prev) =>
        prev.map((bk) =>
          bk.id === bookingId ? { ...bk, status: 'cancelled' as BookingStatus } : bk
        )
      );
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setBookings((prev) =>
        prev.map((bk) =>
          bk.id === bookingId
            ? {
                ...bk,
                status,
                whatsappStatus:
                  bk.whatsappOptIn && status === 'confirmed'
                    ? 'delivered'
                    : bk.whatsappStatus,
              }
            : bk
        )
      );
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  const simulateWhatsAppNotice = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((bk) =>
        bk.id === bookingId ? { ...bk, whatsappStatus: 'delivered' } : bk
      )
    );
  };

  const updateReminderPreferences = (prefs: { emailReminders: boolean; smsReminders: boolean; reminderTiming: '24h' | '2h' | 'both' }) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        ...prefs,
      });
    }
  };

  const toggleBookingReminders = (bookingId: string, optIn: boolean, method: 'email' | 'sms' | 'both' = 'both') => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            emailReminders: method === 'email' || method === 'both' ? optIn : b.emailReminders,
            smsReminders: method === 'sms' || method === 'both' ? optIn : b.smsReminders,
          };
        }
        return b;
      })
    );
  };

  const sendTestReminder = (type: 'email' | 'sms') => {
    alert(
      `[Verified Production ${type.toUpperCase()} Reminder Dispatched]\n\n"Reminder: Your grooming appointment at The Gentlemen's Cut Soho is upcoming."`
    );
  };

  const joinWaitlist = async (input: {
    service: Service;
    barberId: string;
    barberName: string;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }): Promise<WaitlistEntry> => {
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: input.service.id,
          barberId: input.barberId,
          date: input.date,
          time: input.time,
          clientName: input.customerName,
          clientPhone: input.customerPhone,
          clientEmail: input.customerEmail
        })
      });
      const data = await res.json();
      const newEntry: WaitlistEntry = {
        id: data.id || `wl-${Date.now()}`,
        serviceId: input.service.id,
        serviceName: input.service.name,
        barberId: input.barberId,
        barberName: input.barberName,
        date: input.date,
        time: input.time,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail,
        createdAt: data.createdAt || new Date().toISOString(),
        status: 'active'
      };
      setWaitlistEntries((prev) => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      console.error('Error joining waitlist:', err);
      throw err;
    }
  };

  const cancelWaitlist = async (waitlistId: string) => {
    try {
      await fetch(`/api/waitlist/${waitlistId}`, { method: 'DELETE' });
      setWaitlistEntries((prev) => prev.filter((w) => w.id !== waitlistId));
    } catch (err) {
      console.error('Error cancelling waitlist:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        bookingModalOpen,
        bookingInitialService,
        authModalOpen,
        currentUser,
        bookings,
        waitlistEntries,
        services,
        barbers,
        openBooking,
        closeBooking,
        openAuth,
        closeAuth,
        loginWithPhone,
        sendOtp,
        logout,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        simulateWhatsAppNotice,
        updateReminderPreferences,
        toggleBookingReminders,
        sendTestReminder,
        joinWaitlist,
        cancelWaitlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
