import express from 'express';
const router = express.Router();
import '../Models/database.js';
import {updateUser,deleteUser,getUser} from '../Controllers/userController.js';

/**
 * User Routes
 */

router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/:id',getUser);
// router.get('/',getAllUser);

export default router;