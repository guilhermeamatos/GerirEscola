// src/services/ManagerService.ts

import { ManagerRepository } from '../repositories/ManagerRepository';
import { Manager as ManagerModel } from '../models/Manager';
import { CreateManagerDTO } from '../dto';

export class ManagerService {
  private managerRepository: ManagerRepository;

  constructor(managerRepository: ManagerRepository) {
    this.managerRepository = managerRepository;
  }

  async createManager(managerData: CreateManagerDTO): Promise<ManagerModel> {
    return this.managerRepository.create(managerData);
  }

  async getManagerById(id: string): Promise<ManagerModel | null> {
    return this.managerRepository.findById(id);
  }

  async getAllManagers(): Promise<ManagerModel[]> {
    return this.managerRepository.findAll();
  }

  async updateManager(id: string, managerData: Partial<CreateManagerDTO>): Promise<ManagerModel> {
    return this.managerRepository.update(id, managerData);
  }

  async deleteManager(id: string): Promise<void> {
    await this.managerRepository.delete(id);
  }
}
