"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  DollarSign,
  Download,
  FileText,
  PieChart,
  Plus,
  Search,
  Users,
} from "lucide-react";

interface Payment {
  id: string;
  studentName: string;
  amount: number;
  date: string;
  method: string;
  status: "paid" | "pending" | "overdue";
}

interface Invoice {
  id: string;
  studentName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

export default function FinancialManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewPaymentDialog, setShowNewPaymentDialog] = useState(false);
  const [showNewInvoiceDialog, setShowNewInvoiceDialog] = useState(false);
  const [searchPayments, setSearchPayments] = useState("");
  const [searchInvoices, setSearchInvoices] = useState("");
  const [searchInstallments, setSearchInstallments] = useState("");

  // Mock data for payments
  const recentPayments: Payment[] = [
    {
      id: "PAY-001",
      studentName: "Emma Johnson",
      amount: 500,
      date: "2023-05-15",
      method: "Credit Card",
      status: "paid",
    },
    {
      id: "PAY-002",
      studentName: "Noah Williams",
      amount: 750,
      date: "2023-05-14",
      method: "Bank Transfer",
      status: "paid",
    },
    {
      id: "PAY-003",
      studentName: "Olivia Brown",
      amount: 500,
      date: "2023-05-10",
      method: "Cash",
      status: "paid",
    },
    {
      id: "PAY-004",
      studentName: "Liam Davis",
      amount: 750,
      date: "2023-05-01",
      method: "Credit Card",
      status: "paid",
    },
    {
      id: "PAY-005",
      studentName: "Sophia Miller",
      amount: 500,
      date: "2023-04-28",
      method: "Bank Transfer",
      status: "paid",
    },
  ];

  // Mock data for invoices
  const pendingInvoices: Invoice[] = [
    {
      id: "INV-001",
      studentName: "Ava Wilson",
      amount: 500,
      date: "2023-05-01",
      dueDate: "2023-05-30",
      status: "pending",
    },
    {
      id: "INV-002",
      studentName: "Mason Taylor",
      amount: 750,
      date: "2023-05-01",
      dueDate: "2023-05-30",
      status: "pending",
    },
    {
      id: "INV-003",
      studentName: "Isabella Anderson",
      amount: 500,
      date: "2023-05-01",
      dueDate: "2023-05-30",
      status: "pending",
    },
    {
      id: "INV-004",
      studentName: "James Thomas",
      amount: 750,
      date: "2023-04-01",
      dueDate: "2023-04-30",
      status: "overdue",
    },
    {
      id: "INV-005",
      studentName: "Charlotte Jackson",
      amount: 500,
      date: "2023-04-01",
      dueDate: "2023-04-30",
      status: "overdue",
    },
  ];

  const getStatusBadge = (status: "paid" | "pending" | "overdue") => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Management</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewInvoiceDialog(true)}>
            <FileText className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
          <Button onClick={() => setShowNewPaymentDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="installments">Installments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">$24,500</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Outstanding Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">$7,250</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  15 pending invoices
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <PieChart className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">78%</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">245</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +3 new this month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>The last 5 payments received</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.studentName}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/dashboard/finance/${payment.id}`)
                            }
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Invoices</CardTitle>
                <CardDescription>Invoices awaiting payment</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.studentName}</TableCell>
                        <TableCell>${invoice.amount}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/dashboard/finance/${invoice.id}`)
                            }
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>
                Monthly revenue for the current year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <BarChart className="h-40 w-40 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Payment History</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search payments..."
                      className="pl-8 w-[250px]"
                      value={searchPayments}
                      onChange={(e) => setSearchPayments(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...recentPayments, ...recentPayments].map(
                    (payment, index) => (
                      <TableRow key={`${payment.id}-${index}`}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.studentName}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/dashboard/finance/${payment.id}`)
                            }
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Invoices</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search invoices..."
                      className="pl-8 w-[250px]"
                      value={searchInvoices}
                      onChange={(e) => setSearchInvoices(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...pendingInvoices, ...pendingInvoices].map(
                    (invoice, index) => (
                      <TableRow key={`${invoice.id}-${index}`}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.studentName}</TableCell>
                        <TableCell>${invoice.amount}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                (window.location.href = `/dashboard/finance/${invoice.id}`)
                              }
                            >
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Print
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Installments Tab */}
        <TabsContent value="installments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Installment Plans</CardTitle>
              <CardDescription>
                Track payment plans and installments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search student..."
                      className="pl-8 w-[250px]"
                      value={searchInstallments}
                      onChange={(e) => setSearchInstallments(e.target.value)}
                    />
                  </div>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Plan
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Plan ID</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Emma Johnson</TableCell>
                    <TableCell>PLAN-001</TableCell>
                    <TableCell>$2,000</TableCell>
                    <TableCell>$1,000</TableCell>
                    <TableCell>$1,000</TableCell>
                    <TableCell>2023-06-15</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/dashboard/finance/PLAN-001`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Noah Williams</TableCell>
                    <TableCell>PLAN-002</TableCell>
                    <TableCell>$3,000</TableCell>
                    <TableCell>$1,000</TableCell>
                    <TableCell>$2,000</TableCell>
                    <TableCell>2023-06-01</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500">Due Soon</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/dashboard/finance/PLAN-002`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Olivia Brown</TableCell>
                    <TableCell>PLAN-003</TableCell>
                    <TableCell>$2,000</TableCell>
                    <TableCell>$500</TableCell>
                    <TableCell>$1,500</TableCell>
                    <TableCell>2023-05-15</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">Overdue</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/dashboard/finance/PLAN-003`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Liam Davis</TableCell>
                    <TableCell>PLAN-004</TableCell>
                    <TableCell>$3,000</TableCell>
                    <TableCell>$3,000</TableCell>
                    <TableCell>$0</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500">Completed</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/dashboard/finance/PLAN-004`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Generate and view financial reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Revenue Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Summary of all revenue by period
                    </p>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">
                      Outstanding Balances
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      List of all unpaid invoices and balances
                    </p>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Analysis of payment methods used
                    </p>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Custom Report</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="revenue">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="outstanding">
                          Outstanding Balances
                        </SelectItem>
                        <SelectItem value="methods">Payment Methods</SelectItem>
                        <SelectItem value="students">
                          Student Payments
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Select defaultValue="month">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Payment Dialog */}
      <Dialog
        open={showNewPaymentDialog}
        onOpenChange={setShowNewPaymentDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
            <DialogDescription>
              Enter the details of the payment received from a student.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Student</label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emma">Emma Johnson</SelectItem>
                    <SelectItem value="noah">Noah Williams</SelectItem>
                    <SelectItem value="olivia">Olivia Brown</SelectItem>
                    <SelectItem value="liam">Liam Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Amount</label>
              <div className="col-span-3">
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Date</label>
              <div className="col-span-3">
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Method</label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Notes</label>
              <div className="col-span-3">
                <Input placeholder="Optional notes about this payment" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowNewPaymentDialog(false)}>
              Save Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Invoice Dialog */}
      <Dialog
        open={showNewInvoiceDialog}
        onOpenChange={setShowNewInvoiceDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for a student.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Student</label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emma">Emma Johnson</SelectItem>
                    <SelectItem value="noah">Noah Williams</SelectItem>
                    <SelectItem value="olivia">Olivia Brown</SelectItem>
                    <SelectItem value="liam">Liam Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Amount</label>
              <div className="col-span-3">
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">
                Issue Date
              </label>
              <div className="col-span-3">
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Due Date</label>
              <div className="col-span-3">
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">
                Description
              </label>
              <div className="col-span-3">
                <Input placeholder="e.g. Tuition fee for Spring 2023" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewInvoiceDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowNewInvoiceDialog(false)}>
              Create Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
