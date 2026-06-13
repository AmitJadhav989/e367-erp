import { Router } from 'express';
import { getExams, createExam, getExamResults, enterMarks } from '../controllers/examController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'EXAM_CELL', 'FACULTY', 'STUDENT'), getExams);
router.post('/', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'EXAM_CELL'), createExam);
router.get('/:examId/results', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'EXAM_CELL', 'FACULTY', 'STUDENT'), getExamResults);
router.post('/:examId/marks', authorize('FACULTY', 'EXAM_CELL', 'COLLEGE_ADMIN'), enterMarks);

export default router;
