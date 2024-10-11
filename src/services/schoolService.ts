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
      // Converte o campo 'foundedAt' para uma instância de Date se estiver no formato string
      const foundedAt = new Date(schoolData.foundedAt);
      
      // Verifica se a data é válida
      if (isNaN(foundedAt.getTime())) {
        throw new Error('Invalid date format for foundedAt');
      }

      // Passa os dados convertidos para o repositório
      return await this.schoolRepository.create({
        ...schoolData,
        foundedAt,  // Substitui a string de data pela instância de Date
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

  async updateSchool(id: string, data: UpdateSchoolDTO): Promise<SchoolModel | null> {
    try {
      const school = await this.schoolRepository.findById(id);
      if (!school) {
        return null;
      }
      
      // Conversão da data se estiver presente no DTO
      const updatedData = {
        ...data,
        founded_at: data.foundedAt ? new Date(data.foundedAt) : undefined,
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
