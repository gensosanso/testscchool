"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLessonById, deleteLesson } from "@/services/lessonService";
import { Lesson } from "@/types/lesson";
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
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { subjectService } from "@/services/subjectService";
import { teacherService } from "@/services/teacherService";
import { classService } from "@/services/classService";

export default function ExamDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [exam, setExam] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examData = await getLessonById(params.id);
        if (!examData || !examData.isExam) {
          toast({
            title: "Error",
            description: "Exam not found",
            variant: "destructive",
          });
          router.push("/dashboard/exams");
          return;
        }
        setExam(examData);

        // Fetch related data
        const subjects = await subjectService.getSubjects();
        const teachers = await teacherService.getAll();
        const classes = await classService.getClasses();

        const subject = subjects.find((s) => s.id === examData.subjectId);
        const teacher = teachers.find((t) => t.id === examData.teacherId);
        const classData = classes.find((c) => c.id === examData.classId);

        if (subject) setSubjectName(subject.name);
        if (teacher) setTeacherName(teacher.name);
        if (classData) setClassName(classData.name);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load exam data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        const success = await deleteLesson(params.id);
        if (success) {
          toast({
            title: "Success",
            description: "Exam deleted successfully",
          });
          router.push("/dashboard/exams");
        }
      } catch (error) {
        console.error("Error deleting exam:", error);
        toast({
          title: "Error",
          description: "Failed to delete exam",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!exam) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/exams" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <Badge className="bg-purple-500">Exam</Badge>
          {getStatusBadge(exam.status)}
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/exams/edit/${exam.id}`} passHref>
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
            <CardTitle>Exam Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{exam.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(exam.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {exam.startTime} ({exam.duration} minutes)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Subject</p>
                  <p className="text-sm text-muted-foreground">{subjectName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Teacher</p>
                  <p className="text-sm text-muted-foreground">{teacherName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Class</p>
                  <p className="text-sm text-muted-foreground">{className}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Marks</p>
                  <p className="text-sm text-muted-foreground">
                    Total: {exam.totalMarks} • Pass: {exam.passingMarks}
                  </p>
                </div>
              </div>
            </div>

            {exam.objectives && exam.objectives.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Learning Objectives</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {exam.objectives.map((objective, index) => (
                    <li key={index} className="text-muted-foreground">
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exam.questions && exam.questions.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Questions</h3>
                <div className="space-y-4">
                  {exam.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            Q{index + 1}. {question.question}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Type: {question.type}
                          </p>
                        </div>
                        <Badge>{question.marks} marks</Badge>
                      </div>

                      {question.type === "multiple-choice" &&
                        question.options && (
                          <div className="mt-3 space-y-1">
                            <p className="text-sm font-medium">Options:</p>
                            <ul className="list-disc pl-5">
                              {question.options.map((option, i) => (
                                <li
                                  key={i}
                                  className={
                                    option === question.correctAnswer
                                      ? "font-medium"
                                      : ""
                                  }
                                >
                                  {option}{" "}
                                  {option === question.correctAnswer &&
                                    "(Correct)"}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {question.type === "true-false" && (
                        <div className="mt-3">
                          <p className="text-sm font-medium">
                            Correct answer: {question.correctAnswer}
                          </p>
                        </div>
                      )}

                      {(question.type === "short-answer" ||
                        question.type === "essay") &&
                        question.correctAnswer && (
                          <div className="mt-3">
                            <p className="text-sm font-medium">Model answer:</p>
                            <p className="text-sm italic">
                              {question.correctAnswer}
                            </p>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exam Materials</CardTitle>
          </CardHeader>
          <CardContent>
            {exam.materials && exam.materials.length > 0 ? (
              <ul className="space-y-2">
                {exam.materials.map((material, index) => (
                  <li
                    key={index}
                    className="p-2 bg-muted rounded-md text-sm flex items-center gap-2"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    {material}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                No materials provided for this exam.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
