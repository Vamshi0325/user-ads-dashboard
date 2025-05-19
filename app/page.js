"use client"

import { Dashboard } from "@/components/dashboard"
import { AuthProvider, useAuth } from "@/context/auth-context"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

// Auth wrapper component
function AuthWrapper() {
  const { isAuthenticated, isLoading, showLoginModal } = useAuth()

  // Show login modal if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      showLoginModal()
    }
  }, [isLoading, isAuthenticated, showLoginModal])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950/95 via-purple-950 to-purple-900/90">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl text-purple-100 font-medium">Loading...</h2>
        </div>
      </div>
    )
  }

  // Render dashboard only if authenticated
  return isAuthenticated ? <Dashboard /> : null
}

// Main page component
export default function Home() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  )
}
