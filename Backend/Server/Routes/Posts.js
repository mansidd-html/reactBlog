import express from 'express';
const router = express.Router();
import '../Models/database.js';
import {createPost, deletePost, getAllPost, getPost, updatePost} from '../Controllers/postController.js';
/**
 * Post Routes
 */
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.get('/:id',getPost);
router.get('/',getAllPost);

export default router;