# E367 College ERP

A production-ready **Engineering College Management System** built with React 19, Node.js, PostgreSQL, and Prisma. Designed for 1,000–10,000+ students with enterprise-grade scalability.

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Recharts, TanStack Query |
| **Backend** | Node.js, Express.js, TypeScript, Prisma ORM |
| **Database** | PostgreSQL 16, Redis 7 |
| **Auth** | JWT (access + refresh), 2FA, RBAC |
| **Infrastructure** | Docker, Nginx, GitHub Actions |

## Quick Start

```bash
# Install dependencies
npm install
npm install --prefix client
npm install --prefix server

# Generate Prisma client
cd server && npx prisma generate

# Push schema to database (requires PostgreSQL running)
npx prisma db push

# Seed demo data
npx tsx prisma/seed.ts

# Start development
npm run dev
```

## Features

- **Student Information System** — Comprehensive profiles, documents, academic records
- **Attendance** — Real-time marking, auto-parent notifications, reports
- **Examinations** — Hall tickets with QR, marks entry, SGPA/CGPA computation
- **Fees** — Custom billing plans, online payments (Razorpay/Stripe), receipts
- **Timetable** — Auto-generated conflict-free schedules
- **Placements** — Drive management, student applications, stats dashboard
- **Library** — QR-based issue/return, fine tracking, digital resources
- **Hostel & Transport** — Room allocation, GPS tracking, complaint system
- **Communication** — Announcements, real-time chat, SMS/email broadcasts
- **Analytics** — Interactive charts for growth, attendance, placements, fees
- **AI Assistant** — FAQ bot, dropout prediction, course recommendations

## Architecture

```
Client (React 19) → Nginx → Express API → Prisma → PostgreSQL
                            ↕                    ↕
                         Socket.io             Redis
```

## Deployment

```bash
docker-compose up -d --build
```

## License

MIT
