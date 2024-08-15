
import { School } from '../models/schoolModel';

let schoolIdCounter = 1;

export const createSchool = (name: string, level: string, adminId: number): School => {
  const newSchool: School = {
    id: schoolIdCounter++,
    name,
    level,
    adminId,
  };
  return newSchool;
};

