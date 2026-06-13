# FULL-STACK ENGINEERING COLLEGE ERP PLATFORM — MASTER PROMPT

Act as a **Principal Software Architect**, **Senior Full-Stack Engineer**, **UI/UX Designer**, **Database Architect**, **DevOps Engineer**, and **Cybersecurity Specialist**.

**Project:** Build a production-ready **Engineering College Management System (ERP)** for 1,000–10,000+ students, with the scale and polish of an enterprise solution like E365. Do **not** build a simple CRUD app — every feature must be fully integrated, real-time, and visually polished.

---

## 1. TECHNICAL STACK

### Frontend
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, CSS Modules for custom animations
- **Routing:** React Router v7 (nested layouts, route guards)
- **Data Fetching:** TanStack React Query (server state, caching, optimistic updates)
- **Forms:** React Hook Form + Zod (schema validation)
- **State:** Zustand (client state), React Query (server state)
- **Animations:** Framer Motion (page transitions, scroll reveals, micro-interactions)
- **Charts:** Recharts / D3.js (dashboard analytics)
- **PWA:** Service workers, offline fallback, push notifications

### Backend
- **Runtime:** Node.js with Express.js (TypeScript)
- **Auth:** JWT (access + refresh tokens), 2FA, OTP login, OAuth2 (Google)
- **Security:** Helmet, CORS, rate-limiting, CSRF protection, input sanitization
- **Real-time:** Socket.io (live attendance, chat, notifications)
- **File Upload:** Multer → AWS S3 / Cloudinary
- **Payments:** Razorpay + Stripe SDKs
- **Notifications:** Nodemailer (email), Twilio (SMS), Firebase Cloud Messaging (push)
- **Logging:** Winston + Morgan
- **Cron:** node-cron (fee reminders, auto-backups, report generation)

### Database & Caching
- **Primary DB:** PostgreSQL 16
- **ORM:** Prisma (fully typed schema, migrations, relations, composite indexes for 10K+ users)
- **Cache:** Redis (session store, hot-query cache, rate-limit buckets, pub/sub)
- **Search:** Full-text search via PostgreSQL tsvector or Meilisearch

### DevOps & Deployment
- **Containerization:** Docker (multi-stage builds), docker-compose
- **Reverse Proxy:** Nginx (SSL termination, load balancing, static serving)
- **CI/CD:** GitHub Actions (lint → test → build → deploy)
- **Monitoring:** Prometheus + Grafana (metrics), Sentry (error tracking)
- **Infrastructure:** AWS EC2 / DigitalOcean (or any VPS)

---

## 2. DESIGN SYSTEM

### Brand Identity
- **Primary Brand Color:** `#FF0000` (solid red)
- **Secondary Accents:** Teal (`#00B4D8`), Navy (`#1B263B`), Purple (`#7209B7`), Soft Blue (`#E0F7FA`)
- **Backgrounds:** White (`#FFFFFF`), Light Gray (`#F8F9FA`), Dark (`#0A0A0A`)

### Typography
```css
@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@400;600&family=Marck+Script&display=swap');
```
| Element | Font | Weight |
|---|---|---|
| Hero Headings | `Italiana` | 400 |
| Body, UI text | `Manrope` | 400, 600 |
| Quotes, decorative | `Marck Script` | 400 |

### Hero Section (Mandatory)
- **Full-screen viewport height** with `#FF0000` background.
- **Center aligned:** College logo (SVG, white), tagline, mission statement.
- **Animated text reveal:** Headline fades in with a staggered letter animation (Framer Motion `staggerChildren`).
- **Scroll indicator:** Animated chevron at the bottom.
- **Landing video:** Embed a Cloudinary-hosted video at the section base with a smooth red-to-dark gradient overlay.

### Component Aesthetics
| Component | Style |
|---|---|
| Cards | **Glassmorphism** — `background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2);` |
| Buttons (Primary) | Solid `#FF0000`, white text, rounded-lg, hover lift with shadow |
| Buttons (Secondary) | Teal (`#00B4D8`) or Navy (`#1B263B`), white text |
| Navbar | Sticky, transparent → solid white on scroll, backdrop-blur |
| Section Dividers | Wavy SVG separators or soft gradient transitions |
| Illustrations | Flat vector style (students, teachers, campus scenes) in teal/purple/blue palette — similar to E365's friendly illustration style |
| Avatars | Circular, flat-illustration style with cool blue/teal backgrounds |

