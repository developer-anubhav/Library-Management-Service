import express from 'express';
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
  getAvailableBooks,
} from '../controllers/bookController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  createBookValidator,
  updateBookValidator,
  idValidator,
} from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.get('/', getAllBooks);
router.get('/available', getAvailableBooks);
router.get('/category/:category', getBooksByCategory);
router.get('/:id', idValidator, getBookById);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createBookValidator, addBook);
router.put('/:id', protect, authorize('admin'), updateBookValidator, updateBook);
router.delete('/:id', protect, authorize('admin'), idValidator, deleteBook);

export default router;
