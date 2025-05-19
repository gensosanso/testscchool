"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  BarChart,
  Home,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: "admin" | "teacher" | "student" | "parent";
  userName?: string;
}

export default function DashboardLayout({
  children,
  userRole = "admin",
  userName = "John Doe",
}: DashboardLayoutProps) {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/login");
  };

  const navigationItems = {
    admin: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
      },
      {
        name: "Students",
        href: "/dashboard/students",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "Teachers",
        href: "/dashboard/teachers",
        icon: <User className="h-5 w-5" />,
      },
      {
        name: "Parents",
        href: "/dashboard/parents",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "Classes",
        href: "/dashboard/classes",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Subjects",
        href: "/dashboard/subjects",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Lessons",
        href: "/dashboard/lessons",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Schedule",
        href: "/dashboard/schedule",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: "Finance",
        href: "/dashboard/finance",
        icon: <DollarSign className="h-5 w-5" />,
      },
      {
        name: "Reports",
        href: "/dashboard/reports",
        icon: <BarChart className="h-5 w-5" />,
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
    teacher: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
      },
      {
        name: "My Classes",
        href: "/dashboard/classes",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "My Subjects",
        href: "/dashboard/subjects",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "My Lessons",
        href: "/dashboard/lessons",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Grades",
        href: "/dashboard/grades",
        icon: <BarChart className="h-5 w-5" />,
      },
      {
        name: "Attendance",
        href: "/dashboard/attendance",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "Schedule",
        href: "/dashboard/schedule",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
    student: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
      },
      {
        name: "My Schedule",
        href: "/dashboard/schedule",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: "My Subjects",
        href: "/dashboard/subjects",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "My Lessons",
        href: "/dashboard/lessons",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "My Grades",
        href: "/dashboard/grades",
        icon: <BarChart className="h-5 w-5" />,
      },
      {
        name: "Assignments",
        href: "/dashboard/assignments",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
    parent: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
      },
      {
        name: "My Children",
        href: "/dashboard/children",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "Subjects",
        href: "/dashboard/subjects",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Lessons",
        href: "/dashboard/lessons",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Grades",
        href: "/dashboard/grades",
        icon: <BarChart className="h-5 w-5" />,
      },
      {
        name: "Attendance",
        href: "/dashboard/attendance",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: "Payments",
        href: "/dashboard/payments",
        icon: <DollarSign className="h-5 w-5" />,
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
  };

  const currentNavItems = navigationItems[userRole] || navigationItems.admin;

  const renderSidebar = () => (
    <div className="h-full w-64 bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">School Management</h1>
        <p className="text-sm text-muted-foreground">
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {currentNavItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{renderSidebar()}</div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {renderSidebar()}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold md:hidden">
              School Management
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 hover:bg-accent rounded-md cursor-pointer">
                    <p className="font-medium">New message from Teacher</p>
                    <p className="text-sm text-muted-foreground">
                      Please review the latest assignment submission...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 minutes ago
                    </p>
                  </div>
                  <div className="p-3 hover:bg-accent rounded-md cursor-pointer">
                    <p className="font-medium">Grade updated</p>
                    <p className="text-sm text-muted-foreground">
                      Your math exam grade has been updated...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 hour ago
                    </p>
                  </div>
                  <div className="p-3 hover:bg-accent rounded-md cursor-pointer">
                    <p className="font-medium">System maintenance</p>
                    <p className="text-sm text-muted-foreground">
                      The system will be down for maintenance on...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Yesterday
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                      alt={userName}
                    />
                    <AvatarFallback>
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
