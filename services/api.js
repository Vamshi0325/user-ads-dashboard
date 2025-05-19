import axios from "axios"

// Create a base axios instance with common configuration
const api = axios.create({
  baseURL: "http://localhost:3002/api", // Your specific API base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
})

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: "/User/login",
  SIGNUP: "/User/signup",
  GET_USER: "/User/me", // Assuming there's a me endpoint, adjust if needed
}

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors like 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Clear auth data and redirect to login
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("user_data")
      window.location.href = "/"
    }
    return Promise.reject(error)
  },
)

// Export the configured axios instance
export default api
