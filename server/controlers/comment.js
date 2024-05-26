import { createError } from "../utils/error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
  const { videoid, comment } = req.body;
  const commentid = req.username + Date.now().toString();
  const newComment = new Comment({
    username: req.username,
    videoid,
    comment,
    commentid,
  });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const url = req.url;
    const parts = url.split("/");
    const commentid = parts[parts.length - 1];
    const videoid = parts[parts.length - 2];
    const comment = await Comment.findById(commentid);
    const video = await Video.findById(videoid);
    if (req.username === comment.username || req.username === video.username) {
      await Comment.findByIdAndDelete(commentid);
      res.status(200).json("The comment has been deleted.");
    }

    return next(createError(403, "You can delete only your comment!"));
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  const url = req.url;
  const parts = url.split("/");
  const videoid = parts[parts.length - 1];
  try {
    const comments = await Comment.find({ videoid });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
