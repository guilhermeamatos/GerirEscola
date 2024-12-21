import { PrismaClient } from "@prisma/client";
import { School } from "../models/School";

const prisma = new PrismaClient();

export class SchoolRepository {
  async create(data: Omit<School, 'id' | 'classes' | 'coordinators' | 'manager'>): Promise<School> {
    const school = await prisma.school.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        founded_at: data.foundedAt, 
      },
      include: {
        classes: true,
        manager: true,
      },
    });

    return new School(
      school.id,
      school.name,
      school.address,
      school.phone,
      school.email,
      school.founded_at,
    );
  }

  async findAll(): Promise<School[]> {
    const schools = await prisma.school.findMany({
      include: {
        classes: true,
        manager: true,
      },
    });

    return schools.map((school) =>
      new School(
        school.id,
        school.name,
        school.address,
        school.phone,
        school.email,
        school.founded_at
      )
    );
  }

  async findById(id: string): Promise<School | null> {
    const school = await prisma.school.findUnique({
      where: { id },
      include: {
        classes: true,
        manager: true,
      },
    });

    if (!school) {
      return null;
    }

    return new School(
      school.id,
      school.name,
      school.address,
      school.phone,
      school.email,
      school.founded_at
    );
  }

  async update(id: string, data: Partial<Omit<School, 'id' | 'classes' | 'coordinators' | 'manager'>>): Promise<School> {
    // Faz a conversão da string para Date, se `foundedAt` estiver presente
    const updateData = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      founded_at: data.foundedAt ? new Date(data.foundedAt) : undefined, // Conversão correta para Date
    };
  
    const updatedSchool = await prisma.school.update({
      where: { id },
      data: updateData,
      include: {
        classes: true,
        manager: true,
      },
    });
  
    return new School(
      updatedSchool.id,
      updatedSchool.name,
      updatedSchool.address,
      updatedSchool.phone,
      updatedSchool.email,
      updatedSchool.founded_at
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.school.delete({
      where: { id },
    });
  }
}
