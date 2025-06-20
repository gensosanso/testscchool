"use client";

import { useState, useEffect } from "react";
import { getAllLessons } from "@/services/lessonService";
import LessonTable from "@/components/lessons/LessonTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Lesson } from "@/types/lesson";

export default function ExamsPage() {
  const [exams, setExams] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const allLessons = await getAllLessons();
        // Filter only lessons that are exams
        const examLessons = allLessons.filter((lesson) => lesson.isExam);
        setExams(examLessons);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        // Use the same deleteLesson function from lessonService
        const success = await import("@/services/lessonService").then(
          (module) => module.deleteLesson(id),
        );
        if (success) {
          setExams((prev) => prev.filter((exam) => exam.id !== id));
        }
      } catch (error) {
        console.error("Error deleting exam:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Exams</h1>
          <p className="text-muted-foreground">
            Manage all exams, assessments, and evaluation materials
          </p>
        </div>
        <Link href="/dashboard/exams/add" passHref>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Exam
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <LessonTable lessons={exams} onDelete={handleDelete} />
      )}
    </div>
  );
}
