import { Request, Response } from 'express';
import { GradeService } from '../services/GradeService';
import { GradeRepository } from '../repositories/GradeRepository';  

export class GradeController {
  private gradeService: GradeService;

  constructor() {
    this.gradeService = new GradeService(new GradeRepository());
  }

  async upsertGrades(req: Request, res: Response) {
    const { subjectId } = req.params;
    const grades = req.body;

    try {
      const result = await this.gradeService.upsertGradesAndValues(subjectId, grades);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getGradesBySubject(req: Request, res: Response) {
    const { subjectId } = req.params;

    try {
      const result = await this.gradeService.getGradesAndValues(subjectId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}
