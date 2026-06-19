import jwt from 'jsonwebtoken';
import Blog from '../Models/Blog.js';
import Comment from '../Models/Comment.js';


// After successful login (e.g., in your login handler or context

// Admin login controller
export const adminLogin = async (req, res) => {
    try {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET , {expiresIn :'1d'});
    // After login, when you receive the token from backend:
    return res.json({success :true , token });
  }
    } catch (error) {
   
  return res.status(401).json({ success:false ,  message: 'Invalid credentials' });
}
};

export const adminLogout = async (req, res) => {
  // If you want to blacklist tokens, add logic here
  res.json({ success: true, message: 'Logged out successfully' });
};

export const getAllBlogsAdmin = async (req, res) => {
  try { 
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('blog').sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}


// Example controller for /api/admin/dashboard
export const getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const comments = await Comment.find();
    const drafts = await Blog.find({ isPublished: false });
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      dashboard: {
        blogs: blogs.length,
        comments: comments.length,
        drafts: drafts.length,
        recentBlogs,
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req ,res)=>{
  try{
    const {id} = req.body;
    await Comment.findByIdAndUpdate(id, {isApproved:true});
    res.json({success:true ,message :"Comment Approved"})
  } catch(error){
    res.json({success :false, message: error.message})
  }
}
