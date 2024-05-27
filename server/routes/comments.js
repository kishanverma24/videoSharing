import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controlers/comment.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:videoid", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
