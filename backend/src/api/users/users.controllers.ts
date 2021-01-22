import { NextFunction, Request, Response } from "express";
import User from "../auth/auth.model";

export const getUserInfo = async (
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
