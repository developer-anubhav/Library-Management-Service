// src/services/userService.js
import { apiRequest } from "./api";

export const getAllUsers = async () => {
  return apiRequest("/users", { method: "GET" });
};

export const getUserById = async (id) => {
  return apiRequest(`/users/${id}`, { method: "GET" });
};

export const addUser = async (userData) => {
  return apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const updateUser = async (id, updatedData) => {
  return apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
};

export const deleteUser = async (id) => {
  return apiRequest(`/users/${id}`, { method: "DELETE" });
};