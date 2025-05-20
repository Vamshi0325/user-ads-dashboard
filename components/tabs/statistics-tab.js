"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown, X } from "lucide-react"
import { subMonths } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function StatisticsTab() {
  // Get today's date and last month's date for default range
  const today = new Date()
  const lastMonth = subMonths(today, 1)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [appNameFilter, setAppNameFilter] = useState("all")
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Pagination
  const itemsPerPage = 10

  // Add sample site data for the App Name filter
  const sitesData = [
    { title: "stringgames.io", id: "2634625" },
    { title: "stringspinwinbot", id: "2727221" },
    { title: "testsite.dev", id: "1234567" },
    { title: "demo-project", id: "7654321" },
  ]

  // Financial data for the cards
  const financialData = {
    monthlyEarnings: 508.63,
    totalBalance: 1631.7,
    pendingBalance: 1123.07,
    totalWithdrawals: 4115.26,
    rejectedBalance: 215.5, // Added rejected balance
  }

  // Replace the existing statisticsData array with this expanded version
  const statisticsData = [
    { date: "16-05-25", impressions: 709, profit: 3040, cpm: 4.29, appName: "stringgames.io" },
    { date: "15-05-25", impressions: 11123, profit: 45454, cpm: 4.09, appName: "stringgames.io" },
    { date: "14-05-25", impressions: 11249, profit: 40549, cpm: 3.6, appName: "stringgames.io" },
    { date: "13-05-25", impressions: 11530, profit: 37805, cpm: 3.28, appName: "stringspinwinbot" },
    { date: "12-05-25", impressions: 11348, profit: 41042, cpm: 3.62, appName: "stringspinwinbot" },
    { date: "11-05-25", impressions: 10569, profit: 35305, cpm: 3.34, appName: "stringspinwinbot" },
    { date: "10-05-25", impressions: 10234, profit: 36789, cpm: 3.59, appName: "testsite.dev" },
    { date: "09-05-25", impressions: 11345, profit: 39876, cpm: 3.52, appName: "testsite.dev" },
    { date: "08-05-25", impressions: 10987, profit: 37654, cpm: 3.43, appName: "testsite.dev" },
    { date: "07-05-25", impressions: 9876, profit: 34567, cpm: 3.5, appName: "demo-project" },
    { date: "06-05-25", impressions: 10345, profit: 36789, cpm: 3.56, appName: "demo-project" },
    { date: "05-05-25", impressions: 11234, profit: 38765, cpm: 3.45, appName: "demo-project" },
    { date: "04-05-25", impressions: 10876, profit: 37654, cpm: 3.46, appName: "stringgames.io" },
    { date: "03-05-25", impressions: 9876, profit: 34567, cpm: 3.5, appName: "stringgames.io" },
    { date: "02-05-25", impressions: 11467, profit: 50872, cpm: 4.44, appName: "stringgames.io" },
    { date: "01-05-25", impressions: 9850, profit: 42774, cpm: 4.34, appName: "stringspinwinbot" },
    { date: "30-04-25", impressions: 9689, profit: 40044, cpm: 4.13, appName: "stringspinwinbot" },
    { date: "29-04-25", impressions: 10769, profit: 41976, cpm: 3.9, appName: "stringspinwinbot" },
    { date: "28-04-25", impressions: 11425, profit: 36875, cpm: 3.23, appName: "testsite.dev" },
    { date: "27-04-25", impressions: 9758, profit: 34747, cpm: 3.56, appName: "testsite.dev" },
    { date: "26-04-25", impressions: 10455, profit: 35004, cpm: 3.35, appName: "testsite.dev" },
    { date: "25-04-25", impressions: 12567, profit: 52345, cpm: 4.17, appName: "demo-project" },
    { date: "24-04-25", impressions: 13456, profit: 55678, cpm: 4.14, appName: "demo-project" },
    { date: "23-04-25", impressions: 12789, profit: 51234, cpm: 4.01, appName: "demo-project" },
    { date: "22-04-25", impressions: 11987, profit: 48765, cpm: 4.07, appName: "stringgames.io" },
    { date: "21-04-25", impressions: 10876, profit: 43210, cpm: 3.97, appName: "stringgames.io" },
    { date: "20-04-25", impressions: 9876, profit: 39876, cpm: 4.04, appName: "stringgames.io" },
    { date: "19-04-25", impressions: 10987, profit: 44321, cpm: 4.03, appName: "stringspinwinbot" },
    { date: "18-04-25", impressions: 11234, profit: 45678, cpm: 4.07, appName: "stringspinwinbot" },
    { date: "17-04-25", impressions: 12345, profit: 49876, cpm: 4.04, appName: "stringspinwinbot" },
    { date: "16-04-25", impressions: 11876, profit: 47654, cpm: 4.01, appName: "testsite.dev" },
    { date: "15-04-25", impressions: 10987, profit: 43210, cpm: 3.93, appName: "testsite.dev" },
    { date: "14-04-25", impressions: 9876, profit: 39456, cpm: 3.99, appName: "testsite.dev" },
    { date: "13-04-25", impressions: 10123, profit: 40987, cpm: 4.05, appName: "demo-project" },
    { date: "12-04-25", impressions: 11234, profit: 45678, cpm: 4.07, appName: "demo-project" },
    { date: "11-04-25", impressions: 12345, profit: 49876, cpm: 4.04, appName: "demo-project" },
    { date: "10-04-25", impressions: 11456, profit: 46789, cpm: 4.08, appName: "stringgames.io" },
    { date: "09-04-25", impressions: 10567, profit: 42345, cpm: 4.01, appName: "stringgames.io" },
    { date: "08-04-25", impressions: 9678, profit: 38901, cpm: 4.02, appName: "stringgames.io" },
    { date: "07-04-25", impressions: 10789, profit: 43456, cpm: 4.03, appName: "stringspinwinbot" },
    { date: "06-04-25", impressions: 11890, profit: 48012, cpm: 4.04, appName: "stringspinwinbot" },
    { date: "05-04-25", impressions: 12901, profit: 52567, cpm: 4.07, appName: "stringspinwinbot" },
    { date: "04-04-25", impressions: 11012, profit: 44123, cpm: 4.01, appName: "testsite.dev" },
    { date: "03-04-25", impressions: 10123, profit: 40678, cpm: 4.02, appName: "testsite.dev" },
    { date: "02-04-25", impressions: 9234, profit: 37234, cpm: 4.03, appName: "testsite.dev" },
    { date: "01-04-25", impressions: 10345, profit: 41789, cpm: 4.04, appName: "demo-project" },
  ]

  // First, add temporary state variables to hold filter values before they're applied
  const [tempStartDate, setTempStartDate] = useState("")
  const [tempEndDate, setTempEndDate] = useState("")
  const [tempAppNameFilter, setTempAppNameFilter] = useState("all")

  // Replace the filteredData state and initialization with:

  // State for filtered data
  const [filteredData, setFilteredData] = useState([])

  // Initialize filtered data on component mount
  useEffect(() => {
    setFilteredData(statisticsData)
  }, [])

  // Then, modify the useEffect that filters data to only run when explicitly triggered
  // Remove or comment out this useEffect if it exists:
  // useEffect(() => {
  //   // Filter logic that runs automatically
  // }, [startDate, endDate, appNameFilter])

  // Add a new applyFilters function
  const applyFilters = () => {
    // Apply the temporary filter values to the actual filter state
    setStartDate(tempStartDate)
    setEndDate(tempEndDate)
    setAppNameFilter(tempAppNameFilter)

    // Then filter the data based on these values
    let filtered = [...statisticsData]

    // Apply date filter
    if (tempStartDate && tempEndDate) {
      // Parse the dates (DD-MM-YY format from data)
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-").map((num) => Number.parseInt(num, 10))
        return new Date(Number.parseInt(`20${year}`), Number.parseInt(month) - 1, Number.parseInt(day))
      }

      try {
        const startDateObj = parseDate(tempStartDate)
        const endDateObj = parseDate(tempEndDate)

        filtered = filtered.filter((item) => {
          const [itemDay, itemMonth, itemYear] = item.date.split("-")
          const itemDate = new Date(
            Number.parseInt(`20${itemYear}`),
            Number.parseInt(itemMonth) - 1,
            Number.parseInt(itemDay),
          )
          return itemDate >= startDateObj && itemDate <= endDateObj
        })
      } catch (e) {
        console.error("Invalid date format", e)
      }
    }

    // Apply app name filter
    if (tempAppNameFilter && tempAppNameFilter !== "all") {
      filtered = filtered.filter((item) => item.appName === tempAppNameFilter)
    }

    // Update filtered data and reset to first page
    setFilteredData(filtered)
    setCurrentPage(1)
  }

  // Add a clearFilters function
  const clearFilters = () => {
    setTempStartDate("")
    setTempEndDate("")
    setTempAppNameFilter("all")
    setStartDate("")
    setEndDate("")
    setAppNameFilter("all")
    setFilteredData(statisticsData)
    setCurrentPage(1)
  }

  // Update pagination based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Calculate totals from filtered data
  const filteredImpressions = filteredData.reduce((sum, item) => sum + item.impressions, 0)
  const filteredProfit = filteredData.reduce((sum, item) => sum + item.profit, 0)
  const filteredAverageCpm =
    filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.cpm, 0) / filteredData.length : 0

  // Calculate totals
  const totalImpressions = 337964 // From the image
  const totalProfit = 1114814 // From the image
  const averageCpm = 3.3 // From the image

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

  // Format currency with commas
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold text-black dark:text-white">Statistics</h1>

      {}

      {/* Filters Section */}
      <div className="space-y-4 p-4 rounded-md bg-purple-900/40 border border-purple-700/30">
        <h3 className="text-sm font-medium text-purple-200">Filters</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Start Date Input */}
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-purple-200">
              Start Date (DD-MM-YY)
            </Label>
            <Input
              id="start-date"
              value={tempStartDate}
              onChange={(e) => setTempStartDate(e.target.value)}
              placeholder="DD-MM-YY"
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
            />
          </div>

          {/* End Date Input */}
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-purple-200">
              End Date (DD-MM-YY)
            </Label>
            <Input
              id="end-date"
              value={tempEndDate}
              onChange={(e) => setTempEndDate(e.target.value)}
              placeholder="DD-MM-YY"
              className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
            />
          </div>

          {/* App Name Filter */}
          <div className="space-y-2">
            <Label htmlFor="app-name" className="text-purple-200">
              App Name
            </Label>
            <Select value={tempAppNameFilter} onValueChange={setTempAppNameFilter}>
              <SelectTrigger
                id="app-name"
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
              >
                <SelectValue placeholder="All Apps" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100">
                <SelectItem value="all">All Apps</SelectItem>
                {sitesData.map((site) => (
                  <SelectItem key={site.id} value={site.title}>
                    {site.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <Button
            variant="outline"
            className="border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 mr-2"
            onClick={clearFilters}
          >
            <X className="mr-1 h-4 w-4" /> Clear Filters
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={applyFilters}>
            Apply Filters
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
              {/* Update the desktop table header to reorder columns */}
              {/* Replace the desktop table header with: */}
              <thead>
                <tr className="border-b border-purple-800/30 bg-purple-950/80">
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">
                    Date <ChevronDown className="inline h-4 w-4 ml-1" />
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">
                    Impressions
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">CPM</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-purple-100 whitespace-nowrap">
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Update the desktop table rows to reorder columns */}
                {/* Replace the desktop table rows with: */}
                {paginatedData.map((item) => (
                  <tr key={item.date} className="border-b border-purple-800/30 bg-purple-950/60 hover:bg-purple-900/20">
                    <td className="px-4 py-3 text-sm font-medium text-purple-100 text-center whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                      {item.impressions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                      {item.cpm.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-purple-100 whitespace-nowrap">
                      $ {item.profit.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {/* Update the desktop table totals row to reorder columns */}
                {/* Replace the desktop table totals row with: */}
                <tr className="bg-purple-900/30 font-medium">
                  <td className="px-4 py-3 text-sm text-purple-100 text-center whitespace-nowrap">Total</td>
                  <td className="px-4 py-3 text-sm text-purple-100 text-center whitespace-nowrap">
                    {filteredImpressions.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-purple-100 text-center whitespace-nowrap">
                    {filteredAverageCpm.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-purple-100 text-center whitespace-nowrap">
                    $ {filteredProfit.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile view - exactly matching the image with centered content */}
          <div className="md:hidden">
            {/* Update the mobile view header to ensure proper centering */}
            <div className="bg-purple-950/80 px-3 py-2 sm:px-4 sm:py-3 flex border-b border-purple-800/30">
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-1/4">Date</div>
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-1/4">Impressions</div>
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-1/4">CPM</div>
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-1/4">Profit</div>
            </div>
            {/* Update the mobile view rows to ensure proper centering */}
            {paginatedData.map((item) => (
              <div
                key={item.date}
                className="border-b border-purple-800/30 bg-purple-950/60 px-3 py-2 sm:px-4 sm:py-3 flex items-center"
              >
                <div className="text-xs sm:text-sm text-purple-100 text-center w-1/4">{item.date}</div>
                <div className="text-xs sm:text-sm text-purple-100 text-center w-1/4">
                  {item.impressions.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-purple-100 text-center w-1/4">{item.cpm.toFixed(2)}</div>
                <div className="text-xs sm:text-sm text-purple-100 text-center w-1/4">
                  $ {item.profit.toLocaleString()}
                </div>
              </div>
            ))}
            {/* Update the mobile view totals row to ensure proper centering */}
            <div className="bg-purple-900/30 px-3 py-2 sm:px-4 sm:py-3 flex items-center">
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-1/4">Total</div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/4">
                {filteredImpressions.toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/4">
                {filteredAverageCpm.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/4">
                $ {filteredProfit.toLocaleString()}
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
