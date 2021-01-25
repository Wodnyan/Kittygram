import { NextFunction, Request, Response } from "express";
import Post from "./posts.model";
import dotenv from "dotenv";
import { uploadFile } from "../../lib/uploadFile";

dotenv.config();

export const getAllPosts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.query();
    res.json({
      posts,
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
        "poster.email as poster_email",
      ]);
    if (!post) {
      const error = new Error("Couldn't find post");
      res.status(404);
      return next(error);
    }
    res.json({
      post,
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
