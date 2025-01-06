// src/services/TeacherSchoolService.ts
import { TeacherSchoolRepository } from "../repositories/TeacherSchoolRepository";

export class TeacherSchoolService {
  private teacherSchoolRepository: TeacherSchoolRepository;

  constructor() {
    this.teacherSchoolRepository = new TeacherSchoolRepository();
  }

  // Vincular o professor à escola
  async linkTeacherToSchool(teacherId: string, schoolId: string) {
    // Verificar se o professor existe
    const teacher = await this.teacherSchoolRepository.findTeacherById(teacherId);
    if (!teacher) {
      throw new Error("Professor não encontrado.");
    }

    // Verificar se a escola existe
    const school = await this.teacherSchoolRepository.findSchoolById(schoolId);
    if (!school) {
      throw new Error("Escola não encontrada.");
    }

    // Vincular o professor à escola
    await this.teacherSchoolRepository.linkTeacherToSchool(teacherId, schoolId);

    return { message: "Professor vinculado à escola com sucesso." };
  }
}
