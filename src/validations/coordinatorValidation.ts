import Joi from 'joi';

// Validação para criação de um novo coordenador
export const createCoordinatorValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  cpf: Joi.string().length(11).required(),
  address: Joi.string().max(255).required(),
  phone: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).optional(),
  schoolId: Joi.string().uuid().required(),
});

// Validação para atualização de um coordenador existente
export const updateCoordinatorValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'Nome não pode ser uma string vazia',
  }),
  cpf: Joi.string().length(11).required().messages({
    'any.required': 'O campo CPF é obrigatório',
    'string.empty': 'CPF não pode ser uma string vazia',
    'string.length': 'CPF deve conter 11 dígitos',
  }),
  address: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
  email: Joi.string().email().optional(),
  schoolId: Joi.string().uuid().optional(),
});


