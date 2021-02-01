import Joi from "joi";

export const getOneUserSchema = Joi.object({
  userId: Joi.number().integer().required(),
});
