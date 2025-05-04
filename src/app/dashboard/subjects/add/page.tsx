"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubjectForm from "@/components/subjects/SubjectForm";
import { subjectService } from "@/services/subjectService";
import { Subject } from "@/types/subject";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddSubjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Partial<Subject>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add default empty arrays for required properties if they're not provided
      const subjectData = {
        ...data,
        teachers: data.teachers || [],
        classes: data.classes || [],
      } as Omit<Subject, "id">;

      await subjectService.createSubject(subjectData);
      router.push("/dashboard/subjects");
      router.refresh();
    } catch (err) {
      console.error("Failed to create subject:", err);
      setError("Failed to create subject. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/subjects");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Add New Subject</h1>
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      <SubjectForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
