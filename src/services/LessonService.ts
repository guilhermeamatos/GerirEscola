import { LessonRepository } from '../repositories/LessonRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';


export class LessonService {
  private lessonRepository: LessonRepository;
  private enrollmentRepository: EnrollmentRepository;


  constructor() {
    this.lessonRepository = new LessonRepository();
    this.enrollmentRepository = new EnrollmentRepository
  }

  async registerLesson(data: { name: string; description?: string; subjectId: string; date: Date | string }) {
    // Verifica se a disciplina existe
    const subject = await this.lessonRepository.findSubjectById(data.subjectId);
    if (!subject) {
      throw { status: 404, message: 'Disciplina não encontrada.' };
    }

    if (!data.date || isNaN(Date.parse(data.date.toString()))) {
      throw {
        status: 400,
        message: 'A data fornecida é inválida.',
      };
    }
  
    // Cria a aula com o campo `date`
    return await this.lessonRepository.createLesson(data);
  }
  
  

  async registerAttendance(lessonId: string, absentStudentIds: string[]) {
    const lesson = await this.lessonRepository.findLessonById(lessonId);
  
    if (!lesson) {
      throw {
        status: 404,
        message: 'Aula não encontrada.',
      };
    }
  
    const subject = lesson.subject;
  
    if (!subject || !subject.enrollments) {
      throw {
        status: 404,
        message: 'Disciplina ou inscrições não encontradas.',
      };
    }
  
    const { enrollments } = subject;
    const attendanceResults = [];
  
    for (const enrollment of enrollments) {
      const isAbsent = absentStudentIds.includes(enrollment.student_id);
  
      const attendance = await this.lessonRepository.createEnrollmentLesson({
        enrollmentId: enrollment.id,
        lessonId,
        present: !isAbsent,
      });
      attendanceResults.push(attendance);
    }
  
    return attendanceResults;
  }
  
  async getLessonsBySubject(subjectId: string) {
    if (!subjectId) {
      throw {
        status: 400,
        message: 'O ID da disciplina é obrigatório.',
      };
    }

    // Verifica se a disciplina existe
    const subject = await this.lessonRepository.findSubjectById(subjectId);
    if (!subject) {
      throw {
        status: 404,
        message: 'Disciplina não encontrada.',
      };
    }

    // Busca as aulas associadas à disciplina
    return await this.lessonRepository.findLessonsBySubject(subjectId);
  }

  async getLessonAttendance(lessonId: string) {
    if (!lessonId) {
      throw {
        status: 400,
        message: 'O ID da aula é obrigatório.',
      };
    }

    // Verifica se a aula existe
    const lesson = await this.lessonRepository.findLessonById(lessonId);
    if (!lesson) {
      throw {
        status: 404,
        message: 'Aula não encontrada.',
      };
    }

    // Busca a frequência da aula
    const attendance = await this.lessonRepository.findLessonAttendance(lessonId);
    return attendance;
  }
}
