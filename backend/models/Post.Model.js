import mongoose from "mongoose";

const PostModel = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    location: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    postType: {
      type: String,
      enum: ["post", "event"],
    },
    event: {
      eventName: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      location: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      eventPicture: {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostModel);

export default Post;
