"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus, ChevronDown, BarChart2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Update the SiteDetail component to match the shared image layout
export function SiteDetail({ site, onBack }) {
  // Add state for zones with more detailed data
  const [zones, setZones] = useState(
    [
      {
        id: "8594527",
        title: "Rewarded popup for 81399...",
        type: "Direct link",
        status: "Active",
        created: "02.12.2024",
      },
      {
        id: "8593536",
        title: "Rewarded popup for 8416...",
        type: "Direct link",
        status: "Active",
        created: "02.12.2024",
      },
      {
        id: "8416492",
        title: "stringgames.io_second pla...",
        type: "Rewarded Interstitial",
        status: "Active",
        created: "25.10.2024",
      },
      {
        id: "8139969",
        title: "stringgames.io_telegram",
        type: "Rewarded Interstitial",
        status: "Active",
        created: "23.09.2024",
      },
    ].slice(0, site.zones),
  )

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Site header - updated to match the image */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">{site.title}</h1>
          <p className="text-sm">
            <span className="text-green-500 mr-2">Verified</span>
            <span className="text-purple-300">Created {site.created}</span>
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add zone
        </Button>
      </div>

      {/* Zones section - updated to match the image */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">{zones.length} zones</h2>

        {/* Filter inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className="text-sm text-purple-300 mb-1 flex items-center">
              ID <ChevronDown className="ml-1 h-3 w-3" />
            </label>
            <Input
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
              placeholder="Filter by ID"
            />
          </div>
          <div>
            <label className="text-sm text-purple-300 mb-1">Title</label>
            <Input
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
              placeholder="Filter by title"
            />
          </div>
          <div>
            <label className="text-sm text-purple-300 mb-1">Type</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="direct">Direct link</SelectItem>
                <SelectItem value="interstitial">Rewarded Interstitial</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="native">Native</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-purple-300 mb-1">Created</label>
            <Input
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
              placeholder="Filter by date"
            />
          </div>
          <div>
            <label className="text-sm text-purple-300 mb-1">Zone Properties</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Zones table */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Zone Properties</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.length > 0 ? (
                zones.map((zone) => (
                  <TableRow key={zone.id} className="border-t border-purple-800/30">
                    <TableCell>{zone.id}</TableCell>
                    <TableCell>
                      <a href="#" className="text-purple-400 hover:text-purple-300">
                        {zone.title}
                      </a>
                    </TableCell>
                    <TableCell>{zone.type}</TableCell>
                    <TableCell>{zone.created}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                        >
                          <BarChart2 className="mr-1 h-4 w-4" />
                          Statistics
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                        >
                          <svg
                            className="mr-1 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 8L3 12L7 16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17 8L21 12L17 16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 4L10 20"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Get tag
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-purple-300">
                    No zones found. Click "Add Zone" to create your first zone.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="text-sm text-purple-300 text-center">page 1 of 1</div>
      </div>
    </div>
  )
}
