export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  academicYear: string;
  room: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  subjects: {
    name: string;
    teacherId: string;
    teacherName: string;
  }[];
  students: {
    id: string;
    name: string;
  }[];
  classTeacher: {
    id: string;
    name: string;
  };
  status: "active" | "inactive";
  capacity: number;
  currentStrength: number;
  description?: string;
}
