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

//cors configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],   
  credentials: true,                           
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// global error handler
app.use(errorHandler);

