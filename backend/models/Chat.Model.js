import mongoose from "mongoose";

const ChatModel = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId }],
    messages: [
      {
        message: {
          type: String,
          required: "Message is required",
        },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        isSeen: {
          type: Boolean,
          default: false,
        },
        messageType: {
          type: String,
          enum: ["text", "adRef", "jobRef", "productRef", "profileRef"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    adRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    jobRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
    },
    profileRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatModel);

export default Chat;
