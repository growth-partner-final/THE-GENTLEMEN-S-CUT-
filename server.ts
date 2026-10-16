import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;
const DB_FILE = path.resolve(__dirname, 'db.json');

// Initial seed data if db.json does not exist
const initialDb = {
  services: [
    { id: 'srv-1', name: 'The Gentlemen’s Signature Cut', category: 'Hair', price: 65, durationMinutes: 45, description: 'Tailored scissor & clipper cut, aromatic hot towel, scalp massage, and custom style finish.', active: true },
    { id: 'srv-2', name: 'Hot Towel Straight Razor Shave', category: 'Beard', price: 50, durationMinutes: 30, description: 'Traditional pre-shave oil, steamed eucalyptus hot towel, straight razor pass, and cold finish balm.', active: true },
    { id: 'srv-3', name: 'The Sovereign Package (Cut & Shave)', category: 'Combos', price: 105, durationMinutes: 75, description: 'Our signature haircut paired with the full hot towel straight razor shave experience.', active: true },
    { id: 'srv-4', name: 'Beard Sculpting & Line-Out', category: 'Beard', price: 40, durationMinutes: 30, description: 'Precision trimmer and foil detailing, hot towel, organic beard oil conditioning, and razor edge cleanup.', active: true },
    { id: 'srv-5', name: 'Father & Son Executive Cut', category: 'Combos', price: 110, durationMinutes: 60, description: 'Side-by-side executive haircuts for father and son (ages 12 and under).', active: true },
    { id: 'srv-6', name: 'Gray Blending & Scalp Treatment', category: 'Treatments', price: 55, durationMinutes: 30, description: 'Discreet 10-minute gray reduction treatment with deep invigorating scalp massage.', active: true }
  ],
  barbers: [
    { id: 'barber-1', name: 'Julian Vance', role: 'Master Barber & Founder', experienceYears: 16, bio: 'Trained in Mayfair, London. Specializes in classic scissor work and bespoke grooming consultations.', specialties: ['Classic Scissor Cuts', 'Hot Towel Shaves', 'Consultations'], rating: 4.9, active: true },
    { id: 'barber-2', name: 'Marcus Sterling', role: 'Senior Styling Director', experienceYears: 12, bio: 'Expert in modern fades, textured crops, and meticulous beard architecture.', specialties: ['Modern Fades', 'Beard Sculpting', 'Texture'], rating: 4.8, active: true },
    { id: 'barber-3', name: 'Dante Moretti', role: 'Master Groomer', experienceYears: 14, bio: 'Master of traditional Italian straight razor shaving and timeless gentleman styles.', specialties: ['Straight Razor', 'Traditional Tapers', 'Hot Towel Shaves'], rating: 4.9, active: true }
  ],
  bookings: [
    {
      id: 'bk-101',
      reference: 'GC-8942',
      serviceId: 'srv-1',
      barberId: 'barber-1',
      clientName: 'Thomas Wright',
      clientPhone: '+1 (555) 234-5678',
      clientEmail: 'thomas.wright@example.com',
      date: '2026-10-20',
      time: '10:00 AM',
      endTime: '10:45 AM',
      price: 65,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      whatsappOptIn: true,
      emailReminders: true,
      smsReminders: true
    },
    {
      id: 'bk-102',
      reference: 'GC-3310',
      serviceId: 'srv-3',
      barberId: 'barber-2',
      clientName: 'Alexander Hayes',
      clientPhone: '+1 (555) 987-6543',
      clientEmail: 'alex.hayes@example.com',
      date: '2026-10-21',
      time: '02:00 PM',
      endTime: '03:15 PM',
      price: 105,
      status: 'pending',
      createdAt: new Date().toISOString(),
      whatsappOptIn: true,
      emailReminders: false,
      smsReminders: true
    }
  ],
  waitlist: [
    {
      id: 'wl-1',
      serviceId: 'srv-1',
      barberId: 'barber-1',
      clientName: 'Julian Black',
      clientPhone: '+1 (555) 444-1122',
      clientEmail: 'julian@example.com',
      date: '2026-10-20',
      time: '11:00 AM',
      createdAt: new Date().toISOString(),
      status: 'active'
    }
  ],
  customers: [
    {
      id: 'cust-1',
      name: 'Thomas Wright',
      phone: '+1 (555) 234-5678',
      email: 'thomas.wright@example.com',
      isVerified: true,
      emailReminders: true,
      smsReminders: true,
      reminderTiming: '24h',
      createdAt: new Date().toISOString()
    }
  ],
  otpChallenges: [],
  notifications: [
    {
      id: 'notif-1',
      bookingId: 'bk-101',
      channel: 'whatsapp',
      purpose: 'booking_confirmation',
      status: 'delivered',
      recipient: '+1 (555) 234-5678',
      message: 'Your appointment at The Gentlemen’s Cut Soho for Oct 20 at 10:00 AM has been confirmed.',
      createdAt: new Date().toISOString(),
      providerId: 'wa-msg-992184'
    }
  ]
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return initialDb;
  }
}

function writeDb(db: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

// API Routes
app.get('/api/services', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.services);
});

app.get('/api/barbers', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.barbers);
});

app.get('/api/bookings', (req: Request, res: Response) => {
  const db = readDb();
  const phone = req.query.phone as string;
  const email = req.query.email as string;
  if (phone || email) {
    const filtered = db.bookings.filter((b: any) => 
      (phone && b.clientPhone === phone) || (email && b.clientEmail === email)
    );
    return res.json(filtered);
  }
  res.json(db.bookings);
});

