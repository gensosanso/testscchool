"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AttendanceRecord } from "@/types/attendance";
import { attendanceService } from "@/services/attendanceService";
import AttendanceForm from "@/components/attendance/AttendanceForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddAttendancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    data: Omit<AttendanceRecord, "id" | "markedAt">,
  ) => {
    try {
      setLoading(true);
      await attendanceService.createAttendanceRecord(data);
      router.push("/dashboard/attendance");
    } catch (error) {
      console.error("Error creating attendance record:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/attendance");
  };

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
            Add Attendance Record
          </h1>
          <p className="text-gray-600 mt-1">
            Create a new attendance record for a student
          </p>
        </div>
      </div>

      {/* Form */}
      <AttendanceForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
