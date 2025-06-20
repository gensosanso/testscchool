export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectName?: string;
  teacherId: string;
  teacherName?: string;
  classId: string;
  className?: string;
  dueDate: string;
  dueTime: string;
  assignedDate: string;
  totalMarks: number;
  instructions: string;
  attachments: string[];
  status: "draft" | "assigned" | "submitted" | "graded" | "overdue";
  priority: "low" | "medium" | "high";
  submissionType: "online" | "offline" | "both";
  allowLateSubmission: boolean;
  createdAt: string;
  updatedAt: string;
  submissions?: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  attachments: string[];
  grade?: number;
  feedback?: string;
  status: "submitted" | "graded" | "late" | "missing";
  gradedAt?: string;
  gradedBy?: string;
}

export interface AssignmentResult {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  submissionId?: string;
  grade: number;
  maxGrade: number;
  percentage: number;
  feedback: string;
  status: "graded" | "pending" | "absent";
  gradedAt: string;
  gradedBy: string;
  gradedByName: string;
}
