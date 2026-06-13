import { Router } from 'express';
import { getHostels, allocateRoom, getComplaints, createComplaint } from '../controllers/hostelController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', getHostels);
router.post('/allocate', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN'), allocateRoom);
router.get('/complaints', getComplaints);
router.post('/complaints', authorize('STUDENT'), createComplaint);

export default router;
