"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

export function Header({ activeTab }) {
  // Convert activeTab to a more readable format
  const pageTitle = activeTab.charAt(0).toUpperCase() + activeTab.slice(1)

  // Get user from auth context
  const { user } = useAuth()

  // Display name (use email if name is not available)
  const displayName = user?.name || user?.email?.split("@")[0] || "User"

  return (
    <header className="sticky top-0 z-30 border-b border-purple-800/40 p-2 sm:p-3 md:p-4 flex items-center justify-between bg-gradient-to-r from-purple-900/70 to-purple-950/70 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-purple-300 hover:text-white h-8 w-8 sm:h-9 sm:w-9" />

        {/* Logo for mobile only */}
        <div className="flex items-center md:hidden">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-600 rounded flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-white font-semibold text-sm sm:text-lg">PurpleDash</span>
            </div>
          </Link>
        </div>

        {/* Page title - visible on desktop screens only */}
        <h2 className="hidden md:block text-base sm:text-lg font-semibold text-white">{pageTitle}</h2>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-purple-100 hover:text-white hover:bg-purple-800/50 rounded-full flex items-center gap-1.5 px-3 py-1.5"
        >
          <User className="h-4 w-4" />
          <span className="hidden xs:inline text-sm font-medium">{displayName}</span>
        </Button>
      </div>
    </header>
  )
}
