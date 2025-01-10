import e from 'express';
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
  
    // Converte valores de avaliação para ponto flutuante
    const sanitizedAssessmentValues = this.sanitizeValues(assessmentValues);
  
    // Atualiza ou cria os valores das avaliações
    await this.gradeRepository.upsertAssessmentValues(subjectId, sanitizedAssessmentValues);
  
    // Atualiza ou cria as notas para cada aluno
    const results = [];
    for (const gradeData of grades) {
      const { studentId, ...individualGrades } = gradeData;
  
      // Converte as notas individuais para ponto flutuante
      const sanitizedGrades = this.sanitizeValues(individualGrades);
  
      // Calcula as médias
        const grade1_1 = sanitizedGrades.grade1_1 ?? 0;
        const grade1_2 = sanitizedGrades.grade1_2 ?? 0;
        const grade1_3 = sanitizedGrades.grade1_3 ?? 0;

        const grade2_1 = sanitizedGrades.grade2_1 ?? 0;
        const grade2_2 = sanitizedGrades.grade2_2 ?? 0;
        const grade2_3 = sanitizedGrades.grade2_3 ?? 0;

        const grade3_1 = sanitizedGrades.grade3_1 ?? 0;
        const grade3_2 = sanitizedGrades.grade3_2 ?? 0;
        const grade3_3 = sanitizedGrades.grade3_3 ?? 0;

        let grade1_media = (grade1_1 + grade1_2 + grade1_3) ;
        let grade2_media = (grade2_1 + grade2_2 + grade2_3) ;
        let grade3_media = (grade3_1 + grade3_2 + grade3_3) ;

        let nota1 = grade1_media;
        let nota2 = grade2_media;
        let nota3 = grade3_media;

        if (grade1_media < sanitizedGrades.grade1_rp) {
            nota1 = sanitizedGrades.grade1_rp;
        }
        if (grade2_media < sanitizedGrades.grade2_rp) {
            nota2 = sanitizedGrades.grade2_rp;
        }
        if (grade3_media < sanitizedGrades.grade3_rp) {
            nota3 = sanitizedGrades.grade3_rp;
        }
        let grade_final = (nota1 + nota2 + nota3) / 3;

      const updatedGrade = await this.gradeRepository.upsertGrade(subjectId, studentId, {
        ...sanitizedGrades,
        grade1_media,
        grade2_media,
        grade3_media,
        grade_final,
      });
  
      results.push(updatedGrade);
    }
  
    return results;
  }
  
  // Função para sanitizar os valores, convertendo para ponto flutuante
  private sanitizeValues(values: Record<string, any>): Record<string, number> {
    const sanitized: Record<string, number> = {};
    for (const [key, value] of Object.entries(values)) {
      sanitized[key] = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    }
    return sanitized;
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
