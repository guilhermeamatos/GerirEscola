import { Router } from 'express';
import { PerformanceController } from '../controllers/PerformanceController';
import { PerformanceService } from '../services/PerformanceService';
import { PerformanceRepository } from '../repositories/PerformanceRepository';

const performanceRoutes = Router();

const performanceRepository = new PerformanceRepository();
const performanceService = new PerformanceService(performanceRepository);
const performanceController = new PerformanceController(performanceService);

// Rota para cadastrar ou atualizar registros de desempenho
performanceRoutes.post('/:subjectId', (req, res) => performanceController.upsertPerformance(req, res));

// Rota para buscar registros de desempenho por disciplina
performanceRoutes.get('/:subjectId', (req, res) => performanceController.getPerformanceBySubject(req, res));

export { performanceRoutes };
