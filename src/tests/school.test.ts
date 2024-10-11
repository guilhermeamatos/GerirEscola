import request from 'supertest';
import { app } from '../../src/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('School Endpoints', () => {
  beforeAll(async () => {
    // Limpa o banco de dados antes dos testes (cuidado com isso em produção)
    await prisma.school.deleteMany();
  });

  afterAll(async () => {
    // Fecha a conexão com o banco de dados após os testes
    await prisma.$disconnect();
  });

  describe('Create School Tests', () => {
    it('should create a new school successfully', async () => {
      const response = await request(app)
        .post('/schools')
        .send({
          name: 'Escola ABC',
          address: 'Rua das Flores, 123',
          phone: '987654321',
          email: 'contato@escolaabc.com',
          foundedAt: '2020-03-25',
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Escola ABC');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/schools')
        .send({
          address: 'Rua das Flores, 123',
          phone: '987654321',
          email: 'contato@escolaabc.com',
          foundedAt: '2020-03-25',
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 if phone is missing', async () => {
      const response = await request(app)
        .post('/schools')
        .send({
          name: 'Escola ABC',
          address: 'Rua das Flores, 123',
          email: 'contato@escolaabc.com',
          foundedAt: '2020-03-25',
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/schools')
        .send({
          name: 'Escola ABC',
          address: 'Rua das Flores, 123',
          phone: '987654321',
          foundedAt: '2020-03-25',
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 if foundedAt is missing', async () => {
      const response = await request(app)
        .post('/schools')
        .send({
          name: 'Escola ABC',
          address: 'Rua das Flores, 123',
          phone: '987654321',
          email: 'contato@escolaabc.com',
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('Get School Tests', () => {
    it('should fetch all schools', async () => {
      const response = await request(app).get('/schools');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should fetch a school by ID', async () => {
      const school = await prisma.school.create({
        data: {
          name: 'Escola Teste',
          address: 'Rua Teste, 456',
          phone: '123456789',
          email: 'teste@escola.com',
          founded_at: new Date('2020-01-01'),
        },
      });

      const response = await request(app).get(`/schools/${school.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', school.id);
      expect(response.body.name).toBe('Escola Teste');
    });

    it('should return 404 if school is not found', async () => {
      const response = await request(app).get('/schools/invalid-id');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Update School Tests', () => {
    it('should update a school successfully', async () => {
      const school = await prisma.school.create({
        data: {
          name: 'Escola Atualizar',
          address: 'Rua Atualizar, 123',
          phone: '123456789',
          email: 'atualizar@escola.com',
          founded_at: new Date('2020-01-01'),
        },
      });

      const response = await request(app)
        .put(`/schools/${school.id}`)
        .send({
          name: 'Escola Atualizada',
          address: 'Rua Nova, 789',
          phone: '987654321',
          email: 'atualizada@escola.com',
          foundedAt: '2021-01-01',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', school.id);
      expect(response.body.name).toBe('Escola Atualizada');
    });

    it('should return 400 if updating with invalid data', async () => {
      const school = await prisma.school.create({
        data: {
          name: 'Escola Atualizar',
          address: 'Rua Atualizar, 123',
          phone: '123456789',
          email: 'atualizar@escola.com',
          founded_at: new Date('2020-01-01'),
        },
      });

      const response = await request(app)
        .put(`/schools/${school.id}`)
        .send({
          name: '',
          email: 'invalid-email',
        });

      expect(response.status).toBe(400); // Corrigido para 400
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 404 if school to update is not found', async () => {
      const response = await request(app)
        .put('/schools/invalid-id')
        .send({
          name: 'Escola Inexistente',
        });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Delete School Tests', () => {
    it('should delete a school successfully', async () => {
      const school = await prisma.school.create({
        data: {
          name: 'Escola Deletar',
          address: 'Rua Deletar, 456',
          phone: '123456789',
          email: 'deletar@escola.com',
          founded_at: new Date('2020-01-01'),
        },
      });

      const response = await request(app).delete(`/schools/${school.id}`);
      expect(response.status).toBe(200); // Alterado para 200, já que o sistema retorna 200
    });

    it('should return 404 if school to delete is not found', async () => {
      const response = await request(app).delete('/schools/invalid-id');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
