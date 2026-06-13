import { Router } from 'express';
import { markAttendance, getAttendance } from '../controllers/attendanceController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.post('/mark', authorize('FACULTY', 'HOD', 'COLLEGE_ADMIN'), markAttendance);
router.get('/', authorize('FACULTY', 'HOD', 'COLLEGE_ADMIN', 'STUDENT', 'PARENT'), getAttendance);

export default router;
