import Joi from 'joi';

export const createSchoolSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome da escola é obrigatório',
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
  foundedAt: Joi.date().required().messages({
    'date.base': 'A data de fundação é obrigatória',
  }),
});

export const updateSchoolSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  foundedAt: Joi.date().optional(),
});
