"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

import { cn } from "@/lib/utils"

const SidebarContext = createContext({
  isCollapsed: false,
  toggleSidebar: () => {},
})

const useSidebar = () => useContext(SidebarContext)

// Replace the SidebarProvider component with this improved version
const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isMobileDevice = useMediaQuery("(max-width: 768px)")

  // Function to check if device is mobile
  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
      if (typeof window !== "undefined") {
        const media = window.matchMedia(query)
        const listener = () => setMatches(media.matches)

        // Set initial value
        setMatches(media.matches)

        // Listen for changes
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
      }
    }, [query])

    return matches
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !isMobileDevice) {
      setIsCollapsed(localStorage.getItem("sidebar-collapsed") === "true")
    }
  }, [isMobileDevice])

  // Close mobile sidebar when screen size changes to desktop
  useEffect(() => {
    if (!isMobileDevice) {
      setIsMobileOpen(false)
    }
  }, [isMobileDevice])

  const toggleSidebar = () => {
    if (isMobileDevice) {
      setIsMobileOpen(!isMobileOpen)
    } else {
      const newCollapsedState = !isCollapsed
      setIsCollapsed(newCollapsedState)
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar-collapsed", newCollapsedState.toString())
      }
    }
  }

  const value = {
    isCollapsed,
    isMobileOpen,
    isMobileDevice,
    toggleSidebar,
    closeMobileSidebar: () => setIsMobileOpen(false),
  }

  return (
    <SidebarContext.Provider value={value}>
      <div className="relative h-full md:grid md:grid-cols-[auto_1fr]">{children}</div>
    </SidebarContext.Provider>
  )
}

// Replace the Sidebar component with this improved version
const Sidebar = React.forwardRef(({ className, children, ...props }, ref) => {
  const { isCollapsed, isMobileOpen, isMobileDevice } = useSidebar()

  // For mobile, render a drawer that slides in
  if (isMobileDevice) {
    return (
      <aside
        ref={ref}
        data-state={isMobileOpen ? "open" : "closed"}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-secondary px-2 py-4 shadow-lg transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
        {...props}
      >
        {children}
        {/* Add overlay for mobile */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[-1]"
            onClick={() => useSidebar().closeMobileSidebar()}
            aria-hidden="true"
          />
        )}
      </aside>
    )
  }

  // For desktop, completely hide the sidebar when collapsed
  return (
    <aside
      ref={ref}
      data-state={isCollapsed ? "collapsed" : "expanded"}
      className={cn(
        "group/sidebar fixed left-0 top-0 flex h-full flex-col border-r bg-secondary transition-all duration-300 ease-in-out md:relative md:z-0",
        isCollapsed ? "-ml-64 w-0 opacity-0 pointer-events-none" : "ml-0 w-64 px-2 py-4 opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  )
})
Sidebar.displayName = "Sidebar"

// Define the SidebarInset component
const SidebarInset = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <main ref={ref} className={cn("flex-1 overflow-auto", className)} {...props}>
      {children}
    </main>
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col flex-1 space-y-2 p-6", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col space-y-1", className)} {...props} />
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative", className)} {...props} />
})
SidebarMenuItem.displayName = "SidebarMenuItem"

// Update the SidebarMenuButton component to handle collapsed state better
const SidebarMenuButton = React.forwardRef(({ className, isActive, ...props }, ref) => {
  const { isCollapsed } = useSidebar()
  return (
    <button
      ref={ref}
      className={cn(
        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:opacity-50 data-[active=true]:bg-secondary/50",
        className,
        isActive ? "bg-secondary/50" : "",
        isCollapsed ? "w-full justify-center px-0" : "w-full justify-start",
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

// Replace the SidebarRail component with this simplified version that doesn't render anything
const SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
  // Return null instead of the button to remove it completely
  return null
})
SidebarRail.displayName = "SidebarRail"

// Update the SidebarTrigger component
const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar, isMobileOpen, isMobileDevice } = useSidebar()
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={toggleSidebar}
      aria-expanded={isMobileDevice ? isMobileOpen : undefined}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="18" y2="18" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

// Export all components
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
}
