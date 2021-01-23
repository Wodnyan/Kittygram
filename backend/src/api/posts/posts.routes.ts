import { Router } from "express";
//import { validateAuthorizationTokens } from "../../middlewares/middlewares";
import { createPost, getAllPosts } from "./posts.controllers";
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    files: 1,
  },
  fileFilter: (_, file, cb) => {
    console.log(file);
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      console.log("what");
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

router.post("/", upload.single("image"), createPost);

export default router;