### Animation Guidelines
- **Scroll-Triggered:** Every section reveals via `whileInView` + `viewport` (Framer Motion). Stagger children on lists and grids.
- **Page Transitions:** Wrap routes with `<AnimatePresence>` — fade + slide between pages.
- **Micro-interactions:** Hover scale on cards, skeleton loaders, progress bars, animated counters for stats.
- **Charts:** Animated on mount (Recharts `animationDuration`).

---

## 3. WEBSITE STRUCTURE (22 Sections)

Build the public-facing website with the following sections. Each must include **scroll-triggered Framer Motion animations**.

| # | Section | Key Elements |
|---|---|---|
| 1 | **Hero** | Fullscreen red banner, logo, animated tagline, CTA, background video |
| 2 | **About Institution** | History, vision, mission, accreditation badges, animated counters |
| 3 | **Principal's Message** | Profile card with image, quote (Marck Script), signature |
| 4 | **Chairman's Message** | Profile card, quote, photo |
| 5 | **College Statistics** | Row of animated counters (students, faculty, placements, publications) |
| 6 | **Departments** | Grid of department cards with icons, hover flip for details |
| 7 | **Courses Offered** | Filterable catalog with course name, duration, eligibility, fees |
| 8 | **Faculty Directory** | Search + filter by department; profile cards with photo, designation, bio |
| 9 | **Student Achievements** | Carousel/slider of achievement cards with images |
| 10 | **Placements** | Stats dashboard (highest package, avg, placed %), recruiter logos, success stories |
| 11 | **Recruiters** | Marquee / grid of company logos |
| 12 | **Research & Innovation** | Publications list, ongoing projects, research lab cards |
| 13 | **Events & Activities** | Calendar view + timeline of past/upcoming events |
| 14 | **Gallery** | Filterable grid (images + videos), lightbox viewer |
| 15 | **Alumni Network** | Alumni stats, notable alumni cards, testimonial carousel |
| 16 | **Testimonials** | Scrolling quotes from students, alumni, parents |
| 17 | **Campus Facilities** | Interactive campus map, facility cards with photos |
| 18 | **Library** | e-library links, digital catalog search bar, opening hours |
| 19 | **Hostel** | Room gallery, capacity chart, amenities list, fee card |
| 20 | **Transportation** | Bus route map, schedule table, GPS tracking preview |
| 21 | **Contact** | Contact form (Zod-validated), Google Maps embed, info cards |
| 22 | **Footer** | Quick links, social icons, newsletter signup, copyright |

---

## 4. USER ROLES & PERMISSIONS (RBAC)

Implement **strict Role-Based Access Control** with audit logging. Every API call logs `userId`, `role`, `action`, `resource`, `timestamp`, `ip`.

### Role Definitions

| Role | Scope | Key Permissions |
|---|---|---|
| **Super Admin** | Global | Full access — manage all modules, roles, system config, logs |
| **College Admin** | Institution-wide | Manage departments, courses, faculty, students; view all dashboards |
| **Principal** | Institution-wide | Read-only dashboards + approvals (leave, exam schedule, fees waiver) |
| **HOD** | Department | Manage department faculty, courses, timetable; view dept analytics |
| **Faculty / Professor** | Assigned classes | Mark attendance, enter marks, view assigned courses, communicate with students |
| **Student** | Self | View profile, timetable, attendance, marks, fees, apply for placements |
| **Parent** | Ward(s) only | View ward's attendance, marks, fees, notices |
| **Accountant** | Finance | Manage fee structures, collect payments, generate receipts, financial reports |
| **Exam Cell** | Examinations | Schedule exams, generate hall tickets, enter/validate marks, publish results |
| **Placement Officer** | Placements | Manage companies, drives, eligibility; approve student applications |
| **Librarian** | Library | Manage books, issue/return (QR), track fines, digital resources |

