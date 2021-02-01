import { NextFunction, Request, Response } from "express";
import FormatedPost from "../../lib/formated-post";
import { allPostsQueryParams } from "../../validation-schemas/posts";
import { getOneUserSchema } from "../../validation-schemas/users";
import User from "../auth/auth.model";
import Like from "../likes/likes.model";
import Post from "../posts/posts.model";

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    await getOneUserSchema.validateAsync({ userId });
    const user = await User.query()
      .findById(userId)
      .select([
        "email",
        "username",
        "full_name as fullName",
        "id",
        "avatar",
        "description",
        "created_at as createdAt",
      ]);
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const checkUserCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.query().findById(req.userId);
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostsOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { skip, limit } = req.query;
  await allPostsQueryParams.validateAsync(
    { userId, skip, limit },
    {
      abortEarly: false,
    }
  );
  const posts = await Post.query()
    .leftJoinRelated("poster")
    .where({
      user_id: userId,
    })
    .select([
      "posts.id as id",
      "posts.description as description",
      "image",
      "poster.username as poster",
      "poster.email as posterEmail",
      "poster.id as posterId",
    ])
    .offset(Number(skip))
    .limit(Number(limit));
  const likes = await Like.query()
    .where({ user_id: Number(userId) || undefined })
    .skipUndefined();
  const formatedPosts = posts.map((post: any) => {
    const isLiked = likes?.some((like) => like.post_id === post.id);
    return new FormatedPost({ ...post, liked: isLiked });
  });
  res.json({ posts: formatedPosts });
  try {
  } catch (error) {
    next(error);
  }
};
