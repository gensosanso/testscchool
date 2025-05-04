import { Lesson } from "@/types/lesson";

// Mock data for lessons
const lessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to Algebra",
    description: "Basic concepts of algebraic expressions and equations",
    subjectId: "1", // Mathematics
    teacherId: "2", // Jane Smith
    classId: "1", // Class 10A
    duration: 60,
    date: "2023-10-15",
    startTime: "09:00",
    materials: ["Textbook Chapter 1", "Worksheet 1A", "Online Calculator"],
    objectives: [
      "Understand basic algebraic notation",
      "Solve simple equations",
      "Apply algebra to real-world problems",
    ],
    status: "completed",
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-09-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Cell Structure and Function",
    description: "Exploring the basic unit of life - the cell",
    subjectId: "2", // Biology
    teacherId: "3", // Robert Johnson
    classId: "2", // Class 9B
    duration: 90,
    date: "2023-10-16",
    startTime: "11:00",
    materials: [
      "Biology Textbook Chapter 3",
      "Microscope Slides",
      "Cell Diagram Handout",
    ],
    objectives: [
      "Identify cell organelles",
      "Understand cell membrane function",
      "Compare plant and animal cells",
    ],
    status: "scheduled",
    createdAt: "2023-09-02T14:30:00Z",
    updatedAt: "2023-09-02T14:30:00Z",
  },
  {
    id: "3",
    title: "French Revolution",
    description: "Historical analysis of the French Revolution and its impact",
    subjectId: "3", // History
    teacherId: "4", // Sarah Williams
    classId: "3", // Class 11C
    duration: 120,
    date: "2023-10-17",
    startTime: "13:30",
    materials: [
      "History Textbook Chapter 5",
      "Revolution Timeline Handout",
      "Documentary Video",
    ],
    objectives: [
      "Understand causes of the French Revolution",
      "Analyze key events and figures",
      "Evaluate the revolution's impact on modern democracy",
    ],
    status: "scheduled",
    createdAt: "2023-09-03T09:15:00Z",
    updatedAt: "2023-09-03T09:15:00Z",
  },
  {
    id: "4",
    title: "Chemical Bonding",
    description: "Understanding ionic, covalent, and metallic bonds",
    subjectId: "4", // Chemistry
    teacherId: "5", // Michael Brown
    classId: "4", // Class 12D
    duration: 90,
    date: "2023-10-18",
    startTime: "10:15",
    materials: [
      "Chemistry Textbook Chapter 4",
      "Molecular Model Kit",
      "Bonding Worksheet",
    ],
    objectives: [
      "Differentiate between bond types",
      "Predict molecular shapes",
      "Understand bond energy concepts",
    ],
    status: "cancelled",
    createdAt: "2023-09-04T11:45:00Z",
    updatedAt: "2023-09-10T08:30:00Z",
  },
  {
    id: "5",
    title: "Shakespeare's Macbeth",
    description: "Literary analysis of themes and characters in Macbeth",
    subjectId: "5", // English Literature
    teacherId: "1", // John Doe
    classId: "5", // Class 11A
    duration: 120,
    date: "2023-10-19",
    startTime: "14:00",
    materials: [
      "Macbeth Complete Text",
      "Character Analysis Handout",
      "Film Adaptation Clips",
    ],
    objectives: [
      "Analyze major themes in Macbeth",
      "Understand character motivations",
      "Compare text to film adaptation",
    ],
    status: "scheduled",
    createdAt: "2023-09-05T13:20:00Z",
    updatedAt: "2023-09-05T13:20:00Z",
  },
];

// Get all lessons
export const getAllLessons = async (): Promise<Lesson[]> => {
  return lessons;
};

// Get lesson by ID
export const getLessonById = async (id: string): Promise<Lesson | null> => {
  const lesson = lessons.find((l) => l.id === id);
  return lesson || null;
};

// Get lessons by subject ID
export const getLessonsBySubject = async (
  subjectId: string,
): Promise<Lesson[]> => {
  return lessons.filter((lesson) => lesson.subjectId === subjectId);
};

// Get lessons by teacher ID
export const getLessonsByTeacher = async (
  teacherId: string,
): Promise<Lesson[]> => {
  return lessons.filter((lesson) => lesson.teacherId === teacherId);
};

// Get lessons by class ID
export const getLessonsByClass = async (classId: string): Promise<Lesson[]> => {
  return lessons.filter((lesson) => lesson.classId === classId);
};

// Create a new lesson
export const createLesson = async (
  lessonData: Omit<Lesson, "id" | "createdAt" | "updatedAt">,
): Promise<Lesson> => {
  const newLesson: Lesson = {
    ...lessonData,
    id: (lessons.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  lessons.push(newLesson);
  return newLesson;
};

// Update an existing lesson
export const updateLesson = async (
  id: string,
  lessonData: Partial<Lesson>,
): Promise<Lesson | null> => {
  const index = lessons.findIndex((l) => l.id === id);

  if (index === -1) {
    return null;
  }

  const updatedLesson = {
    ...lessons[index],
    ...lessonData,
    updatedAt: new Date().toISOString(),
  };

  lessons[index] = updatedLesson;
  return updatedLesson;
};

// Delete a lesson
export const deleteLesson = async (id: string): Promise<boolean> => {
  const index = lessons.findIndex((l) => l.id === id);

  if (index === -1) {
    return false;
  }

  lessons.splice(index, 1);
  return true;
};
