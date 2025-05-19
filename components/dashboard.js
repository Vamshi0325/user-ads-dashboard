"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { DashboardContent } from "./dashboard-content"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "react-hot-toast"

// Main Dashboard component
export function Dashboard() {
  // Update the default active tab to "sites" since we removed "dashboard"
  const [activeTab, setActiveTab] = useState("sites")

  return (
    <SidebarProvider>
      <Toaster position="top-right" />
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <DashboardContent activeTab={activeTab} />
    </SidebarProvider>
  )
}
