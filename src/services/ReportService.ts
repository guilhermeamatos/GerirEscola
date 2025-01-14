import PDFDocument from 'pdfkit';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export class ReportService {
  async generateReport(classId: string, outputPath: string): Promise<void> {
    // Verifica e cria o diretório se necessário
    const directory = path.dirname(outputPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Busca os dados da turma e dos alunos
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        students: {
          include: {
            enrollments: {
              include: {
                grade: true,
                subject: true,
              },
            },
          },
        },
      },
    });

    if (!classData) {
      throw new Error('Turma não encontrada.');
    }

    // Cria o documento PDF
    const doc = new PDFDocument({ margin: 30 });

    // Salva o PDF no disco
    doc.pipe(fs.createWriteStream(outputPath));

    // Cabeçalho do boletim
    doc.fontSize(16).text(`Boletim Escolar - ${classData.name}`, { align: 'center' });
    doc.moveDown(2);

    const tableX = 50;
    const columnWidths = [150, 80, 80, 80, 80]; // Ajustando larguras para caber na página
    const rowHeight = 20;
    const fontSize = 9; // Reduzindo o tamanho da fonte

    // Gerar tabela para cada aluno
    for (const student of classData.students) {
      // Adicionar quebra de página caso necessário
      if (doc.y + rowHeight * 3 > doc.page.height - 50) {
        doc.addPage();
      }

      // Nome do Aluno - Garantia de alinhamento à esquerda
      doc.text(`Aluno: ${student.name} (${student.matricula || 'N/A'})`, tableX, doc.y, {
        align: 'left', // Alinhamento à esquerda
        continued: false, // Garantia de não continuar texto na linha
        width: columnWidths.reduce((a, b) => a + b, 0), // Largura total da tabela
      });
      doc.moveDown(1);

      if (student.enrollments.length === 0) {
        doc.text('Sem disciplinas registradas.', tableX, doc.y, { align: 'left' });
        doc.moveDown(2);
        continue;
      }

      // Cabeçalho da tabela
      let tableY = doc.y;
      this.drawTableRow(
        doc,
        tableX,
        tableY,
        columnWidths,
        ['Disciplina', '1º Tri', '2º Tri', '3º Tri', 'Nota Final'],
        true,
        fontSize
      );
      tableY += rowHeight;

      // Dados das disciplinas
      for (const enrollment of student.enrollments) {
        const subjectName = enrollment.subject?.name || 'Disciplina não registrada';
        const grades = enrollment.grade;

        const row = [
          subjectName,
          grades?.grade1_media?.toFixed(2) || 'N/A',
          grades?.grade2_media?.toFixed(2) || 'N/A',
          grades?.grade3_media?.toFixed(2) || 'N/A',
          grades?.grade_final?.toFixed(2) || 'N/A',
        ];

        this.drawTableRow(doc, tableX, tableY, columnWidths, row, false, fontSize);
        tableY += rowHeight;

        // Verifica se precisa de nova página
        if (tableY + rowHeight > doc.page.height - 50) {
          doc.addPage();
          tableY = 50;
          this.drawTableRow(
            doc,
            tableX,
            tableY,
            columnWidths,
            ['Disciplina', '1º Tri', '2º Tri', '3º Tri', 'Nota Final'],
            true,
            fontSize
          );
          tableY += rowHeight;
        }
      }

      // Adiciona espaçamento após a tabela do aluno
      doc.moveDown(2);
    }

    // Finaliza o documento
    doc.end();
  }

  /**
   * Desenha uma linha na tabela.
   */
  private drawTableRow(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    columnWidths: number[],
    rowData: string[],
    isHeader: boolean,
    fontSize: number
  ) {
    const rowHeight = 20;

    // Desenha as bordas da linha
    doc.rect(x, y, columnWidths.reduce((a, b) => a + b, 0), rowHeight).stroke();

    let currentX = x;
    rowData.forEach((cell, index) => {
      // Desenha as bordas de cada célula
      doc.rect(currentX, y, columnWidths[index], rowHeight).stroke();

      // Adiciona o texto no centro da célula
      doc
        .fontSize(fontSize)
        .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
        .text(cell, currentX + 5, y + 5, {
          width: columnWidths[index] - 10,
          align: 'center',
        });

      currentX += columnWidths[index];
    });
  }
}
