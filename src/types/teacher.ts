export interface Teacher {
  id: string;
  name: string;
  subject: string;
  department: string;
  status: "active" | "inactive" | "on leave";
  avatar: string;
  personalInfo: {
    dateOfBirth: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    emergencyContact: string;
    emergencyPhone: string;
  };
  professionalInfo: {
    qualification: string;
    experience: string;
    joinDate: string;
    specialization: string;
    certifications: string[];
  };
  classesAssigned: {
    className: string;
    grade: string;
    schedule: string;
    students: number;
  }[];
  performanceReviews: {
    date: string;
    reviewer: string;
    rating: number;
    comments: string;
  }[];
  financialDetails: {
    salary: number;
    lastPaymentDate: string;
    bankDetails: string;
    taxInfo: string;
    paymentHistory: {
      date: string;
      amount: number;
      type: string;
      status: string;
    }[];
  };
}
