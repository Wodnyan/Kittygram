import { NextFunction, Request, Response } from "express";

export const getUserInfo = (req: Request, res: Response, _1: NextFunction) => {
  console.log(req.userId);
  res.json({
    userId: req.userId,
  });
};
