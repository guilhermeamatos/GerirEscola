import { Request, Response } from 'express';
import { LessonService } from '../services/LessonService';

export class LessonController {
  private lessonService: LessonService;

  constructor() {
    this.lessonService = new LessonService();
  }

  async registerLesson(req: Request, res: Response) {
    const { name, description, subjectId, date } = req.body;

    try {
      // Valida se a data está presente, senão atribui a data atual
      const lessonDate = date || new Date().toISOString();

      const lesson = await this.lessonService.registerLesson({ 
        name, 
        description, 
        subjectId, 
        date: lessonDate 
      });
      return res.status(201).json(lesson);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
}


  async registerAttendance(req: Request, res: Response) {
    const { lessonId, absentStudentIds } = req.body;

    try {
      const attendance = await this.lessonService.registerAttendance(lessonId, absentStudentIds);
      return res.status(201).json(attendance);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getLessonsBySubject(req: Request, res: Response) {
    const { subjectId } = req.params;

    try {
      const lessons = await this.lessonService.getLessonsBySubject(subjectId);
      return res.status(200).json(lessons);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getLessonAttendance(req: Request, res: Response) {
    const { lessonId } = req.params;

    try {
      const attendance = await this.lessonService.getLessonAttendance(lessonId);
      return res.status(200).json(attendance);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}
