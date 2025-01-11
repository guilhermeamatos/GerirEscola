import { PerformanceRepository } from '../repositories/PerformanceRepository';

export class PerformanceService {
  constructor(private performanceRepository: PerformanceRepository) {}

  async upsertPerformance(subjectId: string, data: any) {
    console.log('subjectId', subjectId);
    console.log('data', data);
    if (!subjectId) {
      throw { status: 400, message: 'O ID da disciplina é obrigatório.' };
    }
  
    if (!Array.isArray(data)) {
      throw { status: 400, message: 'Os dados enviados devem ser um array de registros.' };
    }
  
    const subject = await this.performanceRepository.findSubjectById(subjectId);
    if (!subject) {
      throw { status: 404, message: 'Disciplina não encontrada.' };
    }
  
    const enrollments = await this.performanceRepository.findEnrollmentsBySubject(subjectId);
    if (enrollments.length === 0) {
      throw { status: 404, message: 'Nenhum aluno matriculado nesta disciplina.' };
    }
  
    const results = [];
    for (const enrollment of enrollments) {
      const record = data.find((item: any) => item.studentId === enrollment.student_id);
      if (!record) continue;
  
      const { parecere1Trimestre, parecere2Trimestre, parecere3Trimestre } = record;
  
      const updatedPerformance = await this.performanceRepository.upsertPerformance(enrollment.id, {
        parecere1Trimestre,
        parecere2Trimestre,
        parecere3Trimestre,
      });
  
      results.push(updatedPerformance);
    }
  
    return results;
  }
  
  async getPerformanceBySubject(subjectId: string) {
    if (!subjectId) {
      throw { status: 400, message: 'O ID da disciplina é obrigatório.' };
    }

    const subject = await this.performanceRepository.findSubjectById(subjectId);
    if (!subject) {
      throw { status: 404, message: 'Disciplina não encontrada.' };
    }

    return this.performanceRepository.getPerformanceBySubject(subjectId);
  }
}
