"use client";

import { useState, useEffect } from "react";
import {
  getAllAssignments,
  deleteAssignment,
} from "@/services/assignmentService";
import AssignmentTable from "@/components/assignments/AssignmentTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Assignment } from "@/types/assignment";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAllAssignments();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        const success = await deleteAssignment(id);
        if (success) {
          setAssignments((prev) =>
            prev.filter((assignment) => assignment.id !== id),
          );
        }
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">
            Manage all assignments, homework, and projects
          </p>
        </div>
        <Link href="/dashboard/assignments/add" passHref>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Assignment
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <AssignmentTable assignments={assignments} onDelete={handleDelete} />
      )}
    </div>
  );
}
