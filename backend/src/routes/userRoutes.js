import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addUser,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  updateUserValidator,
  idValidator,
  registerValidator,
} from '../middleware/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);
router.post('/', authorize('admin'), registerValidator, addUser);
router.delete('/:id', authorize('admin'), idValidator, deleteUser);

// User can access their own profile, admin can access all
router.get('/:id', idValidator, getUserById);
router.put('/:id', updateUserValidator, updateUser);

export default router;
