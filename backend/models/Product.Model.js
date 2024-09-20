import mongoose from "mongoose";

const ProductModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    content: {
      type: String,
      required: "Content is required",
    },
    category: {
      type: String,
      required: "Category is required",
    },
    price: {
      type: String,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    images: [
      {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductModel);

export default Product;
