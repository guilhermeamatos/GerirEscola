import { Request, Response } from 'express';
import { ReportService } from '../services/ReportService';
import path from 'path';

export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  async generateClassReport(req: Request, res: Response) {
    const { classId } = req.params;

    if (!classId) {
      return res.status(400).json({ message: 'O ID da turma é obrigatório.' });
    }

    try {
      const outputPath = path.resolve(__dirname, `../../reports/boletim-${classId}.pdf`);

      // Gera o relatório
      await this.reportService.generateReport(classId, outputPath);

      // Envia o arquivo PDF como resposta
      res.download(outputPath, `boletim-${classId}.pdf`, (err) => {
        if (err) {
          console.error('Erro ao enviar o arquivo:', err);
          res.status(500).json({ message: 'Erro ao gerar o boletim.' });
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
