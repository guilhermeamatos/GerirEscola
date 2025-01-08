import { Request, Response } from 'express';
import { LessonService } from '../services/LessonService';

export class LessonController {
  private lessonService: LessonService;

  constructor() {
    this.lessonService = new LessonService();
  }

  async registerLesson(req: Request, res: Response) {
    const { name, description, subjectId } = req.body;

    try {
      const lesson = await this.lessonService.registerLesson({ name, description, subjectId });
      return res.status(201).json(lesson);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}