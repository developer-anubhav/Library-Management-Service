// src/services/bookService.js
import { apiRequest } from "./api";

export const getAllBooks = async () => {
  return apiRequest("/books", { method: "GET" });
};

export const getBookById = async (id) => {
  return apiRequest(`/books/${id}`, { method: "GET" });
};

export const addBook = async (bookData) => {
  return apiRequest("/books", {
    method: "POST",
    body: JSON.stringify(bookData),
  });
};

export const updateBook = async (id, updatedData) => {
  return apiRequest(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
};

export const deleteBook = async (id) => {
  return apiRequest(`/books/${id}`, { method: "DELETE" });
};