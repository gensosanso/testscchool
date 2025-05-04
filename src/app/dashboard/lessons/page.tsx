"use client";

import { useState, useEffect } from "react";
import { getAllLessons, deleteLesson } from "@/services/lessonService";
import LessonTable from "@/components/lessons/LessonTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lesson } from "@/types/lesson";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        const success = await deleteLesson(id);
        if (success) {
          setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lessons</h1>
          <p className="text-muted-foreground">
            Manage all lessons, schedules, and teaching materials
          </p>
        </div>
        <Link href="/dashboard/lessons/add" passHref>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Lesson
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <LessonTable lessons={lessons} onDelete={handleDelete} />
      )}
    </div>
  );
}
