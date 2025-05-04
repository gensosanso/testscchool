import { Subject } from "@/types/subject";

// Mock data for development purposes
const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    code: "MATH101",
    description:
      "Basic mathematics including algebra, geometry, and trigonometry",
    grade: "6",
    department: "Science",
    credits: 4,
    status: "active",
    teachers: [
      {
        id: "1",
        name: "John Smith",
      },
      {
        id: "4",
        name: "David Wilson",
      },
    ],
    classes: [
      {
        id: "1",
        name: "Class 6A",
      },
      {
        id: "2",
        name: "Class 7B",
      },
    ],
  },
  {
    id: "2",
    name: "Science",
    code: "SCI101",
    description: "Introduction to basic scientific concepts and principles",
    grade: "6",
    department: "Science",
    credits: 4,
    status: "active",
    teachers: [
      {
        id: "2",
        name: "Sarah Johnson",
      },
    ],
    classes: [
      {
        id: "1",
        name: "Class 6A",
      },
      {
        id: "2",
        name: "Class 7B",
      },
    ],
  },
  {
    id: "3",
    name: "English",
    code: "ENG101",
    description: "English language and literature fundamentals",
    grade: "6",
    department: "Humanities",
    credits: 3,
    status: "active",
    teachers: [
      {
        id: "3",
        name: "Michael Brown",
      },
      {
        id: "5",
        name: "Emily Davis",
      },
    ],
    classes: [
      {
        id: "1",
        name: "Class 6A",
      },
      {
        id: "2",
        name: "Class 7B",
      },
    ],
  },
  {
    id: "4",
    name: "History",
    code: "HIST101",
    description: "Introduction to world history and civilizations",
    grade: "7",
    department: "Humanities",
    credits: 3,
    status: "active",
    teachers: [
      {
        id: "6",
        name: "Robert Taylor",
      },
    ],
    classes: [
      {
        id: "2",
        name: "Class 7B",
      },
    ],
  },
  {
    id: "5",
    name: "Physical Education",
    code: "PE101",
    description: "Physical fitness and sports activities",
    grade: "6,7",
    department: "Physical Education",
    credits: 2,
    status: "active",
    teachers: [
      {
        id: "7",
        name: "Jennifer Adams",
      },
    ],
    classes: [
      {
        id: "1",
        name: "Class 6A",
      },
      {
        id: "2",
        name: "Class 7B",
      },
    ],
  },
];

export const subjectService = {
  // Get all subjects
  getSubjects: async (): Promise<Subject[]> => {
    // In a real application, this would be an API call
    return Promise.resolve(mockSubjects);
  },

  // Get a subject by ID
  getSubjectById: async (id: string): Promise<Subject | undefined> => {
    // In a real application, this would be an API call
    return Promise.resolve(mockSubjects.find((s) => s.id === id));
  },

  // Create a new subject
  createSubject: async (subjectData: Omit<Subject, "id">): Promise<Subject> => {
    // In a real application, this would be an API call
    const newSubject: Subject = {
      ...subjectData,
      id: Math.random().toString(36).substring(2, 9),
    };
    mockSubjects.push(newSubject);
    return Promise.resolve(newSubject);
  },

  // Update a subject
  updateSubject: async (
    id: string,
    subjectData: Partial<Subject>,
  ): Promise<Subject | undefined> => {
    // In a real application, this would be an API call
    const index = mockSubjects.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockSubjects[index] = { ...mockSubjects[index], ...subjectData };
      return Promise.resolve(mockSubjects[index]);
    }
    return Promise.resolve(undefined);
  },

  // Delete a subject
  deleteSubject: async (id: string): Promise<boolean> => {
    // In a real application, this would be an API call
    const index = mockSubjects.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockSubjects.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
};
