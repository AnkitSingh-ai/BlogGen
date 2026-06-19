import express from 'express';
import { 
  userRegister, 
  userLogin, 
  getUserProfile, 
  updateUserProfile 
} from '../controller/userController.js';
import auth from '../Middleware/auth.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);

// Protected routes (require authentication)
userRouter.get('/profile', auth, getUserProfile);
userRouter.put('/profile', auth, updateUserProfile);

export default userRouter;
