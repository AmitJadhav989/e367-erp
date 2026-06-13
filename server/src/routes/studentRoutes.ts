import { Router } from 'express';
import { getStudents, getStudent } from '../controllers/studentController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'HOD', 'FACULTY'), getStudents);
router.get('/:id', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'HOD', 'FACULTY', 'STUDENT'), getStudent);

export default router;
