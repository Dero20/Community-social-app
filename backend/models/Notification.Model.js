import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, required: true },
    from: { type:  mongoose.Schema.Types.ObjectId, required: true },
    text: { type: String, require: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
