import UserModel from "../models/User.js";
import BlogModel from "../models/Blog.js";

export const getUserWithBlogs = async (userId) => {
  const user = await UserModel.findById(userId).select('-password');
  const blogs = await BlogModel.find({ author: userId });
  return { user, blogs };
};

