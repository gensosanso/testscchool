"use client";

import React, { useState, useEffect } from "react";
import { Student } from "@/types/student";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentFormProps {
  student?: Student;
  onSubmit: (student: Partial<Student>) => void;
  onCancel: () => void;
}

const initialStudentState: Partial<Student> = {
  name: "",
  class: "",
  grade: "",
  status: "active",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(7)}`,
  personalInfo: {
    dateOfBirth: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    parentName: "",
    parentContact: "",
  },
  academicHistory: [],
  behavioralRecords: [],
  financialStatus: {
    tuitionFee: 0,
    paid: 0,
    due: 0,
    nextPaymentDate: "",
    paymentHistory: [],
  },
};

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Student>>(
    student || initialStudentState,
  );
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData({
        ...formData,
        [section]: {
          ...((formData[section as keyof Student] as object) || {}),
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    if (field.includes(".")) {
      const [section, subfield] = field.split(".");
      setFormData({
        ...formData,
        [section]: {
          ...formData[section as keyof Student],
          [subfield]: value,
        },
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs
        defaultValue="personal"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="academic">Academic History</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral Records</TabsTrigger>
          <TabsTrigger value="financial">Financial Status</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={formData.class || ""}
                    onValueChange={(value) =>
                      handleSelectChange(value, "class")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10A">10A</SelectItem>
                      <SelectItem value="10B">10B</SelectItem>
                      <SelectItem value="11A">11A</SelectItem>
                      <SelectItem value="11B">11B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select
                    value={formData.grade || ""}
                    onValueChange={(value) =>
                      handleSelectChange(value, "grade")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th</SelectItem>
                      <SelectItem value="11th">11th</SelectItem>
                      <SelectItem value="12th">12th</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status || "active"}
                    onValueChange={(value) =>
                      handleSelectChange(
                        value as "active" | "inactive" | "suspended",
                        "status",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="personalInfo.dateOfBirth"
                    type="date"
                    value={formData.personalInfo?.dateOfBirth || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.personalInfo?.gender || ""}
                    onValueChange={(value) =>
                      handleSelectChange(value, "personalInfo.gender")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="personalInfo.address"
                    value={formData.personalInfo?.address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="personalInfo.phone"
                    value={formData.personalInfo?.phone || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="personalInfo.email"
                    type="email"
                    value={formData.personalInfo?.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  <Input
                    id="parentName"
                    name="personalInfo.parentName"
                    value={formData.personalInfo?.parentName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentContact">Parent/Guardian Contact</Label>
                  <Input
                    id="parentContact"
                    name="personalInfo.parentContact"
                    value={formData.personalInfo?.parentContact || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional tabs will be implemented in future iterations */}
        <TabsContent value="academic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Academic history fields will be implemented in the next
                iteration.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavioral" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Behavioral records fields will be implemented in the next
                iteration.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Financial status fields will be implemented in the next
                iteration.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Student</Button>
      </div>
    </form>
  );
};

export default StudentForm;
