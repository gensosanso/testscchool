"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAssignmentById,
  getResultById,
  saveAssignmentResult,
} from "@/services/assignmentService";
import { Assignment, AssignmentResult } from "@/types/assignment";
import ResultForm from "@/components/assignments/ResultForm";
import { toast } from "@/components/ui/use-toast";

export default function EditResultPage({
  params,
}: {
  params: { id: string; resultId: string };
}) {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [result, setResult] = useState<AssignmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentData, resultData] = await Promise.all([
          getAssignmentById(params.id),
          getResultById(params.resultId),
        ]);

        if (!assignmentData || !resultData) {
          toast({
            title: "Error",
            description: "Assignment or result not found",
            variant: "destructive",
          });
          router.push("/dashboard/assignments");
          return;
        }

        setAssignment(assignmentData);
        setResult(resultData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load result data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, params.resultId, router]);

  const handleSubmit = async (data: Omit<AssignmentResult, "id">) => {
    setIsSubmitting(true);
    try {
      await saveAssignmentResult(data);
      toast({
        title: "Success",
        description: "Result updated successfully",
      });
      router.push(`/dashboard/assignments/${params.id}/results`);
    } catch (error) {
      console.error("Error updating result:", error);
      toast({
        title: "Error",
        description: "Failed to update result",
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

  if (!assignment || !result) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ResultForm
        initialData={result}
        assignmentId={params.id}
        assignmentTitle={assignment.title}
        maxGrade={assignment.totalMarks}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
