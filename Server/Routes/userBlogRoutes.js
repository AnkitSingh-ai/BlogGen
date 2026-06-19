import express from 'express';
import { 
  getAllPublishedBlogs,
  getUserBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogPublish,
  getUserDashboard,
  getUserComments,
  deleteComment
} from '../controller/userBlogController.js';
import auth from '../Middleware/auth.js';

const userBlogRouter = express.Router();

// Public routes (no authentication required)
userBlogRouter.get('/published', getAllPublishedBlogs);

// Protected routes (authentication required)
userBlogRouter.get('/user/my-blogs', auth, getUserBlogs);
userBlogRouter.get('/user/dashboard', auth, getUserDashboard);
userBlogRouter.get('/user/my-comments', auth, getUserComments);
userBlogRouter.post('/create', auth, createBlog);
userBlogRouter.put('/:id', auth, updateBlog);
userBlogRouter.delete('/:id', auth, deleteBlog);
userBlogRouter.delete('/comment/:id', auth, deleteComment);
userBlogRouter.patch('/:id/toggle-publish', auth, toggleBlogPublish);

// This should be last to avoid catching other routes
userBlogRouter.get('/:id', getBlogById);

export default userBlogRouter;
