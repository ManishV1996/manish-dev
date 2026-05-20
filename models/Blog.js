import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    image:   { type: String }, // stores base64 data URL or a hosted image URL
    category: { type: String },
    readTime: { type: String, default: "5 min read" },
    author:   { type: String },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;