"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Download, ChevronDown, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { subMonths } from "date-fns"

export function StatisticsTab() {
  // Get today's date and last month's date for default range
  const today = new Date()
  const lastMonth = subMonths(today, 1)

  // Filter states
  const [source, setSource] = useState("")
  const [adFormat, setAdFormat] = useState("")
  const [country, setCountry] = useState("")
  const [zone, setZone] = useState("")
  const [os, setOs] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample statistics data - exact match to the image
  const statisticsData = [
    { date: "16.05.2025", impressions: 709, profit: 3040, cpm: 4.29 },
    { date: "15.05.2025", impressions: 11123, profit: 45454, cpm: 4.09 },
    { date: "14.05.2025", impressions: 11249, profit: 40549, cpm: 3.6 },
    { date: "13.05.2025", impressions: 11530, profit: 37805, cpm: 3.28 },
    { date: "12.05.2025", impressions: 11348, profit: 41042, cpm: 3.62 },
    { date: "11.05.2025", impressions: 10569, profit: 35305, cpm: 3.34 },
    { date: "10.05.2025", impressions: 10234, profit: 36789, cpm: 3.59 },
    { date: "09.05.2025", impressions: 11345, profit: 39876, cpm: 3.52 },
    { date: "08.05.2025", impressions: 10987, profit: 37654, cpm: 3.43 },
    { date: "07.05.2025", impressions: 9876, profit: 34567, cpm: 3.5 },
    { date: "06.05.2025", impressions: 10345, profit: 36789, cpm: 3.56 },
    { date: "05.05.2025", impressions: 11234, profit: 38765, cpm: 3.45 },
    { date: "04.05.2025", impressions: 10876, profit: 37654, cpm: 3.46 },
    { date: "03.05.2025", impressions: 9876, profit: 34567, cpm: 3.5 },
    { date: "02.05.2025", impressions: 11467, profit: 50872, cpm: 4.44 },
    { date: "01.05.2025", impressions: 9850, profit: 42774, cpm: 4.34 },
    { date: "30.04.2025", impressions: 9689, profit: 40044, cpm: 4.13 },
    { date: "29.04.2025", impressions: 10769, profit: 41976, cpm: 3.9 },
    { date: "28.04.2025", impressions: 11425, profit: 36875, cpm: 3.23 },
    { date: "27.04.2025", impressions: 9758, profit: 34747, cpm: 3.56 },
    { date: "26.04.2025", impressions: 10455, profit: 35004, cpm: 3.35 },
  ]

  // Calculate totals
  const totalImpressions = 337964 // From the image
  const totalProfit = 1114814 // From the image
  const averageCpm = 3.3 // From the image

  // Pagination
  const itemsPerPage = 10
  const totalPages = Math.ceil(statisticsData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = statisticsData.slice(startIndex, endIndex)

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
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

  // Clear all filters
  const clearAllFilters = () => {
    setSource("")
    setAdFormat("")
    setCountry("")
    setZone("")
    setOs("")
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold text-black dark:text-white">Statistics</h1>

      {/* Filters Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="source" className="text-gray-700 dark:text-gray-300">
            Source
          </Label>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger
              id="source"
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ad-formats" className="text-gray-700 dark:text-gray-300">
              Ad Formats
            </Label>
            <Select value={adFormat} onValueChange={setAdFormat}>
              <SelectTrigger
                id="ad-formats"
                className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              >
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="native">Native</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="interstitial">Interstitial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-gray-700 dark:text-gray-300">
              Country
            </Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger
                id="country"
                className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              >
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zones" className="text-gray-700 dark:text-gray-300">
              Zones
            </Label>
            <Select value={zone} onValueChange={setZone}>
              <SelectTrigger
                id="zones"
                className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              >
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="zone1">Zone 1</SelectItem>
                <SelectItem value="zone2">Zone 2</SelectItem>
                <SelectItem value="zone3">Zone 3</SelectItem>
                <SelectItem value="zone4">Zone 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="os" className="text-gray-700 dark:text-gray-300">
              OS
            </Label>
            <Select value={os} onValueChange={setOs}>
              <SelectTrigger id="os" className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All OS</SelectItem>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="windows">Windows</SelectItem>
                <SelectItem value="macos">macOS</SelectItem>
                <SelectItem value="linux">Linux</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear filters button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={clearAllFilters}
          >
            <X className="mr-2 h-4 w-4" /> Clear all
          </Button>
        </div>
      </div>

      {/* Tabs and Table */}
      <div className="border border-purple-800/30 rounded-md overflow-hidden bg-gradient-to-b from-purple-950 to-purple-900">
        {/* Table Content - Mobile Responsive */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          {/* Update the desktop table view to center all content */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-purple-800/30 bg-purple-950/80">
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">
                    Date <ChevronDown className="inline h-4 w-4 ml-1" />
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">
                    Impressions
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">
                    Profit
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">CPM</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.date} className="border-b border-purple-800/30 bg-purple-950/60 hover:bg-purple-900/20">
                    <td className="px-4 py-3 text-sm font-medium text-purple-100 text-center whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                      {item.impressions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                      $ {item.profit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                      {item.cpm.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-purple-900/30 font-medium">
                  <td className="px-4 py-3 text-sm text-purple-100 text-center whitespace-nowrap">Total</td>
                  <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                    {totalImpressions.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                    $ {totalProfit.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                    {averageCpm.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile view - exactly matching the image with centered content */}
          <div className="md:hidden">
            <div className="bg-purple-950/80 px-3 py-2 sm:px-4 sm:py-3 flex justify-between border-b border-purple-800/30">
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-20 sm:w-24 whitespace-nowrap">
                Date
              </div>
              <div className="flex flex-1 justify-between">
                <div className="text-xs sm:text-sm font-medium text-purple-100 text-center flex-1 whitespace-nowrap">
                  Impressions
                </div>
                <div className="text-xs sm:text-sm font-medium text-purple-100 text-center flex-1 whitespace-nowrap">
                  Profit
                </div>
                <div className="text-xs sm:text-sm font-medium text-purple-100 text-center flex-1 whitespace-nowrap">
                  CPM
                </div>
              </div>
            </div>
            {paginatedData.map((item) => (
              <div
                key={item.date}
                className="border-b border-purple-800/30 bg-purple-950/60 px-3 py-2 sm:px-4 sm:py-3 flex justify-between items-center"
              >
                <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-20 sm:w-24 whitespace-nowrap">
                  {item.date}
                </div>
                <div className="flex flex-1 justify-between">
                  <div className="text-xs sm:text-sm text-purple-100 text-center flex-1 whitespace-nowrap">
                    {item.impressions.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-100 text-center flex-1 whitespace-nowrap">
                    $ {item.profit.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-100 text-center flex-1 whitespace-nowrap">
                    {item.cpm.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-purple-900/30 px-3 py-2 sm:px-4 sm:py-3 flex justify-between items-center">
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-20 sm:w-24 whitespace-nowrap">
                Total
              </div>
              <div className="flex flex-1 justify-between">
                <div className="text-xs sm:text-sm text-purple-100 text-center flex-1 whitespace-nowrap">
                  {totalImpressions.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-purple-100 text-center flex-1 whitespace-nowrap">
                  $ {totalProfit.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-purple-100 text-center flex-1 whitespace-nowrap">
                  {averageCpm.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-purple-800/30 bg-purple-950/60 gap-4">
          <div className="text-sm text-purple-300 w-full text-center sm:text-left sm:w-auto">
            page {currentPage} of {totalPages}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
            >
              <Download className="mr-2 h-4 w-4" /> Export to CSV
            </Button>

            <div className="flex gap-2 w-full sm:w-auto justify-center">
              <Button
                variant="outline"
                className="border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 flex-1 sm:flex-none"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 flex-1 sm:flex-none"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
