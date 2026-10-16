import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingStatus, CustomerUser, Service, WaitlistEntry } from '../types';
import { INITIAL_DEMO_BOOKINGS } from '../data/mockData';

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
  openBooking: (service?: Service) => void;
  closeBooking: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  loginDemo: (phone: string, name?: string, email?: string) => void;
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
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
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
  }) => WaitlistEntry;
  cancelWaitlist: (waitlistId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_BOOKINGS_KEY = 'gentlemens_cut_demo_bookings_v1';
const LOCAL_STORAGE_USER_KEY = 'gentlemens_cut_demo_user_v1';
const LOCAL_STORAGE_WAITLIST_KEY = 'gentlemens_cut_demo_waitlist_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState<Service | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Initial user state (seeded with Thomas Wright for ease of testing customer dashboard)
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

  // Initial bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  // Initial waitlist state
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WAITLIST_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Save changes to localStorage for prototype persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WAITLIST_KEY, JSON.stringify(waitlistEntries));
    } catch {
      // ignore
    }
  }, [waitlistEntries]);

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

  const loginDemo = (phone: string, name = 'Customer Guest', email = 'client@example.com') => {
    const user: CustomerUser = {
      name,
      phone,
      email,
      isLoggedIn: true,
    };
    setCurrentUser(user);
    closeAuth();
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
      publicReference: `GC-${randomSuffix}`,
      serviceId: input.service.id,
      serviceName: input.service.name,
      servicePrice: input.service.price,
      serviceDuration: input.service.durationMinutes,
      barberId: input.barberId,
      barberName: input.barberName,
      date: input.date,
      time: input.time,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      notes: input.notes,
      whatsappOptIn: input.whatsappOptIn,
      status: 'pending', // Strictly initialized as pending per 00_MASTER.md
      whatsappStatus: input.whatsappOptIn ? 'demo_queued' : 'not_requested',
      createdAt: new Date().toISOString(),
      isGuest: !currentUser?.isLoggedIn,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // If customer booked with their info, sync user profile
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

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((bk) =>
        bk.id === bookingId ? { ...bk, status: 'cancelled' as BookingStatus } : bk
      )
    );
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((bk) =>
        bk.id === bookingId
          ? {
              ...bk,
              status,
              whatsappStatus:
                bk.whatsappOptIn && status === 'confirmed'
                  ? 'demo_simulation'
                  : bk.whatsappStatus,
            }
          : bk
      )
    );
  };

  const simulateWhatsAppNotice = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((bk) =>
        bk.id === bookingId ? { ...bk, whatsappStatus: 'demo_simulation' } : bk
      )
    );
  };

  const updateReminderPreferences = (prefs: {
    emailReminders: boolean;
    smsReminders: boolean;
    reminderTiming: '24h' | '2h' | 'both';
  }) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        emailReminders: prefs.emailReminders,
        smsReminders: prefs.smsReminders,
        reminderTiming: prefs.reminderTiming,
      });
    }
  };

  const toggleBookingReminders = (
    bookingId: string,
    optIn: boolean,
    method: 'email' | 'sms' | 'both' = 'both'
  ) => {
    setBookings((prev) =>
      prev.map((bk) =>
        bk.id === bookingId
          ? {
              ...bk,
              remindersOptIn: optIn,
              reminderMethod: method,
            }
          : bk
      )
    );
  };

  const sendTestReminder = (type: 'email' | 'sms') => {
    alert(
      `[Demo ${type.toUpperCase()} Reminder Sent]\n\n"Reminder: Your grooming appointment at The Gentlemen's Cut Soho is upcoming."`
    );
  };

  const joinWaitlist = (input: {
    service: Service;
    barberId: string;
    barberName: string;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  }): WaitlistEntry => {
    const entry: WaitlistEntry = {
      id: `wl-${Date.now()}`,
      serviceId: input.service.id,
      serviceName: input.service.name,
      barberId: input.barberId,
      barberName: input.barberName,
      date: input.date,
      time: input.time,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    setWaitlistEntries((prev) => [entry, ...prev]);
    return entry;
  };

  const cancelWaitlist = (waitlistId: string) => {
    setWaitlistEntries((prev) => prev.filter((item) => item.id !== waitlistId));
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
        openBooking,
        closeBooking,
        openAuth,
        closeAuth,
        loginDemo,
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
