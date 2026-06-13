import { Router } from 'express';
import { getFeeStructures, createFeeStructure, getTransactions, processPayment, getFeeSummary } from '../controllers/feeController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/structures', getFeeStructures);
router.post('/structures', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'ACCOUNTANT'), createFeeStructure);
router.get('/transactions', getTransactions);
router.post('/pay', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'ACCOUNTANT', 'STUDENT'), processPayment);
router.get('/summary', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'ACCOUNTANT'), getFeeSummary);

export default router;
