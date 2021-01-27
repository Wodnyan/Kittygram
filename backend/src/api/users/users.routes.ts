import { Router } from "express";
import { validateAuthorizationTokens } from "../../middlewares/middlewares";
import { getUserInfo, getPostsOfUser } from "./users.controllers";

const router = Router();

router.get("/user", validateAuthorizationTokens, getUserInfo);

router.get("/:userId/posts", getPostsOfUser);

export default router;
