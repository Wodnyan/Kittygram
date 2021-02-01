import { NextFunction, Request, Response } from "express";
import Like from "./likes.model";
import { likeDislikeSchema } from "../../validation-schemas/likes";

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    await likeDislikeSchema.validateAsync({ postId });
    const like = await Like.query().insert({
      post_id: Number(postId),
      user_id: req.userId,
    });
    res.status(201).json({
      like,
    });
  } catch (error) {
    next(error);
  }
};

export const dislikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    await likeDislikeSchema.validateAsync({ postId });
    await Like.query()
      .where({
        post_id: postId,
        user_id: req.userId,
      })
      .del();
    res.status(204).json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};
