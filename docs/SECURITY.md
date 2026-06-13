# Security Checklist

## Authentication & Authorization
- [x] JWT-based authentication (access + refresh tokens)
- [x] HTTP-only secure cookies for refresh tokens
- [x] 2FA via TOTP (optional, configurable)
- [x] Role-Based Access Control (RBAC) on every route
- [x] Password hashing with bcryptjs (salt rounds: 12)

## Data Protection
- [x] AES-256 encryption for PII fields (Aadhaar, PAN)
- [x] TLS 1.3 for all data in transit
- [x] Input validation with Zod on all endpoints
- [x] Parameterized queries via Prisma (SQL injection prevention)
- [x] File upload validation (type, size limits via Multer)

## API Security
- [x] Helmet middleware (security headers: CSP, HSTS, X-Frame-Options)
- [x] CORS restricted to configured origin
- [x] Rate limiting (100 req/min per IP on API, 5 req/min on auth)
- [x] Request body size limit (10MB)

## Monitoring & Auditing
- [x] Audit logging for all state-changing operations
- [x] Login attempt tracking
- [x] Session management (Redis-based)
- [x] Error monitoring via Sentry

## Compliance
- [ ] GDPR: Data export API, account deletion
- [ ] Privacy: Cookie consent banner
- [ ] Data retention policies
