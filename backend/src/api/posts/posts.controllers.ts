import { NextFunction, Request, Response } from "express";
import Post from "./posts.model";
import dotenv from "dotenv";
import { uploadFile } from "../../lib/uploadFile";
import Like from "../likes/likes.model";
import FormatedPost from "../../lib/formated-post";
import { allPostsQueryParams } from "../../validation-schemas/posts";

dotenv.config();

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, skip, limit, showComments } = req.query;
    await allPostsQueryParams.validateAsync(
      { userId, skip, limit, showComments },
      {
        abortEarly: false,
      }
    );
    let posts: any;
    if (showComments === "all") {
      posts = await Post.query()
        .leftJoinRelated("poster")
        .withGraphJoined(
          "comments(selectNecessary).[commenter(selectNonCredentials)]",
          {
            joinOperation: "leftJoin",
          }
        )
        .modifiers({
          selectNonCredentials(builder) {
            builder.select("username", "id", "avatar", "email");
          },
          selectNecessary(builder) {
            builder.select("id", "comment", "created_at as createdAt");
          },
        })
        .select(
          [
            "posts.id as id",
            "posts.description as description",
            "image",
            "poster.username as poster",
            "poster.email as posterEmail",
            "poster.id as posterId",
            "poster.avatar as posterAvatar",
          ],
          Post.relatedQuery("likes").count().as("numberOfLikes")
        )
        .groupBy(
          "posts.id",
          "poster.id",
          "comments.id",
          "comments.comment",
          "comments.createdAt",
          "comments:commenter.username",
          "comments:commenter.id",
          "comments:commenter.avatar",
          "comments:commenter.email"
        )
        .offset(Number(skip))
        .limit(Number(limit));
    } else {
      posts = await Post.query()
        .leftJoinRelated("poster")
        .select(
          [
            "posts.id as id",
            "posts.description as description",
            "image",
            "poster.username as poster",
            "poster.email as posterEmail",
            "poster.id as posterId",
            "poster.avatar as posterAvatar",
          ],
          Post.relatedQuery("likes").count().as("numberOfLikes")
        )
        .groupBy("posts.id", "poster.id")
        .offset(Number(skip))
        .limit(Number(limit));
    }
    const likes = await Like.query()
      .where({ user_id: Number(userId) || undefined })
      .skipUndefined();
    const formatedPosts = posts.map((post: any) => {
      const isLiked = likes?.some((like) => like.post_id === post.id);
      return new FormatedPost({ ...post, liked: isLiked });
    });
    res.json({
      posts: formatedPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postImage: any = await uploadFile(req.file.buffer, req.file.filename);
    const newPost = await Post.query().insertAndFetch({
      user_id: req.userId,
      image: postImage.Location,
      description: req.body.description,
    });
    res.json({
      newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getOnePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const post = await Post.query()
      .findById(postId)
      .joinRelated("poster")
      .select([
        "posts.id as id",
        "posts.description as description",
        "image",
        "poster.username as poster",
        "poster.email as posterEmail",
        "poster.id as posterId",
        "poster.avatar as posterAvatar",
      ]);
    if (!post) {
      const error = new Error("Couldn't find post");
      res.status(404);
      return next(error);
    }
    res.json({
      post: new FormatedPost(post as any),
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    await Post.query().where({ id: postId }).del();
    res.status(204).json({
      message: `Deleted post with the id of ${postId}`,
    });
  } catch (error) {
    next(error);
  }
};
