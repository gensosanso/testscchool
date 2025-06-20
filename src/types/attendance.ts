export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  timeIn?: string;
  timeOut?: string;
  notes?: string;
  markedBy: string;
  markedAt: string;
}

export interface AttendanceSession {
  id: string;
  classId: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  subject?: string;
  teacherId: string;
  teacherName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRecords: AttendanceRecord[];
  status: "active" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceStatistics {
  totalSessions: number;
  totalStudents: number;
  overallAttendanceRate: number;
  presentRate: number;
  absentRate: number;
  lateRate: number;
  excusedRate: number;
  dailyStats: {
    date: string;
    totalStudents: number;
    presentCount: number;
    attendanceRate: number;
  }[];
  classStats: {
    classId: string;
    className: string;
    totalStudents: number;
    attendanceRate: number;
  }[];
  studentStats: {
    studentId: string;
    studentName: string;
    totalSessions: number;
    presentCount: number;
    attendanceRate: number;
  }[];
}

export interface AttendanceFilters {
  classId?: string;
  studentId?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: AttendanceRecord["status"];
}
