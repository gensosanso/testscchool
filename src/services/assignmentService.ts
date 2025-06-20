import {
  Assignment,
  AssignmentSubmission,
  AssignmentResult,
} from "@/types/assignment";

// Mock data for assignments
const assignments: Assignment[] = [
  {
    id: "1",
    title: "Algebra Problem Set 1",
    description: "Complete exercises 1-20 from Chapter 3 on linear equations",
    subjectId: "1",
    subjectName: "Mathematics",
    teacherId: "TCH001",
    teacherName: "Dr. Robert Smith",
    classId: "1",
    className: "Class 6A",
    dueDate: "2023-11-15",
    dueTime: "23:59",
    assignedDate: "2023-11-01",
    totalMarks: 50,
    instructions:
      "Show all working steps. Use proper mathematical notation. Submit handwritten solutions.",
    attachments: ["algebra_worksheet.pdf", "formula_sheet.pdf"],
    status: "assigned",
    priority: "medium",
    submissionType: "offline",
    allowLateSubmission: true,
    createdAt: "2023-11-01T09:00:00Z",
    updatedAt: "2023-11-01T09:00:00Z",
  },
  {
    id: "2",
    title: "Essay: Climate Change Impact",
    description:
      "Write a 1000-word essay on the impact of climate change on local ecosystems",
    subjectId: "3",
    subjectName: "English",
    teacherId: "TCH002",
    teacherName: "Prof. Emily Johnson",
    classId: "2",
    className: "Class 7B",
    dueDate: "2023-11-20",
    dueTime: "18:00",
    assignedDate: "2023-11-05",
    totalMarks: 100,
    instructions:
      "Use MLA format. Include at least 5 credible sources. Submit as PDF through online portal.",
    attachments: ["essay_guidelines.pdf", "mla_format_guide.pdf"],
    status: "assigned",
    priority: "high",
    submissionType: "online",
    allowLateSubmission: false,
    createdAt: "2023-11-05T10:30:00Z",
    updatedAt: "2023-11-05T10:30:00Z",
  },
  {
    id: "3",
    title: "Physics Lab Report: Pendulum Motion",
    description:
      "Analyze pendulum motion data and write a comprehensive lab report",
    subjectId: "4",
    subjectName: "Physics",
    teacherId: "TCH003",
    teacherName: "Dr. Michael Chen",
    classId: "2",
    className: "Class 7B",
    dueDate: "2023-11-18",
    dueTime: "15:30",
    assignedDate: "2023-11-08",
    totalMarks: 75,
    instructions:
      "Include data tables, graphs, and error analysis. Follow standard lab report format.",
    attachments: ["lab_data.xlsx", "report_template.docx"],
    status: "assigned",
    priority: "medium",
    submissionType: "both",
    allowLateSubmission: true,
    createdAt: "2023-11-08T14:00:00Z",
    updatedAt: "2023-11-08T14:00:00Z",
  },
  {
    id: "4",
    title: "History Timeline Project",
    description: "Create an interactive timeline of World War II events",
    subjectId: "4",
    subjectName: "History",
    teacherId: "TCH001",
    teacherName: "Dr. Robert Smith",
    classId: "1",
    className: "Class 6A",
    dueDate: "2023-11-25",
    dueTime: "16:00",
    assignedDate: "2023-11-10",
    totalMarks: 80,
    instructions:
      "Use digital tools or poster format. Include major events, dates, and key figures.",
    attachments: ["timeline_requirements.pdf", "wwii_resources.pdf"],
    status: "assigned",
    priority: "low",
    submissionType: "both",
    allowLateSubmission: true,
    createdAt: "2023-11-10T11:15:00Z",
    updatedAt: "2023-11-10T11:15:00Z",
  },
  {
    id: "5",
    title: "Science Fair Project Proposal",
    description: "Submit a detailed proposal for your science fair project",
    subjectId: "2",
    subjectName: "Science",
    teacherId: "TCH002",
    teacherName: "Prof. Emily Johnson",
    classId: "1",
    className: "Class 6A",
    dueDate: "2023-11-12",
    dueTime: "12:00",
    assignedDate: "2023-10-28",
    totalMarks: 30,
    instructions:
      "Include hypothesis, methodology, and expected outcomes. Maximum 2 pages.",
    attachments: ["proposal_template.docx", "project_examples.pdf"],
    status: "overdue",
    priority: "high",
    submissionType: "online",
    allowLateSubmission: false,
    createdAt: "2023-10-28T08:45:00Z",
    updatedAt: "2023-10-28T08:45:00Z",
  },
];

