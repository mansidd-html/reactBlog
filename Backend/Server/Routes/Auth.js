import express from 'express';
const router = express.Router();
import '../Models/database.js';
import {registerUser,loginUser} from '../Controllers/authController.js';

/**
 * Auth Routes
 */
router.post('/register',registerUser);
router.post('/login',loginUser);

export default router;
