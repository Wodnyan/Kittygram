import Joi from "joi";

export const likeDislikeSchema = Joi.object({
  postId: Joi.number().integer().required(),
});
