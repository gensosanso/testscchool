"use client";

import React from "react";
import { AttendanceStatistics } from "@/types/attendance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Calendar,
  TrendingUp,
  Clock,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface AttendanceStatisticsProps {
  statistics: AttendanceStatistics;
  loading?: boolean;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  subtitle,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color?: "blue" | "green" | "red" | "yellow" | "purple";
  subtitle?: string;
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    red: "bg-red-50 text-red-600 border-red-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-full border ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AttendanceStatisticsComponent({
  statistics,
  loading = false,
}: AttendanceStatisticsProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sessions"
          value={statistics.totalSessions}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Total Students"
          value={statistics.totalStudents}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Overall Attendance"
          value={`${statistics.overallAttendanceRate}%`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Present Rate"
          value={`${statistics.presentRate}%`}
          icon={UserCheck}
          color="green"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Absent Rate"
          value={`${statistics.absentRate}%`}
          icon={UserX}
          color="red"
        />
        <StatCard
          title="Late Rate"
          value={`${statistics.lateRate}%`}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Excused Rate"
          value={`${statistics.excusedRate}%`}
          icon={AlertCircle}
          color="blue"
        />
        <StatCard
          title="Attendance Score"
          value={`${Math.round((statistics.presentRate + statistics.lateRate) * 0.9 + statistics.excusedRate * 0.5)}%`}
          icon={CheckCircle}
          color="green"
          subtitle="Weighted average"
        />
      </div>

      {/* Attendance Breakdown */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Attendance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-600">Present</span>
                <span>{statistics.presentRate}%</span>
              </div>
              <Progress value={statistics.presentRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-yellow-600">Late</span>
                <span>{statistics.lateRate}%</span>
              </div>
              <Progress value={statistics.lateRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-600">Excused</span>
                <span>{statistics.excusedRate}%</span>
              </div>
              <Progress value={statistics.excusedRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-600">Absent</span>
                <span>{statistics.absentRate}%</span>
              </div>
              <Progress value={statistics.absentRate} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Statistics */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Daily Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Attendance Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.dailyStats.map((day, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(day.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{day.totalStudents}</TableCell>
                  <TableCell>{day.presentCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{day.attendanceRate}%</span>
                      <Progress
                        value={day.attendanceRate}
                        className="h-2 w-16"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Class Statistics */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Class Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.classStats.map((cls) => (
                <TableRow key={cls.classId}>
                  <TableCell className="font-medium">{cls.className}</TableCell>
                  <TableCell>{cls.totalStudents}</TableCell>
                  <TableCell>{cls.attendanceRate}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={cls.attendanceRate}
                        className="h-2 w-20"
                      />
                      <span className="text-sm text-gray-500">
                        {cls.attendanceRate >= 95
                          ? "Excellent"
                          : cls.attendanceRate >= 85
                            ? "Good"
                            : cls.attendanceRate >= 75
                              ? "Average"
                              : "Needs Improvement"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Students */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Attendance Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.studentStats
                .sort((a, b) => b.attendanceRate - a.attendanceRate)
                .map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell className="font-medium">
                      {student.studentName}
                    </TableCell>
                    <TableCell>{student.totalSessions}</TableCell>
                    <TableCell>{student.presentCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{student.attendanceRate}%</span>
                        <Progress
                          value={student.attendanceRate}
                          className="h-2 w-16"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
