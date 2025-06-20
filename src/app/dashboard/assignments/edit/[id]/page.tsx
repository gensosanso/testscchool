"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAssignmentById,
  updateAssignment,
} from "@/services/assignmentService";
import AssignmentForm from "@/components/assignments/AssignmentForm";
import { Assignment } from "@/types/assignment";
import { toast } from "@/components/ui/use-toast";

export default function EditAssignmentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const data = await getAssignmentById(params.id);
        if (!data) {
          toast({
            title: "Error",
            description: "Assignment not found",
            variant: "destructive",
          });
          router.push("/dashboard/assignments");
          return;
        }
        setAssignment(data);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        toast({
          title: "Error",
          description: "Failed to load assignment data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [params.id, router]);

  const handleSubmit = async (
    data: Omit<Assignment, "id" | "createdAt" | "updatedAt">,
  ) => {
    setIsSubmitting(true);
    try {
      await updateAssignment(params.id, data);
      toast({
        title: "Success",
        description: "Assignment updated successfully",
      });
      router.push("/dashboard/assignments");
    } catch (error) {
      console.error("Error updating assignment:", error);
      toast({
        title: "Error",
        description: "Failed to update assignment",
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

  if (!assignment) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Assignment</h1>
      <AssignmentForm initialData={assignment} onSubmit={handleSubmit} />
    </div>
  );
}
