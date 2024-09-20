import { Server } from "socket.io";
import { createServer } from "node:http";
import JobPost from "../models/JobPost.Model.js";
import Chat from "../models/Chat.Model.js";
import User from "../models/User.Model.js";
import Product from "../models/Product.Model.js";
import mongoose from "mongoose";

let io;
let usersio = {};

const initializeSocket = (app) => {
  const server = createServer(app);
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("setUserId", async (userId) => {
      console.log("setUserId", userId);
      if (userId) {
        const oneUser = await User.findById(userId);
        if (oneUser) {
          usersio[userId] = socket.id;
          console.log(`User with id ${userId} connected`);
        }
      }
    });

    socket.on("joinRoom", async ({ userId, contextType, contextId }) => {
      console.log(
        `joinRoom event received with userId: ${userId}, contextType: ${contextType}, contextId: ${contextId}`
      );

      const isValidObjectId = mongoose.Types.ObjectId.isValid(contextId);
      if (!isValidObjectId) {
        console.error(`Invalid ObjectId: ${contextId}`);
        socket.emit("error", { message: `Invalid room ID: ${contextId}` });
        return;
      }

      let chat;
      if (contextType === "job") {
        const job = await JobPost.findById(contextId).populate("chat");

        if (job && job.chat) {
          chat = job.chat;
          console.log(`Job found with chat ID: ${chat._id}`);
        } else if (job) {
          console.log("No chat found for the job. Creating a new chat.");
          const user = await User.findById(userId);
          chat = await Chat.create({
            users: [user._id, job.postedBy],
            jobRef: job._id,
            initiatedBy: user._id,
          });
          job.chat = chat._id;
          await job.save();
          console.log(`New chat created with ID: ${chat._id}`);
        } else {
          console.log("Job not found.");
        }
      }
      if (contextType === "product") {
        const product = await Product.findById(contextId).populate("postedBy");
        const user = await User.findById(userId);
        const chats = await Chat.findOne({
          users: { $in: [user._id] },
          adRef: product._id,
        });

        console.log("product", product, "user", user, "chats", chats);
        if (user && chats) {
          chat = chats;
          console.log(`Job found with chat ID: ${chat}`);
        } else if (!chats) {
          console.log("No chat found for the job. Creating a new chat.");
          chat = await Chat.create({
            users: [product.postedBy, user._id],
            adRef: product._id,
            initiatedBy: user._id,
          });
          console.log(`New chat created with ID: ${chat}`);
        } else {
          console.log("Job not found.");
        }
      }
      if (contextType === "profile") {
        const user = await User.findById(contextId);
        const chats = await Chat.findOne({
          users: { $in: [user._id] },
          profileRef: user._id,
        });

        if (user && chats) {
          chat = chats;
          console.log(`Job found with chat ID: ${chat}`);
        } else if (!chats) {
          console.log("No chat found for the job. Creating a new chat.");
          let me = await User.findById(userId);
          chat = await Chat.create({
            users: [me, user._id],
            profileRef: user._id,
            initiatedBy: me,
          });
          console.log(`New chat created with ID: ${chat}`);
        } else {
          console.log("Job not found.");
        }
      }

      if (chat) {
        socket.join(chat._id.toString());
        console.log(
          `User with ID ${userId} joined room: ${chat._id.toString()}`
        );

        socket.emit("loadMessages", chat.messages);
      }
    });

    socket.on("contextualChat", async (data) => {
      console.log("Received contextualChat data:", data);
      const { contextType, contextId, message, userId } = data;

      let chat;
      if (contextType === "job") {
        const job = await JobPost.findById(contextId).populate("chat");
        if (job && job.chat) {
          chat = job.chat;
        } else if (job) {
          const user = await User.findById(userId);
          chat = await Chat.create({
            users: [user._id, job.postedBy],
            jobRef: job._id,
            initiatedBy: user._id,
          });
          job.chat = chat._id;
          await job.save();
        }
      }
      if (contextType === "profile") {
        const user = await User.findById(contextId);
        const chats = await Chat.findOne({
          users: { $in: [user._id] },
          profileRef: user._id,
        });
        console.log(chats);

        if (user && chats) {
          chat = chats;
          console.log(`Job found with chat ID: ${chat}`);
        } else if (!chats) {
          console.log("No chat found for the job. Creating a new chat.");
          let me = await User.findById(userId);
          chat = await Chat.create({
            users: [me, user._id],
            profileRef: user._id,
            initiatedBy: me,
          });
          console.log(`New chat created with ID: ${chat}`);
        } else {
          console.log("Job not found.");
        }
      }
      if (contextType === "product") {
        const product = await Product.findById(contextId).populate("postedBy");
        const user = await User.findById(userId);
        const chats = await Chat.findOne({
          users: { $in: [user._id] },
          adRef: product._id,
        });
        console.log("product", product, "user", user, "chats", chats);

        if (user && chats) {
          chat = chats;
          console.log(`Job found with chat ID: ${chat}`);
        } else if (!chats) {
          console.log("No chat found for the job. Creating a new chat.");
          chat = await Chat.create({
            users: [product.postedBy, user._id],
            adRef: product._id,
            initiatedBy: user._id,
          });
          console.log(`New chat created with ID: ${chat}`);
        } else {
          console.log("Job not found.");
        }
      }

      // Baaqi chats ke liye bhi aise hi check karna hai and create karna hai ye dekhlena like if contextType is product or profile

      if (chat) {
        chat.messages.push({
          message,
          postedBy: userId,
          messageType: `${contextType}Ref`,
        });

        const savedChat = await chat.save();
        console.log("Chat saved successfully:", savedChat);

        io.to(chat._id.toString()).emit("newMessage", savedChat);
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });
  });

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Socket server running on port ${port}`);
  });

  return io;
};

export default initializeSocket;
