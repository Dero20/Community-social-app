import mongoose from "mongoose";

const CommentModel = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: "Title is required",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentModel);

export default Comment;
