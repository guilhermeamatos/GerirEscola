// src/services/ManagerService.ts

import { ManagerRepository } from '../repositories/ManagerRepository';
import { Manager as ManagerModel } from '../models/Manager';
import { CreateManagerDTO } from '../dto';
import { sign } from 'jsonwebtoken';

export class ManagerService {
  private managerRepository: ManagerRepository;

  constructor(managerRepository: ManagerRepository) {
    this.managerRepository = managerRepository;
  }
  generatePassword(managerData: CreateManagerDTO){
      const password = managerData.cpf.slice(0, 3) + managerData.name.split(' ')[0];
      return password;
  }
  
  async createManager(managerData: CreateManagerDTO): Promise<ManagerModel> {
    managerData.password = this.generatePassword(managerData)
    return this.managerRepository.create(managerData);
  }

  async getManagerById(id: string): Promise<ManagerModel | null> {
    return this.managerRepository.findById(id);
  }

  async getAllManagers(): Promise<ManagerModel[]> {
    return this.managerRepository.findAll();
  }

  async updateManager(id: string, managerData: Partial<CreateManagerDTO>): Promise<ManagerModel> {
    const existingManager = await this.managerRepository.findById(id);
    if (!existingManager) {
      throw new Error('Manager not found');
    }
  
    return this.managerRepository.update(id, managerData);
  }
  
  async deleteManager(id: string): Promise<void> {
    const existingManager = await this.managerRepository.findById(id);
    if (!existingManager) {
      throw new Error('Manager not found');
    }
  
    await this.managerRepository.delete(id);
  }

  async login(email: string, password: string): Promise<string> {
    const manager = await this.managerRepository.findByEmail(email);
    if (!manager || manager.password !== password) {
      throw new Error('Invalid credentials');
    }
    const token = sign({ id: manager.id, schoolId: manager.school_id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    return token;
  }
  
}
