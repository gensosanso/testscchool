export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "general" | "academic" | "event" | "urgent";
  priority: "low" | "medium" | "high";
  targetAudience: ("admin" | "teacher" | "student" | "parent")[];
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  expiresAt?: string;
  status: "draft" | "published" | "archived";
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  readBy?: string[];
  notificationSent: boolean;
}

export interface AnnouncementFormData {
  title: string;
  content: string;
  type: "general" | "academic" | "event" | "urgent";
  priority: "low" | "medium" | "high";
  targetAudience: ("admin" | "teacher" | "student" | "parent")[];
  publishedAt?: string;
  expiresAt?: string;
  status: "draft" | "published" | "archived";
}
