# Architecture Overview

## System Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│   Nginx      │────▶│  Express.js  │
│  (React 19)  │     │  (Reverse    │     │   (API)      │
│              │◀────│   Proxy)     │◀────│              │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                    ┌──────────────────────────────┼──────────────────┐
                    │              │               │                  │
                    ▼              ▼               ▼                  ▼
            ┌──────────┐   ┌──────────┐   ┌──────────────┐   ┌──────────┐
            │PostgreSQL│   │  Redis   │   │  AWS S3 /    │   │  Socket  │
            │ (Primary)│   │ (Cache/  │   │  Cloudinary  │   │   .io    │
            │          │   │  Session)│   │  (Storage)   │   │ (Realtime)│
            └──────────┘   └──────────┘   └──────────────┘   └──────────┘
```

## Client Architecture (React 19)

```
client/src/
├── components/    # Shared UI components
│   ├── ui/        # Button, Card, Input, Modal, etc.
│   ├── layout/    # Navbar, Footer, DashboardLayout
│   └── sections/  # Hero, About, Stats, etc.
├── features/      # Per-module feature logic
├── hooks/         # Custom React hooks
├── lib/           # API client, utils, socket
├── pages/         # Route page components
├── store/         # Zustand stores
└── types/         # TypeScript interfaces
```

## Server Architecture (Express)

```
server/src/
├── config/        # env, prisma, redis
├── controllers/   # Request handlers
├── middleware/    # auth, rbac, validate, audit
├── routes/        # Express routers
├── services/      # Business logic
├── utils/         # Helpers (email, sms, pdf)
└── types/         # TypeScript declarations
```

## Data Flow

1. Client makes request via axios (includes JWT in Authorization header)
2. Nginx proxies /api/* to Express server
3. Express middleware chain: helmet → cors → rate-limit → auth → rbac → validate → controller
4. Controller calls service layer → Prisma ORM → PostgreSQL
5. Response flows back through the chain
6. Real-time updates via Socket.io for attendance, chat, notifications
