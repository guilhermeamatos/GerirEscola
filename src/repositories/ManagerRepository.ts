import { PrismaClient } from '@prisma/client';
import { Manager as ManagerModel } from '../models/Manager'; 

const prisma = new PrismaClient();

export class ManagerRepository {
  async create(managerData: Omit<ManagerModel, 'id' | 'school'>): Promise<ManagerModel> {
    const newManager = await prisma.manager.create({
      data: {
        name: managerData.name,
        cpf: managerData.cpf,
        address: managerData.address,
        phone: managerData.phone,
        email: managerData.email,
        password: managerData.password,
        school_id: managerData.schoolId, 
      },
      include: {
        school: true, 
      },
    });

    return new ManagerModel(
      newManager.id,
      newManager.name,
      newManager.cpf,
      newManager.address,
      newManager.phone,
      newManager.email,
      "",
      newManager.school_id
    );
  }

  
  async findById(id: string): Promise<ManagerModel | null> {
    const manager = await prisma.manager.findUnique({
      where: { id },
      include: {
        school: true, 
      },
    });

    if (!manager) return null;

    return new ManagerModel(
      manager.id,
      manager.name,
      manager.cpf,
      manager.address,
      manager.phone,
      manager.email,
      "",
      manager.school_id
    );
  }

  
  async findAll(): Promise<ManagerModel[]> {
    const managers = await prisma.manager.findMany({
      include: {
        school: true, 
      },
    });

    return managers.map((manager) => {
      return new ManagerModel(
        manager.id,
        manager.name,
        manager.cpf,
        manager.address,
        manager.phone,
        manager.email,
        "",
        manager.school_id
      );
    });
  }


  async update(id: string, managerData: Partial<Omit<ManagerModel, 'id' | 'school'>>): Promise<ManagerModel> {
    const updatedManager = await prisma.manager.update({
      where: { id },
      data: {
        name: managerData.name,
        cpf: managerData.cpf,
        address: managerData.address,
        phone: managerData.phone,
        email: managerData.email,
        school_id: managerData.schoolId ?? undefined, 
      },
      include: {
        school: true, 
      },
    });

    return new ManagerModel(
      updatedManager.id,
      updatedManager.name,
      updatedManager.cpf,
      updatedManager.address,
      updatedManager.phone,
      updatedManager.email,
      "",
      updatedManager.school_id
    );
  }

  
  async delete(id: string): Promise<void> {
    await prisma.manager.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.manager.findUnique({
      where: { email },
    });
  }
}
