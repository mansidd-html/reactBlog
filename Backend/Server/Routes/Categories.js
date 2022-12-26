import express from 'express';
const router = express.Router();
import '../Models/database.js';
import {createCategory, getAllCategory} from '../Controllers/categoryController.js';

/**
 * Category Routes
 */
router.post('/',createCategory);
router.get('/',getAllCategory);

export default router;