// Create booking with concurrency / double booking prevention check
app.post('/api/bookings', (req: Request, res: Response) => {
  const { serviceId, barberId, date, time, clientName, clientPhone, clientEmail, notes, whatsappOptIn } = req.body;
  
  if (!serviceId || !barberId || !date || !time || !clientName || !clientPhone) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }

  const db = readDb();
  const service = db.services.find((s: any) => s.id === serviceId);
  if (!service) {
    return res.status(404).json({ error: 'Selected service not found.' });
  }

  // Check for double booking conflicts on the same barber, date, and time
  const conflicting = db.bookings.find((b: any) => 
    b.barberId === barberId &&
    b.date === date &&
    b.time === time &&
    ['pending', 'confirmed'].includes(b.status)
  );

  if (conflicting) {
    return res.status(409).json({ 
      error: 'This time slot has just been reserved by another client. Please select an alternate time or join the waitlist.' 
    });
  }

  const randomRef = 'GC-' + Math.floor(1000 + Math.random() * 9000);
  const newBooking = {
    id: 'bk-' + Date.now(),
    reference: randomRef,
    serviceId,
    barberId,
    clientName,
    clientPhone,
    clientEmail: clientEmail || '',
    date,
    time,
    endTime: time, // simplified or calculated
    price: service.price,
    status: 'pending',
    createdAt: new Date().toISOString(),
    whatsappOptIn: !!whatsappOptIn,
    notes: notes || ''
  };

  db.bookings.push(newBooking);

  // Queue WhatsApp / SMS Notification record
  db.notifications.push({
    id: 'notif-' + Date.now(),
    bookingId: newBooking.id,
    channel: whatsappOptIn ? 'whatsapp' : 'sms',
    purpose: 'booking_pending',
    status: 'sent',
    recipient: clientPhone,
    message: `The Gentlemen’s Cut: Your appointment request (${randomRef}) for ${service.name} on ${date} at ${time} is received and pending confirmation.`,
    createdAt: new Date().toISOString(),
    providerId: 'prov-' + crypto.randomBytes(4).toString('hex')
  });

  writeDb(db);
  res.status(201).json(newBooking);
});

// Update booking status (Admin approval, rejection, cancellation, completion)
app.patch('/api/bookings/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid booking status.' });
  }

  const db = readDb();
  const booking = db.bookings.find((b: any) => b.id === id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  booking.status = status;
  writeDb(db);
  res.json(booking);
});

// Waitlist APIs
app.get('/api/waitlist', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.waitlist);
});

app.post('/api/waitlist', (req: Request, res: Response) => {
  const { serviceId, barberId, date, time, clientName, clientPhone, clientEmail } = req.body;
  if (!serviceId || !barberId || !date || !clientName || !clientPhone) {
    return res.status(400).json({ error: 'Missing required waitlist fields.' });
  }

  const db = readDb();
  const entry = {
    id: 'wl-' + Date.now(),
    serviceId,
    barberId,
    date,
    time: time || 'Any Time',
    clientName,
    clientPhone,
    clientEmail: clientEmail || '',
    createdAt: new Date().toISOString(),
    status: 'active'
  };

  db.waitlist.push(entry);
  writeDb(db);
  res.status(201).json(entry);
});

app.delete('/api/waitlist/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.waitlist = db.waitlist.filter((w: any) => w.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// OTP Auth APIs
app.post('/api/auth/otp/send', (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Valid phone number required.' });
  }

  const db = readDb();
  // Generate 6-digit OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  // Remove existing challenges for this phone
  db.otpChallenges = db.otpChallenges.filter((c: any) => c.phone !== phone);
  db.otpChallenges.push({ phone, code, expiresAt, attempts: 0 });

  writeDb(db);

  // In production, integrate Twilio/WhatsApp API here. For developer verification clarity:
  console.log(`[SECURE OTP] Sent code ${code} to phone ${phone}`);

  res.json({ success: true, message: 'Verification code sent successfully.', devCodeHint: code });
});

app.post('/api/auth/otp/verify', (req: Request, res: Response) => {
  const { phone, code, name, email } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ error: 'Phone and verification code required.' });
  }

  const db = readDb();
  const challenge = db.otpChallenges.find((c: any) => c.phone === phone);

  if (!challenge) {
    return res.status(400).json({ error: 'No active verification challenge found for this phone.' });
  }

  if (Date.now() > challenge.expiresAt) {
    return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
  }

  if (challenge.attempts >= 5) {
    return res.status(400).json({ error: 'Too many failed attempts. Please request a new code.' });
  }

  if (challenge.code !== code) {
    challenge.attempts += 1;
    writeDb(db);
    return res.status(400).json({ error: 'Invalid verification code.' });
  }

  // Success: remove challenge
  db.otpChallenges = db.otpChallenges.filter((c: any) => c.phone !== phone);

  // Find or create customer
  let customer = db.customers.find((cust: any) => cust.phone === phone);
  if (!customer) {
    customer = {
      id: 'cust-' + Date.now(),
      name: name || 'Valued Client',
      phone,
      email: email || '',
      isVerified: true,
      emailReminders: true,
      smsReminders: true,
      reminderTiming: '24h',
      createdAt: new Date().toISOString()
    };
    db.customers.push(customer);
  } else {
    customer.isVerified = true;
    if (name) customer.name = name;
    if (email) customer.email = email;
  }

  writeDb(db);
  res.json({ success: true, customer, token: 'jwt-token-' + crypto.randomBytes(16).toString('hex') });
});

app.get('/api/notifications', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.notifications);
});

// Admin login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'gentlemenscut2026') {
    return res.json({ success: true, token: 'admin-jwt-token-soho', role: 'admin' });
  }
  res.status(401).json({ error: 'Invalid administrator credentials.' });
});

// Vite Dev Server Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
