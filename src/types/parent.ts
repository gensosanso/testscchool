export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  children: {
    id: string;
    name: string;
    class: string;
    grade: string;
  }[];
  paymentHistory: {
    date: string;
    amount: number;
    method: string;
    status: string;
    description: string;
  }[];
  communicationPreferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    appNotifications: boolean;
    language: string;
  };
}
