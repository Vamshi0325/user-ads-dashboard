"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupModal } from "@/components/auth/signup-modal"

// Create the auth context
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  showLoginModal: () => {},
  showSignupModal: () => {},
  logout: () => {},
})

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a token and user data in session storage
        const token = sessionStorage.getItem("auth_token")
        const userData = sessionStorage.getItem("user_data")

        if (token && userData) {
          // If we have both, consider the user authenticated
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
        // Clear potentially corrupted data
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("user_data")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Logout function
  const logout = () => {
    // Clear auth data
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("user_data")

    // Update state
    setUser(null)
    setIsAuthenticated(false)

    return { success: true }
  }

  // Modal control functions
  const showLoginModal = () => {
    setShowLogin(true)
    setShowSignup(false)
  }

  const showSignupModal = () => {
    setShowLogin(false)
    setShowSignup(true)
  }

  // Handle successful authentication (called from login/signup components)
  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setShowLogin(false)
    setShowSignup(false)
  }

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    showLoginModal,
    showSignupModal,
    logout,
    handleAuthSuccess,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false)
            // Check if we have a user after login attempt
            const userData = sessionStorage.getItem("user_data")
            if (userData) {
              handleAuthSuccess(JSON.parse(userData))
            }
          }}
          onSwitchToSignup={showSignupModal}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => {
            setShowSignup(false)
            // Check if we have a user after signup attempt
            const userData = sessionStorage.getItem("user_data")
            if (userData) {
              handleAuthSuccess(JSON.parse(userData))
            }
          }}
          onSwitchToLogin={showLoginModal}
        />
      )}
    </AuthContext.Provider>
  )
}
