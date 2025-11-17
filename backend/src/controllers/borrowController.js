import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';
import User from '../models/User.js';
import { successResponse, calculateDueDate } from '../utils/helpers.js';

// @desc    Borrow a book
// @route   POST /api/borrow
// @access  Private
export const borrowBook = async (req, res, next) => {
  try {
    const { bookId, userId, dueDate } = req.body;

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book is not available for borrowing',
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user already has this book borrowed
    const existingBorrow = await Borrow.findOne({
      user: userId,
      book: bookId,
      status: { $in: ['borrowed', 'overdue'] },
    });

    if (existingBorrow) {
      return res.status(400).json({
        success: false,
        message: 'You have already borrowed this book',
      });
    }

    // Create borrow record
    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      dueDate: dueDate || calculateDueDate(30),
    });

    // Update book available copies
    book.availableCopies -= 1;
    await book.save();

    // Add to user's borrowed books
    user.borrowedBooks.push(borrow._id);
    await user.save();

    // Populate the response
    await borrow.populate('book user');

    successResponse(res, 201, { borrow }, 'Book borrowed successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Return a book
// @route   PUT /api/borrow/:id/return
// @access  Private
export const returnBook = async (req, res, next) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate('book user');

    if (!borrow) {
      return res.status(404).json({
        success: false,
        message: 'Borrow record not found',
      });
    }

    if (borrow.status === 'returned') {
      return res.status(400).json({
        success: false,
        message: 'Book has already been returned',
      });
    }

    // Calculate fine if overdue
    borrow.calculateFine();

    // Update borrow record
    borrow.returnDate = new Date();
    borrow.status = 'returned';
    await borrow.save();

    // Update book available copies
    const book = await Book.findById(borrow.book._id);
    book.availableCopies += 1;
    await book.save();

    // Remove from user's borrowed books
    const user = await User.findById(borrow.user._id);
    user.borrowedBooks = user.borrowedBooks.filter(
      (id) => id.toString() !== borrow._id.toString()
    );
    await user.save();

    successResponse(res, 200, { borrow }, 'Book returned successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's borrowed books
// @route   GET /api/borrow/user/:userId
// @access  Private
export const getUserBorrowedBooks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    // Users can only view their own borrowed books unless they're admin
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this information',
      });
    }

    const query = { user: userId };
    if (status) {
      query.status = status;
    }

    const borrows = await Borrow.find(query)
      .populate('book')
      .sort({ borrowDate: -1 });

    // Calculate fines for overdue books
    borrows.forEach((borrow) => {
      if (borrow.status !== 'returned') {
        borrow.calculateFine();
      }
    });

    successResponse(res, 200, { borrows }, 'Borrowed books retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get all borrow records (Admin)
// @route   GET /api/borrow
// @access  Private/Admin
export const getAllBorrows = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const borrows = await Borrow.find(query)
      .populate('book user')
      .sort({ borrowDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Borrow.countDocuments(query);

    successResponse(
      res,
      200,
      {
        borrows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalBorrows: count,
      },
      'Borrow records retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get overdue books
// @route   GET /api/borrow/overdue
// @access  Private/Admin
export const getOverdueBooks = async (req, res, next) => {
  try {
    const borrows = await Borrow.find({
      status: { $in: ['borrowed', 'overdue'] },
      dueDate: { $lt: new Date() },
    })
      .populate('book user')
      .sort({ dueDate: 1 });

    // Calculate fines
    borrows.forEach((borrow) => {
      borrow.calculateFine();
      borrow.save();
    });

    successResponse(res, 200, { borrows }, 'Overdue books retrieved successfully');
  } catch (error) {
    next(error);
  }
};
