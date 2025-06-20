"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AttendanceRecord } from "@/types/attendance";
import { Student } from "@/types/student";
import { Class } from "@/types/class";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { studentService } from "@/services/studentService";
import { classService } from "@/services/classService";
import { Loader2, Save, X } from "lucide-react";

interface AttendanceFormProps {
  record?: AttendanceRecord;
  onSubmit: (data: Omit<AttendanceRecord, "id" | "markedAt">) => void;
  onCancel: () => void;
  loading?: boolean;
}

type FormData = {
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceRecord["status"];
  timeIn?: string;
  timeOut?: string;
  notes?: string;
};

export default function AttendanceForm({
  record,
  onSubmit,
  onCancel,
  loading = false,
}: AttendanceFormProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const form = useForm<FormData>({
    defaultValues: {
      studentId: record?.studentId || "",
      classId: record?.classId || "",
      date: record?.date || new Date().toISOString().split("T")[0],
      status: record?.status || "present",
      timeIn: record?.timeIn || "",
      timeOut: record?.timeOut || "",
      notes: record?.notes || "",
    },
  });

  const selectedStudentId = form.watch("studentId");
  const selectedClassId = form.watch("classId");
  const selectedStatus = form.watch("status");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsData, classesData] = await Promise.all([
          studentService.getAll(),
          classService.getClasses(),
        ]);
        setStudents(studentsData);
        setClasses(classesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = (data: FormData) => {
    const selectedStudent = students.find((s) => s.id === data.studentId);
    const selectedClass = classes.find((c) => c.id === data.classId);

    if (!selectedStudent || !selectedClass) {
      return;
    }

    const attendanceData: Omit<AttendanceRecord, "id" | "markedAt"> = {
      studentId: data.studentId,
      studentName: selectedStudent.name,
      classId: data.classId,
      className: selectedClass.name,
      date: data.date,
      status: data.status,
      timeIn: data.timeIn || undefined,
      timeOut: data.timeOut || undefined,
      notes: data.notes || undefined,
      markedBy: "Current User", // In a real app, this would come from auth context
    };

    onSubmit(attendanceData);
  };

  if (loadingData) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>
          {record ? "Edit Attendance Record" : "Add Attendance Record"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="classId"
                rules={{ required: "Class is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name} - {cls.grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentId"
                rules={{ required: "Student is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {students
                          .filter(
                            (student) =>
                              !selectedClassId ||
                              student.class ===
                                classes.find((c) => c.id === selectedClassId)
                                  ?.name,
                          )
                          .map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} - {student.class}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="excused">Excused</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {(selectedStatus === "present" || selectedStatus === "late") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timeIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time In</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Out</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {record ? "Update" : "Save"} Record
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
