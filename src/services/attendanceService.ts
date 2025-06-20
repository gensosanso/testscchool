import {
  AttendanceRecord,
  AttendanceSession,
  AttendanceStatistics,
  AttendanceFilters,
} from "@/types/attendance";

// Mock data for development
const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT001",
    studentId: "STD001",
    studentName: "Emma Johnson",
    classId: "1",
    className: "Class 6A",
    date: "2023-12-01",
    status: "present",
    timeIn: "08:00",
    timeOut: "15:00",
    markedBy: "John Smith",
    markedAt: "2023-12-01T08:05:00Z",
  },
  {
    id: "ATT002",
    studentId: "STD002",
    studentName: "Michael Chen",
    classId: "1",
    className: "Class 6A",
    date: "2023-12-01",
    status: "late",
    timeIn: "08:15",
    timeOut: "15:00",
    notes: "Traffic delay",
    markedBy: "John Smith",
    markedAt: "2023-12-01T08:20:00Z",
  },
  {
    id: "ATT003",
    studentId: "STD003",
    studentName: "Sophia Martinez",
    classId: "1",
    className: "Class 6A",
    date: "2023-12-01",
    status: "absent",
    notes: "Sick leave",
    markedBy: "John Smith",
    markedAt: "2023-12-01T08:30:00Z",
  },
  {
    id: "ATT004",
    studentId: "STD001",
    studentName: "Emma Johnson",
    classId: "1",
    className: "Class 6A",
    date: "2023-12-02",
    status: "present",
    timeIn: "07:55",
    timeOut: "15:00",
    markedBy: "John Smith",
    markedAt: "2023-12-02T08:00:00Z",
  },
  {
    id: "ATT005",
    studentId: "STD002",
    studentName: "Michael Chen",
    classId: "1",
    className: "Class 6A",
    date: "2023-12-02",
    status: "excused",
    notes: "Medical appointment",
    markedBy: "John Smith",
    markedAt: "2023-12-02T08:00:00Z",
  },
];

const mockAttendanceSessions: AttendanceSession[] = [
  {
    id: "SES001",
    classId: "1",
    className: "Class 6A",
    date: "2023-12-01",
    startTime: "08:00",
    endTime: "15:00",
    subject: "General",
    teacherId: "1",
    teacherName: "John Smith",
    totalStudents: 25,
    presentCount: 22,
    absentCount: 2,
    lateCount: 1,
    excusedCount: 0,
    attendanceRecords: mockAttendanceRecords.filter(
      (r) => r.date === "2023-12-01",
    ),
    status: "completed",
    createdAt: "2023-12-01T07:30:00Z",
    updatedAt: "2023-12-01T15:30:00Z",
  },
  {
    id: "SES002",
    classId: "1",
    className: "Class 6A",
    date: "2023-12-02",
    startTime: "08:00",
    endTime: "15:00",
    subject: "General",
    teacherId: "1",
    teacherName: "John Smith",
    totalStudents: 25,
    presentCount: 23,
    absentCount: 1,
    lateCount: 0,
    excusedCount: 1,
    attendanceRecords: mockAttendanceRecords.filter(
      (r) => r.date === "2023-12-02",
    ),
    status: "completed",
    createdAt: "2023-12-02T07:30:00Z",
    updatedAt: "2023-12-02T15:30:00Z",
  },
];

