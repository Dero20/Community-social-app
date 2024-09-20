import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/ProductController.js";
import verifyToken from "../middlewares/verifyToken.js";
import multiFileUpload from "../middlewares/multipleFileUpload.js";

const router = express.Router();

router.post("/create", verifyToken, multiFileUpload("product"), createProduct);
router.get("/get", verifyToken, getProducts);
router.get("/get-product/:id", verifyToken, getProduct);
router.put("/update-product/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;
