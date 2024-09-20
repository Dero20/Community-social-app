import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getMyPosts,
  getPost,
  likePost,
  bookmarkPost,
  createEvent,
  commentOnPost,
  getBookmarkPosts,
} from "../controllers/PostController.js";
import verifyToken from "../middlewares/verifyToken.js";
import multerFile from "../middlewares/multerFile.js";

const router = express.Router();

router.post("/create", verifyToken, multerFile("posts"), createPost);
router.post("/new-event", verifyToken, createEvent);
router.post("/comment", verifyToken, commentOnPost);
router.get("/get", verifyToken, getPosts);
router.get("/get-bookmarks", verifyToken, getBookmarkPosts);
router.get("/myposts", verifyToken, getMyPosts);
router.get("/get-post/:id", verifyToken, getPost);
router.put("/like/:id", verifyToken, likePost);
router.put("/bookmark/:id", verifyToken, bookmarkPost);
router.put("/update-post/:id", verifyToken, updatePost);
router.delete("/delete/:id", verifyToken, deletePost);

export default router;
