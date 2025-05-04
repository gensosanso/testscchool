export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  grade: string;
  department: string;
  credits: number;
  status: "active" | "inactive";
  teachers: {
    id: string;
    name: string;
  }[];
  classes: {
    id: string;
    name: string;
  }[];
}
