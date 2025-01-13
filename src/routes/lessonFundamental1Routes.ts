import { Router } from 'express';
import { LessonFundamental1Controller } from '../controllers/LessonFundamental1Controller';

const lessonController = new LessonFundamental1Controller();
const lessonRouter = Router();

lessonRouter.post('/', (req, res) => lessonController.registerLesson(req, res));

lessonRouter.post('/attendance', (req, res) => lessonController.registerAttendance(req, res));

lessonRouter.get('/class/:classId', (req, res) => lessonController.getLessonsByClass(req, res));

lessonRouter.get('/attendance/:lessonId', (req, res) => lessonController.getLessonAttendance(req, res));

export { lessonRouter as lessonFundamental1Router };
