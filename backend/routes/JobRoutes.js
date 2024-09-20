
import express from "express";
import { createJobPost, getJobPost, getJobPosts, getMyJobPosts, updateJobPost, deleteJobPost, chatInbox } from "../controllers/JobPostController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createJobPost);
router.get('/get', verifyToken, getJobPosts);
router.get('/myjobs', verifyToken, getMyJobPosts);
router.get("/get-job/:id", verifyToken, getJobPost);
router.put("/update-job/:id", verifyToken, updateJobPost);
router.delete('/delete/:id', verifyToken, deleteJobPost);
router.get('/job-messages', verifyToken, chatInbox);

export default router;
