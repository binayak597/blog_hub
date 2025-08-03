
import * as blogRepo from '../repositories/blogRepository.js';

export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const blog = await blogRepo.createBlog({ title, content, author: req.user._id });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogRepo.getAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogRepo.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await blogRepo.getBlogByIdRaw(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedBlog = await blogRepo.updateBlogById(req.params.id, req.body);
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await blogRepo.getBlogByIdRaw(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blogRepo.deleteBlogById(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
