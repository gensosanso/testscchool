"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubjectForm from "@/components/subjects/SubjectForm";
import { subjectService } from "@/services/subjectService";
import { Subject } from "@/types/subject";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface EditSubjectPageProps {
  params: {
    id: string;
  };
}

export default function EditSubjectPage({ params }: EditSubjectPageProps) {
  const router = useRouter();
  const { id } = params;

  const [subjectData, setSubjectData] = useState<Partial<Subject> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await subjectService.getSubjectById(id);
        if (data) {
          setSubjectData(data);
        } else {
          setError("Subject not found");
        }
      } catch (err) {
        console.error("Failed to fetch subject:", err);
        setError("Failed to load subject data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  const handleSubmit = async (data: Partial<Subject>) => {
    setIsSaving(true);
    setError(null);

    try {
      await subjectService.updateSubject(id, data);
      router.push("/dashboard/subjects");
      router.refresh();
    } catch (err) {
      console.error("Failed to update subject:", err);
      setError("Failed to update subject. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/subjects");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading subject data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-lg text-destructive">{error}</p>
        <Button onClick={handleBack}>Back to Subjects</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Subject</h1>
      </div>

      {subjectData && (
        <SubjectForm
          initialData={subjectData}
          onSubmit={handleSubmit}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}
