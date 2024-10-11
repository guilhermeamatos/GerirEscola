import Joi from 'joi';

export const createManagerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório',
  }),
  cpf: Joi.string().length(11).required().messages({
    'string.empty': 'O CPF é obrigatório',
    'string.length': 'O CPF deve ter 11 dígitos',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'O endereço é obrigatório',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'O telefone é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'O email é obrigatório',
    'string.email': 'O email deve ser válido',
  }),
  schoolId: Joi.string().uuid().required().messages({
    'string.empty': 'O ID da escola é obrigatório',
    'string.guid': 'O ID da escola deve ser um UUID válido',
  }),
});

export const updateManagerSchema = Joi.object({
  name: Joi.string().optional(),
  cpf: Joi.string().length(11).optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  schoolId: Joi.string().uuid().optional(),
});
