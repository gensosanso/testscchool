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
  isExam?: boolean;
  totalMarks?: number;
  passingMarks?: number;
  questions?: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  marks: number;
  type: "multiple-choice" | "short-answer" | "essay" | "true-false";
  options?: string[];
  correctAnswer?: string;
}
