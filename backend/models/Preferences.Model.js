import mongoose from "mongoose";

const PreferencesSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
    },
    address: {
      address: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalCode: {
        type: Number,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

export default PreferencesSchema;
