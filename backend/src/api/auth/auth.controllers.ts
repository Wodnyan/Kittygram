import { Request, Response, NextFunction } from "express";
import { signUpSchema } from "../../validation-schemas/auth";
import { isEmailUnique } from "./auth.queries";
import { encryptPassword } from "../../lib/password-encryption";
import { createAccessToken } from "../../lib/jwt";
import User from "./auth.model";

export const respondMessages = {
  successfulSignUp: "Successful sign up",
  validationError: "Validation error",
};

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = await signUpSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const uniqueEmail = await isEmailUnique(validated.email);
    if (!uniqueEmail) {
      const error = new Error("Email is in use");
      res.status(409);
      throw error;
    }
    const hashedPassword = await encryptPassword(validated.password);
    const user = await User.query().insertAndFetch({
      username: validated.username,
      email: validated.email,
      password: hashedPassword,
      full_name: validated.fullName,
    });
    const accessToken = await createAccessToken({ userId: user.id });
    res.status(201).json({
      message: respondMessages.successfulSignUp,
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    if (error.isJoi) {
      const validationError: any = new Error(respondMessages.validationError);
      validationError.errors = error.details;
      res.status(400);
      return next(validationError);
    }
    next(error);
  }
};