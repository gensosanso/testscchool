"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Inbox,
  Send,
  PenSquare,
  Search,
  Trash2,
  Star,
  RefreshCw,
  User,
  Users,
} from "lucide-react";

export default function MessagesPage() {
  const [selectedTab, setSelectedTab] = useState("inbox");

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button
          onClick={() => setSelectedTab("compose")}
          className="flex items-center gap-2"
        >
          <PenSquare className="h-4 w-4" />
          Compose
        </Button>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <Inbox className="h-4 w-4" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Sent
          </TabsTrigger>
          <TabsTrigger value="compose" className="flex items-center gap-2">
            <PenSquare className="h-4 w-4" />
            Compose
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Inbox</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8 w-[250px]"
                  />
                </div>
              </div>
              <CardDescription>
                View and manage your received messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Mark as Important
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>

              {/* Message List */}
              <div className="border rounded-md divide-y">
                {mockInboxMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 hover:bg-muted cursor-pointer flex items-start gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{message.sender}</h4>
                        <span className="text-xs text-muted-foreground">
                          {message.date}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 5 of 24 messages
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Sent Messages</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search sent messages..."
                    className="pl-8 w-[250px]"
                  />
                </div>
              </div>
              <CardDescription>Messages you've sent to others</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Sent Message List */}
              <div className="border rounded-md divide-y">
                {mockSentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 hover:bg-muted cursor-pointer flex items-start gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">To: {message.recipient}</h4>
                        <span className="text-xs text-muted-foreground">
                          {message.date}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 5 of 18 messages
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compose New Message</CardTitle>
              <CardDescription>
                Send a message to students, teachers, or staff
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input id="recipient" placeholder="Search for recipients..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Message subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-[200px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save Draft</Button>
              <Button>Send Message</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock data for demonstration
const mockInboxMessages = [
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

const mockSentMessages = [
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
