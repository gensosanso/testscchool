import { Message, MessagePreview } from "@/types/message";

// This is a mock service that would be replaced with actual API calls
export const messageService = {
  // Get inbox messages for the current user
  getInboxMessages: async (): Promise<MessagePreview[]> => {
    // In a real implementation, this would fetch from an API
    return mockInboxMessages;
  },

  // Get sent messages for the current user
  getSentMessages: async (): Promise<MessagePreview[]> => {
    // In a real implementation, this would fetch from an API
    return mockSentMessages;
  },

  // Get a specific message by ID
  getMessage: async (id: number): Promise<Message | null> => {
    // In a real implementation, this would fetch from an API
    const message = mockMessages.find((msg) => msg.id === id);
    return message || null;
  },

  // Send a new message
  sendMessage: async (
    message: Omit<Message, "id" | "timestamp" | "read" | "important">,
  ): Promise<boolean> => {
    // In a real implementation, this would post to an API
    console.log("Message would be sent:", message);
    return true;
  },

  // Mark a message as read
  markAsRead: async (id: number): Promise<boolean> => {
    // In a real implementation, this would update via an API
    console.log(`Message ${id} marked as read`);
    return true;
  },

  // Mark a message as important
  markAsImportant: async (id: number): Promise<boolean> => {
    // In a real implementation, this would update via an API
    console.log(`Message ${id} marked as important`);
    return true;
  },

  // Delete a message
  deleteMessage: async (id: number): Promise<boolean> => {
    // In a real implementation, this would delete via an API
    console.log(`Message ${id} deleted`);
    return true;
  },
};

// Mock data for demonstration
const mockInboxMessages: MessagePreview[] = [
  {
    id: 1,
    sender: "Principal Dubois",
    subject: "Staff Meeting - Important Updates",
    preview:
      "Please be informed that we will be having an important staff meeting this Friday at 2:00 PM in the conference room. All teachers are required to attend as we will discuss the upcoming semester plans and new educational policies.",
    date: "Today, 10:23 AM",
    read: false,
  },
  {
    id: 2,
    sender: "Marie Laurent",
    subject: "Student Absence Report",
    preview:
      "I would like to inform you that my son, Thomas Laurent, will be absent from school for the next three days due to a medical appointment. Please provide any assignments he might miss during this period.",
    date: "Yesterday, 3:45 PM",
    read: true,
  },
  {
    id: 3,
    sender: "IT Department",
    subject: "System Maintenance Notice",
    preview:
      "We will be performing routine maintenance on the school's computer systems this weekend. The student information system will be unavailable from Saturday 8 PM until Sunday 6 AM.",
    date: "Mar 15, 2023",
    read: true,
  },
  {
    id: 4,
    sender: "Library Services",
    subject: "Overdue Book Notice",
    preview:
      "This is a reminder that you have an overdue book: 'Advanced Mathematics for Secondary Education'. Please return it to the library as soon as possible or renew it online.",
    date: "Mar 12, 2023",
    read: true,
  },
  {
    id: 5,
    sender: "Academic Committee",
    subject: "Curriculum Review Meeting",
    preview:
      "You are invited to participate in the annual curriculum review meeting scheduled for next Monday. Your input on the mathematics curriculum would be highly valuable.",
    date: "Mar 10, 2023",
    read: true,
  },
];

const mockSentMessages: MessagePreview[] = [
  {
    id: 1,
    recipient: "All Mathematics Teachers",
    subject: "Department Meeting Minutes",
    preview:
      "Attached are the minutes from our last department meeting. Please review and let me know if you have any questions or if I missed anything important in the notes.",
    date: "Today, 9:15 AM",
  },
  {
    id: 2,
    recipient: "Parent Council",
    subject: "Upcoming School Event",
    preview:
      "I'm pleased to announce our annual Science Fair will be held on April 15th. We would appreciate parent volunteers to help with setting up displays and judging student projects.",
    date: "Yesterday, 2:30 PM",
  },
  {
    id: 3,
    recipient: "Sophie Moreau",
    subject: "Student Performance Feedback",
    preview:
      "I wanted to provide some feedback on Sophie's recent mathematics test. While she performed well overall, there are a few areas where additional practice would be beneficial.",
    date: "Mar 14, 2023",
  },
  {
    id: 4,
    recipient: "Administrative Staff",
    subject: "Resource Request",
    preview:
      "I would like to request additional textbooks for my advanced placement class. We currently have 25 students but only 20 copies of the required textbook.",
    date: "Mar 11, 2023",
  },
  {
    id: 5,
    recipient: "Tech Support",
    subject: "Classroom Projector Issue",
    preview:
      "The projector in classroom 203 has been flickering during use. This is disrupting lessons, especially when displaying detailed diagrams. Could someone take a look at it this week?",
    date: "Mar 8, 2023",
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    subject: "Staff Meeting - Important Updates",
    content:
      "<p>Dear Faculty,</p><p>Please be informed that we will be having an important staff meeting this Friday at 2:00 PM in the conference room. All teachers are required to attend as we will discuss the upcoming semester plans and new educational policies.</p><p>The agenda includes:</p><ul><li>Review of last semester's performance</li><li>Introduction of new teaching methodologies</li><li>Discussion on upcoming school events</li><li>Budget allocation for departmental resources</li></ul><p>Please come prepared with your department reports and any questions you may have.</p><p>Best regards,<br>Principal Dubois</p>",
    senderId: 101,
    senderName: "Principal Dubois",
    recipientIds: [202, 203, 204, 205],
    recipientNames: ["All Faculty"],
    timestamp: "2023-03-17T10:23:00",
    read: false,
    important: true,
  },
  {
    id: 2,
    subject: "Student Absence Report",
    content:
      "<p>Dear Teacher,</p><p>I would like to inform you that my son, Thomas Laurent, will be absent from school for the next three days due to a medical appointment. Please provide any assignments he might miss during this period.</p><p>We would appreciate if you could email the work to us so Thomas can keep up with his studies while away.</p><p>Thank you for your understanding.</p><p>Sincerely,<br>Marie Laurent</p>",
    senderId: 301,
    senderName: "Marie Laurent",
    recipientIds: [202],
    recipientNames: ["Class Teacher"],
    timestamp: "2023-03-16T15:45:00",
    read: true,
    important: false,
  },
];
