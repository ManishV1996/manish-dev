import connectDB from "../../../lib/mongodb";
import Blog from "../../../models/Blog";
import cloudinary from "../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch blogs", error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const summary = formData.get("summary");
    const content = formData.get("content");
    const category = formData.get("category");
    const readTime = formData.get("readTime");
    const author = formData.get("author");

    const imageFile = formData.get("image");

    let imageUrl = "";

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "blogs" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    }

    const newBlog = await Blog.create({
      title,
      summary,
      content,
      category,
      readTime,
      author,
      image: imageUrl,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Error creating blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}