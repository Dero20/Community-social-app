import JobPost from "../models/JobPost.Model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Chat from "../models/Chat.Model.js";

export const createJobPost = asyncHandler(async (req, res, next) => {
  const { title, content, category } = req.body;

  try {
    const post = await JobPost.create({
      title,
      content,
      category,
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

export const getJobPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await JobPost.find().populate(
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

export const getMyJobPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await JobPost.find({ postedBy: req.userID }).populate(
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

export const getJobPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await JobPost.findById(req.params.id).populate(
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

export const updateJobPost = asyncHandler(async (req, res, next) => {
  const { title, content, category } = req.body;

  try {
    const post = await JobPost.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    if (post.postedBy.toString() !== req.userID) {
      return next(
        new ErrorResponse("You are not authorized to update this post", 401)
      );
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    await post.save();

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return next(error);
  }
});

export const deleteJobPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await JobPost.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    if (post.postedBy.toString() !== req.userID) {
      return next(
        new ErrorResponse("You are not authorized to delete this post", 401)
      );
    }

    await post.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
});

export const chatInbox = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userID;

    let chats = await Chat.find({
      users: userId,
    })
      .populate({
        path: "messages.postedBy",
        select: "firstName lastName email profilePicture",
      })
      .populate({
        path: "jobRef",
        select: "title category _id",
      })
      .populate({
        path: "adRef",
        select: "name title price _id",
      })
      .populate({
        path: "profileRef",
        select: "firstName lastName username _id",
      })
      .sort({ updatedAt: -1 });

    chats = chats.filter(
      (chat) => chat.jobRef || chat.adRef || chat.profileRef
    );

    chats.forEach((chat) => {
      chat.messages.sort((a, b) => b.createdAt - a.createdAt);
    });

    if (chats.length === 0) {
      return next(new ErrorResponse("No chats found for this user", 404));
    }

    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    next(error);
  }
});
