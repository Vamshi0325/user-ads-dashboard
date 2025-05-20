"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Filter, X, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReceiptPage } from "./receipt-page"
import toast from "react-hot-toast"

export function PaymentsTab() {
  // State for filters
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [walletFilter, setWalletFilter] = useState("")
  const [networkFilter, setNetworkFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)

  // Sample transaction data with wallet addresses
  const transactions = [
    {
      date: "02.05.2025",
      wallet: "EQCcJ3...O_qUJ",
      network: "TON",
      amount: 987.62,
      fee: 0.0,
      amountSent: 987.62,
      status: "SUCCESS",
      receipt: true,
    },
    {
      date: "28.04.2025",
      wallet: "7UX2i7...oDUi",
      network: "SOL",
      amount: 320.75,
      fee: 0.5,
      amountSent: 320.25,
      status: "PENDING",
      receipt: true,
    },
    {
      date: "15.04.2025",
      wallet: "TJYdn5...Xp2Vr",
      network: "TRC20",
      amount: 100.0,
      fee: 0.0,
      amountSent: 100.0,
      status: "FAILED",
      receipt: false,
    },
  ]

  const [selectedTransaction, setSelectedTransaction] = useState(null)

  // Initialize filtered transactions
  useState(() => {
    setFilteredTransactions(transactions)
  }, [])

  // Apply filters
  const applyFilters = () => {
    setIsFiltering(true)
    let filtered = [...transactions]

    // Apply date filter
    if (startDate && endDate) {
      // Convert DD-MM-YY to Date objects for comparison
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-").map((num) => Number.parseInt(num, 10))
        return new Date(2000 + year, month - 1, day)
      }

      const startDateObj = parseDate(startDate)
      const endDateObj = parseDate(endDate)

      filtered = filtered.filter((transaction) => {
        const [day, month, year] = transaction.date.split(".").map((num) => Number.parseInt(num, 10))
        const transactionDate = new Date(year, month - 1, day)
        return transactionDate >= startDateObj && transactionDate <= endDateObj
      })
    }

    // Apply wallet filter
    if (walletFilter) {
      filtered = filtered.filter((transaction) => transaction.wallet.toLowerCase().includes(walletFilter.toLowerCase()))
    }

    // Apply network filter
    if (networkFilter !== "all") {
      filtered = filtered.filter((transaction) => transaction.network === networkFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((transaction) => transaction.status === statusFilter)
    }

    setFilteredTransactions(filtered)
  }

  // Clear filters
  const clearFilters = () => {
    setStartDate("")
    setEndDate("")
    setWalletFilter("")
    setNetworkFilter("all")
    setStatusFilter("all")
    setFilteredTransactions(transactions)
    setIsFiltering(false)
  }

  // Calculate totals
  const totalFee = filteredTransactions.reduce((sum, transaction) => sum + transaction.fee, 0)
  const totalAmountSent = filteredTransactions.reduce((sum, transaction) => sum + transaction.amountSent, 0)

  // If a receipt is selected, show the receipt page
  if (selectedTransaction) {
    return <ReceiptPage transaction={selectedTransaction} onBack={() => setSelectedTransaction(null)} />
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold text-black dark:text-white">Payments</h1>

      {/* Financial Cards Section */}
      <div className="space-y-4">
        {/* Main earnings card */}
        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-900/90 to-purple-950 border-purple-800/40 shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium mb-1">This Month Earnings</p>
                <h2 className="text-3xl font-bold text-white">$ 508.63</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-800/50 flex items-center justify-center">
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
                  className="text-purple-300"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smaller cards in a responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Balance Card */}
          <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-900/90 to-purple-950 border-purple-800/40 shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium mb-1">Total Balance</p>
                  <h3 className="text-2xl font-bold text-white">$ 1,631.70</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-800/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-300"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hold Balance Card */}
          <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-900/90 to-purple-950 border-purple-800/40 shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium mb-1">Hold Balance</p>
                  <h3 className="text-2xl font-bold text-white">$ 1,123.07</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-800/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-300"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Withdrawals Card */}
          <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-900/90 to-purple-950 border-purple-800/40 shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium mb-1">Total Withdrawals</p>
                  <h3 className="text-2xl font-bold text-white">$ 4,115.26</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-800/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-300"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rejected Balance Card */}
          <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-900/90 to-purple-950 border-purple-800/40 shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium mb-1">Rejected Balance</p>
                  <h3 className="text-2xl font-bold text-white">$ 215.50</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-800/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-300"
                  >
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button
          variant="outline"
          className={`border-purple-700/50 ${showFilters ? "bg-purple-700/50 text-white" : "bg-purple-800/20 text-purple-300"} hover:text-white hover:bg-purple-700/50`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        {isFiltering && (
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

      {showFilters && (
        <Card className="border-purple-800/40 bg-gradient-to-br from-purple-900/90 to-purple-950">
          <CardContent className="p-4 sm:p-6">
            {/* All filters in a single row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
              {/* Start Date */}
              <div className="space-y-1">
                <Label htmlFor="start-date" className="text-xs text-purple-300">
                  Start Date (DD-MM-YY)
                </Label>
                <Input
                  id="start-date"
                  placeholder="DD-MM-YY"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
                />
              </div>

              {/* End Date */}
              <div className="space-y-1">
                <Label htmlFor="end-date" className="text-xs text-purple-300">
                  End Date (DD-MM-YY)
                </Label>
                <Input
                  id="end-date"
                  placeholder="DD-MM-YY"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
                />
              </div>

              {/* Wallet Filter */}
              <div className="space-y-1">
                <Label htmlFor="wallet-filter" className="text-purple-200">
                  Wallet
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-400" />
                  <Input
                    id="wallet-filter"
                    placeholder="Search wallet"
                    value={walletFilter}
                    onChange={(e) => setWalletFilter(e.target.value)}
                    className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500 pl-8"
                  />
                </div>
              </div>

              {/* Network Filter */}
              <div className="space-y-1">
                <Label htmlFor="network-filter" className="text-purple-200">
                  Network
                </Label>
                <Select value={networkFilter} onValueChange={setNetworkFilter}>
                  <SelectTrigger
                    id="network-filter"
                    className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
                  >
                    <SelectValue placeholder="All Networks" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100">
                    <SelectItem value="all">All Networks</SelectItem>
                    <SelectItem value="TON">TON</SelectItem>
                    <SelectItem value="SOL">SOL</SelectItem>
                    <SelectItem value="TRC20">TRC20</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-1">
                <Label htmlFor="status-filter" className="text-purple-200">
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger
                    id="status-filter"
                    className="bg-purple-900/40 border-purple-700/30 text-purple-100 focus-visible:ring-purple-500"
                  >
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-purple-700/50 text-purple-100">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="SUCCESS">Success</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-end mt-4 gap-2">
              <Button
                variant="outline"
                className="border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions table */}
      <div className="border border-purple-800/40 rounded-md overflow-hidden bg-gradient-to-br from-purple-900/90 to-purple-950">
        <div className="w-full overflow-x-auto hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-950/80 border-b border-purple-800/40">
                <TableHead className="text-center font-medium text-purple-100">
                  Date <ChevronDown className="inline h-4 w-4 ml-1" />
                </TableHead>
                <TableHead className="text-center font-medium text-purple-100">Wallet</TableHead>
                <TableHead className="text-center font-medium text-purple-100">Network</TableHead>
                <TableHead className="text-center font-medium text-purple-100">Amount</TableHead>
                <TableHead className="text-center font-medium text-purple-100">Fee</TableHead>
                <TableHead className="text-center font-medium text-purple-100">Amount sent</TableHead>
                <TableHead className="text-center font-medium text-purple-100">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction, index) => (
                <TableRow key={index} className="border-t border-purple-800/30 hover:bg-purple-800/10">
                  <TableCell className="text-center text-purple-100 bg-purple-900/50">
                    {transaction.date.replace(/\./g, "-")}
                  </TableCell>
                  <TableCell
                    className="text-center text-purple-100 cursor-pointer hover:text-purple-300"
                    onClick={() => {
                      navigator.clipboard.writeText(transaction.wallet)
                      toast.success("Wallet address copied to clipboard!")
                    }}
                  >
                    {transaction.wallet}
                  </TableCell>
                  <TableCell className="text-center text-purple-100">{transaction.network}</TableCell>
                  <TableCell className="text-center text-purple-100">$ {transaction.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center text-purple-100">$ {transaction.fee.toFixed(2)}</TableCell>
                  <TableCell className="text-center text-purple-100">$ {transaction.amountSent.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transaction.status === "SUCCESS"
                          ? "bg-green-500/20 text-green-400"
                          : transaction.status === "PENDING"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-purple-900/30 font-medium">
                <TableCell className="text-center text-purple-100">Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-center text-purple-100">$ {totalFee.toFixed(2)}</TableCell>
                <TableCell className="text-center text-purple-100">$ {totalAmountSent.toFixed(2)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="md:hidden">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={index}
              className="border-b border-purple-800/30 bg-purple-950/60 px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap"
            >
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/2 mb-2 bg-purple-900/50">
                <div className="font-medium mb-1">Date</div>
                {transaction.date.replace(/\./g, "-")}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/2 mb-2">
                <div className="font-medium mb-1">Wallet</div>
                <span
                  className="cursor-pointer hover:text-purple-300"
                  onClick={() => {
                    navigator.clipboard.writeText(transaction.wallet)
                    toast.success("Wallet address copied to clipboard!")
                  }}
                >
                  {transaction.wallet}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/3 mb-2">
                <div className="font-medium mb-1">Network</div>
                {transaction.network}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/3 mb-2">
                <div className="font-medium mb-1">Amount</div>$ {transaction.amount.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/3 mb-2">
                <div className="font-medium mb-1">Fee</div>$ {transaction.fee.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/2 mb-2">
                <div className="font-medium mb-1">Amount sent</div>$ {transaction.amountSent.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-center w-1/2 mb-2">
                <div className="font-medium mb-1">Status</div>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    transaction.status === "SUCCESS"
                      ? "bg-green-500/20 text-green-400"
                      : transaction.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
          {filteredTransactions.length > 0 && (
            <div className="bg-purple-900/30 px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap">
              <div className="text-xs sm:text-sm font-medium text-purple-100 text-center w-full mb-2">Total</div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/2 mb-2">
                <div className="font-medium mb-1">Fee</div>$ {totalFee.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 text-center w-1/2 mb-2">
                <div className="font-medium mb-1">Amount sent</div>$ {totalAmountSent.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <p className="text-sm text-purple-400">page 1 of 1</p>
      </div>
    </div>
  )
}
