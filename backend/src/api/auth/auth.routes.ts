import { Router } from "express";
import { signUpSchema } from "../../validation-schemas/auth";

const router = Router();

export const respondMessages = {
  successfulSignUp: "Successful sign up",
  validationError: "Validation error",
};

router.post("/sign-up", async (req, res, next) => {
  try {
    await signUpSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    res.status(201).json({
      message: respondMessages.successfulSignUp,
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
});

export default router;
