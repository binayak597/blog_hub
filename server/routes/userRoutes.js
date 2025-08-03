import {Router} from 'express';
import { getMyProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', protect, getMyProfile);

export default router;
