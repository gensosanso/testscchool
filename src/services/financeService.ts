import { Payment, Invoice, InstallmentPlan } from "@/types/finance";

// Mock data for payments
const payments: Payment[] = [
  {
    id: "PAY-001",
    studentName: "Emma Johnson",
    amount: 500,
    date: "2023-05-15",
    method: "Credit Card",
    status: "paid",
    notes: "Monthly tuition payment",
  },
  {
    id: "PAY-002",
    studentName: "Noah Williams",
    amount: 750,
    date: "2023-05-14",
    method: "Bank Transfer",
    status: "paid",
    notes: "Quarterly tuition payment",
  },
  {
    id: "PAY-003",
    studentName: "Olivia Brown",
    amount: 500,
    date: "2023-05-10",
    method: "Cash",
    status: "paid",
    notes: "Monthly tuition payment",
  },
  {
    id: "PAY-004",
    studentName: "Liam Davis",
    amount: 750,
    date: "2023-05-01",
    method: "Credit Card",
    status: "paid",
    notes: "Quarterly tuition payment",
  },
  {
    id: "PAY-005",
    studentName: "Sophia Miller",
    amount: 500,
    date: "2023-04-28",
    method: "Bank Transfer",
    status: "paid",
    notes: "Monthly tuition payment",
  },
];

// Mock data for invoices
const invoices: Invoice[] = [
  {
    id: "INV-001",
    studentName: "Ava Wilson",
    amount: 500,
    date: "2023-05-01",
    dueDate: "2023-05-30",
    status: "pending",
    description: "Monthly tuition fee",
  },
  {
    id: "INV-002",
    studentName: "Mason Taylor",
    amount: 750,
    date: "2023-05-01",
    dueDate: "2023-05-30",
    status: "pending",
    description: "Quarterly tuition fee",
  },
  {
    id: "INV-003",
    studentName: "Isabella Anderson",
    amount: 500,
    date: "2023-05-01",
    dueDate: "2023-05-30",
    status: "pending",
    description: "Monthly tuition fee",
  },
  {
    id: "INV-004",
    studentName: "James Thomas",
    amount: 750,
    date: "2023-04-01",
    dueDate: "2023-04-30",
    status: "overdue",
    description: "Quarterly tuition fee",
  },
  {
    id: "INV-005",
    studentName: "Charlotte Jackson",
    amount: 500,
    date: "2023-04-01",
    dueDate: "2023-04-30",
    status: "overdue",
    description: "Monthly tuition fee",
  },
];

// Mock data for installment plans
const installmentPlans: InstallmentPlan[] = [
  {
    id: "PLAN-001",
    studentName: "Emma Johnson",
    totalAmount: 2000,
    paidAmount: 1000,
    remainingAmount: 1000,
    nextDueDate: "2023-06-15",
    status: "active",
  },
  {
    id: "PLAN-002",
    studentName: "Noah Williams",
    totalAmount: 3000,
    paidAmount: 1000,
    remainingAmount: 2000,
    nextDueDate: "2023-06-01",
    status: "due-soon",
  },
  {
    id: "PLAN-003",
    studentName: "Olivia Brown",
    totalAmount: 2000,
    paidAmount: 500,
    remainingAmount: 1500,
    nextDueDate: "2023-05-15",
    status: "overdue",
  },
  {
    id: "PLAN-004",
    studentName: "Liam Davis",
    totalAmount: 3000,
    paidAmount: 3000,
    remainingAmount: 0,
    nextDueDate: "",
    status: "completed",
  },
];

// Get all payments
export const getAllPayments = async (): Promise<Payment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payments), 500);
  });
};

// Get payment by ID
export const getPaymentById = async (id: string): Promise<Payment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const payment = payments.find((p) => p.id === id) || null;
      resolve(payment);
    }, 500);
  });
};

// Create a new payment
export const createPayment = async (
  data: Omit<Payment, "id">,
): Promise<Payment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPayment: Payment = {
        ...data,
        id: `PAY-${String(payments.length + 1).padStart(3, "0")}`,
      };
      payments.push(newPayment);
      resolve(newPayment);
    }, 500);
  });
};

// Update a payment
export const updatePayment = async (
  id: string,
  data: Omit<Payment, "id">,
): Promise<Payment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = payments.findIndex((p) => p.id === id);
      if (index !== -1) {
        const updatedPayment: Payment = { ...data, id };
        payments[index] = updatedPayment;
        resolve(updatedPayment);
      } else {
        reject(new Error("Payment not found"));
      }
    }, 500);
  });
};

// Delete a payment
export const deletePayment = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = payments.findIndex((p) => p.id === id);
      if (index !== -1) {
        payments.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Payment not found"));
      }
    }, 500);
  });
};

// Get all invoices
export const getAllInvoices = async (): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(invoices), 500);
  });
};

// Get invoice by ID
export const getInvoiceById = async (id: string): Promise<Invoice | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const invoice = invoices.find((i) => i.id === id) || null;
      resolve(invoice);
    }, 500);
  });
};

// Create a new invoice
export const createInvoice = async (
  data: Omit<Invoice, "id">,
): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newInvoice: Invoice = {
        ...data,
        id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      };
      invoices.push(newInvoice);
      resolve(newInvoice);
    }, 500);
  });
};

// Update an invoice
export const updateInvoice = async (
  id: string,
  data: Omit<Invoice, "id">,
): Promise<Invoice> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = invoices.findIndex((i) => i.id === id);
      if (index !== -1) {
        const updatedInvoice: Invoice = { ...data, id };
        invoices[index] = updatedInvoice;
        resolve(updatedInvoice);
      } else {
        reject(new Error("Invoice not found"));
      }
    }, 500);
  });
};

// Delete an invoice
export const deleteInvoice = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = invoices.findIndex((i) => i.id === id);
      if (index !== -1) {
        invoices.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Invoice not found"));
      }
    }, 500);
  });
};

// Get all installment plans
export const getAllInstallmentPlans = async (): Promise<InstallmentPlan[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(installmentPlans), 500);
  });
};

// Get installment plan by ID
export const getInstallmentPlanById = async (
  id: string,
): Promise<InstallmentPlan | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = installmentPlans.find((p) => p.id === id) || null;
      resolve(plan);
    }, 500);
  });
};

// Create a new installment plan
export const createInstallmentPlan = async (
  data: Omit<InstallmentPlan, "id">,
): Promise<InstallmentPlan> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPlan: InstallmentPlan = {
        ...data,
        id: `PLAN-${String(installmentPlans.length + 1).padStart(3, "0")}`,
      };
      installmentPlans.push(newPlan);
      resolve(newPlan);
    }, 500);
  });
};

// Update an installment plan
export const updateInstallmentPlan = async (
  id: string,
  data: Omit<InstallmentPlan, "id">,
): Promise<InstallmentPlan> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = installmentPlans.findIndex((p) => p.id === id);
      if (index !== -1) {
        const updatedPlan: InstallmentPlan = { ...data, id };
        installmentPlans[index] = updatedPlan;
        resolve(updatedPlan);
      } else {
        reject(new Error("Installment plan not found"));
      }
    }, 500);
  });
};

// Delete an installment plan
export const deleteInstallmentPlan = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = installmentPlans.findIndex((p) => p.id === id);
      if (index !== -1) {
        installmentPlans.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Installment plan not found"));
      }
    }, 500);
  });
};
