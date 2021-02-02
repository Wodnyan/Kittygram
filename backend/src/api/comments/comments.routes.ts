import { Router } from "express";
import { getAllComments } from "./comments.controllers";

const router = Router();

// TODO: Secure this
router.get("/", getAllComments);

export default router;