### Permission Inheritance
- Higher roles inherit all permissions of lower roles (except Super Admin which is absolute).
- Permissions defined as `{ module: string, action: 'create' | 'read' | 'update' | 'delete', scope: 'self' | 'department' | 'all' }`.

---

## 5. MODULES — FUNCTIONAL REQUIREMENTS

### 5.1 Student Management (SIS)

Build comprehensive student profiles with full CRUD APIs.

**Profile Fields:**
- **Personal:** Full name, photo, gender, DOB, blood group, Aadhaar (encrypted), email, phone, permanent & current address
- **Parent/Guardian:** Name, relation, phone, email, occupation, income
- **Academic:** USN, roll number, batch, branch, section, semester, admission year, batch, attendance %, CGPA, SGPA (semester-wise), internal marks, backlogs, class rank
- **Documents:** Aadhaar, PAN, 10th/12th marksheets, transfer cert, migration cert, fee receipts — all stored encrypted on S3/Cloudinary, access-logged

**APIs:**
- CRUD endpoints with Zod validation and typed responses
- Bulk import via CSV/Excel
- Search by USN, name, branch, semester (full-text + filters)
- PDF profile export

### 5.2 Attendance System

- **Faculty Dashboard:** Daily attendance marking per subject — radio buttons (Present/Absent/Leave), bulk mark, auto-save
- **Edit window:** Last 24 hours only (configurable)
- **Notifications:** Auto-SMS/email to parents when attendance drops below 75%
- **Student/Parent Portal:** Real-time attendance percentage per subject, monthly calendar heatmap
- **Reports:** Export monthly/semester attendance PDF, filter by subject/date range
- **Real-time:** Socket.io pushes updates so charts refresh live

### 5.3 Examination Module

- **Exam Types:** Internal Assessment (IA1, IA2, IA3), Midterm, Practical, End Semester, Backlog, Supplementary
- **Scheduling:** Create exam timetable — auto-detect room/faculty conflicts
- **Hall Tickets:** Auto-generate with QR code (encrypted student data, exam details)
- **Seating:** Auto-allocate seats (room capacity × student list), publish PDF seating chart
- **Marks Entry:** Faculty UI for internal + practical marks; Exam Cell for semester marks; validation rules (max marks, passing threshold)
- **Grading:** Configurable grade table (Absolute / Relative grading). Compute SGPA (semester) and CGPA (cumulative).
- **Results:** Publish result sheets; export to PDF; rank computation (class / branch / semester)
- **APIs:** Full CRUD for exam records, marks, results; paginated, filterable

### 5.4 Fees Management

- **Fee Structures:** Semester-wise, category-wise (General/SC/ST/OBC), with installments, late fees, scholarships
- **Billing Engine:** Auto-generate fee invoices at semester start
- **Reminders:** Automated email/SMS at T-30, T-14, T-7, T-1 days (cron jobs via node-cron)
- **Online Payments:** Razorpay + Stripe integration — pay via card, UPI, net banking, wallet
- **Receipts:** Auto-generate PDF receipt on successful payment, stored in student documents
- **Pending Reports:** Dashboard for Accountant — filter by branch, semester, dues amount
- **Custom Plans:** Support "customized tuition and payment plans" per student (e.g. installment deferrals, fee waivers)

### 5.5 Timetable Management

- **Auto-generation algorithm:** Conflict-free scheduling considering faculty availability, room capacity, batch/section, lab requirements
- **Manual override:** Admin can drag-and-drop adjustments
- **Views:** Faculty view (weekly calendar), Student view (class-wise), Room utilization view
- **Exports:** PDF, iCal (.ics) download
- **Real-time:** Changes pushed via Socket.io

### 5.6 Placement Module

- **Company Management:** CRUD for recruiters — name, logo, website, description, contacts
- **Drive Management:** Create placement drive — eligibility (min %, max backlogs, branches), role, package, dates
- **Student Application:** Students browse drives → apply with resume → track shortlist status
- **Officer Dashboard:** Approve/reject applications, shortlist, schedule interviews
- **Stats Dashboard:** Highest package, average package, median package, placed count, placement %, top recruiters, branch-wise trends — all with animated charts
- **Alerts:** Notify students of new drives, shortlist updates via email/SMS

