"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"

export function LoginModal({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation - just make sure fields aren't empty
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate a brief loading state
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create a mock token and user
      const token = "mock_token_" + Math.random().toString(36).substring(2)
      const user = {
        id: "user_" + Math.random().toString(36).substring(2),
        email: email,
        username: email.split("@")[0],
        role: "Publisher",
      }

      // Store auth data
      sessionStorage.setItem("auth_token", token)
      sessionStorage.setItem("user_data", JSON.stringify(user))

      // Show success message
      toast.success("Login successful!")

      // Close the modal
      onClose()
    } catch (err) {
      // This should never happen now, but keep for safety
      console.error("Login error:", err)
      setError("An unexpected error occurred")
      toast.error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-900/90 to-purple-950 border border-purple-800/40 text-purple-100 w-[440px] max-w-[90%] sm:max-w-[440px] rounded-xl p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold text-white text-center">Login to Dashboard</DialogTitle>
          </DialogHeader>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-purple-200">
                  Password
                </Label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-lg py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-purple-300">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-purple-400 hover:text-purple-300 font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
