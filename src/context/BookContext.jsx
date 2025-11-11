/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllBooks,
  addBook,
  deleteBook,
  updateBook,
  getBookById,
} from "../services/bookService";

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookById = async (id) => {
    try {
      return await getBookById(id);
    } catch (error) {
      console.error("Error fetching book:", error);
      return null;
    }
  };

  const createBook = async (bookData) => {
    try {
      const newBook = await addBook(bookData);
      setBooks((prev) => [...prev, newBook]);
      return { success: true };
    } catch (error) {
      console.error("Error adding book:", error);
      return { success: false, message: error.message };
    }
  };

  const editBook = async (id, updatedData) => {
    try {
      const updatedBook = await updateBook(id, updatedData);
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? updatedBook : b))
      );
      return { success: true };
    } catch (error) {
      console.error("Error updating book:", error);
      return { success: false, message: error.message };
    }
  };

  const removeBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting book:", error);
      return { success: false, message: error.message };
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        fetchBooks,
        fetchBookById,
        createBook,
        editBook,
        removeBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks must be used within a BookProvider");
  return context;
};