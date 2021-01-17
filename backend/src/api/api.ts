import { Router } from "express";
import auth from "./auth/auth.routes";

const router = Router();

router.use("/auth", auth);

export const messages = {
  root: "Welcome to my API",
};

router.get("/", (_, res) => {
  res.json({
    message: messages.root,
  });
});

export default router;
