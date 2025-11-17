import Book from '../models/Book.js';
import { successResponse } from '../utils/helpers.js';

// @desc    Get all books with pagination, search, and filters
// @route   GET /api/books
// @access  Public
export const getAllBooks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category,
      sortBy = 'title',
      order = 'asc',
    } = req.query;

    // Build query
    const query = { isActive: true };

    // Search by title, author, or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    // Execute query with pagination
    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const count = await Book.countDocuments(query);

    successResponse(
      res,
      200,
      {
        books,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalBooks: count,
      },
      'Books retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    successResponse(res, 200, { book }, 'Book retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Add new book
// @route   POST /api/books
// @access  Private/Admin
export const addBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    successResponse(res, 201, { book }, 'Book added successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    successResponse(res, 200, { book }, 'Book updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Soft delete - set isActive to false
    book.isActive = false;
    await book.save();

    successResponse(res, 200, null, 'Book deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get books by category
// @route   GET /api/books/category/:category
// @access  Public
export const getBooksByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const books = await Book.find({ category, isActive: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments({ category, isActive: true });

    successResponse(
      res,
      200,
      {
        books,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalBooks: count,
      },
      'Books retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get available books
// @route   GET /api/books/available
// @access  Public
export const getAvailableBooks = async (req, res, next) => {
  try {
    const books = await Book.find({
      isActive: true,
      availableCopies: { $gt: 0 },
    });

    successResponse(res, 200, { books }, 'Available books retrieved successfully');
  } catch (error) {
    next(error);
  }
};
