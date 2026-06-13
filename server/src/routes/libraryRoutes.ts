import { Router } from 'express';
import { getBooks, createBook, issueBook, returnBook } from '../controllers/libraryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', getBooks);
router.post('/', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'LIBRARIAN'), createBook);
router.post('/issue', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'LIBRARIAN'), issueBook);
router.post('/return/:transactionId', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'LIBRARIAN'), returnBook);

export default router;
