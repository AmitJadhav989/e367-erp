# Deployment Guide

## Prerequisites
- Docker & Docker Compose
- Node.js 24+
- PostgreSQL 16
- Redis 7

## Environment Setup

1. Copy environment files:
```bash
cp server/.env.example server/.env
```

2. Configure `.env` with your production values:
- Generate strong JWT secrets: `openssl rand -hex 64`
- Set database credentials
- Configure SMTP, Twilio, payment gateway keys

## Local Development

```bash
# Install dependencies
npm install
npm install --prefix client
npm install --prefix server

# Generate Prisma client
cd server && npx prisma generate

# Run database migrations
npx prisma db push

# Seed demo data
npx tsx prisma/seed.ts

# Start both client and server
npm run dev
```

## Docker Deployment

```bash
# Build and start all services
docker-compose up -d --build

# Run database migrations
docker-compose exec server npx prisma db push

# Seed data
docker-compose exec server npx tsx prisma/seed.ts

# View logs
docker-compose logs -f
```

## Production Checklist

- [ ] Strong JWT secrets in .env
- [ ] HTTPS enabled (Let's Encrypt / Cloudflare)
- [ ] Database backups configured (pg_dump cron job)
- [ ] Redis persistence enabled
- [ ] Rate limiting configured
- [ ] Monitoring (Prometheus + Grafana) set up
- [ ] Error tracking (Sentry) configured
- [ ] CDN for static assets
- [ ] Regular security audits

## Monitoring

Access Prometheus at `http://your-domain:9090`
Access Grafana at `http://your-domain:3001`

Default Grafana credentials stored in docker-compose override file.
