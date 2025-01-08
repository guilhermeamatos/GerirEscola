import { Router } from 'express';
import { LessonController } from '../controllers/LessonController';

const lessonController = new LessonController();
const lessonRouter = Router();

lessonRouter.post('/', (req, res) => lessonController.registerLesson(req, res));

lessonRouter.post('/attendance', (req, res) => lessonController.registerAttendance(req, res));


export { lessonRouter };
