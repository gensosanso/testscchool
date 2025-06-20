"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AttendanceRecord } from "@/types/attendance";
import { attendanceService } from "@/services/attendanceService";
import AttendanceForm from "@/components/attendance/AttendanceForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditAttendancePageProps {
  params: {
    id: string;
  };
}

export default function EditAttendancePage({
  params,
}: EditAttendancePageProps) {
  const router = useRouter();
  const [record, setRecord] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const data = await attendanceService.getAttendanceRecordById(params.id);
        setRecord(data);
      } catch (error) {
        console.error("Error loading attendance record:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadRecord();
  }, [params.id]);

  const handleSubmit = async (
    data: Omit<AttendanceRecord, "id" | "markedAt">,
  ) => {
    if (!record) return;

    try {
      setLoading(true);
      await attendanceService.updateAttendanceRecord(record.id, data);
      router.push(`/dashboard/attendance/${record.id}`);
    } catch (error) {
      console.error("Error updating attendance record:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (record) {
      router.push(`/dashboard/attendance/${record.id}`);
    } else {
      router.push("/dashboard/attendance");
    }
  };

  if (initialLoading) {
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
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded animate-pulse"
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
              The attendance record you're trying to edit doesn't exist.
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
            Edit Attendance Record
          </h1>
          <p className="text-gray-600 mt-1">
            Update attendance record for {record.studentName}
          </p>
        </div>
      </div>

      {/* Form */}
      <AttendanceForm
        record={record}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
