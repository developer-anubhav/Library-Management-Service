// Utility functions for the Library Management System

/**
 * Format a date string into a readable format.
 * Example: 2025-11-09 → "Nov 9, 2025"
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Validate an email address.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Generate a unique ID for books or users.
 */
export const generateId = (prefix = "id") => {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Trim text and append ellipsis if it exceeds a specific length.
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

/**
 * Sort an array of books alphabetically by title.
 */
export const sortBooksByTitle = (books = []) => {
  return [...books].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Filter books by keyword (title or author).
 */
export const filterBooks = (books = [], keyword = "") => {
  const lower = keyword.toLowerCase();
  return books.filter(
    (b) =>
      b.title.toLowerCase().includes(lower) ||
      b.author.toLowerCase().includes(lower)
  );
};

/**
 * Calculate overdue days given issue and due dates.
 */
export const getOverdueDays = (issueDate, dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  if (now <= due) return 0;
  const diffTime = Math.abs(now - due);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate total fine based on overdue days.
 * Default fine = ₹5 per day.
 */
export const calculateFine = (issueDate, dueDate, rate = 5) => {
  const overdueDays = getOverdueDays(issueDate, dueDate);
  return overdueDays * rate;
};