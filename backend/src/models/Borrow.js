import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book is required'],
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    returnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['borrowed', 'returned', 'overdue'],
      default: 'borrowed',
    },
    fine: {
      type: Number,
      default: 0,
      min: [0, 'Fine cannot be negative'],
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot be more than 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
borrowSchema.index({ user: 1, status: 1 });
borrowSchema.index({ book: 1, status: 1 });

// Calculate fine for overdue books (0.50 per day)
borrowSchema.methods.calculateFine = function () {
  if (this.status === 'returned' || !this.dueDate) {
    return 0;
  }

  const today = new Date();
  const dueDate = new Date(this.dueDate);

  if (today > dueDate) {
    const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    this.fine = daysOverdue * 0.5;
    this.status = 'overdue';
  }

  return this.fine;
};

// Update status before saving
borrowSchema.pre('save', function (next) {
  if (this.returnDate) {
    this.status = 'returned';
  } else if (new Date() > this.dueDate) {
    this.status = 'overdue';
  }
  next();
});

const Borrow = mongoose.model('Borrow', borrowSchema);

export default Borrow;
