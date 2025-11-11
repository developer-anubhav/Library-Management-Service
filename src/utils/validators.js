// Validation utilities for Library Management System

/**
 * Check if a string is non-empty after trimming.
 */
export const isNotEmpty = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Validate email format.
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate password strength.
 * Must contain at least 8 characters, one uppercase, one lowercase, one number.
 */
export const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

/**
 * Validate book data object before saving.
 */
export const isValidBook = (book) => {
  if (!book) return false;
  const { title, author, isbn } = book;
  return isNotEmpty(title) && isNotEmpty(author) && isValidISBN(isbn);
};

/**
 * Validate ISBN (basic 10 or 13 digit pattern).
 */
export const isValidISBN = (isbn) => {
  const regex = /^(?:\d{10}|\d{13})$/;
  return regex.test(isbn);
};

/**
 * Validate username.
 * Must be alphanumeric and 3–20 characters.
 */
export const isValidUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

/**
 * Validate user registration data.
 */
export const isValidUser = (user) => {
  if (!user) return false;
  const { name, email, password } = user;
  return (
    isNotEmpty(name) &&
    isValidEmail(email) &&
    isStrongPassword(password)
  );
};

/**
 * Validate issue/return transaction data.
 */
export const isValidTransaction = (transaction) => {
  if (!transaction) return false;
  const { userId, bookId, issueDate, dueDate } = transaction;
  return (
    isNotEmpty(userId) &&
    isNotEmpty(bookId) &&
    new Date(issueDate) instanceof Date &&
    new Date(dueDate) instanceof Date
  );
};