"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Filter,
  X,
  Calendar,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { SiteDetail } from "@/components/site-detail"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddSiteModal } from "@/components/add-site-modal"

export function SitesTab() {
  // Sample data
  const sitesData = [
    {
      title: "stringgames.io",
      id: "2634625",
      status: "Verified",
      created: "23.09.2024",
      createdDate: new Date(2024, 8, 23), // September 23, 2024
    },
    {
      title: "stringspinwinbot",
      id: "2727221",
      status: "Verified",
      created: "11.12.2024",
      createdDate: new Date(2024, 11, 11), // December 11, 2024
    },
    {
      title: "testsite.dev",
      id: "1234567",
      status: "Pending",
      created: "05.10.2024",
      createdDate: new Date(2024, 9, 5), // October 5, 2024
    },
    {
      title: "demo-project",
      id: "7654321",
      status: "Inactive",
      created: "18.11.2024",
      createdDate: new Date(2024, 10, 18), // November 18, 2024
    },
  ]

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [sites, setSites] = useState(sitesData)
  const [isMobile, setIsMobile] = useState(false)

  // Site detail view state
  const [selectedSite, setSelectedSite] = useState(null)

  // Add site modal state
  const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Handle search input change
  const handleSearchChange = (e) => {
    const newQuery = e.target.value
    setSearchQuery(newQuery)
    applyFilters(newQuery, dateFilter, statusFilter)
  }

  // Handle date filter change
  const handleDateChange = (date) => {
    setDateFilter(date)
    applyFilters(searchQuery, date, statusFilter)
  }

  // Handle status filter change
  const handleStatusChange = (value) => {
    setStatusFilter(value)
    applyFilters(searchQuery, dateFilter, value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setDateFilter(null)
    setStatusFilter("all")
    setSites(sitesData)
  }

  // Apply all filters
  const applyFilters = (query, date, status) => {
    let filteredSites = [...sitesData]

    // Apply search query filter (App Name only)
    if (query) {
      filteredSites = filteredSites.filter((site) => {
        return site.title.toLowerCase().includes(query.toLowerCase())
      })
    }

    // Apply date filter
    if (date) {
      filteredSites = filteredSites.filter((site) => {
        const siteDate = site.createdDate
        return (
          siteDate.getDate() === date.getDate() &&
          siteDate.getMonth() === date.getMonth() &&
          siteDate.getFullYear() === date.getFullYear()
        )
      })
    }

    // Apply status filter
    if (status && status !== "all") {
      filteredSites = filteredSites.filter((site) => {
        return site.status.toLowerCase() === status.toLowerCase()
      })
    }

    setSites(filteredSites)
  }

  // Open site detail view
  const handleOpenSite = (site) => {
    setSelectedSite(site)
  }

  // Go back to sites list
  const handleBackToSites = () => {
    setSelectedSite(null)
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || dateFilter || statusFilter !== "all"

  // If a site is selected, show the site detail view
  if (selectedSite) {
    return <SiteDetail site={selectedSite} onBack={handleBackToSites} />
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-white">My Sites</h1>
        <Button
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
          onClick={() => setIsAddSiteModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add site
        </Button>
      </div>

      {/* Search and filter section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-400" />
            <Input
              type="search"
              placeholder="Search by App Name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-purple-900/40 border-purple-700/30 pl-8 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
            />
          </div>

          <Button
            variant="outline"
            className={`border-purple-700/50 ${showFilters ? "bg-purple-700/50 text-white" : "bg-purple-800/20 text-purple-300"} hover:text-white hover:bg-purple-700/50`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="outline"
              className="border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
              onClick={clearFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Simplified filters */}
        {showFilters && (
          <div className="p-4 rounded-md bg-purple-900/40 border border-purple-700/30 space-y-4">
            <h3 className="text-sm font-medium text-purple-200">Filters</h3>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="date-filter" className="text-purple-200">
                  Filter by Date
                </Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date-filter"
                        variant="outline"
                        className={`w-full justify-start text-left font-normal border-purple-700/30 ${dateFilter ? "bg-purple-700/30 text-white" : "bg-purple-900/40 text-purple-100"} hover:text-white hover:bg-purple-800/50`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-purple-900 border-purple-700/50">
                      <CalendarComponent
                        mode="single"
                        selected={dateFilter}
                        onSelect={handleDateChange}
                        initialFocus
                        className="bg-purple-900 text-purple-100"
                      />
                    </PopoverContent>
                  </Popover>

                  {dateFilter && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-purple-300 hover:text-white hover:bg-purple-800/50"
                      onClick={() => handleDateChange(null)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear date</span>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <Label htmlFor="status-filter" className="text-purple-200">
                  Filter by Status
                </Label>
                <Select value={statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger
                    id="status-filter"
                    className={`w-full border-purple-700/30 ${statusFilter !== "all" ? "bg-purple-700/30 text-white" : "bg-purple-900/40 text-purple-100"} focus-visible:ring-purple-500`}
                  >
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter summary */}
            {hasActiveFilters && (
              <div className="mt-4 p-3 rounded-md bg-purple-800/20 text-sm text-purple-200">
                <p className="font-medium mb-1">Active Filters:</p>
                <ul className="space-y-1 text-purple-300">
                  {searchQuery && <li>• App Name: "{searchQuery}"</li>}
                  {dateFilter && <li>• Date: {format(dateFilter, "PPP")}</li>}
                  {statusFilter !== "all" && <li>• Status: {statusFilter}</li>}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sites table - Mobile responsive */}
      <Card className="dashboard-card">
        <CardContent className="p-0">
          <div className="md:hidden">
            {sites.length > 0 ? (
              sites.map((site) => (
                <div key={site.id} className="p-3 sm:p-4 hover:bg-purple-800/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-purple-100 text-sm sm:text-base break-all pr-2">{site.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${
                        site.status === "Verified"
                          ? "bg-green-500/20 text-green-400"
                          : site.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {site.status}
                    </span>
                  </div>
                  <div className="text-xs text-purple-400 space-y-1 mb-3">
                    <div className="flex justify-between">
                      <span>Web App Link:</span>
                      <span className="text-purple-100">t.me/{site.title.toLowerCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Web App URL:</span>
                      <span className="text-purple-100">{site.title.toLowerCase()}.io</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created At:</span>
                      <span className="text-purple-100">{site.created}</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 text-xs sm:text-sm"
                    >
                      <BarChart2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> <span>Stats</span>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 sm:p-8 text-center text-purple-300 text-sm sm:text-base">
                No sites match your filters. Try adjusting your search criteria.
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">App Name</TableHead>
                  <TableHead className="text-center">Web App Link</TableHead>
                  <TableHead className="text-center">Web App URL</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Created At</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.length > 0 ? (
                  sites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell className="max-w-[150px] overflow-hidden text-ellipsis text-center">
                        {site.title}
                      </TableCell>
                      <TableCell className="text-center">t.me/{site.title.toLowerCase()}</TableCell>
                      <TableCell className="text-center">{site.title.toLowerCase()}.io</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            site.status === "Verified"
                              ? "bg-green-500/20 text-green-400"
                              : site.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {site.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{site.created}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                          >
                            <BarChart2 className="mr-1 h-4 w-4" />
                            Stats
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-purple-300">
                      No sites match your filters. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-purple-800/30">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-sm text-purple-300 mr-2">Show rows</span>
              <Select defaultValue="50">
                <SelectTrigger className="w-16 h-8 bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500">
                  <SelectValue placeholder="50" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end">
              <div className="text-sm text-purple-300 mr-4">
                {sites.length > 0 ? `1-${sites.length} of ${sites.length}` : "0 results"}
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 mr-1"
                  disabled
                >
                  <ChevronFirst className="h-4 w-4" />
                  <span className="sr-only">First page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 mr-1"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 mr-1"
                  disabled
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                  disabled
                >
                  <ChevronLast className="h-4 w-4" />
                  <span className="sr-only">Last page</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Site Modal */}
      <AddSiteModal isOpen={isAddSiteModalOpen} onClose={() => setIsAddSiteModalOpen(false)} />
    </div>
  )
}
