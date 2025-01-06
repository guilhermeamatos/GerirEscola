// src/controllers/TeacherSchoolController.ts
import { Request, Response } from "express";
import { TeacherSchoolService } from "../services/TeacherSchoolService";

export class TeacherSchoolController {
  private teacherSchoolService: TeacherSchoolService;

  constructor() {
    this.teacherSchoolService = new TeacherSchoolService();
  }

  // Controlador para vincular o professor à escola
  async linkTeacherToSchoolController(req: Request, res: Response) {
    const { teacherId, schoolId } = req.body;

    try {
      // Chamar o serviço para vincular o professor à escola
      const result = await this.teacherSchoolService.linkTeacherToSchool(teacherId, schoolId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message: (error instanceof Error) ? error.message : 'An unknown error occurred',
      });
    }
  }
}
