import Blog from '../Models/Blog.js';
import imagekit from '../configs/imageKit.js';
import Fs from 'fs';
import main from '../configs/gemini.js'
import Comment from '../Models/Comment.js';

export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category } = req.body;
    const isPublished = req.body.isPublished === 'true';
    const imageFile = req.file;
if (!title || !description || !category || !imageFile) {
  return res.status(400).json({ message: 'Missing required Fields' });
}

    const fileBuffer = Fs.readFileSync(imageFile.path);

    // Upload the image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs',
    });

    // optimze the image URL
    const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [{
          width: 1280,
         
          quality: 'auto',
          format: 'webp',
        }],
    });

    const optimizedImage = optimizedImageUrl;

    await Blog.create({
      title,
      subtitle,
      description,
      image: optimizedImage,
      category,
      isPublished,
    })
    res.json({success: true, message: 'Blog added successfully'});
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.body.id;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

     await Comment.deleteMany({blog :blogId});

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }  
};

export const togglePublish = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    blog.isPublished = !blog.isPublished;
    await blog.save();
    
    res.json({ success: true, message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully` });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const {blog ,name ,content} = req.body;
    await Comment.create({
      blog,
      name,
      content,
    });
    res.json({ success: true, message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {

    const comments = await Comment.find().populate('blog').sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req,res)=>{
  try {
    const {prompt} = req.body;
    const content = await main (prompt + 'Generate a blog content for this topic in simple text format');
    res.json ({success :true , content})
  } catch (error){
      res.json({success :false ,message : error.message})
  }
}