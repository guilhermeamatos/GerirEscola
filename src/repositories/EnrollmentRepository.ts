import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EnrollmentRepository {
    async incrementFouls(enrollmentId: string) {
      return prisma.enrollment.update({
        where: { id: enrollmentId },
        data: { fouls: { increment: 1 } },
      });
    }
  }
  