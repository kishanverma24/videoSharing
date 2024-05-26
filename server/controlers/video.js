import Video from "../models/Video.js";
import { createError } from "../utils/error.js";

export const addVideo = async (req, res, next) => {
  const { title, description, imgUrl, videoUrl } = req.body;
  const videoid = `${req.username}${Date.now().toString()}`;
  const newVideo = new Video({
    username: req.username,
    title,
    description,
    imgUrl,
    videoUrl,
    videoid,
  });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const { title, description, imgUrl, tags } = req.body;
    const url = req.url;
    const parts = url.split("/");
    const videoid = parts[parts.length - 1];
    const video = await Video.findOne({videoid:videoid});
    if (!video) return next(createError(404, "Video not found!"));
    if (req.username === video.username) {
      const updatedVideo = await Video.findOneAndUpdate(
        { videoid },
        {
          $set: {
            title,
            description,
            imgUrl,
          },
          $push: { tags: tags }
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const videoid = parts[parts.length - 1];
  try {
    const video = await Video.findById(videoid);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.username === video.username) {
      await Video.findByIdAndDelete(videoid);
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const videoid = parts[parts.length - 1];
  try {
    const video = await Video.find({videoid});
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const videoid = parts[parts.length - 1];
  try {
    await Video.findByIdAndUpdate(
      { videoid },
      {
        $inc: { views: 1 },
      }
    );
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const randomvideo = async (req, res, next) => {
  try {
    const videos = await Video.find()
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trendingvideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const getvideosByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const searchvideo = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const likevideo = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const videoid = parts[parts.length - 1];
  try {
    await Video.findOneAndUpdate(
      { videoid },
      {
        $addToSet: { likes: req.username },
        $pull: { dislikes: req.username },
      }
    );
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislikevideo = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const videoid = parts[parts.length - 1];
  try {
    await Video.findOneAndUpdate(
      { videoid },
      {
        $addToSet: { dislikes: req.username },
        $pull: { likes: req.username },
      }
    );
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};
