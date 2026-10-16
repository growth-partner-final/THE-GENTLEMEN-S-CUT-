# Project Memory: The Gentlemen's Cut — Barbershop Website Clone

**Last Updated:** Phase 0 (Documentation Review & Memory Preservation)
**Source Baseline:** Reference Website (https://gjztg2s56yif6.ok.kimi.link/), Master Instructions, PRD, Visual Design Specs, and Phase Prompts.

---

## 1. Project Overview & Core Mission
- **Project Name:** The Gentlemen's Cut — Barbershop Website Clone
- **Type:** Premium single-location barbershop marketing website featuring guest online booking, optional customer login, customer appointment dashboard, and role-secured staff/admin booking management.
- **Goal:** Faithfully recreate the visual character, editorial dark-and-gold aesthetic, and responsive customer flows of the reference site while transforming simulated prototype mechanisms into secure, reliable, and production-ready systems.
- **Reference Website:** `https://gjztg2s56yif6.ok.kimi.link/`
- **Provided Source Archive Reference:** `Kimi_Agent_No-Login Booking_ WhatsApp Confirmation (1).zip`

---

## 2. Mandatory Working Rules & Governance
1. **Rule on Documentation:** All documentation files and approved requirements must be thoroughly read and referenced before executing any implementation task.
2. **Strict Phase Gate:** No development phase (Phase 1, Phase 2, etc.) may begin without explicit user authorization.
3. **Truth in Implementation:** Never represent mock data, browser-local state, simulated OTP, console-logged WhatsApp messages, or unverified contact submissions as production-ready.
4. **Source of Truth Precedence:**
   1. Explicitly approved user requirements in the active task.
   2. `00_MASTER.md` (Global constraints and scope).
   3. `PRD.md` (Product behavior and acceptance criteria).
   4. `design.md` (Primary visual specification) & `Design (5).md` (Visual tokens and UI consistency).
   5. `06_RULES (1).md` (Business and security rules).
   6. `02_Architecture.md`, `04_TECHSPEC.md`, `05_SCHEMA (1).md` (Technical architecture, specifications, schema).
   7. `03_APPFLOW.md`, `11_SCREENS.md`, `09_Phases.md` (Flows, screen inventory, phase breakdowns).
   8. `07_IMPLEMENTATIONPLAN.md`, `08_TRACKER.md`, `12_PHASE_PROMPTS.md` (Execution tracking and prompts).
   9. Existing source code (Treated as prototype evidence, not authoritative where unsafe).

---

## 3. Technology Stack & Environment
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion (`motion`), Lucide Icons (`lucide-react`).
- **Backend Environment (when implemented):** Express / Node.js runtime, TypeScript (`tsx`).
- **Styling Architecture:** Tailwind utility classes, custom CSS variables conforming to design tokens, mobile-first responsive layout.
- **Client Security Boundaries:** No secrets, service keys, or private provider tokens in client code or `VITE_*` environment variables.

---

## 4. Visual Design System & Brand Identity
- **Aesthetic:** Editorial, cinematic, tactile, premium barbershop atmosphere.
- **Color Palette:**
  - Near-black background: `#0B0B0D`
  - Dark surface: `#111111`
  - Raised surface: `#1A1A1A`
  - Gold accent: `#D4A03A`
  - Gold hover: `#E5B14B`
  - Cream contrast: `#F2F0EA`
  - Primary text: `#F6F6F6`
  - Body muted text: `#B8B4AA`
  - Dark border: `#333333`
- **Typography:**
  - Headings / Display: Sora
  - Body & Form Controls: Inter
  - Overlines / Metadata: IBM Plex Mono
- **Layout & Structure:**
  - Max container width: ~1280px
  - Desktop gutters: 4–6vw; Mobile gutters: ~16px minimum
  - Desktop split: ~56–58vw photography to ~30–34vw text content
  - Strategic alternation between dark sections and cream editorial sections
- **Button System:**
  - Primary: Solid gold fill (`#D4A03A`), near-black label text, prominent hover/focus/active states.
  - Secondary: Transparent/surface fill with gold or subtle dark border.
  - Minimum touch target: 44px on mobile devices.
- **Images:** High-resolution local source assets (`/images/hero_barber_client.jpg`, `/images/book_chair_closeup.jpg`, `/images/services_barber_working.jpg`, `/images/products_shelf.jpg`, `/images/gallery_interior.jpg`, `/images/hours_barber_portrait.jpg`, `/images/membership_waiting.jpg`, `/images/reviews_checkin.jpg`, `/images/contact_closeup.jpg`).

---

## 5. Scope & Application Architecture

### 5.1 Public Marketing Sections
1. **Header / Navigation:** Fixed/scroll-aware navigation bar, brand logo, section anchors, Book CTA button, and accessible mobile drawer menu.
2. **Hero Section:** Full-bleed cinematic photo, brand headline, value proposition, "Book a Cut" primary CTA, "View Services" secondary CTA.
3. **Booking Prompt Section:** Visual teaser driving users directly into booking modal/flow.
4. **Services & Pricing:** Curated haircut, beard, and package offerings with transparent pricing ($25–$55 prototype baseline) and durations.
5. **Products Shelf:** Curated grooming items showcase (informational showcase; no cart/checkout in scope).
6. **Gallery / Interior:** Visual photography of shop craft, styling chairs, and barbershop ambiance.
7. **Business Hours & Location:** Operational schedule, shop address, parking/access notes, and interactive map placeholder.
8. **Client Reviews:** Social proof testimonials with client names and service ratings.
9. **Membership Club:** VIP recurring haircut perks and lounge privileges (informational; no billing in scope).
10. **Contact & Inquiries Form:** Client inquiry form with field validation and truthful submission handling.

### 5.2 Booking Engine & Customer Flow
- **Guest-First Booking:** No mandatory account registration or login required to reserve an appointment.
- **4-Step Booking Modal:**
  1. *Step 1: Select Service* (Haircut, Beard Trim, Deluxe Package, etc., showing price and duration).
  2. *Step 2: Select Barber* (Specific barber choice or "Any Available Barber").
  3. *Step 3: Date & Time Slot* (Future valid availability only; server-authoritative slot validation).
  4. *Step 4: Customer Details & Notification Preferences* (Name, phone, email, notes, explicit optional WhatsApp opt-in checkbox).
- **Initial State:** Submitted bookings immediately receive a `pending` status. Customer is presented with a clear "Pending Approval" acknowledgement screen with a booking reference code.

### 5.3 Customer Authentication & Dashboard
- **Optional Phone Login:** Phone-based OTP authentication for returning customers to view/manage their appointments.
- **Customer Dashboard Tabs:** Upcoming, Past, Cancelled (and All).
- **Self-Service Actions:** Customers can cancel eligible upcoming appointments subject to cancellation policy cutoff rules.

### 5.4 Staff & Admin Management
- **Dashboard Metrics:** Today's appointments, pending queue count, confirmed appointments, completed counts, estimated revenue.
- **Booking Queue Filters:** Filter by status (Pending, Today, Upcoming, Completed, Cancelled, All).
- **Booking Detail & Action Modals:** Authorized staff can Approve, Reject, Cancel, or Mark Complete.
- **Authentication:** Must be secured via authenticated server-verified credentials and roles; original prototype's triple-click shortcut must not serve as authentication.

---

## 6. Critical Security & Engineering Rules
1. **No Client Authorization Trust:** Never trust client-sent `isAdmin`, `isVerified`, price, duration, or slot availability.
2. **Server-Authoritative Booking Integrity:** All slots, overlapping intervals, and concurrency collisions must be atomically checked and rejected at the database level.
3. **Atomic Double-Booking Prevention:** Simultaneous submissions for the same barber and time window must never result in duplicate active bookings.
4. **Truthful Notification & Integration States:**
   - WhatsApp messages must only be sent when explicit consent was granted and a real provider is configured.
   - Do not claim a message was "Sent" or "Delivered" if it was only queued or accepted by a provider adapter.
   - If a provider (SMS OTP, WhatsApp, Email) is unconfigured or unavailable, the UI must clearly label the state as demo/unconfigured rather than fabricating success.
5. **Session & Data Isolation:** Customers may only query and view their own appointments; no ID enumeration or parameter tampering vulnerabilities.

---

## 7. Implementation Phases & Roadmaps

### Phase 1: Faithful Website Clone + Complete Frontend UX
- Implement all 9 marketing sections and responsive navigation conforming strictly to `design.md` and `Design (5).md`.
- Build the 4-step guest booking modal with complete validation, step navigation, and pending-approval screen.
- Build phone OTP login screen, customer dashboard, admin dashboard, filters, badges, and empty/loading/error states.
- Ensure all controls are fully functional or explicitly labeled if waiting on backend services.
- Remove triple-click admin authorization bypass.
- Achieve visual parity across mobile, tablet, and desktop viewports.

### Phase 2: Production Backend, Security, Booking Integrity & Real Notifications
- Connect persistent database with versioned migrations, indexes, constraints, and audit logging.
- Implement server-side availability engine taking into account shop hours, barber schedules, breaks, and active bookings.
- Implement atomic conflict and concurrency prevention for bookings.
- Integrate server-side phone OTP auth, session handling, and customer authorization.
- Integrate server-side WhatsApp provider adapter with consent verification, delivery tracking, and idempotency.
- Connect contact inquiry handling with transactional email adapter or explicit unconfigured status.
- Execute full test suite: concurrency tests, RBAC tests, cancellation boundary tests, and failure recovery.

---

## 8. Known Gaps, Missing Documentation & Pending Owner Decisions
- **Unavailable Documentation Files:**
  - `02_Architecture.md`, `03_APPFLOW.md`, `04_TECHSPEC.md`, `05_SCHEMA (1).md`, `06_RULES (1).md`, `07_IMPLEMENTATIONPLAN.md`, `08_TRACKER.md`, `09_Phases.md`, `11_SCREENS.md`, `Engineering-Practices.md`, `design.md` are not currently in the filesystem (information extracted from `00_MASTER.md`, `Design (5).md`, `PRD.md`, and `12_PHASE_PROMPTS.md`).
- **Owner Decisions & Configuration Required Before Launch:**
  - Shop timezone, physical address, business telephone number, and parking instructions.
  - Definitive service catalog, official pricing, durations, and barber roster.
  - Specific cancellation policy window (e.g., minimum notice hours).
  - Production provider credentials for SMS OTP (e.g. Twilio), WhatsApp Business API, and Transactional Email (e.g. Resend / SendGrid).
  - Production database target provisioning.

---

## 9. Phase 1 Implementation Summary & Execution Status
- **Status:** Phase 1 Complete & Verified. Phase 2 NOT started (awaiting user authorization).
- **Frontend Architecture Delivered:**
  - Typography: Sora (Headings), Inter (Body), IBM Plex Mono (Micro-metadata).
  - Design Palette: `#0B0B0D` (canvas), `#111111`/`#121216` (surfaces), `#D4A03A` (warm gold accent), `#F6F6F6` (primary text), `#B8B4AA` (muted body text), `#333333` (hairline borders).
  - Public Marketing Sections: Header (3-zone Top Bar Contract), HeroSection (cinematic split-screen), BookingPromptSection (Belmont chair strip), ServicesSection (category tabs, $35/$25/$55 pricing, direct service pre-selection), BarbersSection (Marcus, Julian, David profiles & direct booking), ProductsSection (Apothecary counter formulation cards & note modal), GallerySection (asymmetric grid & lightbox), HoursLocationSection (Soho schedule, address & Google Maps link), ReviewsSection (attributable 5-star testimonials & check-in visual), MembershipSection ($60/mo The Regulars club & inquiry modal), ContactSection (concierge desk form with validation).
  - Complete 4-Step Booking Wizard: Step 1 (Service), Step 2 (Barber), Step 3 (Date & Time, past & Sundays disabled), Step 4 (Guest customer details, optional WhatsApp consent starting unchecked), and Booking Confirmation (`GC-XXXX`, `Pending Approval` clearly highlighted).
  - Client Authentication & Dashboard: OTP Phone Sign-In simulation modal, Customer Appointments Dashboard (Upcoming, Past, Cancelled filters, appointment cards, demo cancellation dialog).
  - Staff / Admin Dashboard Preview: Key operational metrics (Today's queue, Pending approvals, Confirmed, Estimated revenue), status filter pills, booking queue table, Approve/Reject/Complete controls, WhatsApp dispatch simulation trigger, customer detail inspect drawer.
- **Verification Commands Executed:**
  - `compile_applet` passed (`vite build` completed cleanly).
  - `lint_applet` passed (`tsc --noEmit` clean, 0 errors).

