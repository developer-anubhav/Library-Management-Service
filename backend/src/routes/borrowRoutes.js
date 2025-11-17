import express from 'express';
import {
  borrowBook,
  returnBook,
  getUserBorrowedBooks,
  getAllBorrows,
  getOverdueBooks,
} from '../controllers/borrowController.js';
import { protect, authorize } from '../middleware/auth.js';
import { borrowBookValidator, idValidator } from '../middleware/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// User routes
router.post('/', borrowBookValidator, borrowBook);
router.put('/:id/return', idValidator, returnBook);
router.get('/user/:userId', getUserBorrowedBooks);

// Admin routes
router.get('/', authorize('admin'), getAllBorrows);
router.get('/overdue', authorize('admin'), getOverdueBooks);

export default router;
