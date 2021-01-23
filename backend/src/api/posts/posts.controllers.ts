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
      user_id: 1,
      image: postImage.Location,
      description: req.body.description,
    });
    res.json({
      newPost,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};
