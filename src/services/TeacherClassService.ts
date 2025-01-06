// src/services/TeacherClassService.ts
import { TeacherClassRepository } from "../repositories/TeacherClassRepository";

export class TeacherClassService {
  private teacherClassRepository: TeacherClassRepository;

  constructor() {
    this.teacherClassRepository = new TeacherClassRepository();
  }

  async linkTeacherToClassAndSubjects(
    teacherId: string,
    classId: string,
    subjectIds: string[]
  ) {
    if (!teacherId || !classId || !subjectIds.length) {
      throw new Error("Todos os campos (teacherId, classId, subjectIds) são obrigatórios.");
    }

    // Verificar se o professor existe
    const teacher = await this.teacherClassRepository.findTeacherById(teacherId);
    if (!teacher) {
      throw new Error("Professor não encontrado.");
    }

    // Verificar se a turma existe
    const classEntity = await this.teacherClassRepository.findClassById(classId);
    if (!classEntity) {
      throw new Error("Turma não encontrada.");
    }

    // Verificar se todas as disciplinas existem
    const subjects = await this.teacherClassRepository.findSubjectsByIds(subjectIds);
    if (subjects.length !== subjectIds.length) {
      throw new Error(
        "Uma ou mais disciplinas fornecidas não foram encontradas no banco de dados."
      );
    }

    try {
      return await this.teacherClassRepository.assignTeacherToClassAndSubjects(
        teacherId,
        classId,
        subjectIds
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao vincular professor: ${error.message}`);
      } else {
        throw new Error("Erro ao vincular professor: erro desconhecido.");
      }
    }
  }
}
