import Post from "../models/Post.Model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import cloudinary from "cloudinary";
import Comment from "../models/Comment.Model.js";
import User from "../models/User.Model.js";
import Notification from "../models/Notification.Model.js";

export const createPost = asyncHandler(async (req, res, next) => {
  const { content, location, postType } = req.body;

  try {
    let image = {
      public_id: req.cloudinaryUpload.public_id,
      url: req.cloudinaryUpload.url,
    };
    const post = await Post.create({
      content,
      location,
      postType,
      image: image,
      postedBy: req.userID,
    });

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
});

export const createEvent = asyncHandler(async (req, res, next) => {
  const { eventName, startDate, endDate, postalCode, location, postType } =
    req.body;

  try {
    let event = {
      eventName,
      startDate,
      endDate,
      location: location,
      postalCode: postalCode,
    };
    const post = await Post.create({
      location,
      postType,
      postedBy: req.userID,
      event: event,
    });

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
});

export const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const findUserLocation = await User.findById(req.userID, { location: 1 });
    console.log(
      "🚀 ~ getPosts ~ findUser:",
      findUserLocation.location.neighborHood
    );

    const posts = await Post.find({
      location: findUserLocation.location.neighborHood,
    })
      .populate("postedBy", "firstName lastName email profilePicture")
      .populate("likedBy", "firstName lastName email profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          select: "firstName lastName email profilePicture",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return next(error);
  }
});

export const getBookmarkPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({
      bookmarkedBy: req.userID,
    })
      .populate("postedBy", "firstName lastName email profilePicture")
      .populate("likedBy", "firstName lastName email profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          select: "firstName lastName email profilePicture",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return next(error);
  }
});

export const getMyPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({ postedBy: req.userID }).populate(
      "postedBy",
      "firstName email profilePicture"
    );

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return next(error);
  }
});

export const getPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "postedBy",
      "firstName email profilePicture"
    );

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const { content, location, image } = req.body;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    // Check if the user is the owner of the post
    if (post.postedBy.toString() !== req.userID) {
      return next(
        new ErrorResponse("You are not authorized to update this post", 403)
      );
    }

    let newImage = post.image;

    if (image) {
      // Delete the previous image from cloudinary
      await cloudinary.v2.uploader.destroy(post.image.public_id);

      // Upload new image
      const uploadedImage = await cloudinary.v2.uploader.upload(image, {
        folder: "posts",
      });

      newImage = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    post.content = content || post.content;
    post.location = location || post.location;
    post.image = newImage;

    await post.save();

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
});

export const deletePost = asyncHandler(async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    // Check if the user is the owner of the post
    if (post.postedBy.toString() !== req.userID) {
      return next(
        new ErrorResponse("You are not authorized to delete this post", 403)
      );
    }

    // Delete the image from cloudinary
    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
});

export const likePost = asyncHandler(async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }
    // Check if the post is already liked
    const likedIndex = post.likedBy.indexOf(req.userID);

    if (likedIndex !== -1) {
      post.likedBy.splice(likedIndex, 1); // Remove the userID from the likedBy array
    } else {
      // User has not liked the post yet, so add their ID to like it
      post.likedBy.push(req.userID);
      const user = await User.findById(req.userID, { firstName: 1, lastName: 1 });

      await Notification.create({
        user: post.postedBy,
        post: post._id,
        from: req.userID,
        text: `${user.firstName} ${user.lastName} liked your post`,
      });
    }
    await post.save();

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
});

export const bookmarkPost = asyncHandler(async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }
    // Check if the post is already liked
    const likedIndex = post.bookmarkedBy.indexOf(req.userID);

    if (likedIndex !== -1) {
      post.bookmarkedBy.splice(likedIndex, 1); // Remove the userID from the bookmarkedBy array
    } else {
      // User has not liked the post yet, so add their ID to like it
      post.bookmarkedBy.push(req.userID);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
});

export const commentOnPost = asyncHandler(async (req, res, next) => {
  const { comment, postId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    const newComment = await Comment.create({
      comment,
      postedBy: req.userID,
      post: postId,
    });

    post.comments.push(newComment._id);

    await post.save();

    const getCommentedPost = await Post.findById(postId)
      .populate("postedBy", "firstName email profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          select: "firstName lastName email profilePicture",
        },
      });


    const user = await User.findById(req.userID, { firstName: 1, lastName: 1 });

    await Notification.create({
      user: getCommentedPost.postedBy,
      post: getCommentedPost._id,
      from: req.userID,
      text: `${user.firstName} ${user.lastName} commented on your post`,
    });

    return res.status(201).json({
      success: true,
      data: getCommentedPost,
    });
  } catch (error) {
    next(error);
  }
});

export const getComments = asyncHandler(async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate(
      "postedBy",
      "firstName email profilePicture"
    );

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return next(error);
  }
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new ErrorResponse("Comment not found", 404));
    }

    // Check if the user is the owner of the comment
    if (comment.postedBy.toString() !== req.userID) {
      return next(
        new ErrorResponse("You are not authorized to delete this comment", 403)
      );
    }

    await comment.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
});