### 5.7 Library Management

- **Book Inventory:** Title, author, ISBN, publisher, edition, category, quantity, rack location
- **QR/Barcode Scanning:** Issue/return books via QR scan (mobile camera or webcam)
- **Member Management:** Auto-link student/faculty profiles as library members
- **Check-in/Check-out:** Due date calc, auto-fines (₹X/day overdue)
- **Digital Resources:** Upload PDFs, link e-books, journal access
- **Reports:** Issued books, overdue list, most-read books, fine collections

### 5.8 Hostel Management

- **Room Allocation:** Building → floor → room → bed, with capacity, gender, occupancy status
- **Allocation Logic:** Auto-allocate by branch/semester preference, manual override
- **Hostel Fees:** Track per-semester hostel fees, mess bills
- **Visitor Logs:** Digital visitor entry/exit log per hostel
- **Complaints:** Students file maintenance complaints (room, electricity, plumbing) with status tracking
- **Mess Menu:** Weekly mess menu display

### 5.9 Transport Management

- **Routes:** Bus route CRUD — route name, stops, timings, driver, contact
- **GPS Tracking:** Integrate GPS API for live bus location on map (Leaflet / Mapbox)
- **Allocations:** Assign students to routes/stops
- **Transport Fees:** Separate fee module for transport

### 5.10 Communication Hub

- **Announcements:** Create campus-wide notices (priority: Urgent / Normal); push via email, SMS, in-app notification
- **Real-time Chat:** Socket.io-based messaging — faculty↔student, faculty↔parent, admin↔all groups
- **Bulk Communication:** Send emails/SMS to filtered groups (e.g. all 3rd-semester CSE students)
- **Notification Preferences:** Per user — opt-in/out for SMS, email, push

### 5.11 Analytics Dashboard

- **Student Growth:** Year-over-year enrollment chart (branch-wise)
- **Attendance Trends:** Daily/weekly/monthly average, branch comparison
- **Placement Stats:** Yearly trend, branch-wise, package distribution histogram
- **Fee Collection:** Revenue vs pending, monthly collection bar chart
- **Department Performance:** Avg CGPA per department, pass %
- **Faculty Workload:** Courses per faculty, hours per week

All charts must be **animated on mount** (Recharts `animationDuration`) and **responsive**.

### 5.12 AI Features (Advanced / Optional)

Integrate an AI assistant (OpenAI / custom LLM) for:
- **Query Bot:** Answer student FAQs (admission dates, fee structure, exam schedule)
- **Dropout Prediction:** Predict students at risk based on attendance %, marks trend, backlogs
- **Course Recommendation:** Suggest electives / certifications based on student profile and placement trends
- **Smart Search:** Semantic search across all modules (students, books, results, etc.)

---

## 6. SECURITY & COMPLIANCE

| Requirement | Implementation |
|---|---|
| Authentication | JWT (access 15min + refresh 7d httpOnly cookie), 2FA (TOTP), OTP login via email/SMS |
| RBAC | Middleware-enforced per-route permission checks |
| Data Encryption | AES-256 at rest (sensitive fields: Aadhaar, PAN, payment info); TLS 1.3 in transit |
| Rate Limiting | Redis-based — 100 req/min per IP on API, 5 req/min on auth |
| Headers | Helmet middleware (CSP, HSTS, X-Frame-Options, etc.) |
| SQL Injection | Prisma parameterized queries entirely |
| XSS/CSRF | Input sanitization (DOMPurify), CSRF tokens on state-changing endpoints |
| Audit Logging | Every action logged: `{ userId, role, action, resource, timestamp, ip, userAgent }` |
| GDPR / Privacy | Data export API, account deletion, consent records, cookie consent banner |
| Session Mgmt | Redis session store, force-logout endpoint, device management |
| Lighthouse | Target >95 — lazy-load images, code-split routes, CDN assets, preconnect to origins |

