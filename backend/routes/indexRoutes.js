import express from "express";
import authRoutes from "./AuthRoute.js";
import jobRoutes from "./JobRoutes.js";
import postRoutes from "./PostRoutes.js";
import productRoutes from "./ProductRoutes.js";
import chatRoutes from "./ChatRoute.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/post", postRoutes);
router.use("/product", productRoutes);
router.use("/chat", chatRoutes);

export default router;
