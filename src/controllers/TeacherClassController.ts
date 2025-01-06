// src/controllers/TeacherClassController.ts
import { Request, Response } from "express";
import { TeacherClassService } from "../services/TeacherClassService";

export class TeacherClassController {
  private teacherClassService: TeacherClassService;

  constructor() {
    this.teacherClassService = new TeacherClassService();
  }

  async assignTeacherToClassAndSubjectsController(req: Request, res: Response) {
    const { teacherId, classId, subjectIds } = req.body;

    try {
      const result = await this.teacherClassService.linkTeacherToClassAndSubjects(
        teacherId,
        classId,
        subjectIds
      );
      return res.status(200).json({
        message: "Professor vinculado com sucesso à turma e disciplinas.",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
}
