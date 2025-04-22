import { Teacher } from "@/types/teacher";

// Base URL for the API
const API_URL = "/api/teachers";

/**
 * Service for handling teacher-related API calls
 */
export const teacherService = {
  /**
   * Fetch all teachers
   * @returns Promise with array of teachers
   */
  getAll: async (): Promise<Teacher[]> => {
    // For now, simulate API call with a delay
    // In a real implementation, this would be a fetch call to the API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data - this would be replaced with actual API call
        const teachers: Teacher[] = [
          {
            id: "TCH001",
            name: "Dr. Robert Smith",
            subject: "Mathematics",
            department: "Science",
            status: "active",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
            personalInfo: {
              dateOfBirth: "1975-08-12",
              gender: "Male",
              address: "123 Faculty Avenue, Springfield",
              phone: "555-123-4567",
              email: "robert.smith@schoolmail.com",
              emergencyContact: "Mary Smith",
              emergencyPhone: "555-987-6543",
            },
            professionalInfo: {
              qualification: "Ph.D. in Mathematics",
              experience: "15 years",
              joinDate: "2010-09-01",
              specialization: "Advanced Calculus",
              certifications: [
                "National Board Certification",
                "Advanced Teaching License",
              ],
            },
            classesAssigned: [
              {
                className: "Advanced Mathematics",
                grade: "11th",
                schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
                students: 28,
              },
              {
                className: "Calculus",
                grade: "12th",
                schedule: "Tue, Thu 1:00 PM - 2:30 PM",
                students: 22,
              },
            ],
            performanceReviews: [
              {
                date: "2023-05-15",
                reviewer: "Principal Johnson",
                rating: 4.8,
                comments: "Excellent teaching methods and student engagement.",
              },
              {
                date: "2022-05-20",
                reviewer: "Vice Principal Williams",
                rating: 4.7,
                comments:
                  "Consistently high student achievement in standardized tests.",
              },
            ],
            financialDetails: {
              salary: 75000,
              lastPaymentDate: "2023-10-30",
              bankDetails: "Springfield National Bank",
              taxInfo: "W2 Employee",
              paymentHistory: [
                {
                  date: "2023-10-30",
                  amount: 6250,
                  type: "Salary",
                  status: "Completed",
                },
                {
                  date: "2023-09-30",
                  amount: 6250,
                  type: "Salary",
                  status: "Completed",
                },
              ],
            },
          },
          {
            id: "TCH002",
            name: "Prof. Emily Johnson",
            subject: "English Literature",
            department: "Humanities",
            status: "active",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            personalInfo: {
              dateOfBirth: "1980-03-25",
              gender: "Female",
              address: "456 Scholar Street, Springfield",
              phone: "555-234-5678",
              email: "emily.johnson@schoolmail.com",
              emergencyContact: "David Johnson",
              emergencyPhone: "555-876-5432",
            },
            professionalInfo: {
              qualification: "Master's in English Literature",
              experience: "12 years",
              joinDate: "2012-08-15",
              specialization: "Modern Literature",
              certifications: [
                "State Teaching License",
                "Creative Writing Certification",
              ],
            },
            classesAssigned: [
              {
                className: "English Literature",
                grade: "10th",
                schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
                students: 30,
              },
              {
                className: "Creative Writing",
                grade: "11th",
                schedule: "Tue, Thu 11:00 AM - 12:30 PM",
                students: 18,
              },
            ],
            performanceReviews: [
              {
                date: "2023-05-10",
                reviewer: "Principal Johnson",
                rating: 4.9,
                comments:
                  "Outstanding ability to inspire students in literature and writing.",
              },
            ],
            financialDetails: {
              salary: 68000,
              lastPaymentDate: "2023-10-30",
              bankDetails: "Springfield Credit Union",
              taxInfo: "W2 Employee",
              paymentHistory: [
                {
                  date: "2023-10-30",
                  amount: 5667,
                  type: "Salary",
                  status: "Completed",
                },
                {
                  date: "2023-09-30",
                  amount: 5667,
                  type: "Salary",
                  status: "Completed",
                },
              ],
            },
          },
          {
            id: "TCH003",
            name: "Dr. Michael Chen",
            subject: "Physics",
            department: "Science",
            status: "on leave",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            personalInfo: {
              dateOfBirth: "1978-11-08",
              gender: "Male",
              address: "789 Research Drive, Springfield",
              phone: "555-345-6789",
              email: "michael.chen@schoolmail.com",
              emergencyContact: "Lisa Chen",
              emergencyPhone: "555-765-4321",
            },
            professionalInfo: {
              qualification: "Ph.D. in Physics",
              experience: "14 years",
              joinDate: "2011-01-10",
              specialization: "Quantum Physics",
              certifications: [
                "Advanced Science Teaching Certificate",
                "Research Fellowship",
              ],
            },
            classesAssigned: [
              {
                className: "Physics",
                grade: "11th",
                schedule: "Mon, Wed, Fri 1:00 PM - 2:30 PM",
                students: 25,
              },
              {
                className: "Advanced Physics",
                grade: "12th",
                schedule: "Tue, Thu 2:30 PM - 4:00 PM",
                students: 15,
              },
            ],
            performanceReviews: [
              {
                date: "2023-04-20",
                reviewer: "Department Head Wilson",
                rating: 4.7,
                comments:
                  "Excellent research integration into classroom teaching.",
              },
            ],
            financialDetails: {
              salary: 72000,
              lastPaymentDate: "2023-10-30",
              bankDetails: "Springfield National Bank",
              taxInfo: "W2 Employee",
              paymentHistory: [
                {
                  date: "2023-10-30",
                  amount: 6000,
                  type: "Salary",
                  status: "Completed",
                },
                {
                  date: "2023-09-30",
                  amount: 6000,
                  type: "Salary",
                  status: "Completed",
                },
              ],
            },
          },
        ];
        resolve(teachers);
      }, 500);
    });
  },

  /**
   * Get a teacher by ID
   * @param id Teacher ID
   * @returns Promise with teacher data
   */
  getById: async (id: string): Promise<Teacher | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be a fetch call to `${API_URL}/${id}` in a real implementation
        const teachers = teacherService.getAll();
        teachers.then((data) => {
          const teacher = data.find((t) => t.id === id);
          resolve(teacher || null);
        });
      }, 300);
    });
  },

  /**
   * Create a new teacher
   * @param teacher Teacher data without ID
   * @returns Promise with created teacher including ID
   */
  create: async (teacher: Omit<Teacher, "id">): Promise<Teacher> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new ID (in a real app, this would be done by the backend)
        const newId = `TCH${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`;
        const newTeacher = { ...teacher, id: newId } as Teacher;
        resolve(newTeacher);
      }, 500);
    });
  },

  /**
   * Update an existing teacher
   * @param id Teacher ID
   * @param teacher Updated teacher data
   * @returns Promise with updated teacher
   */
  update: async (id: string, teacher: Partial<Teacher>): Promise<Teacher> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be a PUT/PATCH request in a real implementation
        resolve({ ...teacher, id } as Teacher);
      }, 500);
    });
  },

  /**
   * Delete a teacher
   * @param id Teacher ID
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
