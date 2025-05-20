"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { Edit, Save, Trash2, User, Bell, Shield, Key } from "lucide-react"

export function SettingsTab() {
  const [isMobile, setIsMobile] = useState(false)

  // Sample API keys data
  const apiKeysData = [
    { id: "key_1", name: "Production API Key", created: "01.01.2024", lastUsed: "15.04.2024", status: "Active" },
    { id: "key_2", name: "Development API Key", created: "15.02.2024", lastUsed: "14.04.2024", status: "Active" },
    { id: "key_3", name: "Testing API Key", created: "10.03.2024", lastUsed: "10.04.2024", status: "Inactive" },
  ]

  const [apiKeys, setApiKeys] = useState(apiKeysData)

  // Check if mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-white">Settings</h1>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-purple-100 flex items-center gap-2">
                  <User className="h-5 w-5" /> Profile Settings
                </CardTitle>
                <CardDescription className="text-purple-300">Manage your account information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-200">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="John Doe"
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">
                Email
              </Label>
              <Input
                id="email"
                defaultValue="john@example.com"
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 border-none">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-purple-100 flex items-center gap-2">
                  <Bell className="h-5 w-5" /> Notification Settings
                </CardTitle>
                <CardDescription className="text-purple-300">Manage your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Email Notifications", "Push Notifications", "SMS Alerts", "Weekly Digest"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-800/20 transition-colors"
              >
                <Label htmlFor={item.toLowerCase().replace(/\s+/g, "-")} className="text-purple-200">
                  {item}
                </Label>
                <Switch id={item.toLowerCase().replace(/\s+/g, "-")} defaultChecked={true} />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 border-none">
              <Save className="mr-2 h-4 w-4" /> Save Preferences
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* API Keys Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-purple-100 flex items-center gap-2">
                <Key className="h-5 w-5" /> API Keys
              </CardTitle>
              <CardDescription className="text-purple-300">Manage your API keys for integration</CardDescription>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">Generate New API Key</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isMobile ? (
            // Mobile card view
            <div className="divide-y divide-purple-800/30">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-3 sm:p-4 hover:bg-purple-800/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-purple-100 text-sm sm:text-base">{key.name}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${
                        key.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {key.status}
                    </span>
                  </div>
                  <div className="text-xs text-purple-400 space-y-1 mb-3">
                    <div className="flex justify-between">
                      <span>ID:</span>
                      <span className="text-purple-100">{key.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span className="text-purple-100">{key.created}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Used:</span>
                      <span className="text-purple-100">{key.lastUsed}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 flex-1 text-xs sm:text-sm"
                    >
                      <Edit className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 flex-1 text-xs sm:text-sm"
                    >
                      <Trash2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop table view with improved responsiveness
            <div className="w-full overflow-x-auto scrollbar-hide">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium text-purple-100">{key.name}</TableCell>
                      <TableCell className="text-purple-100">{key.id}</TableCell>
                      <TableCell className="text-purple-100">{key.created}</TableCell>
                      <TableCell className="text-purple-100">{key.lastUsed}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            key.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {key.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                          >
                            <Edit className="mr-1 h-4 w-4" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                          >
                            <Trash2 className="mr-1 h-4 w-4" /> Revoke
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-purple-100 flex items-center gap-2">
            <Shield className="h-5 w-5" /> Security Settings
          </CardTitle>
          <CardDescription className="text-purple-300">Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-purple-200">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-purple-200">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-purple-200">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
            />
          </div>
          <div className="pt-2">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 border-none">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
