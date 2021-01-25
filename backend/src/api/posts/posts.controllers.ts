import { NextFunction, Request, Response } from "express";
import Post from "./posts.model";
import dotenv from "dotenv";
import { uploadFile } from "../../lib/uploadFile";
import Like from "../likes/likes.model";
import FormatedPost from "../../lib/formated-post";

dotenv.config();

export const getAllPosts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.query()
      .joinRelated("poster")
      .select([
        "posts.id as id",
        "posts.description as description",
        "image",
        "poster.username as poster",
        "poster.email as posterEmail",
        "poster.id as posterId",
      ]);
    const formatedPosts = posts.map((post: any) => {
      return new FormatedPost(post);
    });
    res.json({
      posts: formatedPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.body;
    const like = await Like.query().insert({
      post_id: postId,
      user_id: req.userId,
    });
    res.status(201).json({
      like,
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
    console.log(error);
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
