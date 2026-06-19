import express from "express";
import { addBlog, generateContent } from "../controller/blogController.js";
import upload from "../configs/multer.js"; 
import auth from "../Middleware/auth.js";
import { getAllBlogs, getBlogComments,getBlogById,togglePublish,deleteBlogById,addComment } from "../controller/blogController.js";

const blogRouter = express.Router();

// Public routes
blogRouter.get("/all", getAllBlogs);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);

// Protected routes (admin only)
blogRouter.post("/add",auth, upload.single("image"), addBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/delete", auth, deleteBlogById);
blogRouter.patch("/toggle-publish/:id", auth, togglePublish);
blogRouter.post('/generate', auth, generateContent);

export default blogRouter;
