"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAssignmentById,
  deleteAssignment,
} from "@/services/assignmentService";
import { Assignment } from "@/types/assignment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Trash2,
  User,
  Users,
  BookOpen,
  FileText,
  AlertCircle,
  CheckCircle,
  Award,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

export default function AssignmentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentData = await getAssignmentById(params.id);
        if (!assignmentData) {
          toast({
            title: "Error",
            description: "Assignment not found",
            variant: "destructive",
          });
          router.push("/dashboard/assignments");
          return;
        }
        setAssignment(assignmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load assignment data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        const success = await deleteAssignment(params.id);
        if (success) {
          toast({
            title: "Success",
            description: "Assignment deleted successfully",
          });
          router.push("/dashboard/assignments");
        }
      } catch (error) {
        console.error("Error deleting assignment:", error);
        toast({
          title: "Error",
          description: "Failed to delete assignment",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "assigned":
        return <Badge className="bg-blue-500">Assigned</Badge>;
      case "submitted":
        return <Badge className="bg-yellow-500">Submitted</Badge>;
      case "graded":
        return <Badge className="bg-green-500">Graded</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="text-green-600">
            Low Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="text-yellow-600">
            Medium Priority
          </Badge>
        );
      case "high":
        return (
          <Badge variant="outline" className="text-red-600">
            High Priority
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const isOverdue = (dueDate: string, dueTime: string, status: string) => {
    if (status === "graded" || status === "submitted") return false;
    const now = new Date();
    const due = new Date(`${dueDate}T${dueTime}`);
    return now > due;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!assignment) {
    return null;
  }

  const overdueStatus = isOverdue(
    assignment.dueDate,
    assignment.dueTime,
    assignment.status,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/assignments" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {assignment.title}
              {overdueStatus && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge(assignment.status)}
              {getPriorityBadge(assignment.priority)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/assignments/${assignment.id}/results`}
            passHref
          >
            <Button variant="outline">
              <Award className="h-4 w-4 mr-2" /> Results
            </Button>
          </Link>
          <Link href={`/dashboard/assignments/edit/${assignment.id}`} passHref>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{assignment.description}</p>
            </div>

            <div>
              <h3 className="font-medium">Instructions</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {assignment.instructions ||
                  "No specific instructions provided."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Assigned Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(assignment.assignedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar
                  className={`h-5 w-5 ${overdueStatus ? "text-red-500" : "text-muted-foreground"}`}
                />
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p
                    className={`text-sm ${overdueStatus ? "text-red-500 font-medium" : "text-muted-foreground"}`}
                  >
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock
                  className={`h-5 w-5 ${overdueStatus ? "text-red-500" : "text-muted-foreground"}`}
                />
                <div>
                  <p className="text-sm font-medium">Due Time</p>
                  <p
                    className={`text-sm ${overdueStatus ? "text-red-500 font-medium" : "text-muted-foreground"}`}
                  >
                    {assignment.dueTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Subject</p>
                  <p className="text-sm text-muted-foreground">
                    {assignment.subjectName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Teacher</p>
                  <p className="text-sm text-muted-foreground">
                    {assignment.teacherName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Class</p>
                  <p className="text-sm text-muted-foreground">
                    {assignment.className}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Total Marks</p>
                <p className="text-lg font-bold">{assignment.totalMarks}</p>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Submission Type</p>
                <p className="text-sm capitalize">
                  {assignment.submissionType}
                </p>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">Late Submission</p>
                <div className="flex items-center gap-1">
                  {assignment.allowLateSubmission ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <p className="text-sm">
                    {assignment.allowLateSubmission ? "Allowed" : "Not Allowed"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            {assignment.attachments.length > 0 ? (
              <ul className="space-y-2">
                {assignment.attachments.map((attachment, index) => (
                  <li
                    key={index}
                    className="p-2 bg-muted rounded-md text-sm flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {attachment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No attachments</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
