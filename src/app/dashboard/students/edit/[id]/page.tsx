"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import { studentService } from "@/services/studentService";
import StudentForm from "@/components/students/StudentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        if (params.id) {
          const data = await studentService.getById(params.id as string);
          setStudent(data);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [params.id]);

  const handleFormSubmit = async (studentData: Partial<Student>) => {
    try {
      if (student) {
        await studentService.update(student.id, studentData);
        router.push(`/dashboard/students/${student.id}`);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-muted-foreground">Loading student data...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground mb-4">Student not found</p>
        <Button onClick={() => router.push("/dashboard/students")}>
          Back to Student List
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background p-6 w-full">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Student</h1>
      </div>

      <StudentForm
        student={student}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
