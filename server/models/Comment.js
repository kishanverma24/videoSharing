import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    commentid:{
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
