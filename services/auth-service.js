import axios from "axios"

// Create axios instance
const api = axios.create({
  baseURL: "/api", // This would be your API base URL in a real app
  headers: {
    "Content-Type": "application/json",
  },
})

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

// Mock login function (for development)
const mockLogin = async (email, password) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Always return success with mock data
  return {
    token: "mock_jwt_token_" + Math.random().toString(36).substring(2),
    user: {
      id: "user_" + Math.random().toString(36).substring(2),
      email,
      username: email.split("@")[0],
      role: "Publisher",
    },
  }
}

// Mock signup function (for development)
const mockSignup = async (userData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    token: "mock_jwt_token_" + Math.random().toString(36).substring(2),
    user: {
      id: "user_" + Math.random().toString(36).substring(2),
      ...userData,
    },
  }
}

// Auth service with real and mock implementations
export const authService = {
  // Login
  login: async (email, password) => {
    try {
      // In a real app, you would use the API call:
      // const response = await api.post("/auth/login", { email, password })
      // return response.data

      // For now, use the mock implementation
      return await mockLogin(email, password)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Signup
  signup: async (userData) => {
    try {
      // In a real app, you would use the API call:
      // const response = await api.post("/auth/signup", userData)
      // return response.data

      // For now, use the mock implementation
      return await mockSignup(userData)
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me")
      return response.data
    } catch (error) {
      console.error("Get current user error:", error)
      throw error
    }
  },
}