export const attendanceService = {
  // Get all attendance records with optional filters
  getAttendanceRecords: async (
    filters?: AttendanceFilters,
  ): Promise<AttendanceRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredRecords = [...mockAttendanceRecords];

        if (filters) {
          if (filters.classId) {
            filteredRecords = filteredRecords.filter(
              (r) => r.classId === filters.classId,
            );
          }
          if (filters.studentId) {
            filteredRecords = filteredRecords.filter(
              (r) => r.studentId === filters.studentId,
            );
          }
          if (filters.dateFrom) {
            filteredRecords = filteredRecords.filter(
              (r) => r.date >= filters.dateFrom!,
            );
          }
          if (filters.dateTo) {
            filteredRecords = filteredRecords.filter(
              (r) => r.date <= filters.dateTo!,
            );
          }
          if (filters.status) {
            filteredRecords = filteredRecords.filter(
              (r) => r.status === filters.status,
            );
          }
        }

        resolve(filteredRecords);
      }, 300);
    });
  },

  // Get attendance record by ID
  getAttendanceRecordById: async (
    id: string,
  ): Promise<AttendanceRecord | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const record = mockAttendanceRecords.find((r) => r.id === id);
        resolve(record || null);
      }, 200);
    });
  },

  // Create new attendance record
  createAttendanceRecord: async (
    record: Omit<AttendanceRecord, "id" | "markedAt">,
  ): Promise<AttendanceRecord> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRecord: AttendanceRecord = {
          ...record,
          id: `ATT${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          markedAt: new Date().toISOString(),
        };
        mockAttendanceRecords.push(newRecord);
        resolve(newRecord);
      }, 400);
    });
  },

  // Update attendance record
  updateAttendanceRecord: async (
    id: string,
    updates: Partial<AttendanceRecord>,
  ): Promise<AttendanceRecord | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockAttendanceRecords.findIndex((r) => r.id === id);
        if (index !== -1) {
          mockAttendanceRecords[index] = {
            ...mockAttendanceRecords[index],
            ...updates,
          };
          resolve(mockAttendanceRecords[index]);
        } else {
          resolve(null);
        }
      }, 400);
    });
  },

  // Delete attendance record
  deleteAttendanceRecord: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockAttendanceRecords.findIndex((r) => r.id === id);
        if (index !== -1) {
          mockAttendanceRecords.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Get all attendance sessions
  getAttendanceSessions: async (filters?: {
    classId?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<AttendanceSession[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredSessions = [...mockAttendanceSessions];

        if (filters) {
          if (filters.classId) {
            filteredSessions = filteredSessions.filter(
              (s) => s.classId === filters.classId,
            );
          }
          if (filters.dateFrom) {
            filteredSessions = filteredSessions.filter(
              (s) => s.date >= filters.dateFrom!,
            );
          }
          if (filters.dateTo) {
            filteredSessions = filteredSessions.filter(
              (s) => s.date <= filters.dateTo!,
            );
          }
        }

        resolve(filteredSessions);
      }, 300);
    });
  },

  // Get attendance session by ID
  getAttendanceSessionById: async (
    id: string,
  ): Promise<AttendanceSession | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = mockAttendanceSessions.find((s) => s.id === id);
        resolve(session || null);
      }, 200);
    });
  },

  // Create new attendance session
  createAttendanceSession: async (
    session: Omit<AttendanceSession, "id" | "createdAt" | "updatedAt">,
  ): Promise<AttendanceSession> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSession: AttendanceSession = {
          ...session,
          id: `SES${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockAttendanceSessions.push(newSession);
        resolve(newSession);
      }, 400);
    });
  },

  // Update attendance session
  updateAttendanceSession: async (
    id: string,
    updates: Partial<AttendanceSession>,
  ): Promise<AttendanceSession | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockAttendanceSessions.findIndex((s) => s.id === id);
        if (index !== -1) {
          mockAttendanceSessions[index] = {
            ...mockAttendanceSessions[index],
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockAttendanceSessions[index]);
        } else {
          resolve(null);
        }
      }, 400);
    });
  },

  // Get attendance statistics
  getAttendanceStatistics: async (
    filters?: AttendanceFilters,
  ): Promise<AttendanceStatistics> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = mockAttendanceRecords;
        const totalRecords = records.length;
        const presentCount = records.filter(
          (r) => r.status === "present",
        ).length;
        const absentCount = records.filter((r) => r.status === "absent").length;
        const lateCount = records.filter((r) => r.status === "late").length;
        const excusedCount = records.filter(
          (r) => r.status === "excused",
        ).length;

        const stats: AttendanceStatistics = {
          totalSessions: mockAttendanceSessions.length,
          totalStudents: 25,
          overallAttendanceRate:
            totalRecords > 0
              ? Math.round(((presentCount + lateCount) / totalRecords) * 100)
              : 0,
          presentRate:
            totalRecords > 0
              ? Math.round((presentCount / totalRecords) * 100)
              : 0,
          absentRate:
            totalRecords > 0
              ? Math.round((absentCount / totalRecords) * 100)
              : 0,
          lateRate:
            totalRecords > 0 ? Math.round((lateCount / totalRecords) * 100) : 0,
          excusedRate:
            totalRecords > 0
              ? Math.round((excusedCount / totalRecords) * 100)
              : 0,
          dailyStats: [
            {
              date: "2023-12-01",
              totalStudents: 25,
              presentCount: 23,
              attendanceRate: 92,
            },
            {
              date: "2023-12-02",
              totalStudents: 25,
              presentCount: 24,
              attendanceRate: 96,
            },
          ],
          classStats: [
            {
              classId: "1",
              className: "Class 6A",
              totalStudents: 25,
              attendanceRate: 94,
            },
            {
              classId: "2",
              className: "Class 7B",
              totalStudents: 28,
              attendanceRate: 91,
            },
          ],
          studentStats: [
            {
              studentId: "STD001",
              studentName: "Emma Johnson",
              totalSessions: 2,
              presentCount: 2,
              attendanceRate: 100,
            },
            {
              studentId: "STD002",
              studentName: "Michael Chen",
              totalSessions: 2,
              presentCount: 1,
              attendanceRate: 50,
            },
          ],
        };

        resolve(stats);
      }, 500);
    });
  },

  // Bulk mark attendance for a class
  bulkMarkAttendance: async (
    records: Omit<AttendanceRecord, "id" | "markedAt">[],
  ): Promise<AttendanceRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRecords = records.map((record) => ({
          ...record,
          id: `ATT${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          markedAt: new Date().toISOString(),
        }));

        mockAttendanceRecords.push(...newRecords);
        resolve(newRecords);
      }, 600);
    });
  },
};
