import request from 'supertest';
import { app } from '../../src/server'; // Certifique-se de que o caminho para o arquivo do servidor esteja correto
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Teacher Endpoints', () => {
  let createdTeacherId: string;

  beforeAll(async () => {
    // Limpa o banco de dados antes dos testes (cuidado em produção)
    await prisma.teacher.deleteMany();
  });

  afterAll(async () => {
    // Fecha a conexão com o banco de dados após os testes
    await prisma.$disconnect();
  });

  describe('Create Teacher Tests', () => {
    it('should create a new teacher successfully', async () => {
      const response = await request(app)
        .post('/teachers')
        .send({
          name: 'Professor Teste',
          cpf: '12345678901',
          address: 'Rua Exemplo, 123',
          phone: '987654321',
          email: 'professor@teste.com',
          specialization: 'Matemática',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Professor Teste');
      createdTeacherId = response.body.id;
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/teachers')
        .send({
          cpf: '12345678901',
          address: 'Rua Exemplo, 123',
          phone: '987654321',
          email: 'professor@teste.com',
          specialization: 'Matemática',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 if cpf is missing', async () => {
      const response = await request(app)
        .post('/teachers')
        .send({
          name: 'Professor Teste',
          address: 'Rua Exemplo, 123',
          phone: '987654321',
          email: 'professor@teste.com',
          specialization: 'Matemática',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('Get Teacher Tests', () => {
    it('should fetch all teachers', async () => {
      const response = await request(app).get('/teachers');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should fetch a teacher by ID', async () => {
      const response = await request(app).get(`/teachers/${createdTeacherId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdTeacherId);
      expect(response.body.name).toBe('Professor Teste');
    });

    it('should return 404 if teacher is not found', async () => {
      const response = await request(app).get('/teachers/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Update Teacher Tests', () => {
    it('should update a teacher successfully', async () => {
      const response = await request(app)
        .put(`/teachers/${createdTeacherId}`)
        .send({
          name: 'Professor Atualizado',
          cpf: '12345678901',
          address: 'Rua Nova, 456',
          phone: '987654322',
          email: 'professoratualizado@teste.com',
          specialization: 'Física',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdTeacherId);
      expect(response.body.name).toBe('Professor Atualizado');
    });

    it('should return 400 if updating with invalid data', async () => {
      const response = await request(app)
        .put(`/teachers/${createdTeacherId}`)
        .send({
          name: '',  // Nome inválido (string vazia)
          cpf: '',   // CPF inválido (string vazia)
          address: 'Rua Nova, 456',
          // Outros campos podem ser omitidos
        });
    
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
    

    it('should return 404 if teacher to update is not found', async () => {
      const response = await request(app)
        .put('/teachers/invalid-id')
        .send({
          name: 'Professor Não Existente',
          cpf: '12345678901',
          address: 'Rua Nova, 456',
          phone: '987654322',
          email: 'professornaoexistente@teste.com',
          specialization: 'Física',
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Delete Teacher Tests', () => {
    it('should delete a teacher successfully', async () => {
      const response = await request(app).delete(`/teachers/${createdTeacherId}`);

      expect(response.status).toBe(204); // HTTP 204: No Content
    });

    it('should return 404 if teacher to delete is not found', async () => {
      const response = await request(app).delete('/teachers/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
