"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Class } from "@/types/class";
import ClassTable from "@/components/classes/ClassTable";
import { classService } from "@/services/classService";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await classService.getClasses();
        setClasses(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
        setError("Failed to load classes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = (id: string) => {
    setClassToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!classToDelete) return;

    try {
      await classService.deleteClass(classToDelete);
      setClasses(classes.filter((c) => c.id !== classToDelete));
      setDeleteDialogOpen(false);
      setClassToDelete(null);
    } catch (err) {
      console.error("Failed to delete class:", err);
      setError("Failed to delete class. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-lg text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Classes Management</h1>
      </div>

      <ClassTable classes={classes} onDelete={handleDelete} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              class and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
