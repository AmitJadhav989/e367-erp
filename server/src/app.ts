import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import examRoutes from './routes/examRoutes';
import feeRoutes from './routes/feeRoutes';
import placementRoutes from './routes/placementRoutes';
import libraryRoutes from './routes/libraryRoutes';
import hostelRoutes from './routes/hostelRoutes';
import transportRoutes from './routes/transportRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/fees', feeRoutes);
app.use('/api/v1/placements', placementRoutes);
app.use('/api/v1/library', libraryRoutes);
app.use('/api/v1/hostel', hostelRoutes);
app.use('/api/v1/transport', transportRoutes);

// Error handler
app.use(errorHandler);

export default app;
