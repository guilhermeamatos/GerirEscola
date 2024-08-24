// src/services/SchoolService.ts

import { SchoolRepository } from '../repositories/SchoolRepository';
import { School as SchoolModel } from '../models/School';
import { CreateSchoolDTO } from '../dto';

export class SchoolService {
  private schoolRepository: SchoolRepository;

  constructor(schoolRepository: SchoolRepository) {
    this.schoolRepository = schoolRepository;
  }

  async createSchool(schoolData: CreateSchoolDTO): Promise<SchoolModel> {
    try {
      return await this.schoolRepository.create(schoolData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating school: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while creating school');
      }
    }
  }

  async getSchoolById(id: string): Promise<SchoolModel | null> {
    try {
      return await this.schoolRepository.findById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching school: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while fetching school');
      }
    }
  }

  async getAllSchools(): Promise<SchoolModel[]> {
    try {
      return await this.schoolRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching schools: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while fetching schools');
      }
    }
  }

  async updateSchool(id: string, schoolData: Partial<CreateSchoolDTO>): Promise<SchoolModel> {
    try {
      return await this.schoolRepository.update(id, schoolData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating school: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while updating school');
      }
    }
  }

  async deleteSchool(id: string): Promise<void> {
    try {
      await this.schoolRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting school: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while deleting school');
      }
    }
  }
}
