import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import path from "path";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/indexRoutes.js";
import "./utils/userCleanup.js";
import { connectDB } from "./config/db.js";
import initializeSocket from "./utils/socket.js";


dotenv.config();

connectDB();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

const io = initializeSocket(app);

app.use((req, res, next) => {
  req.io = io;
  next();
})

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:19006",
      "http://localhost:8081",
    ],
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/v1/logs", express.static(path.join(__dirname, "/logs")));
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(routes);




app.use(errorHandler);
