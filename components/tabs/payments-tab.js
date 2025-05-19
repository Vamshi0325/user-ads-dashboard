"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { subMonths } from "date-fns"
import { ReceiptPage } from "./receipt-page"

export function PaymentsTab() {
  // Current date for the example
  const today = new Date(2025, 4, 16) // May 16, 2025
  const lastMonth = subMonths(today, 1) // April 16, 2025

  // Sample transaction data
  const transactions = [
    {
      date: "02.05.2025",
      status: "SUCCESS",
      transactionId: "618241",
      paymentMethod: "USDT TRC",
      amount: 987.62,
      fee: 0.0,
      amountSent: 987.62,
      receipt: true,
    },
  ]

  const [selectedTransaction, setSelectedTransaction] = useState(null)

  // Calculate totals
  const totalFee = transactions.reduce((sum, transaction) => sum + transaction.fee, 0)
  const totalAmountSent = transactions.reduce((sum, transaction) => sum + transaction.amountSent, 0)

  // If a receipt is selected, show the receipt page
  if (selectedTransaction) {
    return <ReceiptPage transaction={selectedTransaction} onBack={() => setSelectedTransaction(null)} />
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold text-black dark:text-white">Payments</h1>

      {/* Funds available card */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">$ 508.63</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Funds you earned during April can be withdrawn on June 2 via USDT TRC. The minimum withdrawal is $100.
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            If your payment day is set to a weekend or holiday please expect the payment at the beginning of the
            following week. In case you have any questions feel free to write to us at{" "}
            <a href="mailto:contact.us@propellerads.com" className="text-purple-600 dark:text-purple-400">
              contact.us@propellerads.com
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-black dark:text-white">$ 1,631.70</h3>
            <p className="text-gray-500 dark:text-gray-400">Total balance - earnings since the previous payment.</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-black dark:text-white">$ 1,123.07</h3>
            <p className="text-gray-500 dark:text-gray-400">Hold balance.</p>
            <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
              <span>Current period - 1 month</span>
              <Info className="h-4 w-4 ml-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-black dark:text-white">$ 4,115.26</h3>
            <p className="text-gray-500 dark:text-gray-400">Total withdrawals</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="font-medium">
                  Date <ChevronDown className="inline h-4 w-4 ml-1" />
                </TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Transaction id</TableHead>
                <TableHead className="font-medium">Payment Method</TableHead>
                <TableHead className="font-medium">Amount</TableHead>
                <TableHead className="font-medium">Fee</TableHead>
                <TableHead className="font-medium">Amount sent</TableHead>
                <TableHead className="font-medium">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index} className="border-t border-gray-200 dark:border-gray-700">
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400">
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>$ {transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>$ {transaction.fee.toFixed(2)}</TableCell>
                  <TableCell>$ {transaction.amountSent.toFixed(2)}</TableCell>
                  <TableCell>
                    {transaction.receipt && (
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                        title="View Receipt"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                          <path d="M10 9H8" />
                        </svg>
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 dark:bg-gray-800 font-medium">
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>$ {totalFee.toFixed(2)}</TableCell>
                <TableCell>$ {totalAmountSent.toFixed(2)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">page 1 of 1</p>
      </div>
    </div>
  )
}
