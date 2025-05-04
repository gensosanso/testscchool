import { Schedule } from "../types/schedule";

// Mock data for schedules
const mockSchedules: Schedule[] = [
  {
    id: "sch-001",
    title: "Mathematics Class",
    type: "class",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    dayOfWeek: "monday",
    startTime: "09:00",
    endTime: "10:30",
    recurrence: "weekly",
    location: "Room 101",
    status: "active",
    description: "Regular mathematics class for Grade 10",
    classId: "cls-001",
    className: "Grade 10-A",
    teacherId: "tch-001",
    teacherName: "John Smith",
    subjectId: "sub-001",
    subjectName: "Mathematics",
  },
  {
    id: "sch-002",
    title: "Science Lab",
    type: "class",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    dayOfWeek: "wednesday",
    startTime: "11:00",
    endTime: "12:30",
    recurrence: "weekly",
    location: "Science Lab 2",
    status: "active",
    description: "Science laboratory session for Grade 10",
    classId: "cls-001",
    className: "Grade 10-A",
    teacherId: "tch-002",
    teacherName: "Emily Johnson",
    subjectId: "sub-002",
    subjectName: "Science",
  },
  {
    id: "sch-003",
    title: "English Literature",
    type: "class",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    dayOfWeek: "friday",
    startTime: "13:00",
    endTime: "14:30",
    recurrence: "weekly",
    location: "Room 105",
    status: "active",
    description: "English literature class for Grade 10",
    classId: "cls-001",
    className: "Grade 10-A",
    teacherId: "tch-003",
    teacherName: "Robert Brown",
    subjectId: "sub-003",
    subjectName: "English",
  },
  {
    id: "sch-004",
    title: "Mid-term Examination",
    type: "exam",
    startDate: "2023-10-15",
    endDate: "2023-10-15",
    dayOfWeek: "monday",
    startTime: "09:00",
    endTime: "11:00",
    recurrence: "none",
    location: "Examination Hall",
    status: "active",
    description: "Mid-term examination for all subjects",
    classId: "cls-001",
    className: "Grade 10-A",
  },
  {
    id: "sch-005",
    title: "Parent-Teacher Meeting",
    type: "event",
    startDate: "2023-11-05",
    endDate: "2023-11-05",
    dayOfWeek: "saturday",
    startTime: "14:00",
    endTime: "17:00",
    recurrence: "none",
    location: "School Auditorium",
    status: "active",
    description: "Regular parent-teacher meeting to discuss student progress",
  },
];

// Get all schedules
export const getAllSchedules = (): Promise<Schedule[]> => {
  return Promise.resolve(mockSchedules);
};

// Get schedule by ID
export const getScheduleById = (id: string): Promise<Schedule | undefined> => {
  const schedule = mockSchedules.find((s) => s.id === id);
  return Promise.resolve(schedule);
};

// Get schedules by class ID
export const getSchedulesByClassId = (classId: string): Promise<Schedule[]> => {
  const schedules = mockSchedules.filter((s) => s.classId === classId);
  return Promise.resolve(schedules);
};

// Get schedules by teacher ID
export const getSchedulesByTeacherId = (
  teacherId: string,
): Promise<Schedule[]> => {
  const schedules = mockSchedules.filter((s) => s.teacherId === teacherId);
  return Promise.resolve(schedules);
};

// Create a new schedule
export const createSchedule = (
  schedule: Omit<Schedule, "id">,
): Promise<Schedule> => {
  const newSchedule = {
    ...schedule,
    id: `sch-${mockSchedules.length + 1}`.padStart(7, "0"),
  };
  mockSchedules.push(newSchedule);
  return Promise.resolve(newSchedule);
};

// Update an existing schedule
export const updateSchedule = (
  id: string,
  schedule: Partial<Schedule>,
): Promise<Schedule | undefined> => {
  const index = mockSchedules.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockSchedules[index] = { ...mockSchedules[index], ...schedule };
    return Promise.resolve(mockSchedules[index]);
  }
  return Promise.resolve(undefined);
};

// Delete a schedule
export const deleteSchedule = (id: string): Promise<boolean> => {
  const index = mockSchedules.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockSchedules.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};
