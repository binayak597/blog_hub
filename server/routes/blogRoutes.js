import { Router } from 'express';

import  {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

import { createBlogValidator, updateBlogValidator } from '../validators/blogValidator.js'

import {validateRequest} from '../middlewares/validateRequest.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, createBlogValidator, validateRequest, createBlog);
router.put('/:id', protect, updateBlogValidator, validateRequest, updateBlog);
router.delete('/:id', protect, deleteBlog);


export default router;
