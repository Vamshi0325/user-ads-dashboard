"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"

export function LoginModal({ onClose, onSwitchToSignup, initialEmail = "" }) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Update email when initialEmail prop changes
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail)
    }
  }, [initialEmail])

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
      <DialogContent
        className="bg-gradient-to-br from-indigo-900 to-purple-950 border border-indigo-700/30 text-purple-100 w-[440px] max-w-[90%] sm:max-w-[440px] rounded-xl p-0 overflow-hidden shadow-xl"
        onPointerDownOutside={(e) => {
          // Prevent the event from closing the dialog when clicking outside
          e.preventDefault()
        }}
      >
        {/* Add a visually hidden DialogTitle for accessibility */}
        <DialogTitle className="sr-only">Login</DialogTitle>
        {/* Toggle buttons at the top */}
        <div className="bg-gradient-to-r from-indigo-950 to-purple-950 border-b border-indigo-700/30 p-4">
          <div className="flex justify-center">
            <div className="inline-flex rounded-md p-1 bg-indigo-800/30 border border-indigo-700/30 shadow-inner">
              <button
                type="button"
                className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium text-sm shadow-md transition-all"
                disabled={true}
              >
                Login
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  onSwitchToSignup()
                }}
                className="px-6 py-2 rounded-md text-purple-300 hover:text-white hover:bg-purple-800/50 font-medium text-sm transition-all"
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-purple-300 text-sm">Enter your credentials to access your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-200 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200 flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-indigo-900/40 border-indigo-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-indigo-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-purple-200 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-400" />
                  <span>Password</span>
                </Label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-indigo-900/40 border-indigo-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-indigo-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-medium rounded-lg py-2.5 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
