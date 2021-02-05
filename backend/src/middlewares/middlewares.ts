import { NextFunction, Response, Request } from "express";
import { verifyAccessToken, createAccessToken } from "../lib/jwt";

export async function validateAuthorizationTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  // Token <token>
  const token = authorization?.split(" ")[1];
  if (!token) {
    const error = new Error("Bearer token required");
    res.status(400);
    next(error);
  }
  try {
    const { userId } = (await verifyAccessToken(token!)) as { userId: number };
    req.userId = userId;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      const { refresh_token: refreshToken } = req.cookies;
      verifyAccessToken(refreshToken)
        .then(({ userId }: any) => {
          req.userId = userId;
          createAccessToken({ userId }).then((value) => {
            res.cookie("access_token", value);
            next();
          });
        })
        .catch((error) => {
          if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
          ) {
            res.status(401);
            next(error);
          } else {
            next(error);
          }
        });
    } else {
      next(error);
    }
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
  if (error.isJoi) {
    const validationError: any = new Error("Validation error");
    validationError.errors = error.details;
    error = validationError;
    res.status(400);
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    code: statusCode,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    errors: error.errors || undefined,
  });
}
