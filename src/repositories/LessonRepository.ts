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
}
