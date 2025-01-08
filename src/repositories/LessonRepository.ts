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
}
