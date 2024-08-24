// src/services/CoordinatorService.ts

import { CoordinatorRepository } from '../repositories/CoordinatorRepository';
import { Coordinator } from '../models/Coordinator';
import { CreateCoordinatorDTO } from '../dto';

export class CoordinatorService {
  private coordinatorRepository: CoordinatorRepository;

  constructor(coordinatorRepository: CoordinatorRepository) {
    this.coordinatorRepository = coordinatorRepository;
  }

  async createCoordinator(coordinatorData: CreateCoordinatorDTO): Promise<Coordinator> {
    try {
      return await this.coordinatorRepository.create(coordinatorData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating coordinator: ${error.message}`);
      }
      throw new Error('Unknown error occurred while creating coordinator');
    }
  }

  async getCoordinatorById(id: string): Promise<Coordinator | null> {
    try {
      return await this.coordinatorRepository.findById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching coordinator: ${error.message}`);
      }
      throw new Error('Unknown error occurred while fetching coordinator');
    }
  }

  async getAllCoordinators(): Promise<Coordinator[]> {
    try {
      return await this.coordinatorRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching coordinators: ${error.message}`);
      }
      throw new Error('Unknown error occurred while fetching coordinators');
    }
  }

  async updateCoordinator(id: string, coordinatorData: Partial<CreateCoordinatorDTO>): Promise<Coordinator> {
    try {
      return await this.coordinatorRepository.update(id, coordinatorData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating coordinator: ${error.message}`);
      }
      throw new Error('Unknown error occurred while updating coordinator');
    }
  }

  async deleteCoordinator(id: string): Promise<void> {
    try {
      await this.coordinatorRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting coordinator: ${error.message}`);
      }
      throw new Error('Unknown error occurred while deleting coordinator');
    }
  }
}
