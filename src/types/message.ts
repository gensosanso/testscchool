export interface Message {
  id: number;
  subject: string;
  content: string;
  senderId: number;
  senderName: string;
  recipientIds: number[];
  recipientNames: string[];
  timestamp: string;
  read: boolean;
  important: boolean;
}

export interface MessagePreview {
  id: number;
  sender?: string;
  recipient?: string;
  subject: string;
  preview: string;
  date: string;
  read?: boolean;
}
