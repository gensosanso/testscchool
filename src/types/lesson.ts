export interface Lesson {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  duration: number; // in minutes
  date: string;
  startTime: string;
  materials: string[];
  objectives: string[];
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
