import mongoose from "mongoose";

const JobPostModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: "Title is required",
        },
        content: {
            type: String,
            required: "Content is required",
        },
        category: {
            type: String,
            required: "Category is required",
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },
    },
    {
        timestamps: true,
    }
);

const JobPost = mongoose.models.JobPost || mongoose.model("JobPost", JobPostModel);

export default JobPost;
