import { Class } from "@/types/class";

// Mock data for development purposes
const mockClasses: Class[] = [
  {
    id: "1",
    name: "Class 6A",
    grade: "6",
    section: "A",
    academicYear: "2023-2024",
    room: "101",
    schedule: [
      {
        day: "Monday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Tuesday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Wednesday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Thursday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Friday",
        startTime: "08:00",
        endTime: "14:00",
      },
    ],
    subjects: [
      {
        name: "Mathematics",
        teacherId: "1",
        teacherName: "John Smith",
      },
      {
        name: "Science",
        teacherId: "2",
        teacherName: "Sarah Johnson",
      },
      {
        name: "English",
        teacherId: "3",
        teacherName: "Michael Brown",
      },
    ],
    students: [
      {
        id: "1",
        name: "Alice Cooper",
      },
      {
        id: "2",
        name: "Bob Wilson",
      },
      {
        id: "3",
        name: "Charlie Davis",
      },
    ],
    classTeacher: {
      id: "1",
      name: "John Smith",
    },
    status: "active",
    capacity: 30,
    currentStrength: 25,
    description: "Regular class for 6th grade students, section A",
  },
  {
    id: "2",
    name: "Class 7B",
    grade: "7",
    section: "B",
    academicYear: "2023-2024",
    room: "102",
    schedule: [
      {
        day: "Monday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Tuesday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Wednesday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Thursday",
        startTime: "08:00",
        endTime: "15:00",
      },
      {
        day: "Friday",
        startTime: "08:00",
        endTime: "14:00",
      },
    ],
    subjects: [
      {
        name: "Mathematics",
        teacherId: "4",
        teacherName: "David Wilson",
      },
      {
        name: "Science",
        teacherId: "2",
        teacherName: "Sarah Johnson",
      },
      {
        name: "English",
        teacherId: "5",
        teacherName: "Emily Davis",
      },
    ],
    students: [
      {
        id: "4",
        name: "Diana Prince",
      },
      {
        id: "5",
        name: "Edward Stark",
      },
      {
        id: "6",
        name: "Fiona Green",
      },
    ],
    classTeacher: {
      id: "4",
      name: "David Wilson",
    },
    status: "active",
    capacity: 30,
    currentStrength: 28,
    description: "Regular class for 7th grade students, section B",
  },
];

export const classService = {
  // Get all classes
  getClasses: async (): Promise<Class[]> => {
    // In a real application, this would be an API call
    return Promise.resolve(mockClasses);
  },

  // Get a class by ID
  getClassById: async (id: string): Promise<Class | undefined> => {
    // In a real application, this would be an API call
    return Promise.resolve(mockClasses.find((c) => c.id === id));
  },

  // Create a new class
  createClass: async (classData: Omit<Class, "id">): Promise<Class> => {
    // In a real application, this would be an API call
    const newClass: Class = {
      ...classData,
      id: Math.random().toString(36).substring(2, 9),
    };
    mockClasses.push(newClass);
    return Promise.resolve(newClass);
  },

  // Update a class
  updateClass: async (
    id: string,
    classData: Partial<Class>,
  ): Promise<Class | undefined> => {
    // In a real application, this would be an API call
    const index = mockClasses.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockClasses[index] = { ...mockClasses[index], ...classData };
      return Promise.resolve(mockClasses[index]);
    }
    return Promise.resolve(undefined);
  },

  // Delete a class
  deleteClass: async (id: string): Promise<boolean> => {
    // In a real application, this would be an API call
    const index = mockClasses.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockClasses.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
};
