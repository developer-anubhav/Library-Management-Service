import { body, param, query, validationResult } from 'express-validator';

// Validation result handler
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Auth validators
export const registerValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validate,
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// Book validators
export const createBookValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 100 })
    .withMessage('Author name cannot exceed 100 characters'),
  body('isbn').trim().notEmpty().withMessage('ISBN is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Fiction',
      'Non-Fiction',
      'Science',
      'History',
      'Technology',
      'Fantasy',
      'Mystery',
      'Romance',
      'Biography',
      'Self-Help',
      'Children',
      'Other',
    ])
    .withMessage('Invalid category'),
  body('publishedYear')
    .notEmpty()
    .withMessage('Published year is required')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Invalid published year'),
  body('totalCopies')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Total copies must be at least 1'),
  body('availableCopies')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Available copies cannot be negative'),
  validate,
];

export const updateBookValidator = [
  param('id').isMongoId().withMessage('Invalid book ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('author')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Author name cannot exceed 100 characters'),
  body('category')
    .optional()
    .isIn([
      'Fiction',
      'Non-Fiction',
      'Science',
      'History',
      'Technology',
      'Fantasy',
      'Mystery',
      'Romance',
      'Biography',
      'Self-Help',
      'Children',
      'Other',
    ])
    .withMessage('Invalid category'),
  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Invalid published year'),
  validate,
];

// User validators
export const updateUserValidator = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  validate,
];

// Borrow validators
export const borrowBookValidator = [
  body('bookId').notEmpty().withMessage('Book ID is required').isMongoId().withMessage('Invalid book ID'),
  body('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid user ID'),
  body('dueDate').optional().isISO8601().withMessage('Invalid due date format'),
  validate,
];

// ID param validator
export const idValidator = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  validate,
];
