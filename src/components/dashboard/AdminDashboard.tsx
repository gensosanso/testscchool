"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bell,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  PieChart,
  Users,
} from "lucide-react";
import StudentManagement from "./StudentManagement";
import FinancialManagement from "./FinancialManagement";

interface AdminDashboardProps {
  userName?: string;
  userAvatar?: string;
}

const AdminDashboard = ({
  userName = "John Doe",
  userAvatar = "",
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = React.useState("overview");

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      change: "+12%",
    },
    {
      title: "Total Teachers",
      value: "64",
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
      change: "+3%",
    },
    {
      title: "Attendance Rate",
      value: "94%",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      change: "+2%",
    },
    {
      title: "Fee Collection",
      value: "€86,400",
      icon: <DollarSign className="h-5 w-5 text-purple-500" />,
      change: "+8%",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New student registered",
      time: "10 minutes ago",
      status: "new",
    },
    {
      id: 2,
      action: "Fee payment received",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 3,
      action: "Teacher absence reported",
      time: "3 hours ago",
      status: "warning",
    },
    {
      id: 4,
      action: "Report cards generated",
      time: "Yesterday",
      status: "info",
    },
    {
      id: 5,
      action: "System maintenance completed",
      time: "2 days ago",
      status: "success",
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "Leave Request",
      from: "Sarah Johnson",
      date: "May 15-18, 2023",
    },
    {
      id: 2,
      type: "Fee Extension",
      from: "Martin Family",
      date: "Due: May 30, 2023",
    },
    {
      id: 3,
      type: "Event Proposal",
      from: "Science Department",
      date: "June 10, 2023",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{userName}</span>
            <Avatar>
              <AvatarImage
                src={
                  userAvatar ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                }
                alt={userName}
              />
              <AvatarFallback>
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Finance
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span
                        className={`${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                      >
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <BarChart className="h-40 w-40 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                      Attendance chart visualization
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <PieChart className="h-40 w-40 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                      Performance chart visualization
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities & Pending Approvals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {recentActivities.map((activity) => (
                      <li
                        key={activity.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                        <Badge
                          variant={
                            activity.status === "success"
                              ? "default"
                              : activity.status === "warning"
                                ? "destructive"
                                : activity.status === "new"
                                  ? "secondary"
                                  : "outline"
                          }
                        >
                          {activity.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <li
                        key={approval.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{approval.type}</p>
                          <p className="text-sm text-muted-foreground">
                            From: {approval.from} • {approval.date}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Deny
                          </Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Teacher management interface would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance">
            <FinancialManagement />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reports and analytics interface would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
