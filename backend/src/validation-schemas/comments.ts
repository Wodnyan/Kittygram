import Joi from "joi";

export const postCommentSchema = Joi.object({
  postId: Joi.number().integer().required(),
  comment: Joi.string().trim().max(2000).required(),
});
