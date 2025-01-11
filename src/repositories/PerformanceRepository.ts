import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PerformanceRepository {
  async findSubjectById(subjectId: string) {
    return prisma.subject.findUnique({
      where: { id: subjectId },
    });
  }

  async findEnrollmentsBySubject(subjectId: string) {
    return prisma.enrollment.findMany({
      where: { subject_id: subjectId },
    });
  }

  async upsertPerformance(enrollmentId: string, data: any) {
    return prisma.registroDeDesempenho.upsert({
      where: { enrollment_id: enrollmentId },
      update: { ...data },
      create: { enrollment_id: enrollmentId, ...data },
    });
  }

  async getPerformanceBySubject(subjectId: string) {
    return prisma.enrollment.findMany({
      where: { subject_id: subjectId },
      include: {
        registrosDedesempenho: true,
        student: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
