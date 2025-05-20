import api from "./api"
import toast from "react-hot-toast"

// Authentication API handlers
export const authHandlers = {
  // Login handler
  login: async (email, password) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Create mock response data
      const token = "mock_jwt_token_" + Math.random().toString(36).substring(2)
      const user = {
        id: "user_" + Math.random().toString(36).substring(2),
        email,
        username: email.split("@")[0],
        role: "Publisher",
      }

      // Store auth data
      sessionStorage.setItem("auth_token", token)
      sessionStorage.setItem("user_data", JSON.stringify(user))

      // Show success message
      toast.success("Login successful!")

      return { success: true, user }
    } catch (error) {
      // This should never happen now, but keep for safety
      console.error("Login error:", error)
      toast.error("An unexpected error occurred")

      return { success: false, error: "An unexpected error occurred" }
    }
  },

  // Signup handler
  signup: async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData)

      // Store auth data
      const { token, user } = response.data
      sessionStorage.setItem("auth_token", token)
      sessionStorage.setItem("user_data", JSON.stringify(user))

      // Show success message
      toast.success("Account created successfully!")

      return { success: true, user }
    } catch (error) {
      // Handle error
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again."
      toast.error(errorMessage)

      return { success: false, error: errorMessage }
    }
  },

  // Logout handler
  logout: () => {
    // Clear auth data
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("user_data")

    // Show success message
    toast.success("Logged out successfully")

    return { success: true }
  },

  // Get current user handler
  getCurrentUser: async () => {
    try {
      // First try to get from session storage
      const userData = sessionStorage.getItem("user_data")
      if (userData) {
        return { success: true, user: JSON.parse(userData) }
      }

      // If not in session storage, fetch from API
      const response = await api.get("/auth/me")
      return { success: true, user: response.data }
    } catch (error) {
      return { success: false, error: "Failed to get user data" }
    }
  },
}

// Export other API handlers as needed
export const userHandlers = {
  // User-related API handlers
}

export const siteHandlers = {
  // Site-related API handlers
}
