import * as authRepo from '../repositories/authRepository.js'
import { generateToken } from '../utils/generateToken.js';


export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await authRepo.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await authRepo.createUser({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authRepo.findUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