---

## 7. DATABASE SCHEMA (Prisma Models — Key Entities)

| Model | Fields |
|---|---|
| `User` | id, email, password (bcrypt), role, isActive, lastLogin, createdAt |
| `Role` | id, name, permissions (JSON), hierarchy |
| `StudentProfile` | userId, usn, firstName, lastName, photo, dob, gender, bloodGroup, aadhaar (encrypted), email, phone, address, parentId, batchId, branchId, semester, section |
| `ParentProfile` | userId, relation, phone, email, occupation |
| `Department` | id, name, code, hodId, establishedYear |
| `Course` | id, code, name, credits, hours, departmentId |
| `FacultyProfile` | userId, employeeId, designation, qualification, departmentId, joiningDate |
| `AttendanceRecord` | id, studentId, courseId, date, status (PRESENT/ABSENT/LEAVE), markedBy, createdAt |
| `Exam` | id, name, type, semester, courseId, date, maxMarks, passingMarks |
| `ExamResult` | id, studentId, examId, marksObtained, grade, sgpa, cgpa |
| `FeeStructure` | id, name, amount, semester, category, installmentAllowed |
| `FeeTransaction` | id, studentId, feeStructureId, amountPaid, mode, transactionId, receiptUrl, paidAt |
| `PlacementDrive` | id, companyId, role, package, eligibility, deadline |
| `PlacementApplication` | id, studentId, driveId, status (APPLIED/SHORTLISTED/SELECTED/REJECTED) |
| `Book` | id, title, author, isbn, category, quantity, rack |
| `BookTransaction` | id, bookId, userId, type (ISSUE/RETURN), issuedAt, returnedAt, fine |
| `Room` | id, hostelId, floor, roomNumber, capacity, type |
| `Complaint` | id, studentId, category, description, status, createdAt |
| `BusRoute` | id, name, driverName, driverPhone, stops (JSON) |
| `Notification` | id, title, body, type, recipientRole, sentAt |
| `ChatMessage` | id, senderId, receiverId, text, attachmentUrl, createdAt |
| `AuditLog` | id, userId, role, action, resource, details, ip, userAgent, timestamp |

**Indexes:** Composite indexes on `(studentId, courseId, date)` for attendance, `(studentId, semester)` for results, `(email)` for user lookup, `(usn)` for student search.

---

## 8. API ARCHITECTURE

- **Base URL:** `/api/v1`
- **Format:** RESTful JSON, consistent error shape `{ success: boolean, data?: T, error?: { code, message, details } }`
- **Pagination:** `?page=1&limit=20` with response `{ data, meta: { total, page, limit, totalPages } }`
- **Sort:** `?sort=createdAt&order=desc`
- **Filter:** `?branch=CSE&semester=3`
- **Auth:** `Authorization: Bearer <accessToken>`
- **Swagger:** Auto-generated OpenAPI docs via swagger-jsdoc, served at `/api/docs`

### API Module Groups

| Group | Prefix | Key Endpoints |
|---|---|---|
| Auth | `/auth` | login, register, refresh, logout, 2fa, forgot-password |
| Users | `/users` | CRUD, profile, change-role |
| Students | `/students` | CRUD, search, bulk-import, documents, export |
| Attendance | `/attendance` | mark, bulk-mark, get-by-student, get-by-course, report |
| Exams | `/exams` | CRUD, hall-ticket, marks-entry, results, rank |
| Fees | `/fees` | structures, transactions, pay, receipt, pending |
| Timetable | `/timetable` | generate, get-by-faculty, get-by-student, update |
| Placements | `/placements` | companies, drives, applications, stats |
| Library | `/library` | books, issue, return, fines, search |
| Hostel | `/hostel` | rooms, allocate, complaints, fees |
| Transport | `/transport` | routes, allocate, gps-location |
| Notifications | `/notifications` | send, list, preferences |
| Chat | `/chat` | send, messages, conversations, socket-events |
| Analytics | `/analytics` | student-growth, attendance-trends, placements, fees-collection |
| AI | `/ai` | query, predict-dropout, recommend |

---

