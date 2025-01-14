import { LessonFundamental1Repository } from '../repositories/LessonFundamental1Repository';

export class LessonFundamental1Service {
  private lessonRepository: LessonFundamental1Repository;

  constructor() {
    this.lessonRepository = new LessonFundamental1Repository();
  }

  async registerLessonForClass(data: { name: string; description?: string; classId: string; date: Date | string }) {
    const classExists = await this.lessonRepository.findClassById(data.classId);
    if (!classExists) {
      throw { status: 404, message: 'Turma não encontrada.' };
    }
    console.log(data.date);
     if (!data.date || isNaN(Date.parse(data.date.toString()))) {
      console.log("Entrou no if");
      throw {
        status: 400,
        message: 'A data fornecida é inválida.',
      };
    }
  
    return await this.lessonRepository.createLessonForClass(data);
  }
  

  async registerAttendance(lessonId: string, absentStudentIds: string[]) {
    const lesson = await this.lessonRepository.findLessonById(lessonId);
  
    if (!lesson || !lesson.class) {
      throw {
        status: 404,
        message: 'Aula ou turma não encontrada.',
      };
    }
  
    const { students } = lesson.class;
  
    if (!students) {
      throw {
        status: 404,
        message: 'Nenhum estudante encontrado para a turma.',
      };
    }
  
    const attendanceResults = [];
  
    for (const student of students) {
      const isAbsent = absentStudentIds.includes(student.id);
  
      const attendance = await this.lessonRepository.createStudentLesson({
        studentId: student.id,
        lessonId,
        present: !isAbsent,
      });
  
      attendanceResults.push(attendance);
    }
  
    return attendanceResults;
  }

  async getLessonsByClass(classId: string) {
    if (!classId) {
      throw {
        status: 400,
        message: 'O campo classId é obrigatório.',
      };
    }

    const classExists = await this.lessonRepository.findClassById(classId);
    if (!classExists) {
      throw {
        status: 404,
        message: 'Turma não encontrada.',
      };
    }

    return this.lessonRepository.findLessonsByClass(classId);
  }

  async getLessonAttendance(lessonId: string) {
    if (!lessonId) {
      throw {
        status: 400,
        message: 'O campo lessonId é obrigatório.',
      };
    }

    const lesson = await this.lessonRepository.findLessonById(lessonId);
    if (!lesson) {
      throw {
        status: 404,
        message: 'Aula não encontrada.',
      };
    }

    return this.lessonRepository.findLessonAttendance(lessonId);
  }
}
