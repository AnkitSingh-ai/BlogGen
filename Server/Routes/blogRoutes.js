import express from "express";
import { addBlog, generateContent } from "../controller/blogController.js";
import upload from "../configs/multer.js"; 
import auth from "../Middleware/auth.js";
import { getAllBlogs, getBlogComments,getBlogById,togglePublish,deleteBlogById,addComment } from "../controller/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/add",auth, upload.single("image"), addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:id", auth, getBlogById);
blogRouter.delete("/delete", auth, deleteBlogById);
blogRouter.patch("/toggle-publish/:id", auth, togglePublish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate', auth, generateContent);

export default blogRouter;
