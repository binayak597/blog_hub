import BlogModel from "../models/Blog.js";

export const getAllBlogs = async () => {
  return await BlogModel.find().populate('author', 'name email');
};

export const getBlogById = async (id) => {
  return await BlogModel.findById(id).populate('author', 'name email');
};

export const createBlog = async (data) => {
  const blog = await BlogModel.create(data);
  return await BlogModel.findById(blog._id).populate('author', 'name email');
};


export const updateBlogById = async (id, data) => {
  return await BlogModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteBlogById = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};

export const getBlogByIdRaw = async (id) => {
  return await BlogModel.findById(id);
};
