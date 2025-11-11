// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Generic request handler for API calls.
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = { "Content-Type": "application/json" };

  try {
    const response = await fetch(url, { headers: defaultHeaders, ...options });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};