import { Request, Response } from 'express';
import { PerformanceService } from '../services/PerformanceService';

export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  async upsertPerformance(req: Request, res: Response): Promise<Response> {
    const { subjectId } = req.params;
    const data = req.body;

    try {
      const result = await this.performanceService.upsertPerformance(subjectId, data);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  async getPerformanceBySubject(req: Request, res: Response): Promise<Response> {
    const { subjectId } = req.params;

    try {
      const result = await this.performanceService.getPerformanceBySubject(subjectId);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message });
    }
  }
}
