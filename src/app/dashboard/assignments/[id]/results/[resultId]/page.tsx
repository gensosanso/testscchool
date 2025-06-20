"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAssignmentById, getResultById } from "@/services/assignmentService";
import { Assignment, AssignmentResult } from "@/types/assignment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Edit,
  Award,
  Clock,
  UserX,
  Calendar,
  User,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

export default function ResultDetailsPage({
  params,
}: {
  params: { id: string; resultId: string };
}) {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [result, setResult] = useState<AssignmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentData, resultData] = await Promise.all([
          getAssignmentById(params.id),
          getResultById(params.resultId),
        ]);

        if (!assignmentData || !resultData) {
          toast({
            title: "Error",
            description: "Assignment or result not found",
            variant: "destructive",
          });
          router.push("/dashboard/assignments");
          return;
        }

        setAssignment(assignmentData);
        setResult(resultData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load result details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, params.resultId, router]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return (
          <Badge className="bg-green-500">
            <Award className="h-3 w-3 mr-1" />
            Graded
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-red-500">
            <UserX className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!assignment || !result) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/assignments/${params.id}/results`} passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Result Details</h1>
            <p className="text-muted-foreground">{assignment.title}</p>
          </div>
        </div>
        <Link
          href={`/dashboard/assignments/${params.id}/results/${params.resultId}/edit`}
          passHref
        >
          <Button>
            <Edit className="h-4 w-4 mr-2" /> Edit Result
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={result.studentAvatar} />
                <AvatarFallback className="text-lg">
                  {result.studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{result.studentName}</h3>
                <p className="text-muted-foreground">ID: {result.studentId}</p>
                <div className="mt-2">{getStatusBadge(result.status)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium text-muted-foreground">
                  Grade
                </p>
                <p className="text-2xl font-bold">
                  {result.grade}/{result.maxGrade}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium text-muted-foreground">
                  Percentage
                </p>
                <p
                  className={`text-2xl font-bold ${getGradeColor(result.percentage)}`}
                >
                  {result.percentage.toFixed(1)}%
                </p>
              </div>
            </div>

            {result.feedback && (
              <div>
                <h4 className="font-medium mb-2">Feedback</h4>
                <div className="bg-muted p-4 rounded-md">
                  <p className="whitespace-pre-wrap">{result.feedback}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grading Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Graded By</p>
                <p className="text-sm text-muted-foreground">
                  {result.gradedByName || "Not graded yet"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Graded At</p>
                <p className="text-sm text-muted-foreground">
                  {result.gradedAt
                    ? new Date(result.gradedAt).toLocaleString()
                    : "Not graded yet"}
                </p>
              </div>
            </div>

            {result.submissionId && (
              <div>
                <p className="text-sm font-medium">Submission ID</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {result.submissionId}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
