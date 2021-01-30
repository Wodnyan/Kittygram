import { Router } from "express";
import {
  signUpController,
  googleOAuthController,
  checkUsername,
  checkEmail,
} from "./auth.controllers";
import passport from "passport";

const router = Router();

router.post("/sign-up", signUpController);

router.post("/check/username", checkUsername);

router.post("/check/email", checkEmail);

router.get(
  "/oauth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/oauth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleOAuthController
);

export default router;
