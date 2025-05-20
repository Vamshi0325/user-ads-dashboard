"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, User, Mail, Lock, Shield, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"

export function SignupModal({ onClose, onSwitchToLogin, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Publisher",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Create mock response data
      const token = "mock_jwt_token_" + Math.random().toString(36).substring(2)
      const user = {
        id: "user_" + Math.random().toString(36).substring(2),
        ...formData,
      }

      // Show success message
      toast.success("Account created successfully! Please login.")

      // Call the onSignupSuccess callback with the email
      if (onSignupSuccess) {
        onSignupSuccess(formData.email)
      }
    } catch (err) {
      // This should never happen now, but keep for safety
      console.error("Signup error:", err)
      setError("An unexpected error occurred")
      toast.error("Signup failed")
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
        <DialogTitle className="sr-only">Sign Up</DialogTitle>

        {/* Toggle buttons at the top */}
        <div className="bg-gradient-to-r from-indigo-950 to-purple-950 border-b border-indigo-700/30 p-4">
          <div className="flex justify-center">
            <div className="inline-flex rounded-md p-1 bg-indigo-800/30 border border-indigo-700/30 shadow-inner">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="px-6 py-2 rounded-md text-purple-300 hover:text-white hover:bg-purple-800/50 font-medium text-sm transition-all"
                disabled={isLoading}
              >
                Login
              </button>
              <button
                type="button"
                className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium text-sm shadow-md transition-all"
                disabled={true}
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
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-purple-300 text-sm">Join us today and get access to all features</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-purple-200 flex items-center gap-2">
                <User className="h-4 w-4 text-purple-400" />
                <span>Username</span>
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                className="bg-indigo-900/40 border-indigo-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-indigo-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200 flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-indigo-900/40 border-indigo-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-indigo-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200 flex items-center gap-2">
                <Lock className="h-4 w-4 text-purple-400" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-indigo-900/40 border-indigo-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-indigo-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-purple-200 flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>Role</span>
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange} disabled={isLoading}>
                <SelectTrigger
                  id="role"
                  className="bg-indigo-900/40 border-indigo-700/30 text-purple-100 focus-visible:ring-indigo-500 rounded-lg"
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-indigo-900 border-indigo-700/50 text-purple-100 rounded-lg">
                  <SelectItem value="Publisher">Publisher</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
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
