"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getPaymentById,
  getInvoiceById,
  getInstallmentPlanById,
  updatePayment,
  updateInvoice,
  updateInstallmentPlan,
} from "@/services/financeService";
import { Payment, Invoice, InstallmentPlan } from "@/types/finance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FinanceItem = Payment | Invoice | InstallmentPlan;
type FinanceType = "payment" | "invoice" | "installment";

export default function EditFinancePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [financeItem, setFinanceItem] = useState<FinanceItem | null>(null);
  const [financeType, setFinanceType] = useState<FinanceType | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinanceItem = async () => {
      try {
        // Try to fetch as payment first
        const paymentData = await getPaymentById(params.id);
        if (paymentData) {
          setFinanceItem(paymentData);
          setFinanceType("payment");
          setFormData(paymentData);
          setIsLoading(false);
          return;
        }

        // Try to fetch as invoice
        const invoiceData = await getInvoiceById(params.id);
        if (invoiceData) {
          setFinanceItem(invoiceData);
          setFinanceType("invoice");
          setFormData(invoiceData);
          setIsLoading(false);
          return;
        }

        // Try to fetch as installment plan
        const planData = await getInstallmentPlanById(params.id);
        if (planData) {
          setFinanceItem(planData);
          setFinanceType("installment");
          setFormData(planData);
          setIsLoading(false);
          return;
        }

        // If we get here, the item wasn't found
        setError("Finance item not found");
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load finance item");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchFinanceItem();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!financeType) return;

    setIsSubmitting(true);
    try {
      switch (financeType) {
        case "payment":
          await updatePayment(params.id, formData);
          break;
        case "invoice":
          await updateInvoice(params.id, formData);
          break;
        case "installment":
          await updateInstallmentPlan(params.id, formData);
          break;
      }
      router.push(`/dashboard/finance/${params.id}`);
    } catch (err) {
      setError("Failed to update item");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-red-500">{error}</p>
        <Button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
        >
          Go Back
        </Button>
      </div>
    );
  }

  if (!financeItem || !financeType) {
    return null;
  }

  const renderPaymentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              name="studentName"
              value={formData.studentName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount || 0}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Payment Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="method">Payment Method</Label>
            <Select
              value={formData.method || ""}
              onValueChange={(value) => handleSelectChange("method", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Check">Check</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || ""}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );

  const renderInvoiceForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              name="studentName"
              value={formData.studentName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount || 0}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Issue Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || ""}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );

  const renderInstallmentPlanForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              name="studentName"
              value={formData.studentName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              type="number"
              step="0.01"
              value={formData.totalAmount || 0}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="paidAmount">Paid Amount</Label>
            <Input
              id="paidAmount"
              name="paidAmount"
              type="number"
              step="0.01"
              value={formData.paidAmount || 0}
              onChange={handleNumberChange}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="remainingAmount">Remaining Amount</Label>
            <Input
              id="remainingAmount"
              name="remainingAmount"
              type="number"
              step="0.01"
              value={formData.remainingAmount || 0}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="nextDueDate">Next Due Date</Label>
            <Input
              id="nextDueDate"
              name="nextDueDate"
              type="date"
              value={formData.nextDueDate || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || ""}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="due-soon">Due Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {financeType === "payment"
            ? "Edit Payment"
            : financeType === "invoice"
              ? "Edit Invoice"
              : "Edit Installment Plan"}
        </h1>
        <p className="text-muted-foreground">
          Update the details of the{" "}
          {financeType === "payment"
            ? "payment"
            : financeType === "invoice"
              ? "invoice"
              : "installment plan"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {financeType === "payment"
              ? "Payment Details"
              : financeType === "invoice"
                ? "Invoice Details"
                : "Installment Plan Details"}
          </CardTitle>
          <CardDescription>
            ID: {financeItem.id} | Student: {formData.studentName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {financeType === "payment" && renderPaymentForm()}
          {financeType === "invoice" && renderInvoiceForm()}
          {financeType === "installment" && renderInstallmentPlanForm()}
        </CardContent>
      </Card>
    </div>
  );
}
