import { Router } from 'express';
import { LessonController } from '../controllers/LessonController';

const lessonController = new LessonController();
const lessonRouter = Router();

lessonRouter.post('/', (req, res) => lessonController.registerLesson(req, res));

export { lessonRouter };
