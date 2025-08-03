import {Router} from 'express';

const router = Router();

import { registerUser, loginUser} from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/logout', logoutUser); 

export default router;
