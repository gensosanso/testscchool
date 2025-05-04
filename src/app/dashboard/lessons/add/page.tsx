"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLesson } from "@/services/lessonService";
import LessonForm from "@/components/lessons/LessonForm";
import { Lesson } from "@/types/lesson";
import { toast } from "@/components/ui/use-toast";

export default function AddLessonPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    data: Omit<Lesson, "id" | "createdAt" | "updatedAt">,
  ) => {
    setIsSubmitting(true);
    try {
      await createLesson(data);
      toast({
        title: "Success",
        description: "Lesson created successfully",
      });
      router.push("/dashboard/lessons");
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast({
        title: "Error",
        description: "Failed to create lesson",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Lesson</h1>
      <LessonForm onSubmit={handleSubmit} />
    </div>
  );
}
