
import { Router } from 'express';
import { createSchoolController } from '../controllers/schoolController';

const router = Router();

router.post('/schools', createSchoolController);

export default router;

