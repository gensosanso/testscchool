"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLesson } from "@/services/lessonService";
import LessonForm from "@/components/lessons/LessonForm";
import { Lesson } from "@/types/lesson";
import { toast } from "@/components/ui/use-toast";

export default function AddExamPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      await createLesson(examData);
      toast({
        title: "Success",
        description: "Exam created successfully",
      });
      router.push("/dashboard/exams");
    } catch (error) {
      console.error("Error creating exam:", error);
      toast({
        title: "Error",
        description: "Failed to create exam",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Exam</h1>
      <LessonForm
        onSubmit={handleSubmit}
        initialData={{ isExam: true } as any}
      />
    </div>
  );
}
