export interface Payment {
  id: string;
  studentName: string;
  amount: number;
  date: string;
  method: string;
  status: "paid" | "pending" | "overdue";
  notes?: string;
}

export interface Invoice {
  id: string;
  studentName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  description?: string;
}

export interface InstallmentPlan {
  id: string;
  studentName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  nextDueDate: string;
  status: "active" | "completed" | "overdue" | "due-soon";
}