// Get all assignments
export const getAllAssignments = async (): Promise<Assignment[]> => {
  return assignments;
};

// Get assignment by ID
export const getAssignmentById = async (
  id: string,
): Promise<Assignment | null> => {
  const assignment = assignments.find((a) => a.id === id);
  return assignment || null;
};

// Get assignments by subject ID
export const getAssignmentsBySubject = async (
  subjectId: string,
): Promise<Assignment[]> => {
  return assignments.filter((assignment) => assignment.subjectId === subjectId);
};

// Get assignments by teacher ID
export const getAssignmentsByTeacher = async (
  teacherId: string,
): Promise<Assignment[]> => {
  return assignments.filter((assignment) => assignment.teacherId === teacherId);
};

// Get assignments by class ID
export const getAssignmentsByClass = async (
  classId: string,
): Promise<Assignment[]> => {
  return assignments.filter((assignment) => assignment.classId === classId);
};

// Create a new assignment
export const createAssignment = async (
  assignmentData: Omit<Assignment, "id" | "createdAt" | "updatedAt">,
): Promise<Assignment> => {
  const newAssignment: Assignment = {
    ...assignmentData,
    id: (assignments.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  assignments.push(newAssignment);
  return newAssignment;
};

// Update an existing assignment
export const updateAssignment = async (
  id: string,
  assignmentData: Partial<Assignment>,
): Promise<Assignment | null> => {
  const index = assignments.findIndex((a) => a.id === id);

  if (index === -1) {
    return null;
  }

  const updatedAssignment = {
    ...assignments[index],
    ...assignmentData,
    updatedAt: new Date().toISOString(),
  };

  assignments[index] = updatedAssignment;
  return updatedAssignment;
};

// Delete an assignment
export const deleteAssignment = async (id: string): Promise<boolean> => {
  const index = assignments.findIndex((a) => a.id === id);

  if (index === -1) {
    return false;
  }

  assignments.splice(index, 1);
  return true;
};

// Get all subjects (for form dropdowns)
export const getAllSubjects = async () => {
  // This would typically come from subjectService
  return [
    { id: "1", name: "Mathematics" },
    { id: "2", name: "Science" },
    { id: "3", name: "English" },
    { id: "4", name: "History" },
    { id: "5", name: "Physics" },
  ];
};

// Get all teachers (for form dropdowns)
export const getAllTeachers = async () => {
  // This would typically come from teacherService
  return [
    { id: "TCH001", name: "Dr. Robert Smith" },
    { id: "TCH002", name: "Prof. Emily Johnson" },
    { id: "TCH003", name: "Dr. Michael Chen" },
  ];
};

// Get all classes (for form dropdowns)
export const getAllClasses = async () => {
  // This would typically come from classService
  return [
    { id: "1", name: "Class 6A" },
    { id: "2", name: "Class 7B" },
  ];
};

// Mock data for assignment results
const assignmentResults: AssignmentResult[] = [
  {
    id: "RES001",
    assignmentId: "1",
    studentId: "STD001",
    studentName: "Emma Johnson",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    submissionId: "SUB001",
    grade: 45,
    maxGrade: 50,
    percentage: 90,
    feedback:
      "Excellent work! All steps shown clearly and correct methodology used.",
    status: "graded",
    gradedAt: "2023-11-16T10:30:00Z",
    gradedBy: "TCH001",
    gradedByName: "Dr. Robert Smith",
  },
  {
    id: "RES002",
    assignmentId: "1",
    studentId: "STD002",
    studentName: "Michael Chen",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    submissionId: "SUB002",
    grade: 42,
    maxGrade: 50,
    percentage: 84,
    feedback: "Good work overall. Minor calculation errors in questions 15-17.",
    status: "graded",
    gradedAt: "2023-11-16T11:15:00Z",
    gradedBy: "TCH001",
    gradedByName: "Dr. Robert Smith",
  },
  {
    id: "RES003",
    assignmentId: "1",
    studentId: "STD003",
    studentName: "Sophia Martinez",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    grade: 0,
    maxGrade: 50,
    percentage: 0,
    feedback: "Assignment not submitted.",
    status: "absent",
    gradedAt: "2023-11-16T12:00:00Z",
    gradedBy: "TCH001",
    gradedByName: "Dr. Robert Smith",
  },
  {
    id: "RES004",
    assignmentId: "2",
    studentId: "STD001",
    studentName: "Emma Johnson",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    submissionId: "SUB003",
    grade: 92,
    maxGrade: 100,
    percentage: 92,
    feedback:
      "Outstanding essay with excellent research and clear arguments. Well-structured and engaging.",
    status: "graded",
    gradedAt: "2023-11-21T14:20:00Z",
    gradedBy: "TCH002",
    gradedByName: "Prof. Emily Johnson",
  },
  {
    id: "RES005",
    assignmentId: "2",
    studentId: "STD002",
    studentName: "Michael Chen",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    grade: 0,
    maxGrade: 100,
    percentage: 0,
    feedback: "",
    status: "pending",
    gradedAt: "",
    gradedBy: "",
    gradedByName: "",
  },
];

// Get results for a specific assignment
export const getAssignmentResults = async (
  assignmentId: string,
): Promise<AssignmentResult[]> => {
  return assignmentResults.filter(
    (result) => result.assignmentId === assignmentId,
  );
};

// Get result by ID
export const getResultById = async (
  resultId: string,
): Promise<AssignmentResult | null> => {
  const result = assignmentResults.find((r) => r.id === resultId);
  return result || null;
};

// Create or update a result
export const saveAssignmentResult = async (
  resultData: Omit<AssignmentResult, "id">,
): Promise<AssignmentResult> => {
  // Check if result already exists for this student and assignment
  const existingIndex = assignmentResults.findIndex(
    (r) =>
      r.assignmentId === resultData.assignmentId &&
      r.studentId === resultData.studentId,
  );

  if (existingIndex !== -1) {
    // Update existing result
    const updatedResult = {
      ...assignmentResults[existingIndex],
      ...resultData,
    };
    assignmentResults[existingIndex] = updatedResult;
    return updatedResult;
  } else {
    // Create new result
    const newResult: AssignmentResult = {
      ...resultData,
      id: `RES${(assignmentResults.length + 1).toString().padStart(3, "0")}`,
    };
    assignmentResults.push(newResult);
    return newResult;
  }
};

// Get assignment statistics
export const getAssignmentStatistics = async (assignmentId: string) => {
  const results = await getAssignmentResults(assignmentId);
  const gradedResults = results.filter((r) => r.status === "graded");

  if (gradedResults.length === 0) {
    return {
      totalStudents: results.length,
      gradedCount: 0,
      pendingCount: results.filter((r) => r.status === "pending").length,
      absentCount: results.filter((r) => r.status === "absent").length,
      averageGrade: 0,
      averagePercentage: 0,
      highestGrade: 0,
      lowestGrade: 0,
    };
  }

  const grades = gradedResults.map((r) => r.grade);
  const percentages = gradedResults.map((r) => r.percentage);

  return {
    totalStudents: results.length,
    gradedCount: gradedResults.length,
    pendingCount: results.filter((r) => r.status === "pending").length,
    absentCount: results.filter((r) => r.status === "absent").length,
    averageGrade: grades.reduce((sum, grade) => sum + grade, 0) / grades.length,
    averagePercentage:
      percentages.reduce((sum, pct) => sum + pct, 0) / percentages.length,
    highestGrade: Math.max(...grades),
    lowestGrade: Math.min(...grades),
  };
};
