"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AttendanceRecord } from "@/types/attendance";
import { attendanceService } from "@/services/attendanceService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  User,
  BookOpen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AttendanceDetailsPageProps {
  params: {
    id: string;
  };
}

const getStatusBadge = (status: AttendanceRecord["status"]) => {
  const variants = {
    present: "bg-green-100 text-green-800 hover:bg-green-100",
    absent: "bg-red-100 text-red-800 hover:bg-red-100",
    late: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    excused: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  };

  const labels = {
    present: "Present",
    absent: "Absent",
    late: "Late",
    excused: "Excused",
  };

  return (
    <Badge className={variants[status]} variant="secondary">
      {labels[status]}
    </Badge>
  );
};

export default function AttendanceDetailsPage({
  params,
}: AttendanceDetailsPageProps) {
  const router = useRouter();
  const [record, setRecord] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const data = await attendanceService.getAttendanceRecordById(params.id);
        setRecord(data);
      } catch (error) {
        console.error("Error loading attendance record:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/dashboard/attendance/${params.id}/edit`);
  };

  const handleDelete = async () => {
    if (!record) return;

    if (confirm("Are you sure you want to delete this attendance record?")) {
      try {
        setDeleting(true);
        await attendanceService.deleteAttendanceRecord(record.id);
        router.push("/dashboard/attendance");
      } catch (error) {
        console.error("Error deleting record:", error);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mt-2 animate-pulse"></div>
          </div>
        </div>
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Record Not Found
            </h1>
            <p className="text-gray-600 mt-1">
              The attendance record you're looking for doesn't exist.
            </p>
          </div>
        </div>
        <Card className="bg-white">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">
              This attendance record could not be found.
            </p>
            <Button
              onClick={() => router.push("/dashboard/attendance")}
              className="mt-4"
            >
              Back to Attendance
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Attendance Record
            </h1>
            <p className="text-gray-600 mt-1">
              Details for {record.studentName}'s attendance
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleEdit} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* Record Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Student Name
                  </label>
                  <p className="text-lg font-semibold">{record.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Student ID
                  </label>
                  <p className="text-lg">{record.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Class
                  </label>
                  <p className="text-lg flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {record.className}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Class ID
                  </label>
                  <p className="text-lg">{record.classId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <div>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Attendance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                {getStatusBadge(record.status)}
                <p className="text-sm text-gray-600 mt-2">
                  Status recorded on{" "}
                  {new Date(record.date).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attendance Details */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Date</label>
              <p className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(record.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {record.timeIn && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Time In
                </label>
                <p className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {record.timeIn}
                </p>
              </div>
            )}

            {record.timeOut && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Time Out
                </label>
                <p className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {record.timeOut}
                </p>
              </div>
            )}
          </div>

          {record.notes && (
            <>
              <Separator className="my-6" />
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Notes
                </label>
                <p className="text-gray-800 mt-2 p-3 bg-gray-50 rounded-md">
                  {record.notes}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Record Metadata */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Record Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Marked By
              </label>
              <p className="text-lg">{record.markedBy}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Marked At
              </label>
              <p className="text-lg">
                {new Date(record.markedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
