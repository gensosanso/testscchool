"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ClassForm from "@/components/classes/ClassForm";
import { classService } from "@/services/classService";
import { Class } from "@/types/class";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddClassPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Partial<Class>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add default empty arrays for required properties if they're not provided
      const classData = {
        ...data,
        schedule: data.schedule || [],
        subjects: data.subjects || [],
        students: data.students || [],
        classTeacher: data.classTeacher || { id: "", name: "" },
      } as Omit<Class, "id">;

      await classService.createClass(classData);
      router.push("/dashboard/classes");
      router.refresh();
    } catch (err) {
      console.error("Failed to create class:", err);
      setError("Failed to create class. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/classes");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Add New Class</h1>
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      <ClassForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
