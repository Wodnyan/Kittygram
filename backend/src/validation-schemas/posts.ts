import Joi from "joi";

export const allPostsQueryParams = Joi.object({
  userId: Joi.number().integer(),
  skip: Joi.number().integer(),
  limit: Joi.number().integer(),
});
