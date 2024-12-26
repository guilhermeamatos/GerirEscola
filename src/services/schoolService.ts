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
    

      // Passa os dados convertidos para o repositório
      return await this.schoolRepository.create({
        ...schoolData,
      });
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

  async updateSchool(id: string, data: CreateSchoolDTO): Promise<SchoolModel | null> {
    try {
      const school = await this.schoolRepository.findById(id);
      if (!school) {
        return null;
      }
      
      // Conversão da data se estiver presente no DTO
      const updatedData = {
        ...data,
      };
  
      return await this.schoolRepository.update(id, updatedData);
    } catch (error) {
      console.error('Error updating school in service:', error);
      throw new Error('Failed to update school');
    }
  }

  async deleteSchool(id: string): Promise<boolean> {
    const school = await this.schoolRepository.findById(id);
    if (!school) {
      return false; // Retorna false se a escola não for encontrada
    }
    await this.schoolRepository.delete(id);
    return true;
  }
}
