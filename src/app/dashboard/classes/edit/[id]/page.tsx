"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ClassForm from "@/components/classes/ClassForm";
import { classService } from "@/services/classService";
import { Class } from "@/types/class";

interface EditClassPageProps {
  params: {
    id: string;
  };
}

export default function EditClassPage({ params }: EditClassPageProps) {
  const router = useRouter();
  const { id } = params;

  const [classData, setClassData] = useState<Partial<Class> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const data = await classService.getClassById(id);
        if (data) {
          setClassData(data);
        } else {
          setError("Class not found");
        }
      } catch (err) {
        console.error("Failed to fetch class:", err);
        setError("Failed to load class data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  const handleSubmit = async (data: Partial<Class>) => {
    setIsSaving(true);
    setError(null);

    try {
      await classService.updateClass(id, data);
      router.push("/dashboard/classes");
      router.refresh();
    } catch (err) {
      console.error("Failed to update class:", err);
      setError("Failed to update class. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading class data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Class</h1>

      {classData && (
        <ClassForm
          initialData={classData}
          onSubmit={handleSubmit}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}
