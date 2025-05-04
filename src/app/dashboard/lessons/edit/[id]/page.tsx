"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLessonById, updateLesson } from "@/services/lessonService";
import LessonForm from "@/components/lessons/LessonForm";
import { Lesson } from "@/types/lesson";
import { toast } from "@/components/ui/use-toast";

export default function EditLessonPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonById(params.id);
        if (!data) {
          toast({
            title: "Error",
            description: "Lesson not found",
            variant: "destructive",
          });
          router.push("/dashboard/lessons");
          return;
        }
        setLesson(data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        toast({
          title: "Error",
          description: "Failed to load lesson data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [params.id, router]);

  const handleSubmit = async (
    data: Omit<Lesson, "id" | "createdAt" | "updatedAt">,
  ) => {
    setIsSubmitting(true);
    try {
      await updateLesson(params.id, data);
      toast({
        title: "Success",
        description: "Lesson updated successfully",
      });
      router.push("/dashboard/lessons");
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast({
        title: "Error",
        description: "Failed to update lesson",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
      <h1 className="text-2xl font-bold">Edit Lesson</h1>
      <LessonForm initialData={lesson} onSubmit={handleSubmit} />
    </div>
  );
}
