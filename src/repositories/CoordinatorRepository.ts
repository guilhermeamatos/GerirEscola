import { PrismaClient } from '@prisma/client';
import { Coordinator as CoordinatorModel } from '../models/Coordinator'; // Renomeando para evitar conflito com Prisma

const prisma = new PrismaClient();

export class CoordinatorRepository {
  async create(coordinatorData: Omit<CoordinatorModel, 'id' | 'school'>): Promise<CoordinatorModel> {
    const newCoordinator = await prisma.coordinator.create({
      data: {
        name: coordinatorData.name,
        cpf: coordinatorData.cpf,
        address: coordinatorData.address,
        phone: coordinatorData.phone,
        email: coordinatorData.email,
        password: coordinatorData.password,
      }
    });

    return new CoordinatorModel(
      newCoordinator.id,
      newCoordinator.name,
      newCoordinator.cpf,
      newCoordinator.address,
      newCoordinator.phone,
      newCoordinator.email,
      "",
    );
  }

  async findById(id: string): Promise<CoordinatorModel | null> {
    const coordinator = await prisma.coordinator.findUnique({
      where: { id },
    });

    if (!coordinator) return null;

    return new CoordinatorModel(
      coordinator.id,
      coordinator.name,
      coordinator.cpf,
      coordinator.address,
      coordinator.phone,
      coordinator.email,
      ""
    );
  }

  async findAll(): Promise<CoordinatorModel[]> {
    const coordinators = await prisma.coordinator.findMany({
    });

    return coordinators.map((coordinator) => {
      return new CoordinatorModel(
        coordinator.id,
        coordinator.name,
        coordinator.cpf,
        coordinator.address,
        coordinator.phone,
        coordinator.email,
        ""
      );
    });
  }

  async update(id: string, coordinatorData: Partial<Omit<CoordinatorModel, 'id' | 'school'>>): Promise<CoordinatorModel> {
    const updatedCoordinator = await prisma.coordinator.update({
      where: { id },
      data: {
        name: coordinatorData.name,
        cpf: coordinatorData.cpf,
        address: coordinatorData.address,
        phone: coordinatorData.phone,
        email: coordinatorData.email
      }
    });

    return new CoordinatorModel(
      updatedCoordinator.id,
      updatedCoordinator.name,
      updatedCoordinator.cpf,
      updatedCoordinator.address,
      updatedCoordinator.phone,
      updatedCoordinator.email,
      ""
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.coordinator.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.coordinator.findUnique({
      where: { email },
    });
  }
}
