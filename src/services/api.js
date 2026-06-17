import axios from "axios";
import { API_BASE as HTTP_API_BASE } from "./http.js";

const BASE_HOST = (import.meta.env.VITE_API_BASE_URL || HTTP_API_BASE || "http://localhost:8000").replace(/\/$/, "");
const API_ROOT = `${BASE_HOST}/api`;

const api = axios.create({
  baseURL: API_ROOT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      // Server responded with error
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      // Request was made but no response
      console.error("No response received:", error.request);
    } else {
      // Something else happened
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_ROOT as API_URL, BASE_HOST as API_HOST };
