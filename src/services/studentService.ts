import { Student } from "@/types/student";

// Base URL for the API
const API_URL = "/api/students";

/**
 * Service for handling student-related API calls
 */
export const studentService = {
  /**
   * Fetch all students
   * @returns Promise with array of students
   */
  getAll: async (): Promise<Student[]> => {
    // For now, simulate API call with a delay
    // In a real implementation, this would be a fetch call to the API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data - this would be replaced with actual API call
        const students: Student[] = [
          {
            id: "STD001",
            name: "Emma Johnson",
            class: "10A",
            grade: "10th",
            status: "active",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            personalInfo: {
              dateOfBirth: "2006-05-15",
              gender: "Female",
              address: "123 School Lane, Springfield",
              phone: "555-123-4567",
              email: "emma.j@schoolmail.com",
              parentName: "Sarah Johnson",
              parentContact: "555-987-6543",
            },
            academicHistory: [
              {
                year: "2022-2023",
                grade: "9th",
                performance: "Excellent",
                attendance: "98%",
              },
              {
                year: "2021-2022",
                grade: "8th",
                performance: "Very Good",
                attendance: "95%",
              },
            ],
            behavioralRecords: [
              {
                date: "2023-10-15",
                incident: "Academic Achievement",
                description: "Won first place in science fair",
                action: "Certificate of Excellence",
              },
            ],
            financialStatus: {
              tuitionFee: 5000,
              paid: 3500,
              due: 1500,
              nextPaymentDate: "2023-12-15",
              paymentHistory: [
                {
                  date: "2023-09-01",
                  amount: 2000,
                  method: "Bank Transfer",
                  status: "Completed",
                },
                {
                  date: "2023-10-15",
                  amount: 1500,
                  method: "Credit Card",
                  status: "Completed",
                },
              ],
            },
          },
          {
            id: "STD002",
            name: "Michael Chen",
            class: "10B",
            grade: "10th",
            status: "active",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            personalInfo: {
              dateOfBirth: "2006-08-22",
              gender: "Male",
              address: "456 Academy Road, Springfield",
              phone: "555-234-5678",
              email: "michael.c@schoolmail.com",
              parentName: "Wei Chen",
              parentContact: "555-876-5432",
            },
            academicHistory: [
              {
                year: "2022-2023",
                grade: "9th",
                performance: "Very Good",
                attendance: "96%",
              },
              {
                year: "2021-2022",
                grade: "8th",
                performance: "Good",
                attendance: "94%",
              },
            ],
            behavioralRecords: [
              {
                date: "2023-09-10",
                incident: "Sports Achievement",
                description: "Team captain for basketball tournament",
                action: "Sports Award",
              },
            ],
            financialStatus: {
              tuitionFee: 5000,
              paid: 5000,
              due: 0,
              nextPaymentDate: "2024-01-15",
              paymentHistory: [
                {
                  date: "2023-08-15",
                  amount: 5000,
                  method: "Bank Transfer",
                  status: "Completed",
                },
              ],
            },
          },
          {
            id: "STD003",
            name: "Sophia Martinez",
            class: "10A",
            grade: "10th",
            status: "inactive",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
            personalInfo: {
              dateOfBirth: "2006-03-10",
              gender: "Female",
              address: "789 Learning Drive, Springfield",
              phone: "555-345-6789",
              email: "sophia.m@schoolmail.com",
              parentName: "Elena Martinez",
              parentContact: "555-765-4321",
            },
            academicHistory: [
              {
                year: "2022-2023",
                grade: "9th",
                performance: "Good",
                attendance: "90%",
              },
              {
                year: "2021-2022",
                grade: "8th",
                performance: "Good",
                attendance: "92%",
              },
            ],
            behavioralRecords: [
              {
                date: "2023-11-05",
                incident: "Tardiness",
                description: "Late to class three times in one week",
                action: "Verbal Warning",
              },
            ],
            financialStatus: {
              tuitionFee: 5000,
              paid: 2500,
              due: 2500,
              nextPaymentDate: "2023-11-30",
              paymentHistory: [
                {
                  date: "2023-09-15",
                  amount: 2500,
                  method: "Credit Card",
                  status: "Completed",
                },
              ],
            },
          },
        ];
        resolve(students);
      }, 500);
    });
  },

  /**
   * Get a student by ID
   * @param id Student ID
   * @returns Promise with student data
   */
  getById: async (id: string): Promise<Student | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be a fetch call to `${API_URL}/${id}` in a real implementation
        const students = studentService.getAll();
        students.then((data) => {
          const student = data.find((s) => s.id === id);
          resolve(student || null);
        });
      }, 300);
    });
  },

  /**
   * Create a new student
   * @param student Student data without ID
   * @returns Promise with created student including ID
   */
  create: async (student: Omit<Student, "id">): Promise<Student> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new ID (in a real app, this would be done by the backend)
        const newId = `STD${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`;
        const newStudent = { ...student, id: newId } as Student;
        resolve(newStudent);
      }, 500);
    });
  },

  /**
   * Update an existing student
   * @param id Student ID
   * @param student Updated student data
   * @returns Promise with updated student
   */
  update: async (id: string, student: Partial<Student>): Promise<Student> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be a PUT/PATCH request in a real implementation
        resolve({ ...student, id } as Student);
      }, 500);
    });
  },

  /**
   * Delete a student
   * @param id Student ID
   * @returns Promise with success status
   */
  delete: async (id: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be a DELETE request in a real implementation
        resolve(true);
      }, 500);
    });
  },
};
