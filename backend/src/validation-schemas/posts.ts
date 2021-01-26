import Joi from "joi";

export const allPostsQueryParams = Joi.object({
  userId: Joi.number().integer()
})
