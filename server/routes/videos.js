import express from "express";
import {
  addVideo,
  addView,
  getvideosByTag,
  getVideo,
  randomvideo,
  searchvideo,
  trendingvideos,
  likevideo,
  dislikevideo,
  updateVideo,
  deleteVideo
} from "../controlers/video.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create a video
router.post("/addvideo", verifyToken, addVideo);
router.put("/:videoid", verifyToken, updateVideo);
router.delete("/:videoid", verifyToken, deleteVideo);
router.get("/find/:videoid", getVideo);
router.put("/view/:videoid", addView);
router.get("/trend", trendingvideos);
router.get("/random", randomvideo);
router.get("/tags", getvideosByTag);
router.get("/search", searchvideo);
router.put("/likevideo/:videoid", verifyToken, likevideo);
router.put("/dislikevideo/:videoid", verifyToken, dislikevideo);
export default router;
