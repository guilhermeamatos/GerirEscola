import request from 'supertest';
import { app } from '../../src/server'; // Certifique-se de que o caminho está correto
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Student Endpoints', () => {
  let createdStudentId: string;

  beforeAll(async () => {
    await prisma.student.deleteMany(); // Limpa todos os estudantes antes dos testes
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Create Student Tests', () => {
    it('should create a new student successfully', async () => {
      const response = await request(app)
        .post('/students')
        .send({
          name: 'Estudante Teste',
          birthdate: '2000-01-01',
          cpf: '12345678901',
          address: 'Rua Estudante, 123',
          phone: '999999999',
          email: 'estudante@teste.com',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Estudante Teste');
      createdStudentId = response.body.id;
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/students')
        .send({
          birthdate: '2000-01-01',
          cpf: '12345678901',
          address: 'Rua Estudante, 123',
          phone: '999999999',
          email: 'estudante@teste.com',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 if cpf is missing', async () => {
      const response = await request(app)
        .post('/students')
        .send({
          name: 'Estudante Teste',
          birthdate: '2000-01-01',
          address: 'Rua Estudante, 123',
          phone: '999999999',
          email: 'estudante@teste.com',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('Get Student Tests', () => {
    it('should fetch all students', async () => {
      const response = await request(app).get('/students');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should fetch a student by ID', async () => {
      const response = await request(app).get(`/students/${createdStudentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdStudentId);
      expect(response.body.name).toBe('Estudante Teste');
    });

    it('should return 404 if student is not found', async () => {
      const response = await request(app).get('/students/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Update Student Tests', () => {
    it('should update a student successfully', async () => {
      const response = await request(app)
        .put(`/students/${createdStudentId}`)
        .send({
          name: 'Estudante Atualizado',
          birthdate: '2000-01-01',
          cpf: '12345678901',
          address: 'Rua Nova, 456',
          phone: '888888888',
          email: 'atualizado@teste.com',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdStudentId);
      expect(response.body.name).toBe('Estudante Atualizado');
    });

    it('should return 400 if updating with invalid data', async () => {
        const response = await request(app)
          .put(`/students/${createdStudentId}`)
          .send({
            name: '', // String vazia
            birthdate: '', // String vazia para birthdate
            address: 'Rua Nova, 456',
            cpf: '' // String vazia para CPF
          });
      
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
      });

    it('should return 404 if student to update is not found', async () => {
      const response = await request(app)
        .put('/students/invalid-id')
        .send({
          name: 'Estudante Não Existente',
          birthdate: '2000-01-01',
          cpf: '12345678901',
          address: 'Rua Nova, 456',
          phone: '888888888',
          email: 'naoexiste@teste.com',
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Delete Student Tests', () => {
    it('should delete a student successfully', async () => {
      const response = await request(app).delete(`/students/${createdStudentId}`);

      expect(response.status).toBe(204); // HTTP 204: No Content
    });

    it('should return 404 if student to delete is not found', async () => {
      const response = await request(app).delete('/students/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
