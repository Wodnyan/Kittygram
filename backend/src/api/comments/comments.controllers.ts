import { Request, Response, NextFunction } from "express";
import { postCommentSchema } from "../../validation-schemas/comments";
import Comment from "./comments.model";
import FormatedComment from "../../lib/formated-comment";

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
    const formatedComments = comments.map(
      (comment: any) => new FormatedComment(comment)
    );
    res.json({
      comments: formatedComments,
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
    res.json({
      message: "Hello world",
      comment: newComment,
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
    const formatedComments = comments.map(
      (comment: any) => new FormatedComment(comment)
    );
    res.json({
      comments: formatedComments,
    });
  } catch (error) {
    next(error);
  }
};
