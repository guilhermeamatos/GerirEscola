import { Router } from 'express';
import { GradeController } from '../controllers/GradeController';

const gradeRoutes = Router();
const gradeController = new GradeController();

// Rota para cadastrar ou atualizar notas de uma disciplina
gradeRoutes.post('/:subjectId', (req, res) => gradeController.upsertGrades(req, res));

// Rota para obter as notas de uma disciplina
gradeRoutes.get('/:subjectId', (req, res) => gradeController.getGradesBySubject(req, res));

export  { gradeRoutes };
