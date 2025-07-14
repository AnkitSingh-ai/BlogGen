import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required :true
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});
// Create a model for the blog schema

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
