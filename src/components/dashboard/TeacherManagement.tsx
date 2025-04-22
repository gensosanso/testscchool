"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import TeacherTable from "@/components/teachers/TeacherTable";
import TeacherForm from "@/components/teachers/TeacherForm";
import { teacherService } from "@/services/teacherService";
import { Teacher } from "@/types/teacher";

const TeacherManagement = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const data = await teacherService.getAll();
      setTeachers(data);
    } catch (error) {
      console.error("Failed to load teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTeacher = (teacher: Teacher) => {
    router.push(`/dashboard/teachers/${teacher.id}`);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsEditing(true);
  };

  const handleDeleteTeacher = async (teacher: Teacher) => {
    if (window.confirm(`Are you sure you want to delete ${teacher.name}?`)) {
      try {
        await teacherService.delete(teacher.id);
        setTeachers(teachers.filter((t) => t.id !== teacher.id));
      } catch (error) {
        console.error("Failed to delete teacher:", error);
      }
    }
  };

  const handleAddTeacher = () => {
    setIsAddingTeacher(true);
    setSelectedTeacher(undefined);
    setIsEditing(false);
  };

  const handleCancelForm = () => {
    setIsAddingTeacher(false);
    setIsEditing(false);
    setSelectedTeacher(undefined);
  };

  const handleSubmitTeacher = async (data: Partial<Teacher>) => {
    try {
      if (isEditing && selectedTeacher) {
        const updatedTeacher = await teacherService.update(
          selectedTeacher.id,
          data,
        );
        setTeachers(
          teachers.map((t) =>
            t.id === updatedTeacher.id ? updatedTeacher : t,
          ),
        );
      } else {
        const newTeacher = await teacherService.create(
          data as Omit<Teacher, "id">,
        );
        setTeachers([...teachers, newTeacher]);
      }
      setIsAddingTeacher(false);
      setIsEditing(false);
      setSelectedTeacher(undefined);
    } catch (error) {
      console.error("Failed to save teacher:", error);
    }
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isAddingTeacher || isEditing) {
    return (
      <div className="space-y-6">
        <TeacherForm
          teacher={selectedTeacher}
          onSubmit={handleSubmitTeacher}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Teacher Management</CardTitle>
          <Button onClick={handleAddTeacher}>
            <Plus className="mr-2 h-4 w-4" /> Add Teacher
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {loading ? (
            <p className="text-center py-4">Loading teachers...</p>
          ) : filteredTeachers.length === 0 ? (
            <p className="text-center py-4">
              {searchQuery
                ? "No teachers found matching your search."
                : "No teachers available."}
            </p>
          ) : (
            <TeacherTable
              teachers={filteredTeachers}
              onViewTeacher={handleViewTeacher}
              onEditTeacher={handleEditTeacher}
              onDeleteTeacher={handleDeleteTeacher}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherManagement;
