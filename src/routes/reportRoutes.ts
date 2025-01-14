import { Router } from 'express';
import { ReportController } from '../controllers/ReportController';

const reportRouter = Router();
const reportController = new ReportController();

reportRouter.get('/class/:classId', (req, res) => reportController.generateClassReport(req, res));

export { reportRouter };
