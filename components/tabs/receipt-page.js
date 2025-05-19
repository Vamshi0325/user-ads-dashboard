"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, FileText } from "lucide-react"
import { generateReceiptPDF } from "@/utils/pdf-generator"

export function ReceiptPage({ transaction, onBack }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = () => {
    setIsLoading(true)

    // Generate PDF
    generateReceiptPDF(transaction)

    // Reset loading state after a delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (!transaction) return null

  return (
    <div className="space-y-4 md:space-y-6 max-w-full overflow-x-hidden px-2 sm:px-0">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="mr-2 sm:mr-4 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 h-8 w-8 sm:h-9 sm:w-auto p-0 sm:p-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Back</span>
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center">
            <FileText className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
            Payment Receipt
          </h1>
        </div>
        <Button
          onClick={handleDownload}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium w-full sm:w-auto mt-2 sm:mt-0"
          disabled={isLoading}
        >
          <Download className="mr-2 h-4 w-4" />
          {isLoading ? "Generating PDF..." : "Download PDF"}
        </Button>
      </div>

      {/* Receipt Content */}
      <div className="bg-gradient-to-br from-purple-900/90 to-purple-950 border border-purple-800/40 rounded-lg shadow-xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">Payment Receipt</h3>
          <div className="text-right">
            <p className="text-lg font-bold text-purple-100">
              mon<span className="text-green-400">$</span>tag
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="text-right space-y-1">
          <p className="text-xs sm:text-sm">
            <span className="text-purple-300">Payment date:</span>{" "}
            <span className="text-white">{transaction.date}</span>
          </p>
          <p className="text-xs sm:text-sm">
            <span className="text-purple-300">Payment method:</span>{" "}
            <span className="text-white">{transaction.paymentMethod}</span>
          </p>
          <p className="text-xs sm:text-sm">
            <span className="text-purple-300">Payment number:</span>{" "}
            <span className="text-white">{transaction.transactionId}</span>
          </p>
        </div>

        {/* From/To Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-2 p-3 sm:p-4 bg-purple-900/30 rounded-md border border-purple-800/30">
            <h4 className="text-purple-200 font-medium">FROM:</h4>
            <div className="space-y-1 text-white">
              <p>Name: Adtech Agency FZ - LLC</p>
              <p className="text-xs sm:text-sm text-purple-300">
                Address: DMC-BLD05-VD-G00-667, Ground Floor, DMC5, Dubai
              </p>
              <p className="text-xs sm:text-sm text-purple-300">Media City, Dubai, United Arab Emirates</p>
              <p className="text-xs sm:text-sm">VAT Number: 100489163400003</p>
            </div>
          </div>

          <div className="space-y-2 p-3 sm:p-4 bg-purple-900/30 rounded-md border border-purple-800/30">
            <h4 className="text-purple-200 font-medium">TO:</h4>
            <div className="space-y-1 text-white">
              <p>Name: String Fintech HK Limited</p>
              <p className="text-xs sm:text-sm text-purple-300">Address: UNIT 1307A, 13/F, TWO HARBOURFRONT, 22 TAK</p>
              <p className="text-xs sm:text-sm text-purple-300">FUNG STREET, HUNG HOM, HONG KONG, Hong Kong</p>
              <p className="text-xs sm:text-sm">VAT Number: </p>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <table className="w-full border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-purple-800 text-white">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-purple-100 text-xs sm:text-sm">
                  Description
                </th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-purple-100 text-xs sm:text-sm w-[100px] sm:w-[150px]">
                  SUM, USD
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple-800/20">
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-white text-xs sm:text-sm">Online advertising services</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-white text-xs sm:text-sm">
                  {transaction.amount.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-purple-800 text-white font-medium">
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-white font-bold text-xs sm:text-sm">Total:</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-white font-bold text-xs sm:text-sm">
                  {transaction.amount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="space-y-2 p-3 sm:p-4 bg-purple-900/30 rounded-md border border-purple-800/30">
          <h4 className="text-purple-200 font-medium">Payment details:</h4>
          <p className="text-white text-xs sm:text-sm">Account: *****************************TpJsP</p>
        </div>
      </div>
    </div>
  )
}
