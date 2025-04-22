import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Teacher } from "@/types/teacher";

interface TeacherFormProps {
  teacher?: Teacher;
  onSubmit: (data: Partial<Teacher>) => void;
  onCancel: () => void;
}

const TeacherForm = ({ teacher, onSubmit, onCancel }: TeacherFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<Partial<Teacher>>(
    {
      defaultValues: teacher || {
        name: "",
        subject: "",
        department: "",
        status: "active",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(2, 8)}`,
        personalInfo: {
          dateOfBirth: "",
          gender: "",
          address: "",
          phone: "",
          email: "",
          emergencyContact: "",
          emergencyPhone: "",
        },
        professionalInfo: {
          qualification: "",
          experience: "",
          joinDate: new Date().toISOString().split("T")[0],
          specialization: "",
          certifications: [],
        },
        classesAssigned: [],
        performanceReviews: [],
        financialDetails: {
          salary: 0,
          lastPaymentDate: "",
          bankDetails: "",
          taxInfo: "",
          paymentHistory: [],
        },
      },
    },
  );

  const status = watch("status");

  const handleStatusChange = (value: string) => {
    setValue("status", value as "active" | "inactive" | "on leave");
  };

  const handleDepartmentChange = (value: string) => {
    setValue("department", value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{teacher ? "Edit Teacher" : "Add New Teacher"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Dr. John Smith"
                  {...register("name")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Mathematics"
                  {...register("subject")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  onValueChange={handleDepartmentChange}
                  defaultValue={teacher?.department || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Humanities">Humanities</SelectItem>
                    <SelectItem value="Languages">Languages</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Physical Education">
                      Physical Education
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={handleStatusChange}
                  defaultValue={teacher?.status || "active"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.smith@school.edu"
                  {...register("personalInfo.email")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  {...register("personalInfo.phone")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  placeholder="Ph.D. in Mathematics"
                  {...register("professionalInfo.qualification")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  placeholder="10 years"
                  {...register("professionalInfo.experience")}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {teacher ? "Update Teacher" : "Add Teacher"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TeacherForm;
