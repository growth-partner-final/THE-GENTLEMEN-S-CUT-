export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';

export type WhatsAppStatus = 'not_requested' | 'demo_queued' | 'demo_simulation' | 'delivered';

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  duration?: number;
  description: string;
  category: 'Hair' | 'Beard' | 'Combos' | 'Treatments';
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  avatar: string;
  rating: number;
  experienceYears: number;
}

export interface Booking {
  id: string;
  reference?: string;
  publicReference: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  price?: number;
  serviceDuration: number;
  duration?: number;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "11:30 AM"
  customerName: string;
  clientName?: string;
  customerPhone: string;
  clientPhone?: string;
  customerEmail: string;
  clientEmail?: string;
  notes?: string;
  whatsappOptIn: boolean;
  status: BookingStatus;
  whatsappStatus: WhatsAppStatus;
  createdAt: string;
  isGuest: boolean;
  remindersOptIn?: boolean;
  reminderMethod?: 'email' | 'sms' | 'both';
  emailReminders?: boolean;
  smsReminders?: boolean;
}

export interface CustomerUser {
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
  membershipTier?: string;
  emailReminders?: boolean;
  smsReminders?: boolean;
  reminderTiming?: '24h' | '2h' | 'both';
}

export interface WaitlistEntry {
  id: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "11:00 AM"
  customerName: string;
  clientName?: string;
  customerPhone: string;
  clientPhone?: string;
  customerEmail: string;
  clientEmail?: string;
  createdAt: string;
  status: 'active' | 'notified' | 'booked';
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  volume: string;
}

export interface ReviewItem {
  id: string;
  author?: string;
  clientName?: string;
  serviceName: string;
  rating: number;
  date: string;
  content?: string;
  comment?: string;
}
