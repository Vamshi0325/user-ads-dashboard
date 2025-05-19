"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"

export function AddSiteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    appName: "",
    telegramWebAppLink: "",
    webAppUrl: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the form submission, like sending data to an API
    console.log("Form submitted:", formData)
    // Reset form and close modal
    setFormData({
      appName: "",
      telegramWebAppLink: "",
      webAppUrl: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-900/90 to-purple-950 border border-purple-800/40 text-purple-100">
        <DialogHeader className="border-b border-purple-800/40 pb-4">
          <DialogTitle className="text-lg font-medium text-white">Create App</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          {/* App Name */}
          <div className="space-y-1">
            <label htmlFor="appName" className="block text-sm font-medium text-purple-200">
              App Name
            </label>
            <div className="relative">
              <Input
                id="appName"
                name="appName"
                value={formData.appName}
                onChange={handleChange}
                placeholder="App Name"
                maxLength={200}
                className="w-full bg-purple-950/70 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500"
              />
              <div className="absolute right-3 top-2.5 text-xs text-purple-400">{formData.appName.length} / 200</div>
            </div>
          </div>

          {/* Telegram Web App Link */}
          <div className="space-y-1">
            <label htmlFor="telegramWebAppLink" className="block text-sm font-medium text-purple-200">
              Telegram Web App Link
            </label>
            <Input
              id="telegramWebAppLink"
              name="telegramWebAppLink"
              value={formData.telegramWebAppLink}
              onChange={handleChange}
              placeholder="https://t.me/bot/web_app"
              className="w-full bg-purple-950/70 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500"
            />
          </div>

          {/* Web App URL */}
          <div className="space-y-1">
            <label htmlFor="webAppUrl" className="block text-sm font-medium text-purple-200">
              Web App URL
            </label>
            <Input
              id="webAppUrl"
              name="webAppUrl"
              value={formData.webAppUrl}
              onChange={handleChange}
              placeholder="https://"
              className="w-full bg-purple-950/70 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500"
            />
            <p className="text-xs text-purple-400 mt-1">The URL of the site that is used in the Telegram web app</p>
          </div>

          {/* Submit Button */}
        </form>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 mr-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
