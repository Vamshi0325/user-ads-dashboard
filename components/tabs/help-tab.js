"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { MessageSquare, Clock, CheckCircle, AlertCircle, Search } from "lucide-react"

export function HelpTab() {
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample support tickets data
  const ticketsData = [
    {
      id: "TKT-2024-001",
      subject: "API Integration Issue",
      date: "15.04.2024",
      status: "Open",
      priority: "High",
    },
    {
      id: "TKT-2024-002",
      subject: "Billing Question",
      date: "10.04.2024",
      status: "Closed",
      priority: "Medium",
    },
    {
      id: "TKT-2024-003",
      subject: "Feature Request",
      date: "05.04.2024",
      status: "In Progress",
      priority: "Low",
    },
    {
      id: "TKT-2024-004",
      subject: "Account Access Problem",
      date: "01.04.2024",
      status: "Open",
      priority: "Critical",
    },
  ]

  const [tickets, setTickets] = useState(ticketsData)

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
      <h1 className="text-xl md:text-2xl font-bold text-white">Help & Support</h1>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-purple-100">Contact Support</CardTitle>
            <CardDescription className="text-purple-300">Get help from our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-purple-200">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Enter subject"
                className="bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-purple-200">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Describe your issue..."
                className="min-h-[120px] bg-purple-900/40 border-purple-700/30 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 border-none">
              <MessageSquare className="mr-2 h-4 w-4" /> Submit Request
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-purple-100">FAQs</CardTitle>
              <CardDescription className="text-purple-300">Frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "How do I reset my password?",
                "How can I upgrade my plan?",
                "What payment methods do you accept?",
                "How do I export my data?",
              ].map((faq, index) => (
                <div key={faq} className="space-y-1 p-3 rounded-lg hover:bg-purple-800/20 transition-colors">
                  <h3 className="font-medium text-purple-100 flex items-center gap-2">
                    <span className="flex items-center justify-center size-5 rounded-full bg-purple-700/50 text-xs">
                      {index + 1}
                    </span>
                    {faq}
                  </h3>
                  <p className="text-sm text-purple-300 ml-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Support Tickets */}
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-purple-100">Support Tickets</CardTitle>
              <CardDescription className="text-purple-300">View and manage your support requests</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-400" />
              <Input
                type="search"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-purple-900/40 border-purple-700/30 pl-8 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isMobile ? (
            // Mobile card view
            <div className="divide-y divide-purple-800/30">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 sm:p-4 hover:bg-purple-800/10">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-purple-100 text-sm sm:text-base pr-2">{ticket.subject}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${
                          ticket.status === "Open"
                            ? "bg-blue-500/20 text-blue-400"
                            : ticket.status === "In Progress"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <div className="text-xs text-purple-400 space-y-1 mb-3">
                      <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="text-purple-100">{ticket.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="text-purple-100">{ticket.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Priority:</span>
                        <span
                          className={`${
                            ticket.priority === "Critical"
                              ? "text-red-400"
                              : ticket.priority === "High"
                                ? "text-orange-400"
                                : ticket.priority === "Medium"
                                  ? "text-yellow-400"
                                  : "text-green-400"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50 flex-1 text-xs sm:text-sm"
                      >
                        <MessageSquare className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 sm:p-8 text-center text-purple-300 text-sm sm:text-base">
                  No tickets match your search. Try adjusting your search criteria.
                </div>
              )}
            </div>
          ) : (
            // Desktop table view with improved responsiveness
            <div className="w-full overflow-x-auto scrollbar-hide">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium text-purple-100">{ticket.id}</TableCell>
                        <TableCell className="text-purple-100">{ticket.subject}</TableCell>
                        <TableCell className="text-purple-100">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-purple-400" />
                            {ticket.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`${
                              ticket.priority === "Critical"
                                ? "text-red-400"
                                : ticket.priority === "High"
                                  ? "text-orange-400"
                                  : ticket.priority === "Medium"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              ticket.status === "Open"
                                ? "bg-blue-500/20 text-blue-400"
                                : ticket.status === "In Progress"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {ticket.status === "Open" && <AlertCircle className="mr-1 h-3 w-3" />}
                            {ticket.status === "In Progress" && <Clock className="mr-1 h-3 w-3" />}
                            {ticket.status === "Closed" && <CheckCircle className="mr-1 h-3 w-3" />}
                            {ticket.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-purple-700/50 bg-purple-800/20 text-purple-300 hover:text-white hover:bg-purple-700/50"
                          >
                            <MessageSquare className="mr-1 h-4 w-4" /> View Ticket
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-purple-300">
                        No tickets match your search. Try adjusting your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
