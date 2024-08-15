import { Request, Response } from 'express';
import { createSchool } from '../services/schoolService';

export const createSchoolController = (req: Request, res: Response): void => {
  const { name, level, adminId } = req.body;

  if (!name || !level || !adminId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

  const newSchool = createSchool(name, level, adminId);

  res.status(201).json({ message: 'School created successfully', school: newSchool });
  return
};
