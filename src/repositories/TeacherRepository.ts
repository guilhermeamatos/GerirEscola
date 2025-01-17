import { PrismaClient } from "@prisma/client";
import { CreateTeacherDTO, TeacherResponseDTO, TeacherLoginDTO } from "../dto";

const prisma = new PrismaClient();

export class TeacherRepository {
  async create(data: CreateTeacherDTO): Promise<void> {
    await prisma.teacher.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        address: data.address,
        phone: data.phone,
        email: data.email,
        password: data.password,
        specialization: data.specialization,
        matricula: data.matricula,
        concursado: data.concursado,
      },
    });
  }

  async findById(id: string): Promise<TeacherResponseDTO | null> {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        classes: true,
        schools: true, // Inclui as escolas associadas
      },
    });

    if (!teacher) return null;

    return {
      id: teacher.id,
      name: teacher.name,
      matricula: teacher.matricula ?? "",
      concursado: teacher.concursado,
      cpf: teacher.cpf,
      address: teacher.address,
      phone: teacher.phone,
      email: teacher.email,
      specialization: teacher.specialization ?? "",
      classes: teacher.classes,
      schools: teacher.schools.map((school) => school.name),
    };
  }

  async findAll(): Promise<TeacherResponseDTO[]> {
    const teachers = await prisma.teacher.findMany({
      include: {
        classes: true,
        schools: true, // Inclui as escolas associadas
      },
    });

    return teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      matricula: teacher.matricula ?? "",
      concursado: teacher.concursado,
      cpf: teacher.cpf,
      address: teacher.address,
      phone: teacher.phone,
      email: teacher.email,
      specialization: teacher.specialization ?? "",
      classes: teacher.classes,
      schools: teacher.schools.map((school) => school.name),
    }));
  }

  async update(id: string, data: Partial<CreateTeacherDTO>): Promise<void> {
    await prisma.teacher.update({
      where: { id },
      data: {
        name: data.name,
        cpf: data.cpf,
        address: data.address,
        phone: data.phone,
        email: data.email,
        specialization: data.specialization,
        matricula: data.matricula,
        concursado: data.concursado,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.teacher.delete({
      where: { id },
    });
  }

  async findByEmailForLogin(email: string): Promise<TeacherLoginDTO | null> {
    const teacher = await prisma.teacher.findUnique({
      where: { email },
      select: {
        id: true,
        password: true, // Retorna apenas o necessário para login
      },
    });
  
    if (!teacher) return null;
  
    return {
      id: teacher.id,
      password: teacher.password ?? "",
    };
  }

  async getTeacherByCPF(cpf: string): Promise<TeacherResponseDTO | null> {
    const teacher = await prisma.teacher.findUnique({
      where: { cpf },
      include: {
        schools: true,
        classes: true,
      },
    });

    if (!teacher) return null;

    return {
      id: teacher.id,
      name: teacher.name,
      matricula: teacher.matricula ?? "",
      concursado: teacher.concursado,
      cpf: teacher.cpf,
      address: teacher.address,
      phone: teacher.phone,
      email: teacher.email,
      specialization: teacher.specialization ?? "",
      classes: teacher.classes,
      schools: teacher.schools.map((school) => school.name),
    };
  }

  async getTeacherByEmail(email: string): Promise<TeacherResponseDTO | null> {
    const teacher = await prisma.teacher.findUnique({
      where: { email },
      include: {
        schools: true, // Inclui as escolas associadas
        classes: true, // Inclui as turmas associadas
      },
    });
  
    if (!teacher) return null;
  
    return {
      id: teacher.id,
      name: teacher.name,
      matricula: teacher.matricula ?? "",
      concursado: teacher.concursado,
      cpf: teacher.cpf,
      address: teacher.address,
      phone: teacher.phone,
      email: teacher.email,
      specialization: teacher.specialization ?? "",
      classes: teacher.classes, 
      schools: teacher.schools.map((school) => school.name), 
    };
  }
  

  async getTeacherByMatricula(matricula: string): Promise<TeacherResponseDTO | null> {
    const teacher = await prisma.teacher.findUnique({
      where: { matricula },
      include: {
        schools: true,
        classes: true,
      },
    });

    if (!teacher) return null;

    return {
      id: teacher.id,
      name: teacher.name,
      matricula: teacher.matricula ?? "",
      concursado: teacher.concursado,
      cpf: teacher.cpf,
      address: teacher.address,
      phone: teacher.phone,
      email: teacher.email,
      specialization: teacher.specialization ?? "",
      classes: teacher.classes,
      schools: teacher.schools.map((school) => school.name),
    };
  }

  async findTeachersBySchoolId(schoolId: string): Promise<TeacherResponseDTO[]> {
    const teachers = await prisma.teacher.findMany({
      where: {
        schools: {
          some: {
            id: schoolId,
          },
        },
      },
      include: {
        classes: true,
        schools: true,
      },
    });

    return teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      matricula: teacher.matricula ?? "",
      concursado: teacher.concursado,
      cpf: teacher.cpf,
      address: teacher.address,
      phone: teacher.phone,
      email: teacher.email,
      specialization: teacher.specialization ?? "",
      classes: teacher.classes,
      schools: teacher.schools.map((school) => school.name),
    }));
  }

  async findSchoolById(schoolId: string): Promise<string | null> {
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
    });

    return school?.name || null;
  }

  async findClassesByTeacher(teacherId: string): Promise<any[]> {
    const classes = await prisma.teacherClass.findMany({
      where: { teacher_id: teacherId },
      include: {
        class: true,
      },
    });

    return classes;
  }
}
