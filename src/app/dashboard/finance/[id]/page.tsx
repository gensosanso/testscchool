"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPaymentById,
  getInvoiceById,
  getInstallmentPlanById,
  deletePayment,
  deleteInvoice,
  deleteInstallmentPlan,
} from "@/services/financeService";
import { Payment, Invoice, InstallmentPlan } from "@/types/finance";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type FinanceItem = Payment | Invoice | InstallmentPlan;
type FinanceType = "payment" | "invoice" | "installment";

export default function FinanceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [financeItem, setFinanceItem] = useState<FinanceItem | null>(null);
  const [financeType, setFinanceType] = useState<FinanceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinanceItem = async () => {
      try {
        // Try to fetch as payment first
        const paymentData = await getPaymentById(params.id);
        if (paymentData) {
          setFinanceItem(paymentData);
          setFinanceType("payment");
          setLoading(false);
          return;
        }

        // Try to fetch as invoice
        const invoiceData = await getInvoiceById(params.id);
        if (invoiceData) {
          setFinanceItem(invoiceData);
          setFinanceType("invoice");
          setLoading(false);
          return;
        }

        // Try to fetch as installment plan
        const planData = await getInstallmentPlanById(params.id);
        if (planData) {
          setFinanceItem(planData);
          setFinanceType("installment");
          setLoading(false);
          return;
        }

        // If we get here, the item wasn't found
        setError("Finance item not found");
        setLoading(false);
      } catch (err) {
        setError("Failed to load finance item");
        console.error(err);
        setLoading(false);
      }
    };

    fetchFinanceItem();
  }, [params.id]);

  const handleDelete = async () => {
    if (!financeType || !financeItem) return;

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        switch (financeType) {
          case "payment":
            await deletePayment(params.id);
            break;
          case "invoice":
            await deleteInvoice(params.id);
            break;
          case "installment":
            await deleteInstallmentPlan(params.id);
            break;
        }
        router.push("/dashboard/finance");
      } catch (err) {
        console.error("Failed to delete item:", err);
      }
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/finance/edit/${params.id}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
      case "active":
        return "default";
      case "pending":
      case "due-soon":
        return "secondary";
      case "overdue":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p>Please wait while we fetch the details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">{error}</h2>
          <p>Unable to load the requested item.</p>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/finance")}
            className="mt-4"
          >
            Back to Finance
          </Button>
        </div>
      </div>
    );
  }

  if (!financeItem || !financeType) {
    return null;
  }

  const renderPaymentDetails = (payment: Payment) => (
    <>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Payment {payment.id}</CardTitle>
            <CardDescription>
              Payment from {payment.studentName}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(payment.status)}>
            {capitalizeFirstLetter(payment.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">${payment.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{formatDate(payment.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-medium">{payment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">
                  {capitalizeFirstLetter(payment.status)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Student Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student:</span>
                <span className="font-medium">{payment.studentName}</span>
              </div>
              {payment.notes && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Notes:</span>
                  <span className="font-medium">{payment.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );

  const renderInvoiceDetails = (invoice: Invoice) => (
    <>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Invoice {invoice.id}</CardTitle>
            <CardDescription>Invoice for {invoice.studentName}</CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(invoice.status)}>
            {capitalizeFirstLetter(invoice.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Invoice Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">${invoice.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date:</span>
                <span className="font-medium">{formatDate(invoice.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">
                  {formatDate(invoice.dueDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">
                  {capitalizeFirstLetter(invoice.status)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Student Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student:</span>
                <span className="font-medium">{invoice.studentName}</span>
              </div>
              {invoice.description && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="font-medium">{invoice.description}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );

  const renderInstallmentPlanDetails = (plan: InstallmentPlan) => (
    <>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Payment Plan {plan.id}</CardTitle>
            <CardDescription>
              Payment plan for {plan.studentName}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(plan.status)}>
            {capitalizeFirstLetter(plan.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Plan Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-medium">${plan.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paid Amount:</span>
                <span className="font-medium">${plan.paidAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="font-medium">${plan.remainingAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Due Date:</span>
                <span className="font-medium">
                  {plan.nextDueDate ? formatDate(plan.nextDueDate) : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">
                  {capitalizeFirstLetter(plan.status)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Student Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student:</span>
                <span className="font-medium">{plan.studentName}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {financeType === "payment"
            ? "Payment Details"
            : financeType === "invoice"
              ? "Invoice Details"
              : "Installment Plan Details"}
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/finance")}
          >
            Back
          </Button>
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        {financeType === "payment" &&
          renderPaymentDetails(financeItem as Payment)}
        {financeType === "invoice" &&
          renderInvoiceDetails(financeItem as Invoice)}
        {financeType === "installment" &&
          renderInstallmentPlanDetails(financeItem as InstallmentPlan)}
        <CardFooter>
          <p className="text-sm text-muted-foreground">ID: {financeItem.id}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
