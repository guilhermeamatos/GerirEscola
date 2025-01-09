import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LessonRepository {
  async createLesson(data: { name: string; description?: string; subjectId: string }) {
    return await prisma.lesson.create({
      data: {
        name: data.name,
        dscreption: data.description,
        subject_id: data.subjectId,
      },
    });
  }

  async findSubjectById(subjectId: string) {
    return await prisma.subject.findUnique({
      where: { id: subjectId },
    });
  }

  async findLessonById(lessonId: string) {
    return prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        subject: {
          include: {
            enrollments: true, // Para obter os alunos inscritos na disciplina
          },
        },
      },
    });
  }

  async createEnrollmentLesson(data: { enrollmentId: string; lessonId: string; present: boolean }) {
    return prisma.enrollmentLesson.upsert({
      where: {
        enrollment_id_lesson_id: {
          enrollment_id: data.enrollmentId,
          lesson_id: data.lessonId,
        },
      },
      update: {
        present: data.present,
      },
      create: {
        enrollment_id: data.enrollmentId,
        lesson_id: data.lessonId,
        present: data.present,
      },
    });
  }

  async findLessonsBySubject(subjectId: string) {
    return prisma.lesson.findMany({
      where: { subject_id: subjectId },
      select: {
        id: true,
        name: true,
        dscreption: true,
        subject: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  
  async findLessonAttendance(lessonId: string) {
    const attendanceRecords = await prisma.enrollmentLesson.findMany({
      where: { lesson_id: lessonId },
      select: {
        enrollment: {
          select: {
            student: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        present: true,
      },
    });

    // Formata a resposta para incluir apenas os dados necessários
    return attendanceRecords.map(record => ({
      studentId: record.enrollment.student.id,
      studentName: record.enrollment.student.name,
      present: record.present,
    }));
  }
}
