"use client";

import { useState, useEffect } from "react";
import { AssignmentResult } from "@/types/assignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ResultFormProps {
  initialData?: AssignmentResult;
  assignmentId: string;
  assignmentTitle: string;
  maxGrade: number;
  onSubmit: (data: Omit<AssignmentResult, "id">) => void;
  onCancel?: () => void;
}

export default function ResultForm({
  initialData,
  assignmentId,
  assignmentTitle,
  maxGrade,
  onSubmit,
  onCancel,
}: ResultFormProps) {
  const [formData, setFormData] = useState<Omit<AssignmentResult, "id">>(
    initialData
      ? {
          assignmentId: initialData.assignmentId,
          studentId: initialData.studentId,
          studentName: initialData.studentName,
          studentAvatar: initialData.studentAvatar,
          submissionId: initialData.submissionId,
          grade: initialData.grade,
          maxGrade: initialData.maxGrade,
          percentage: initialData.percentage,
          feedback: initialData.feedback,
          status: initialData.status,
          gradedAt: initialData.gradedAt,
          gradedBy: initialData.gradedBy,
          gradedByName: initialData.gradedByName,
        }
      : {
          assignmentId,
          studentId: "",
          studentName: "",
          studentAvatar: "",
          submissionId: "",
          grade: 0,
          maxGrade,
          percentage: 0,
          feedback: "",
          status: "pending",
          gradedAt: new Date().toISOString(),
          gradedBy: "TCH001", // This would come from current user context
          gradedByName: "Current Teacher", // This would come from current user context
        },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const grade = parseInt(e.target.value) || 0;
    const percentage = maxGrade > 0 ? (grade / maxGrade) * 100 : 0;
    setFormData((prev) => ({
      ...prev,
      grade,
      percentage: Math.round(percentage * 10) / 10,
    }));
  };

  const handleStatusChange = (status: string) => {
    setFormData((prev) => ({
      ...prev,
      status: status as "graded" | "pending" | "absent",
      gradedAt: status === "graded" ? new Date().toISOString() : prev.gradedAt,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-md shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/assignments/${assignmentId}/results`}
            passHref
          >
            <Button type="button" variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold">
              {initialData ? "Edit Result" : "Add Result"}
            </h2>
            <p className="text-sm text-muted-foreground">{assignmentTitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {initialData ? "Update" : "Save"} Result
          </Button>
        </div>
      </div>

      {initialData && (
        <div className="flex items-center gap-3 p-4 bg-muted rounded-md">
          <Avatar className="h-10 w-10">
            <AvatarImage src={formData.studentAvatar} />
            <AvatarFallback>
              {formData.studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{formData.studentName}</div>
            <div className="text-sm text-muted-foreground">
              Student ID: {formData.studentId}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="grade">Grade (out of {maxGrade})</Label>
            <Input
              id="grade"
              name="grade"
              type="number"
              min="0"
              max={maxGrade}
              value={formData.grade}
              onChange={handleGradeChange}
              required
            />
          </div>

          <div>
            <Label>Percentage</Label>
            <div
              className={`text-2xl font-bold ${getGradeColor(formData.percentage)}`}
            >
              {formData.percentage.toFixed(1)}%
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="graded">Graded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows={6}
              placeholder="Provide detailed feedback for the student..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Graded By</Label>
              <div className="text-sm text-muted-foreground">
                {formData.gradedByName}
              </div>
            </div>
            <div>
              <Label>Graded At</Label>
              <div className="text-sm text-muted-foreground">
                {formData.gradedAt
                  ? new Date(formData.gradedAt).toLocaleDateString()
                  : "Not graded yet"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
