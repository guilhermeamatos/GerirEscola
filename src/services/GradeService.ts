import { GradeRepository } from '../repositories/GradeRepository';

export class GradeService {
  private gradeRepository: GradeRepository;

  constructor() {
    this.gradeRepository = new GradeRepository();
  }

  async upsertGrades(subjectId: string, grades: any[]) {
    if (!subjectId) {
      throw { status: 400, message: 'O ID da disciplina é obrigatório.' };
    }

    // Verifica se a disciplina existe
    const subjectExists = await this.gradeRepository.findSubjectById(subjectId);
    if (!subjectExists) {
      throw { status: 404, message: 'Disciplina não encontrada.' };
    }

    // Atualiza ou cria as notas para cada aluno
    const result = [];
    for (const gradeData of grades) {
      const { studentId, ...grades } = gradeData;
      const updatedGrade = await this.gradeRepository.upsertGrade(subjectId, studentId, grades);
      result.push(updatedGrade);
    }

    return result;
  }

  async getGradesBySubject(subjectId: string) {
    if (!subjectId) {
      throw { status: 400, message: 'O ID da disciplina é obrigatório.' };
    }

    // Verifica se a disciplina existe
    const subjectExists = await this.gradeRepository.findSubjectById(subjectId);
    if (!subjectExists) {
      throw { status: 404, message: 'Disciplina não encontrada.' };
    }

    // Retorna as notas da disciplina
    return await this.gradeRepository.findGradesBySubject(subjectId);
  }
}
