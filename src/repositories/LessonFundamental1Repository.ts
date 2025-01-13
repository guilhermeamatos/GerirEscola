import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LessonFundamental1Repository {
  async createLessonForClass(data: { name: string; description?: string; classId: string; date: Date | string }) {
    return prisma.lesson.create({
      data: {
        name: data.name,
        dscreption: data.description,
        class_id: data.classId,
        date: new Date(data.date).toISOString(),
      },
    });
  }

  async findClassById(classId: string) {
    return prisma.class.findUnique({
      where: { id: classId },
    });
  }

  async findLessonById(lessonId: string) {
    return prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        class: {
          include: {
            students: true, // Inclui os estudantes associados à turma
          },
        },
      },
    });
  }

  async createStudentLesson(data: { studentId: string; lessonId: string; present: boolean }) {
    return prisma.studentLensons.upsert({
      where: {
        student_id_lesson_id: {
          student_id: data.studentId,
          lesson_id: data.lessonId,
        },
      },
      update: { present: data.present },
      create: {
        student_id: data.studentId,
        lesson_id: data.lessonId,
        present: data.present,
      },
    });
  }

  async findLessonsByClass(classId: string) {
    return prisma.lesson.findMany({
      where: { class_id: classId },
      select: {
        id: true,
        name: true,
        dscreption: true,
        date: true, // Incluindo o campo date
        class: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findLessonAttendance(lessonId: string) {
    const attendanceRecords = await prisma.studentLensons.findMany({
      where: { lesson_id: lessonId },
      select: {
        student: {
          select: {
            id: true,
            name: true,
          },
        },
        present: true,
      },
    });

    return attendanceRecords.map(record => ({
      studentId: record.student.id,
      studentName: record.student.name,
      present: record.present,
    }));
  }
}
