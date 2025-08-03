import * as userRepo from '../repositories/userRespository.js'

export const getMyProfile = async (req, res, next) => {
  try {
    const { user, blogs } = await userRepo.getUserWithBlogs(req.user._id);
    res.status(200).json({
      name: user.name,
      email: user.email,
      posts: blogs
    });
  } catch (err) {
    next(err);
  }
};
