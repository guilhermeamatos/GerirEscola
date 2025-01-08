import { LessonRepository } from '../repositories/LessonRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';


export class LessonService {
  private lessonRepository: LessonRepository;
  private enrollmentRepository: EnrollmentRepository;


  constructor() {
    this.lessonRepository = new LessonRepository();
    this.enrollmentRepository = new EnrollmentRepository
  }

  async registerLesson(data: { name: string; description?: string; subjectId: string }) {
    // Verifica se a disciplina existe
    if (!data.subjectId) {
      throw {
        status: 400,
        message: 'O campo subjectId é obrigatório.',
      };
    }
    const subject = await this.lessonRepository.findSubjectById(data.subjectId);
    if (!subject) {
      throw {
        status: 404,
        message: 'Disciplina não encontrada.',
      };
    }

    // Cria a aula associada à disciplina
    return await this.lessonRepository.createLesson(data);
  }

  async registerAttendance(lessonId: string, absentStudentIds: string[]) {
    // Verifica se a aula existe e obtém os alunos inscritos
    const lesson = await this.lessonRepository.findLessonById(lessonId);
    if (!lesson) {
      throw {
        status: 404,
        message: 'Aula não encontrada.',
      };
    }

    const { enrollments } = lesson.subject;
    const attendanceResults = [];

    // Registra a frequência para cada aluno
    for (const enrollment of enrollments) {
      const isAbsent = absentStudentIds.includes(enrollment.student_id);

      // Cria uma instância de EnrollmentLesson
      const attendance = await this.lessonRepository.createEnrollmentLesson({
        enrollmentId: enrollment.id,
        lessonId,
        present: !isAbsent,
      });
      attendanceResults.push(attendance);

     
    }

    return attendanceResults;
  }
}
