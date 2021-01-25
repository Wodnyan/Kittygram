import { Router } from "express";
import { validateAuthorizationTokens } from "../../middlewares/middlewares";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
} from "./posts.controllers";
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    files: 1,
    // 1 mb
    fileSize: 1e6,
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      const error = new Error("File needs to be an image");
      return cb(error);
    }
    // File name: <fieldname>-<timeStamp>.<fileType>
    file.filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, true);
  },
});

const router = Router();

router.get("/", getAllPosts);

router.get("/:postId", getOnePost);

router.post(
  "/",
  validateAuthorizationTokens,
  upload.single("image"),
  createPost
);

router.delete("/:postId", deletePost);

export default router;
