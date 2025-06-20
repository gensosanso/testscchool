import { Announcement, AnnouncementFormData } from "@/types/announcement";

// Base URL for the API
const API_URL = "/api/announcements";

/**
 * Service for handling announcement-related API calls
 */
export const announcementService = {
  /**
   * Fetch all announcements
   * @returns Promise with array of announcements
   */
  getAll: async (): Promise<Announcement[]> => {
    // For now, simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const announcements: Announcement[] = [
          {
            id: "ANN001",
            title: "Welcome Back to School!",
            content:
              "We are excited to welcome all students back for the new academic year. Please review the updated school policies and schedule.",
            type: "general",
            priority: "medium",
            targetAudience: ["student", "parent"],
            authorId: "ADM001",
            authorName: "Principal Johnson",
            createdAt: "2024-01-15T08:00:00Z",
            updatedAt: "2024-01-15T08:00:00Z",
            publishedAt: "2024-01-15T08:00:00Z",
            status: "published",
            notificationSent: true,
            readBy: ["STD001", "STD002"],
          },
          {
            id: "ANN002",
            title: "Parent-Teacher Conference Schedule",
            content:
              "Parent-teacher conferences will be held from March 15-17. Please schedule your appointments through the parent portal.",
            type: "academic",
            priority: "high",
            targetAudience: ["parent", "teacher"],
            authorId: "ADM001",
            authorName: "Principal Johnson",
            createdAt: "2024-01-10T10:30:00Z",
            updatedAt: "2024-01-10T10:30:00Z",
            publishedAt: "2024-01-10T10:30:00Z",
            expiresAt: "2024-03-20T23:59:59Z",
            status: "published",
            notificationSent: true,
          },
          {
            id: "ANN003",
            title: "Science Fair Registration Open",
            content:
              "Registration for the annual science fair is now open. Students can submit their project proposals until February 28th.",
            type: "event",
            priority: "medium",
            targetAudience: ["student", "teacher", "parent"],
            authorId: "TCH001",
            authorName: "Dr. Smith",
            createdAt: "2024-01-08T14:15:00Z",
            updatedAt: "2024-01-08T14:15:00Z",
            publishedAt: "2024-01-08T14:15:00Z",
            expiresAt: "2024-03-01T23:59:59Z",
            status: "published",
            notificationSent: true,
          },
          {
            id: "ANN004",
            title: "Emergency Drill Schedule",
            content:
              "Fire drill will be conducted on January 25th at 10:00 AM. Please ensure all students are familiar with evacuation procedures.",
            type: "urgent",
            priority: "high",
            targetAudience: ["admin", "teacher", "student"],
            authorId: "ADM002",
            authorName: "Safety Coordinator",
            createdAt: "2024-01-20T09:00:00Z",
            updatedAt: "2024-01-20T09:00:00Z",
            publishedAt: "2024-01-20T09:00:00Z",
            status: "published",
            notificationSent: true,
          },
          {
            id: "ANN005",
            title: "New Library Hours",
            content:
              "Starting February 1st, the library will be open from 7:30 AM to 6:00 PM on weekdays and 9:00 AM to 3:00 PM on Saturdays.",
            type: "general",
            priority: "low",
            targetAudience: ["student", "teacher", "parent"],
            authorId: "LIB001",
            authorName: "Librarian Wilson",
            createdAt: "2024-01-12T11:45:00Z",
            updatedAt: "2024-01-12T11:45:00Z",
            status: "draft",
            notificationSent: false,
          },
        ];
        resolve(announcements);
      }, 500);
    });
  },

  /**
   * Get an announcement by ID
   * @param id Announcement ID
   * @returns Promise with announcement data
   */
  getById: async (id: string): Promise<Announcement | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        announcementService.getAll().then((data) => {
          const announcement = data.find((a) => a.id === id);
          resolve(announcement || null);
        });
      }, 300);
    });
  },

  /**
   * Create a new announcement
   * @param announcement Announcement data without ID
   * @returns Promise with created announcement including ID
   */
  create: async (announcement: AnnouncementFormData): Promise<Announcement> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = `ANN${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`;
        const now = new Date().toISOString();
        const newAnnouncement: Announcement = {
          ...announcement,
          id: newId,
          authorId: "ADM001",
          authorName: "Current User",
          createdAt: now,
          updatedAt: now,
          publishedAt: announcement.status === "published" ? now : undefined,
          notificationSent: false,
          readBy: [],
        };
        resolve(newAnnouncement);
      }, 500);
    });
  },

  /**
   * Update an existing announcement
   * @param id Announcement ID
   * @param announcement Updated announcement data
   * @returns Promise with updated announcement
   */
  update: async (
    id: string,
    announcement: Partial<AnnouncementFormData>,
  ): Promise<Announcement> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedAnnouncement: Announcement = {
          id,
          title: announcement.title || "",
          content: announcement.content || "",
          type: announcement.type || "general",
          priority: announcement.priority || "medium",
          targetAudience: announcement.targetAudience || ["student"],
          authorId: "ADM001",
          authorName: "Current User",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt:
            announcement.status === "published"
              ? new Date().toISOString()
              : undefined,
          expiresAt: announcement.expiresAt,
          status: announcement.status || "draft",
          notificationSent: false,
        };
        resolve(updatedAnnouncement);
      }, 500);
    });
  },

  /**
   * Delete an announcement
   * @param id Announcement ID
   * @returns Promise with success status
   */
  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  },

  /**
   * Get announcements for a specific user role
   * @param userRole User role
   * @returns Promise with filtered announcements
   */
  getByUserRole: async (
    userRole: "admin" | "teacher" | "student" | "parent",
  ): Promise<Announcement[]> => {
    return new Promise((resolve) => {
      announcementService.getAll().then((announcements) => {
        const filtered = announcements.filter(
          (announcement) =>
            announcement.status === "published" &&
            announcement.targetAudience.includes(userRole),
        );
        resolve(filtered);
      });
    });
  },
};
