// src/repositories/TeacherClassRepository.ts
import { PrismaClient } from "@prisma/client";

export class TeacherClassRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async assignTeacherToClassAndSubjects(
    teacherId: string,
    classId: string,
    subjectIds: string[]
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      // Vincular o professor à turma
      const teacherClass = await prisma.teacherClass.create({
        data: {
          teacher_id: teacherId,
          class_id: classId,
        },
      });

      // Vincular o professor às disciplinas
      const subjects = await Promise.all(
        subjectIds.map((subjectId) =>
          prisma.subject.update({
            where: { id: subjectId },
            data: { teacher_id: teacherId },
          })
        )
      );

      return { teacherClass, subjects };
    });
  }

  async findTeacherById(teacherId: string) {
    return await this.prisma.teacher.findUnique({
      where: { id: teacherId },
    });
  }

  async findClassById(classId: string) {
    return await this.prisma.class.findUnique({
      where: { id: classId },
    });
  }

  async findSubjectsByIds(subjectIds: string[]) {
    return await this.prisma.subject.findMany({
      where: { id: { in: subjectIds } },
    });
  }
}
