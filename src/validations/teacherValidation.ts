import Joi from 'joi';

// Validação para criação de um novo professor
export const createTeacherValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  cpf: Joi.string().length(11).required(),
  matricula: Joi.string().max(20).optional(),
  concursado: Joi.boolean().required(),
  address: Joi.string().max(255).required(),
  phone: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  specialization: Joi.string().max(255).required(),
});

// Validação para atualização de um professor existente
export const updateTeacherValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional().allow(null).not('').messages({
    'string.empty': 'O nome não pode ser uma string vazia.',
  }),
  cpf: Joi.string().length(11).optional().allow(null).not('').messages({
    'string.empty': 'O CPF não pode ser uma string vazia.',
    'string.length': 'O CPF deve conter exatamente 11 caracteres.',
  }),
  address: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
  email: Joi.string().email().optional(),
  specialization: Joi.string().max(255).optional(),
});

