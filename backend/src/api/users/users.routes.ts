import { Router } from "express";
import { validateAuthorizationTokens } from "../../middlewares/middlewares";
import {
  checkUserCredentials,
  getPostsOfUser,
  getOneUser,
} from "./users.controllers";

const router = Router();

router.get("/check", validateAuthorizationTokens, checkUserCredentials);

router.get("/:userId", getOneUser);

router.get("/:userId/posts", getPostsOfUser);

export default router;
