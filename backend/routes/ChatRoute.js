import { chatInbox } from "../controllers/JobPostController.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();


router.get('/inbox', verifyToken, chatInbox);

export default router;