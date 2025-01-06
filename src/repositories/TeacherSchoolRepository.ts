// src/repositories/TeacherSchoolRepository.ts
import { PrismaClient } from "@prisma/client";

export class TeacherSchoolRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Verificar se o professor existe
  async findTeacherById(teacherId: string) {
    return await this.prisma.teacher.findUnique({
      where: { id: teacherId },
    });
  }

  // Verificar se a escola existe
  async findSchoolById(schoolId: string) {
    return await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
  }

  // Vincular o professor à escola
  async linkTeacherToSchool(teacherId: string, schoolId: string) {
    return await this.prisma.teacher.update({
      where: { id: teacherId },
      data: {
        schools: {
          connect: { id: schoolId },
        },
      },
    });
  }
}
