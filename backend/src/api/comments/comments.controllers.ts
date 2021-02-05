import { Request, Response, NextFunction } from "express";
import { postCommentSchema } from "../../validation-schemas/comments";
import User from "../auth/auth.model";
import Comment from "./comments.model";

export const getAllComments = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.query()
      .leftJoinRelated("commenter")
      .select([
        "comments.id as id",
        "comments.comment as comment",
        "commenter.username as username",
        "commenter.email as email",
        "commenter.avatar as avatar",
        "comments.created_at as createdAt",
        "commenter.id as commenterId",
      ]);
    res.json({
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const { comment } = req.body;
  try {
    const validated = await postCommentSchema.validateAsync({
      postId,
      comment,
    });
    const newComment = await Comment.query().insertAndFetch({
      comment: validated.comment,
      post_id: validated.postId,
      user_id: req.userId,
    });
    const commentPoster = await User.query()
      .where({
        id: newComment.user_id,
      })
      .first();
    res.json({
      comment: {
        id: newComment.id,
        comment: newComment.comment,
        createdAt: newComment.created_at,
        postId: newComment.post_id,
        commenter: {
          username: commentPoster.username,
          id: commentPoster.id,
          avatar: commentPoster.avatar,
          email: commentPoster.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCommentsPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.query()
      .where({
        post_id: postId,
      })
      .leftJoinRelated("commenter")
      .select([
        "comments.id as id",
        "comments.comment as comment",
        "commenter.username as username",
        "commenter.email as email",
        "commenter.avatar as avatar",
        "comments.created_at as createdAt",
        "commenter.id as commenterId",
      ]);
    res.json({
      comments,
    });
  } catch (error) {
    next(error);
  }
};
