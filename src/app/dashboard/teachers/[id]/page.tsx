"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TeacherDetails from "@/components/teachers/TeacherDetails";
import { teacherService } from "@/services/teacherService";
import { Teacher } from "@/types/teacher";

const TeacherDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const teacherId = Array.isArray(params.id) ? params.id[0] : params.id;
        const data = await teacherService.getById(teacherId);

        if (data) {
          setTeacher(data);
        } else {
          setError("Teacher not found");
        }
      } catch (err) {
        console.error("Failed to fetch teacher:", err);
        setError("Failed to load teacher details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Teacher Details</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <p>Loading teacher details...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : teacher ? (
        <TeacherDetails teacher={teacher} />
      ) : null}
    </div>
  );
};

export default TeacherDetailsPage;
