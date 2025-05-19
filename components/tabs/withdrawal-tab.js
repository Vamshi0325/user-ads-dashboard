"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Calendar, X, ChevronLeft, ChevronRight, AlertCircle, Info, Check } from "lucide-react"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { isWithinInterval, format } from "date-fns"
import { useMediaQuery } from "usehooks-ts"

export function WithdrawalTab() {
  const [walletAddress, setWalletAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [network, setNetwork] = useState("")
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [statusFilter, setStatusFilter] = useState("all")
  // Add a new state for network filter
  const [networkFilter, setNetworkFilter] = useState("all")
  const [networkModeFilter, setNetworkModeFilter] = useState("all")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [addressError, setAddressError] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [balance, setBalance] = useState(1000.0) // Static USDT balance
  const [balanceUpdated, setBalanceUpdated] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  // Remove the testnet toggle and simplify address validation
  // Replace the complex addressPatterns object with a simpler version
  const addressPatterns = {
    TON: {
      example: "EQCcJ3Hh5o_N3jjVjQ9nTx0mdhDwY7i8KGwNNPnxgGwO_qUJ",
    },
    SOL: {
      example: "7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi",
    },
  }

  // Network minimum withdrawal amounts
  const minWithdrawalAmounts = {
    TON: 10,
    SOL: 5,
  }

  // Network fees
  const networkFees = {
    TON: 1,
    SOL: 0.5,
  }

  // Reset balance updated flag after animation
  useEffect(() => {
    if (balanceUpdated) {
      const timer = setTimeout(() => {
        setBalanceUpdated(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [balanceUpdated])

  // Sample transaction data
  const transactions = [
    {
      id: "tx1",
      date: "16.05.2025",
      dateObj: new Date(2025, 4, 16),
      amount: "250.00",
      status: "Completed",
      network: "TON",
      isTestnet: false,
    },
    {
      id: "tx2",
      date: "10.05.2025",
      dateObj: new Date(2025, 4, 10),
      amount: "500.00",
      status: "Completed",
      network: "SOL",
      isTestnet: false,
    },
    {
      id: "tx3",
      date: "05.05.2025",
      dateObj: new Date(2025, 4, 5),
      amount: "175.50",
      status: "Completed",
      network: "TON",
      isTestnet: true,
    },
    {
      id: "tx4",
      date: "28.04.2025",
      dateObj: new Date(2025, 3, 28),
      amount: "320.75",
      status: "Pending",
      network: "SOL",
      isTestnet: false,
    },
    {
      id: "tx5",
      date: "15.04.2025",
      dateObj: new Date(2025, 3, 15),
      amount: "100.00",
      status: "Failed",
      network: "TON",
      isTestnet: false,
    },
    {
      id: "tx6",
      date: "10.04.2025",
      dateObj: new Date(2025, 3, 10),
      amount: "200.00",
      status: "Completed",
      network: "SOL",
      isTestnet: true,
    },
    {
      id: "tx7",
      date: "05.04.2025",
      dateObj: new Date(2025, 3, 5),
      amount: "150.25",
      status: "Completed",
      network: "TON",
      isTestnet: false,
    },
    {
      id: "tx8",
      date: "01.04.2025",
      dateObj: new Date(2025, 3, 1),
      amount: "300.50",
      status: "Completed",
      network: "SOL",
      isTestnet: false,
    },
  ]

  // Apply filters when they change
  // Update the useEffect for filtering to include network and mode filters
  useEffect(() => {
    let filtered = [...transactions]

    // Apply date filter
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((transaction) => {
        return isWithinInterval(transaction.dateObj, {
          start: dateRange.from,
          end: dateRange.to,
        })
      })
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((transaction) => transaction.status === statusFilter)
    }

    // Apply network filter
    if (networkFilter !== "all") {
      filtered = filtered.filter((transaction) => transaction.network === networkFilter)
    }

    // Apply network mode filter
    if (networkModeFilter !== "all") {
      if (networkModeFilter === "mainnet") {
        filtered = filtered.filter((transaction) => !transaction.isTestnet)
      } else if (networkModeFilter === "testnet") {
        filtered = filtered.filter((transaction) => transaction.isTestnet)
      }
    }

    setFilteredTransactions(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [dateRange, statusFilter, networkFilter, networkModeFilter])

  // Initialize filtered transactions on component mount
  useEffect(() => {
    setFilteredTransactions(transactions)
  }, [])

  // Replace the useEffect for address validation with this simpler version
  useEffect(() => {
    if (!network || !walletAddress) {
      setAddressError("")
      return
    }

    // Simple validation - just check if it's not empty
    if (walletAddress.trim() === "") {
      setAddressError("Wallet address cannot be empty")
      return
    }

    setAddressError("")
  }, [network, walletAddress])

  // Replace the validateWalletAddress function with this simpler version
  const validateWalletAddress = () => {
    if (!network) {
      toast.error("Please select a network")
      return false
    }

    if (!walletAddress || walletAddress.trim() === "") {
      toast.error("Please enter a wallet address")
      return false
    }

    return true
  }

  const validateAmount = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return false
    }

    const minAmount = minWithdrawalAmounts[network] || 0

    if (Number.parseFloat(amount) < minAmount) {
      toast.error(`Minimum withdrawal amount for ${network} is ${minAmount} USDT`)
      return false
    }

    // Check if amount exceeds available balance
    const amountValue = Number.parseFloat(amount)
    const fee = networkFees[network] || 0
    const totalDeduction = amountValue + fee

    if (totalDeduction > balance) {
      toast.error(
        `Insufficient balance. Total required: ${totalDeduction.toFixed(2)} USDT (including ${fee.toFixed(2)} USDT fee)`,
      )
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate network selection
    if (!network) {
      toast.error("Please select a network")
      return
    }

    // Validate wallet address
    if (!validateWalletAddress()) {
      return
    }

    // Validate amount
    if (!validateAmount()) {
      return
    }

    // Show confirmation dialog instead of immediately submitting
    setShowConfirmation(true)
  }

  // Update the confirmWithdrawal function to remove testnet references
  const confirmWithdrawal = () => {
    // Close the confirmation dialog
    setShowConfirmation(false)

    // Calculate new balance
    const amountValue = Number.parseFloat(amount)
    const fee = networkFees[network] || 0
    const totalDeduction = amountValue + fee
    const newBalance = balance - totalDeduction

    // Update balance
    setBalance(newBalance)
    setBalanceUpdated(true)

    // Add new transaction to the list
    const newTransaction = {
      id: `tx${Date.now()}`,
      date: format(new Date(), "dd.MM.yyyy"),
      dateObj: new Date(),
      amount: amountValue.toFixed(2),
      status: "Pending",
      network: network,
      isTestnet: false, // Keep this for compatibility with existing transactions
    }

    const updatedTransactions = [newTransaction, ...transactions]
    setFilteredTransactions(updatedTransactions)

    // Show success toast
    toast.success("Withdrawal request submitted successfully")

    // Reset form fields
    setWalletAddress("")
    setAmount("")
    setNetwork("")
  }

  const getMaskedAddress = () => {
    if (!walletAddress || walletAddress.length < 10) return walletAddress

    const start = walletAddress.substring(0, 6)
    const end = walletAddress.substring(walletAddress.length - 4)
    return `${start}...${end}`
  }

  // Format date range for display
  const formatDateRangeDisplay = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd.MM.yyyy")} - ${format(dateRange.to, "dd.MM.yyyy")}`
    }
    return "Select date range"
  }

  // Clear date filter
  const clearDateFilter = () => {
    setDateRange({ from: null, to: null })
  }

  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white"
      case "Pending":
        return "bg-amber-500 text-white"
      case "Failed":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // Pagination handlers
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

  // Replace the getAddressPlaceholder function with this simpler version
  const getAddressPlaceholder = () => {
    if (!network) return "Enter your wallet address"
    return `Enter your ${network} wallet address`
  }

  // Replace the getAddressExample function with this simpler version
  const getAddressExample = () => {
    if (!network) return ""
    return addressPatterns[network]?.example || ""
  }

  // Update the getNetworkFee function
  const getNetworkFee = () => {
    if (!network) return 0
    return networkFees[network] || 0
  }

  // Update the getMinWithdrawalAmount function
  const getMinWithdrawalAmount = () => {
    if (!network) return 0
    return minWithdrawalAmounts[network] || 0
  }

  // Calculate total amount with fee
  const getTotalWithFee = () => {
    if (!amount || !network) return 0
    const amountValue = Number.parseFloat(amount) || 0
    const fee = networkFees[network] || 0
    return amountValue + fee
  }

  // Calculate remaining balance after withdrawal
  const getRemainingBalance = () => {
    if (!amount || !network) return balance
    const totalWithFee = getTotalWithFee()
    return balance - totalWithFee
  }

  // Update the handleNetworkChange function
  const handleNetworkChange = (e) => {
    setNetwork(e.target.value)
    setWalletAddress("") // Clear address when network changes
  }

  // Add a function to clear all filters
  const clearAllFilters = () => {
    setDateRange({ from: null, to: null })
    setStatusFilter("all")
    setNetworkFilter("all")
    setNetworkModeFilter("all")
  }

  return (
    <div className="space-y-8 max-w-full overflow-visible">
      {/* Toast container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#4c1d95",
            color: "#fff",
            border: "1px solid #6d28d9",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <h1 className="text-2xl font-bold text-white">USDT Withdrawal</h1>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Withdrawal Form */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-purple-900/90 to-purple-950 border-purple-800/40 shadow-xl overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600/20 to-transparent p-4 border-b border-purple-800/30">
              <h2 className="text-lg font-semibold text-white">Request Withdrawal</h2>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-2 p-3 bg-purple-900/30 rounded-md border border-purple-700/30">
                <AlertCircle className="h-5 w-5 text-purple-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-purple-300">
                  Withdrawals may take up to 3 business days to process. Make sure to double-check your wallet address
                  before submitting.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Network Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    <span className="text-red-400">*</span> Network
                  </label>
                  <div className="relative">
                    <select
                      value={network}
                      onChange={handleNetworkChange}
                      className="w-full h-10 rounded-md border border-purple-700/30 bg-purple-950/70 px-3 py-2 text-sm text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="" disabled>
                        Select network
                      </option>
                      <option value="TON">TON</option>
                      <option value="SOL">SOL</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-purple-400 pointer-events-none" />
                  </div>

                  {/* Remove the testnet toggle section and replace with a simple note */}
                  {network && (
                    <div className="mt-2 p-2 bg-purple-900/20 rounded-md">
                      <p className="text-xs text-purple-300">
                        Any wallet address format is currently accepted for testing purposes.
                      </p>
                    </div>
                  )}

                  {network && (
                    <div className="flex justify-between text-xs">
                      <p className="text-purple-400">Minimum withdrawal: {getMinWithdrawalAmount()} USDT</p>
                      <p className="text-purple-400">Fee: {getNetworkFee()} USDT</p>
                    </div>
                  )}
                </div>

                {/* Wallet Address */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-purple-300">
                      <span className="text-red-400">*</span> Wallet Address
                    </label>
                    {network && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center text-xs text-purple-400 cursor-help">
                              <Info className="h-3.5 w-3.5 mr-1" />
                              Example format
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-purple-900 border-purple-700 text-purple-100 max-w-xs">
                            <p className="text-xs break-all">{getAddressExample()}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <Input
                    placeholder={getAddressPlaceholder()}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className={`bg-purple-950/70 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500 ${
                      addressError ? "border-red-500" : ""
                    }`}
                  />
                  {addressError && <p className="text-xs text-red-400 mt-1">{addressError}</p>}
                  {/* Update the address validation success message */}
                  {network && !addressError && walletAddress && (
                    <p className="text-xs text-green-400 mt-1 flex items-center">
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Address accepted
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    <span className="text-red-400">*</span> Amount
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-purple-950/70 border-purple-700/30 text-purple-100 placeholder:text-purple-500 focus-visible:ring-purple-500 pr-16"
                    />
                    <div className="absolute right-3 top-2.5 text-sm text-purple-400">USDT</div>
                  </div>
                  {network && amount && Number(amount) < getMinWithdrawalAmount() && (
                    <p className="text-xs text-red-400 mt-1">
                      Minimum withdrawal amount is {getMinWithdrawalAmount()} USDT
                    </p>
                  )}
                  {amount && network && (
                    <div className="flex justify-between text-xs mt-1">
                      <p className="text-purple-400">Fee: {getNetworkFee()} USDT</p>
                      <p className="text-purple-400">Total: {getTotalWithFee().toFixed(2)} USDT</p>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium px-8 py-2 h-11"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Balance Card */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-purple-900/90 to-purple-950 border-purple-800/40 shadow-xl h-full animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600/20 to-transparent p-4 border-b border-purple-800/30">
              <h2 className="text-lg font-semibold text-white">Available Balance</h2>
            </div>
            <CardContent className="p-6 flex flex-col items-center justify-center h-[calc(100%-60px)]">
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src="/images/tether-usdt-logo.png"
                  alt="USDT"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div
                className={`text-3xl font-bold text-white mb-2 transition-all duration-500 text-center ${balanceUpdated ? "scale-110 text-green-400 animate-pulse-once" : ""}`}
              >
                {balance.toFixed(2)} USDT
              </div>
              <p className="text-sm text-purple-400 text-center">Available for withdrawal</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Transaction History</h2>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Replace the date range picker buttons with a simpler version */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <button className="w-full h-10 rounded-md border border-purple-700/30 bg-purple-950/70 px-3 py-2 text-sm text-purple-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                  <span>Select date range</span>
                </button>
              </div>

              <div className="relative w-full sm:w-32">
                <select
                  className="w-full h-10 rounded-md border border-purple-700/30 bg-purple-950/70 px-3 py-2 text-sm text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                  value={networkFilter}
                  onChange={(e) => setNetworkFilter(e.target.value)}
                >
                  <option value="all">All Networks</option>
                  <option value="TON">TON</option>
                  <option value="SOL">SOL</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-purple-400 pointer-events-none" />
              </div>
            </div>

            <div className="relative w-full sm:w-32">
              <select
                className="w-full h-10 rounded-md border border-purple-700/30 bg-purple-950/70 px-3 py-2 text-sm text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                value={networkModeFilter}
                onChange={(e) => setNetworkModeFilter(e.target.value)}
              >
                <option value="all">All Modes</option>
                <option value="mainnet">Mainnet</option>
                <option value="testnet">Testnet</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-purple-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-32">
              <select
                className="w-full h-10 rounded-md border border-purple-700/30 bg-purple-950/70 px-3 py-2 text-sm text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-purple-400 pointer-events-none" />
            </div>
          </div>
          {(dateRange.from || statusFilter !== "all" || networkFilter !== "all" || networkModeFilter !== "all") && (
            <div className="flex justify-end mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 border-purple-700/30 bg-purple-950/70 text-purple-300 hover:text-white hover:bg-purple-800/50"
              >
                <X className="mr-1 h-4 w-4" /> Clear all filters
              </Button>
            </div>
          )}
        </div>

        {(dateRange.from || statusFilter !== "all" || networkFilter !== "all" || networkModeFilter !== "all") && (
          <div className="p-3 bg-purple-900/30 rounded-md border border-purple-700/30 text-sm text-purple-300">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-medium">Active filters:</span>
              {dateRange.from && dateRange.to && (
                <span className="px-2 py-1 bg-purple-800/40 rounded-md text-xs">
                  Date: {format(dateRange.from, "dd.MM.yyyy")} - {format(dateRange.to, "dd.MM.yyyy")}
                </span>
              )}
              {networkFilter !== "all" && (
                <span className="px-2 py-1 bg-purple-800/40 rounded-md text-xs">Network: {networkFilter}</span>
              )}
              {networkModeFilter !== "all" && (
                <span className="px-2 py-1 bg-purple-800/40 rounded-md text-xs">
                  Mode: {networkModeFilter === "testnet" ? "Testnet" : "Mainnet"}
                </span>
              )}
              {statusFilter !== "all" && (
                <span className="px-2 py-1 bg-purple-800/40 rounded-md text-xs">Status: {statusFilter}</span>
              )}
              <span className="ml-auto text-xs">
                Found: {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}

        {/* Column Headers */}
        <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gradient-to-r from-purple-800/40 to-purple-900/40 rounded-md border border-purple-800/40 text-sm font-medium text-purple-300">
          <div>Date</div>
          <div className="text-center">Network</div>
          <div className="text-center">Amount</div>
          <div className="text-right">Status</div>
        </div>

        {/* Transactions Cards - Single Line Format */}
        {isMobile ? (
          // Mobile view - card-based layout
          <div className="divide-y divide-purple-800/30">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-3 sm:p-4 hover:bg-purple-800/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-purple-100 text-sm sm:text-base">{transaction.date}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${getStatusBadgeClass(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <div className="text-xs text-purple-400 space-y-1 mb-3">
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <span className="text-purple-100">{transaction.network}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="text-purple-100 font-medium">{transaction.amount} USDT</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 sm:p-8 text-center text-purple-300 text-sm sm:text-base">
                No transactions match your filters. Try adjusting your search criteria.
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <Card
                  key={transaction.id}
                  className="bg-gradient-to-r from-purple-900/90 to-purple-950 border-purple-800/40 shadow-md hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px] animate-slide-up"
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="text-sm font-medium text-purple-300">{transaction.date}</div>
                      <div className="text-center">
                        <span className="text-sm font-medium text-white">{transaction.network}</span>
                        {transaction.isTestnet && (
                          <span className="ml-2 text-xs px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                            Testnet
                          </span>
                        )}
                      </div>
                      <div className="text-center font-bold text-white">{transaction.amount} USDT</div>
                      <div className="flex justify-end">
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                            transaction.status,
                          )}`}
                        >
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-gradient-to-r from-purple-950/95 to-purple-950 border-purple-800/30 shadow-md">
                <CardContent className="p-8 text-center">
                  <p className="text-purple-300">No transactions match your filters.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 border-purple-700/30 bg-purple-950/70 text-purple-300 hover:text-white hover:bg-purple-800/50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>

            <div className="text-sm text-purple-300 px-2">
              Page {currentPage} of {totalPages}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 border-purple-700/30 bg-purple-950/70 text-purple-300 hover:text-white hover:bg-purple-800/50 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        )}
      </div>
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-gradient-to-br from-purple-900/90 to-purple-950 border border-purple-800/40 text-purple-100 w-[90%] max-w-md mx-auto animate-fade-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white text-center">Confirm Withdrawal</DialogTitle>
            <DialogDescription className="text-purple-300 text-center">
              Please review your withdrawal details before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-purple-800/30 p-4 rounded-md border border-purple-700/40">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-purple-300">Network:</div>
                <div className="text-white font-medium text-right">{network}</div>

                <div className="text-purple-300">Wallet Address:</div>
                <div className="text-white font-medium text-right break-all">{getMaskedAddress()}</div>

                <div className="text-purple-300">Amount:</div>
                <div className="text-white font-medium text-right">{amount} USDT</div>

                <div className="text-purple-300">Fee:</div>
                <div className="text-white font-medium text-right">{getNetworkFee().toFixed(2)} USDT</div>

                <div className="text-purple-300 font-medium">Total Deduction:</div>
                <div className="text-white font-bold text-right">{getTotalWithFee().toFixed(2)} USDT</div>
              </div>
            </div>

            <div className="bg-purple-800/30 p-4 rounded-md border border-purple-700/40">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-purple-300">Current Balance:</div>
                <div className="text-white font-medium text-right">{balance.toFixed(2)} USDT</div>

                <div className="text-purple-300 font-medium">Remaining Balance:</div>
                <div className="text-white font-bold text-right">{getRemainingBalance().toFixed(2)} USDT</div>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-amber-900/20 rounded-md border border-amber-700/30">
              <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-300">
                Please verify all details carefully. Withdrawals cannot be reversed once confirmed.
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-3 mt-2">
            <Button
              type="button"
              variant="outline"
              className="border-purple-700/30 bg-purple-900/30 text-purple-300 hover:text-white hover:bg-purple-800/50 w-full"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium w-full"
              onClick={confirmWithdrawal}
            >
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
