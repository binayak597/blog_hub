import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';

import { connectDB } from './config/dbConfig.js';
import { errorHandler } from './middlewares/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';


connectDB();

export const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// global error handler
app.use(errorHandler);

