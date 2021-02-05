import { Request, Response, NextFunction } from "express";
import {
  checkEmailSchema,
  checkUsernameSchema,
  signUpSchema,
} from "../../validation-schemas/auth";
import { encryptPassword } from "../../lib/password-encryption";
import { createAccessToken, createRefreshToken } from "../../lib/jwt";
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
    const uniqueEmail = await User.isEmailAvailable(validated.email);
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
    const refreshToken = await createRefreshToken({ userId: user.id });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });
    res.cookie("access_token", accessToken);
    res.status(201).json({
      message: respondMessages.successfulSignUp,
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

export const googleOAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as any;
    const refreshToken = await createRefreshToken({ userId: user.id });
    const accessToken = await createAccessToken({ userId: user.id });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });
    res.cookie("access_token", accessToken);
    res.redirect("http://localhost:8080/");
  } catch (error) {
    next(error);
  }
};

export const checkUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    await checkUsernameSchema.validateAsync({ username });
    const isUsernameAvailable = await User.isUsernameAvailable(username);
    if (isUsernameAvailable) {
      res.json({
        username,
      });
    } else {
      res.status(409).json({
        message: "Username is taken",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    await checkEmailSchema.validateAsync({ email });
    const isEmailAvailable = await User.isEmailAvailable(email);
    if (isEmailAvailable) {
      res.json({
        email,
      });
    } else {
      res.status(409).json({
        message: "Email is taken",
      });
    }
  } catch (error) {
    next(error);
  }
};
