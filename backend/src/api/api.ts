import { Router } from "express";
import auth from "./auth/auth.routes";
import users from "./users/users.routes";
import posts from "./posts/posts.routes";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/posts", posts);

export const messages = {
  root: "Welcome to my API",
};

router.get("/", (_, res) => {
  res.json({
    message: messages.root,
  });
});

export default router;
