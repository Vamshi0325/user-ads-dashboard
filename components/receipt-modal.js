"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { generateReceiptPDF } from "@/utils/pdf-generator"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"

export function ReceiptModal({ isOpen, onClose, transaction }) {
  const [isLoading, setIsLoading] = useState(false)

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscKey)
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  const handleDownload = () => {
    setIsLoading(true)

    // Simulate loading for better UX
    setTimeout(() => {
      generateReceiptPDF(transaction)
      setIsLoading(false)
    }, 500)
  }

  if (!isOpen || !transaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-900/90 to-purple-950 border border-purple-800/40 text-purple-100 w-[90%] sm:w-[600px] max-w-3xl">
        <DialogHeader className="border-b border-purple-800/40 pb-4">
          <DialogTitle className="text-lg font-medium text-white flex items-center">
            <FileText className="mr-2 h-5 w-5 text-purple-400" />
            Payment Receipt
          </DialogTitle>
        </DialogHeader>

        {/* Receipt Content */}
        <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
          {/* Header Section */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white text-center">Payment Receipt</h3>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-purple-300 text-sm">Payment date:</p>
                <p className="text-white">{transaction.date}</p>
              </div>
              <div>
                <p className="text-purple-300 text-sm">Payment method:</p>
                <p className="text-white">{transaction.paymentMethod}</p>
              </div>
              <div>
                <p className="text-purple-300 text-sm">Payment number:</p>
                <p className="text-white">{transaction.transactionId}</p>
              </div>
            </div>
          </div>

          {/* From/To Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-4 bg-purple-900/30 rounded-md border border-purple-800/30">
              <h4 className="text-purple-200 font-medium">FROM:</h4>
              <div className="space-y-1 text-white">
                <p>Adtech Agency FZ - LLC</p>
                <p className="text-sm text-purple-300">DMC-BLD05-VD-G00-667, Ground Floor, DMC5, Dubai</p>
                <p className="text-sm text-purple-300">Media City, Dubai, United Arab Emirates</p>
                <p className="text-sm">VAT Number: 100489163400003</p>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-purple-900/30 rounded-md border border-purple-800/30">
              <h4 className="text-purple-200 font-medium">TO:</h4>
              <div className="space-y-1 text-white">
                <p>String Fintech HK Limited</p>
                <p className="text-sm text-purple-300">UNIT 1307A, 13/F, TWO HARBOURFRONT, 22 TAK</p>
                <p className="text-sm text-purple-300">FUNG STREET, HUNG HOM, HONG KONG, Hong Kong</p>
                <p className="text-sm">VAT Number: </p>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-purple-800/40">
                  <th className="text-left py-2 text-purple-200">Description</th>
                  <th className="text-right py-2 text-purple-200">SUM, USD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-purple-800/20">
                  <td className="py-3 text-white">Online advertising services</td>
                  <td className="py-3 text-right text-white">{transaction.amount.toFixed(2)}</td>
                </tr>
                <tr className="bg-purple-800/20 font-medium">
                  <td className="py-3 text-white">Total:</td>
                  <td className="py-3 text-right text-white">{transaction.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Details */}
          <div className="space-y-2 p-4 bg-purple-900/30 rounded-md border border-purple-800/30">
            <h4 className="text-purple-200 font-medium">Payment details:</h4>
            <p className="text-white">Account: *****************************TpJsP</p>
          </div>
        </div>

        <DialogFooter className="pt-2 border-t border-purple-800/40">
          <Button
            onClick={handleDownload}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            {isLoading ? "Downloading..." : "Download PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
