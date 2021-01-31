import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string().max(30).min(2),
  password: Joi.string().max(200).min(8),
});

export const signUpSchema = Joi.object({
  username: Joi.string().trim().max(30).required(),
  password: Joi.string().trim().max(200).min(8).required(),
  fullName: Joi.string().trim().max(200).required(),
  email: Joi.string().email().required().max(320),
});

export const checkEmailSchema = Joi.object({
  email: Joi.string().email().required().max(320),
})

export const checkUsernameSchema = Joi.object({
  username: Joi.string().trim().max(30).required(),
})
