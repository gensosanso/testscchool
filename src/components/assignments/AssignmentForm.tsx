"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Assignment } from "@/types/assignment";
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
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import {
  getAllSubjects,
  getAllTeachers,
  getAllClasses,
} from "@/services/assignmentService";
import { Checkbox } from "@/components/ui/checkbox";

interface AssignmentFormProps {
  initialData?: Assignment;
  onSubmit: (data: Omit<Assignment, "id" | "createdAt" | "updatedAt">) => void;
}

export default function AssignmentForm({
  initialData,
  onSubmit,
}: AssignmentFormProps) {
  const router = useRouter();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [formData, setFormData] = useState<
    Omit<Assignment, "id" | "createdAt" | "updatedAt">
  >(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          subjectId: initialData.subjectId,
          subjectName: initialData.subjectName,
          teacherId: initialData.teacherId,
          teacherName: initialData.teacherName,
          classId: initialData.classId,
          className: initialData.className,
          dueDate: initialData.dueDate,
          dueTime: initialData.dueTime,
          assignedDate: initialData.assignedDate,
          totalMarks: initialData.totalMarks,
          instructions: initialData.instructions,
          attachments: [...initialData.attachments],
          status: initialData.status,
          priority: initialData.priority,
          submissionType: initialData.submissionType,
          allowLateSubmission: initialData.allowLateSubmission,
        }
      : {
          title: "",
          description: "",
          subjectId: "",
          teacherId: "",
          classId: "",
          dueDate: new Date().toISOString().split("T")[0],
          dueTime: "23:59",
          assignedDate: new Date().toISOString().split("T")[0],
          totalMarks: 100,
          instructions: "",
          attachments: [],
          status: "draft",
          priority: "medium",
          submissionType: "online",
          allowLateSubmission: true,
        },
  );

  const [newAttachment, setNewAttachment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsData = await getAllSubjects();
        const teachersData = await getAllTeachers();
        const classesData = await getAllClasses();

        setSubjects(subjectsData);
        setTeachers(teachersData);
        setClasses(classesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Update related name fields
      if (name === "subjectId") {
        const subject = subjects.find((s) => s.id === value);
        updated.subjectName = subject?.name || "";
      } else if (name === "teacherId") {
        const teacher = teachers.find((t) => t.id === value);
        updated.teacherName = teacher?.name || "";
      } else if (name === "classId") {
        const classData = classes.find((c) => c.id === value);
        updated.className = classData?.name || "";
      }

      return updated;
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, allowLateSubmission: checked }));
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment.trim()],
      }));
      setNewAttachment("");
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-md shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/assignments" passHref>
            <Button type="button" variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-xl font-bold">
            {initialData ? "Edit Assignment" : "Add New Assignment"}
          </h2>
        </div>
        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Assignment Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed instructions for students..."
            />
          </div>

          <div>
            <Label htmlFor="subjectId">Subject</Label>
            <Select
              value={formData.subjectId}
              onValueChange={(value) => handleSelectChange("subjectId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="teacherId">Teacher</Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => handleSelectChange("teacherId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="classId">Class</Label>
            <Select
              value={formData.classId}
              onValueChange={(value) => handleSelectChange("classId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assignedDate">Assigned Date</Label>
              <Input
                id="assignedDate"
                name="assignedDate"
                type="date"
                value={formData.assignedDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dueTime">Due Time</Label>
            <Input
              id="dueTime"
              name="dueTime"
              type="time"
              value={formData.dueTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="totalMarks">Total Marks</Label>
            <Input
              id="totalMarks"
              name="totalMarks"
              type="number"
              min="1"
              value={formData.totalMarks}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                handleSelectChange(
                  "priority",
                  value as "low" | "medium" | "high",
                )
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="submissionType">Submission Type</Label>
            <Select
              value={formData.submissionType}
              onValueChange={(value) =>
                handleSelectChange(
                  "submissionType",
                  value as "online" | "offline" | "both",
                )
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select submission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleSelectChange(
                  "status",
                  value as
                    | "draft"
                    | "assigned"
                    | "submitted"
                    | "graded"
                    | "overdue",
                )
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowLateSubmission"
              checked={formData.allowLateSubmission}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="allowLateSubmission">Allow Late Submission</Label>
          </div>

          <div>
            <Label>Attachments</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newAttachment}
                onChange={(e) => setNewAttachment(e.target.value)}
                placeholder="Add attachment filename"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddAttachment}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {formData.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-muted p-2 rounded-md"
                >
                  <span className="text-sm">{attachment}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