## 9. DELIVERABLES

| Artifact | Description |
|---|---|
| `src/` | Full React + TypeScript frontend with all pages, components, hooks, utils |
| `server/` | Full Express + TypeScript backend with routes, controllers, services, middleware |
| `prisma/schema.prisma` | Complete database schema with all models, relations, indexes |
| `prisma/seed.ts` | Seed script with demo data (departments, courses, faculty, 100+ students) |
| `docker-compose.yml` | Postgres + Redis + App + Nginx setup |
| `Dockerfile` | Multi-stage build for frontend + backend |
| `.github/workflows/` | CI/CD pipeline (lint → test → build → deploy) |
| `nginx/` | Reverse proxy config with SSL, gzip, caching headers |
| `docs/ARCHITECTURE.md` | System architecture, data flow diagrams, folder structure |
| `docs/API.md` | Swagger/OpenAPI documentation |
| `docs/SECURITY.md` | Security checklist, threat model, compliance notes |
| `docs/DEPLOYMENT.md` | Deployment guide with environment variables, commands |
| `scripts/` | Backup, restore, data migration scripts |
| `README.md` | Project overview, setup instructions, tech stack badges |
| `.env.example` | All required environment variables with dummy values |
| `tests/` | Jest + Supertest API tests, React Testing Library component tests |

---

## 10. FOLDER STRUCTURE

```
/
├── client/                     # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Shared: Button, Card, Modal, Navbar, etc.
│   │   ├── features/           # Per-module: students/, attendance/, exams/, fees/
│   │   ├── hooks/              # Custom hooks (useAuth, useSocket, etc.)
│   │   ├── layouts/            # AdminLayout, StudentLayout, PublicLayout
│   │   ├── lib/                # axios, queryClient, socket, utils
│   │   ├── pages/              # Route pages
│   │   ├── store/              # Zustand stores (auth, ui)
│   │   ├── types/              # TypeScript interfaces/types
│   │   └── App.tsx             # Router + AnimatePresence
│   ├── tailwind.config.ts
│   └── vite.config.ts
├── server/                     # Express + TypeScript backend
│   ├── src/
│   │   ├── config/             # env, db, redis, cors
│   │   ├── controllers/        # Request handlers per module
│   │   ├── middleware/         # auth, rbac, validate, rateLimit, audit
│   │   ├── routes/             # Express routers
│   │   ├── services/           # Business logic layer
│   │   ├── utils/              # pdf, email, sms, encryption helpers
│   │   ├── types/              # Express.d.ts, shared types
│   │   └── app.ts              # Express setup
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── tests/
├── docker/
│   ├── Dockerfile.client
│   ├── Dockerfile.server
│   └── nginx.conf
├── .github/workflows/
├── docs/
└── docker-compose.yml
```

---

## 11. DEVELOPMENT PRINCIPLES

- **TypeScript strict mode** everywhere — no `any`, no implicit `any`.
- **Zod validation** on every API input and form submission.
- **Error boundaries** on every route segment (React).
- **Loading states** — skeleton loaders for every data-fetch, not spinners.
- **Empty states** — illustrated empty states for zero-data views.
- **Error states** — friendly error display with retry button.
- **Responsive** — mobile-first, tested at 320px, 768px, 1024px, 1440px.
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation, focus management.
- **No secrets in code** — all secrets via environment variables.
- **Commit discipline** — conventional commits, meaningful messages.

---

## 12. SUMMARY OF VISUAL REFERENCES

| Element | Style Reference |
|---|---|
| Hero Background | Solid `#FF0000`, fullscreen |
| Illustration Style | Flat vector, teal/purple/blue tones — friendly, modern (like E365) |
| Card Style | Glassmorphism — `backdrop-filter: blur(20px)`, white transparency |
| Animations | Framer Motion scroll reveals, staggered children, smooth page transitions |
| Charts | Recharts animated on mount, responsive |
| Profiles / Avatars | Circular, flat-illustration style with cool blue background |

---

**Begin building.** Every line of code must match this specification. Do not cut corners. Do not simplify. Build the ERP as if 10,000 students depend on it.
