import Product from "../models/Product.Model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import cloudinary from "cloudinary";

export const createProduct = asyncHandler(async (req, res, next) => {
  const { title, content, category, price, isFree, location, postedBy } =
    req.body;

  try {
    console.log(req.body);
    console.log(req.cloudinaryUploads);
    const images = req.cloudinaryUploads.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));
    const product = await Product.create({
      title,
      content,
      category,
      price,
      isFree,
      location,
      images,
      postedBy: req.userID,
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
});

export const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return next(error);
  }
});

export const getProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, images } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // Upload images

    const uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const uploadedImage = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      uploadedImages.push({
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.images = images ? uploadedImages : product.images;

    await product.save();

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // Delete images from cloudinary

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
});

export const uploadProductImage = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "products",
  });

  product.images.push({
    url: uploadedImage.secure_url,
    public_id: uploadedImage.public_id,
  });

  await product.save();

  return res.status(200).json({
    success: true,
    data: product,
  });
});

export const deleteProductImage = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  const image = product.images.find(
    (image) => image.public_id === req.params.image_id
  );

  if (!image) {
    return next(new ErrorResponse("Image not found", 404));
  }

  await cloudinary.v2.uploader.destroy(image.public_id);

  product.images = product.images.filter(
    (image) => image.public_id !== req.params.image_id
  );

  await product.save();

  return res.status(200).json({
    success: true,
    data: product,
  });
});

export const getMyProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({ user: req.user.id });

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return next;
  }
});
