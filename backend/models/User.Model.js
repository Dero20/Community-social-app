import mongoose from "mongoose";
import PreferencesSchema from "./Preferences.Model.js";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First Name is required",
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: {
        type: String,
      },
      expiry: {
        type: Date,
      },
    },
    profilePicture: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    passwordResetOtp: {
      code: {
        type: String,
      },
      expiry: {
        type: Date,
      },
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
      neighborHood: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
    speciality: {
      category: { type: String },
      description: { type: String },
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    bannedAccounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
