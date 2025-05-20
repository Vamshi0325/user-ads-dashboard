"use client"

import { Settings, FileText, HelpCircle, Globe, BarChart2, DollarSign, LogOut, X } from "lucide-react"
import { useAuth } from "@/context/auth-context"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar({ activeTab, setActiveTab }) {
  const { logout, user } = useAuth()
  const { isMobileDevice, closeMobileSidebar, isCollapsed } = useSidebar()

  // Display name (use email if name is not available)
  const displayName = user?.name || user?.email?.split("@")[0] || "User"

  // Menu items without zone-related items
  const menuItems = [
    {
      id: "sites",
      title: "My Sites",
      icon: Globe,
    },
    {
      id: "statistics",
      title: "Statistics",
      icon: BarChart2,
    },
    {
      id: "payments",
      title: "Payments",
      icon: FileText,
    },
    {
      id: "withdrawal",
      title: "Withdrawal",
      icon: DollarSign,
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
    },
    {
      id: "help",
      title: "Help & Support",
      icon: HelpCircle,
    },
  ]

  return (
    <Sidebar className="border-r border-purple-800/40 bg-gradient-to-b from-purple-900/90 to-purple-950">
      <SidebarHeader className={isCollapsed ? "p-2" : "p-3 sm:p-4"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 sm:size-8 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md shadow-purple-900/40">
              <span className="font-bold text-white text-sm sm:text-base">P</span>
            </div>
            {!isCollapsed && (
              <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                PurpleDash
              </span>
            )}
          </div>

          {/* Add close button for mobile */}
          {isMobileDevice && (
            <button
              onClick={closeMobileSidebar}
              className="text-purple-300 hover:text-white p-1 rounded-full hover:bg-purple-800/30"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  if (isMobileDevice) closeMobileSidebar()
                }}
                className={`transition-all duration-200 text-xs sm:text-sm ${activeTab === item.id ? "bg-purple-700/50 text-white" : "hover:bg-purple-800/30"}`}
              >
                <item.icon className="size-4 sm:size-5" />
                {!isCollapsed && <span className="ml-3">{item.title}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className={isCollapsed ? "p-2" : "p-3 sm:p-4"}>
        {!isCollapsed && (
          <div className="mb-2 px-3 py-2 rounded-md bg-purple-800/20">
            <p className="text-xs text-purple-200 font-medium">Signed in as</p>
            <p className="text-sm text-white font-semibold truncate">{displayName}</p>
          </div>
        )}
        {isCollapsed && (
          <div className="mb-2 px-1 py-2 rounded-md bg-purple-800/20 flex justify-center">
            <p className="text-xs text-purple-200 font-medium text-center">
              Signed
              <br />
              in
            </p>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                logout()
                if (isMobileDevice) closeMobileSidebar()
              }}
              className="text-red-300 hover:bg-red-900/20 hover:text-red-200 text-xs sm:text-sm"
            >
              <LogOut className="size-4 sm:size-5" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
