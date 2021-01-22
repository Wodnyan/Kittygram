import { NextFunction, Response, Request } from "express";
import { verifyAccessToken } from "../lib/jwt";

export async function validateAuthorizationTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error("Authorization header is empty");
    res.status(400);
    next(error);
  }
  try {
    // Check refresh token cookie if it fails because it expired
    const { userId } = (await verifyAccessToken(token!)) as { userId: number };
    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(
  error: any,
  _: Request,
  res: Response,
  _1: NextFunction
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    code: statusCode,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    errors: error.errors || undefined,
  });
}
