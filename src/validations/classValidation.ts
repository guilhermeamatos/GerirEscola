import Joi from 'joi';
import {nivelClass } from '@prisma/client';

// Validação para criação de uma nova turma
export const createClassValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  schoolYear: Joi.number().integer().min(1).max(14).required(),
  schoolId: Joi.string().uuid().required(),
  level: Joi.string().valid(...Object.values(nivelClass)).required(),
  teacherId: Joi.string().uuid().optional(), // O teacherId pode ser opcional dependendo da lógica de negócio
});

// Validação para atualização de uma turma existente
export const updateClassValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional().allow(null).allow(''),
  schoolYear: Joi.string().min(4).max(9).optional(),
  schoolId: Joi.string().uuid().optional(), // ID da escola pode ser alterado
  teacherId: Joi.string().uuid().optional(), // O teacherId também pode ser alterado
}).with('name', 'schoolYear');

