"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "./app-sidebar"
import { Header } from "./header"
import { DashboardContent } from "./dashboard-content"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "react-hot-toast"

// Update the DashboardInner component to pass setActiveTab to DashboardContent
const DashboardInner = ({ activeTab, setActiveTab }) => {
  // Check for redirect request from localStorage
  useEffect(() => {
    const redirectToTab = localStorage.getItem("redirectToTab")
    if (redirectToTab) {
      setActiveTab(redirectToTab)
      localStorage.removeItem("redirectToTab")
    }
  }, [setActiveTab])

  return (
    <>
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarInset className="bg-transparent overflow-x-hidden flex flex-col h-screen">
        <Header activeTab={activeTab} />
        <DashboardContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </SidebarInset>
    </>
  )
}

export function Dashboard() {
  // Update the default active tab to "sites" since we removed "dashboard"
  const [activeTab, setActiveTab] = useState("sites")

  return (
    <SidebarProvider>
      <Toaster position="top-right" />
      <DashboardInner activeTab={activeTab} setActiveTab={setActiveTab} />
    </SidebarProvider>
  )
}
