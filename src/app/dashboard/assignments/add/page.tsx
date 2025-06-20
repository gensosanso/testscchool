"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAssignment } from "@/services/assignmentService";
import AssignmentForm from "@/components/assignments/AssignmentForm";
import { Assignment } from "@/types/assignment";
import { toast } from "@/components/ui/use-toast";

export default function AddAssignmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    data: Omit<Assignment, "id" | "createdAt" | "updatedAt">,
  ) => {
    setIsSubmitting(true);
    try {
      await createAssignment(data);
      toast({
        title: "Success",
        description: "Assignment created successfully",
      });
      router.push("/dashboard/assignments");
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast({
        title: "Error",
        description: "Failed to create assignment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Assignment</h1>
      <AssignmentForm onSubmit={handleSubmit} />
    </div>
  );
}
