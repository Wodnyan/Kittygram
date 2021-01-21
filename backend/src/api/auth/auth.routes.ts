import { Router } from "express";
import { signUpController } from "./auth.controllers";

const router = Router();

router.post("/sign-up", signUpController);

export default router;
