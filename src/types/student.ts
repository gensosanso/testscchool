export interface Student {
  id: string;
  name: string;
  class: string;
  grade: string;
  status: "active" | "inactive" | "suspended";
  avatar: string;
  personalInfo: {
    dateOfBirth: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    parentName: string;
    parentContact: string;
  };
  academicHistory: {
    year: string;
    grade: string;
    performance: string;
    attendance: string;
  }[];
  behavioralRecords: {
    date: string;
    incident: string;
    description: string;
    action: string;
  }[];
  financialStatus: {
    tuitionFee: number;
    paid: number;
    due: number;
    nextPaymentDate: string;
    paymentHistory: {
      date: string;
      amount: number;
      method: string;
      status: string;
    }[];
  };
}
