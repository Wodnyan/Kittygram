import { Router } from "express";
import { validateAuthorizationTokens } from "../../middlewares/middlewares";
import { getUserInfo } from "./users.controllers";

const router = Router();

router.get("/user", validateAuthorizationTokens, getUserInfo);

export default router;
