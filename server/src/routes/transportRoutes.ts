import { Router } from 'express';
import { getRoutes, createRoute, updateGPS, allocateTransport } from '../controllers/transportController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', getRoutes);
router.post('/', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN'), createRoute);
router.patch('/:routeId/gps', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN'), updateGPS);
router.post('/allocate', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN'), allocateTransport);

export default router;
