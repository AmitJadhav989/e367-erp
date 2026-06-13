import { Router } from 'express';
import { getCompanies, createCompany, getDrives, createDrive, applyToDrive, getPlacementStats } from '../controllers/placementController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/companies', getCompanies);
router.post('/companies', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'PLACEMENT_OFFICER'), createCompany);
router.get('/drives', getDrives);
router.post('/drives', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'PLACEMENT_OFFICER'), createDrive);
router.post('/drives/:driveId/apply', authorize('STUDENT'), applyToDrive);
router.get('/stats', authorize('SUPER_ADMIN', 'COLLEGE_ADMIN', 'PLACEMENT_OFFICER'), getPlacementStats);

export default router;
