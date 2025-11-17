import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a book title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      trim: true,
      maxlength: [100, 'Author name cannot be more than 100 characters'],
    },
    isbn: {
      type: String,
      required: [true, 'Please provide an ISBN'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
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
      ],
    },
    publishedYear: {
      type: Number,
      required: [true, 'Please provide published year'],
      min: [1000, 'Invalid year'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    publisher: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      default: 'English',
      trim: true,
    },
    pages: {
      type: Number,
      min: [1, 'Pages must be at least 1'],
    },
    description: {
      type: String,
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    coverImage: {
      type: String,
      default: null,
    },
    totalCopies: {
      type: Number,
      required: [true, 'Please provide total copies'],
      min: [1, 'Total copies must be at least 1'],
      default: 1,
    },
    availableCopies: {
      type: Number,
      required: [true, 'Please provide available copies'],
      min: [0, 'Available copies cannot be negative'],
      default: 1,
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be between 0 and 5'],
      max: [5, 'Rating must be between 0 and 5'],
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

// Validate that available copies don't exceed total copies
bookSchema.pre('save', function (next) {
  if (this.availableCopies > this.totalCopies) {
    next(new Error('Available copies cannot exceed total copies'));
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
