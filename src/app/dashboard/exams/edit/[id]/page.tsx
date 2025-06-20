"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLessonById, updateLesson } from "@/services/lessonService";
import LessonForm from "@/components/lessons/LessonForm";
import { Lesson } from "@/types/lesson";
import { toast } from "@/components/ui/use-toast";

export default function EditExamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [exam, setExam] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const data = await getLessonById(params.id);
        if (!data || !data.isExam) {
          toast({
            title: "Error",
            description: "Exam not found",
            variant: "destructive",
          });
          router.push("/dashboard/exams");
          return;
        }
        setExam(data);
      } catch (error) {
        console.error("Error fetching exam:", error);
        toast({
          title: "Error",
          description: "Failed to load exam data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [params.id, router]);

  const handleSubmit = async (
    data: Omit<Lesson, "id" | "createdAt" | "updatedAt">,
  ) => {
    setIsSubmitting(true);
    try {
      // Ensure the isExam flag is set to true
      const examData = {
        ...data,
        isExam: true,
      };

      await updateLesson(params.id, examData);
      toast({
        title: "Success",
        description: "Exam updated successfully",
      });
      router.push("/dashboard/exams");
    } catch (error) {
      console.error("Error updating exam:", error);
      toast({
        title: "Error",
        description: "Failed to update exam",
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

  if (!exam) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Exam</h1>
      <LessonForm initialData={exam} onSubmit={handleSubmit} />
    </div>
  );
}
