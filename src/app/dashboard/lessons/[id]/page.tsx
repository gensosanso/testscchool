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
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { subjectService } from "@/services/subjectService";
import { teacherService } from "@/services/teacherService";
import { classService } from "@/services/classService";

export default function LessonDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonData = await getLessonById(params.id);
        if (!lessonData) {
          toast({
            title: "Error",
            description: "Lesson not found",
            variant: "destructive",
          });
          router.push("/dashboard/lessons");
          return;
        }
        setLesson(lessonData);

        // Fetch related data
        const subjects = await subjectService.getSubjects();
        const teachers = await teacherService.getAll();
        const classes = await classService.getClasses();

        const subject = subjects.find((s) => s.id === lessonData.subjectId);
        const teacher = teachers.find((t) => t.id === lessonData.teacherId);
        const classData = classes.find((c) => c.id === lessonData.classId);

        if (subject) setSubjectName(subject.name);
        if (teacher) setTeacherName(teacher.name);
        if (classData) setClassName(classData.name);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load lesson data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        const success = await deleteLesson(params.id);
        if (success) {
          toast({
            title: "Success",
            description: "Lesson deleted successfully",
          });
          router.push("/dashboard/lessons");
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
        toast({
          title: "Error",
          description: "Failed to delete lesson",
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

  if (!lesson) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/lessons" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          {getStatusBadge(lesson.status)}
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/lessons/edit/${lesson.id}`} passHref>
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
            <CardTitle>Lesson Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(lesson.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {lesson.startTime} ({lesson.duration} minutes)
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
            </div>

            <div>
              <h3 className="font-medium mb-2">Learning Objectives</h3>
              <ul className="list-disc pl-5 space-y-1">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="text-muted-foreground">
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            {lesson.isExam && (
              <div>
                <h3 className="font-medium mb-2">Exam Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  <div className="bg-muted p-2 rounded-md">
                    <span className="text-sm font-medium">Total Marks:</span>
                    <span className="text-sm ml-2">{lesson.totalMarks}</span>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <span className="text-sm font-medium">Passing Marks:</span>
                    <span className="text-sm ml-2">{lesson.passingMarks}</span>
                  </div>
                </div>

                {lesson.questions && lesson.questions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">
                      Questions ({lesson.questions.length})
                    </h4>
                    <div className="space-y-3">
                      {lesson.questions.map((question, index) => (
                        <div
                          key={question.id}
                          className="border rounded-md p-3"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Q{index + 1}. {question.question}
                            </span>
                            <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {question.marks} marks
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Type: {question.type}
                          </div>

                          {question.type === "multiple-choice" &&
                            question.options && (
                              <div className="mt-2 space-y-1">
                                {question.options.map((option, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2"
                                  >
                                    <div
                                      className={`h-2 w-2 rounded-full ${option === question.correctAnswer ? "bg-green-500" : "bg-muted-foreground"}`}
                                    ></div>
                                    <span
                                      className={
                                        option === question.correctAnswer
                                          ? "font-medium"
                                          : ""
                                      }
                                    >
                                      {option}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                          {question.type === "true-false" && (
                            <div className="mt-2">
                              <span className="text-sm">Correct answer: </span>
                              <span className="text-sm font-medium">
                                {question.correctAnswer}
                              </span>
                            </div>
                          )}

                          {(question.type === "short-answer" ||
                            question.type === "essay") &&
                            question.correctAnswer && (
                              <div className="mt-2">
                                <span className="text-sm">Model answer: </span>
                                <span className="text-sm italic">
                                  {question.correctAnswer}
                                </span>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teaching Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.materials.map((material, index) => (
                <li
                  key={index}
                  className="p-2 bg-muted rounded-md text-sm flex items-center gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  {material}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
