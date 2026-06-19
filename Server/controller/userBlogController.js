import Blog from '../Models/Blog.js';
import User from '../Models/User.js';
import Comment from '../Models/Comment.js';

// Get all published blogs for homepage
export const getAllPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, blogs });
  } catch (error) {
    console.error('Get published blogs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

// Get user dashboard data
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user's blogs
    const blogs = await Blog.find({ author: userId });
    const publishedBlogs = blogs.filter(blog => blog.isPublished);
    const draftBlogs = blogs.filter(blog => !blog.isPublished);
    const recentBlogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'name email');

    // Get comments on user's blogs
    const userBlogIds = blogs.map(blog => blog._id);
    const comments = await Comment.find({ blog: { $in: userBlogIds } });

    res.json({
      success: true,
      dashboard: {
        blogs: blogs.length,
        comments: comments.length,
        drafts: draftBlogs.length,
        recentBlogs,
      }
    });
  } catch (error) {
    console.error('Get user dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
  }
};

// Get comments on user's blogs
export const getUserComments = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user's blog IDs
    const userBlogs = await Blog.find({ author: userId });
    const userBlogIds = userBlogs.map(blog => blog._id);
    
    // Get comments on user's blogs
    const comments = await Comment.find({ blog: { $in: userBlogIds } })
      .populate('blog', 'title')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, comments });
  } catch (error) {
    console.error('Get user comments error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};

// Get user's own blogs
export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const blogs = await Blog.find({ author: userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, blogs });
  } catch (error) {
    console.error('Get user blogs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user blogs' });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Get comments for this specific blog
      const comments = await Comment.find({ blog: req.params.id })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, blog, comments });
  } catch (error) {
    console.error('Get blog by ID error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, subtitle, description, image, isPublished } = req.body;
    
    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const blog = new Blog({
      title,
      subtitle,
      description,
      image,
      isPublished: isPublished || false,
      author: userId,
      authorName: user.name,
    });
    
    await blog.save();
    await blog.populate('author', 'name email');
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to create blog' });
  }
};

// Update blog (only by author)
export const updateBlog = async (req, res) => {
  try {
    const userId = req.user.userId;
    const blogId = req.params.id;
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Check if user is author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only edit your own blogs' 
      });
    }
    
    const { title, subtitle, description, image, isPublished } = req.body;
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        subtitle,
        description,
        image,
        isPublished,
      },
      { new: true, runValidators: true }
    ).populate('author', 'name email');
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog' });
  }
};

// Delete blog (only by author)
export const deleteBlog = async (req, res) => {
  try {
    const userId = req.user.userId;
    const blogId = req.params.id;
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Check if user is author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only delete your own blogs' 
      });
    }
    
    await Blog.findByIdAndDelete(blogId);
    
    res.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
};

// Publish/Unpublish blog
export const toggleBlogPublish = async (req, res) => {
  try {
    const userId = req.user.userId;
    const blogId = req.params.id;
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Check if user is author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only publish/unpublish your own blogs' 
      });
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { isPublished: !blog.isPublished },
      { new: true }
    ).populate('author', 'name email');
    
    res.json({
      success: true,
      message: `Blog ${updatedBlog.isPublished ? 'published' : 'unpublished'} successfully`,
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Toggle blog publish error:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog status' });
  }
};

// Delete comment (only by blog author)
export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const commentId = req.params.id;
    
    const comment = await Comment.findById(commentId).populate('blog', 'author');
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    
    // Check if user is the author of the blog
    if (comment.blog.author.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only delete comments on your own blogs' 
      });
    }
    
    await Comment.findByIdAndDelete(commentId);
    
    res.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete comment' });
  }
};
