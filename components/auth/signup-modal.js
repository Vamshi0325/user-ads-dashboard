"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"

// Update imports
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"

export function SignupModal({ onClose, onSwitchToLogin }) {
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

      // Store auth data
      sessionStorage.setItem("auth_token", token)
      sessionStorage.setItem("user_data", JSON.stringify(user))

      // Show success message
      toast.success("Account created successfully!")

      // Close the modal
      onClose()
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
      <DialogContent className="bg-gradient-to-br from-purple-900/90 to-purple-950 border border-purple-800/40 text-purple-100 w-[440px] max-w-[90%] sm:max-w-[440px] rounded-xl p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold text-white text-center">Create an Account</DialogTitle>
          </DialogHeader>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-purple-200">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500 rounded-lg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-purple-200">
                Role
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange} disabled={isLoading}>
                <SelectTrigger
                  id="role"
                  className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500 rounded-lg"
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100 rounded-lg">
                  <SelectItem value="Publisher">Publisher</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-lg py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-purple-300">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 font-medium"
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
