import { GradeRepository } from '../repositories/GradeRepository';

export class GradeService {
  private gradeRepository: GradeRepository;

  constructor(gradeRepository: GradeRepository) {
    this.gradeRepository = gradeRepository;
  }

  // Cadastro de notas e valores de avaliação
  async upsertGradesAndValues(subjectId: string, data: any) {
    if (!subjectId) {
      throw { status: 400, message: 'O ID da disciplina é obrigatório.' };
    }

    const { assessmentValues, grades } = this.extractData(data);

    // Valida se a disciplina existe
    const subject = await this.gradeRepository.findSubjectById(subjectId);
    if (!subject) {
      throw { status: 404, message: 'Disciplina não encontrada.' };
    }

    // Atualiza ou cria os valores das avaliações
    await this.gradeRepository.upsertAssessmentValues(subjectId, assessmentValues);

    // Atualiza ou cria as notas para cada aluno
    const results = [];
    for (const gradeData of grades) {
      const { studentId, ...individualGrades } = gradeData;

      const grade1_media = (individualGrades.grade1_1 + individualGrades.grade1_2 + individualGrades.grade1_3) / 3;
      const grade2_media = (individualGrades.grade2_1 + individualGrades.grade2_2 + individualGrades.grade2_3) / 3;
      const grade3_media = (individualGrades.grade3_1 + individualGrades.grade3_2 + individualGrades.grade3_3) / 3;
      const grade_final = (grade1_media + grade2_media + grade3_media) / 3;

      const updatedGrade = await this.gradeRepository.upsertGrade(subjectId, studentId, {
        ...individualGrades,
        grade1_media,
        grade2_media,
        grade3_media,
        grade_final,
      });

      results.push(updatedGrade);
    }

    return results;
  }

  // Consulta notas e valores de avaliações
  async getGradesAndValues(subjectId: string) {
    if (!subjectId) {
      throw { status: 400, message: 'O ID da disciplina é obrigatório.' };
    }

    // Valida se a disciplina existe
    const subject = await this.gradeRepository.findSubjectById(subjectId);
    if (!subject) {
      throw { status: 404, message: 'Disciplina não encontrada.' };
    }

    return this.gradeRepository.findGradesBySubject(subjectId);
  }

  // Extrai valores de avaliação e notas do payload recebido
  private extractData(data: any) {
    const assessmentValues = data.assessmentValues;
    const grades = data.grades;

    if (!assessmentValues || !grades) {
      throw { status: 400, message: 'Dados incompletos: assessmentValues e grades são obrigatórios.' };
    }

    return { assessmentValues, grades };
  }
}
