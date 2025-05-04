export interface Schedule {
  id: string;
  title: string;
  type: "class" | "teacher" | "student" | "exam" | "event";
  startDate: string;
  endDate: string;
  dayOfWeek:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  startTime: string;
  endTime: string;
  recurrence: "daily" | "weekly" | "monthly" | "none";
  location: string;
  status: "active" | "cancelled" | "completed";
  description?: string;

  // Relations
  classId?: string;
  className?: string;
  teacherId?: string;
  teacherName?: string;
  subjectId?: string;
  subjectName?: string;
  studentIds?: string[];
  studentNames?: string[];
}
