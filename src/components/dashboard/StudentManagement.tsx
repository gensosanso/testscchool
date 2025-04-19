"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StudentForm from "@/components/students/StudentForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StudentTable from "@/components/students/StudentTable";
import { Student } from "@/types/student";
import { studentService } from "@/services/studentService";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const data = await studentService.getAll();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    const matchesClass = classFilter === "all" || student.class === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  const handleViewStudent = (student: Student) => {
    // Navigate to student profile page instead of opening dialog
    window.location.href = `/dashboard/students/${student.id}`;
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsEditMode(false);
    setIsFormDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEditMode(true);
    setIsFormDialogOpen(true);
  };

  const handleFormSubmit = async (studentData: Partial<Student>) => {
    try {
      if (isEditMode && selectedStudent) {
        // Update existing student
        const updatedStudent = await studentService.update(
          selectedStudent.id,
          studentData,
        );

        // Update the students list with the updated student
        setStudents(
          students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student,
          ),
        );
      } else {
        // Create new student
        const newStudent = await studentService.create(
          studentData as Omit<Student, "id">,
        );

        // Add the new student to the list
        setStudents([...students, newStudent]);
      }

      // Close the form dialog
      setIsFormDialogOpen(false);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleFormCancel = () => {
    setIsFormDialogOpen(false);
  };

  return (
    <div className="bg-background p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <Button onClick={handleAddStudent}>
          <Plus className="mr-2 h-4 w-4" /> Add New Student
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, ID, or class..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="10A">10A</SelectItem>
            <SelectItem value="10B">10B</SelectItem>
            <SelectItem value="11A">11A</SelectItem>
            <SelectItem value="11B">11B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">Loading students...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">No students found</p>
            </div>
          ) : (
            <StudentTable
              students={filteredStudents}
              onViewStudent={handleViewStudent}
              onEditStudent={handleEditStudent}
            />
          )}
        </CardContent>
      </Card>

      {/* Student Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-4">
              {selectedStudent && (
                <>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                    />
                    <AvatarFallback>
                      {selectedStudent?.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedStudent.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedStudent.id} | {selectedStudent.class}
                    </div>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <Tabs
              defaultValue="personal"
              className="mt-4"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="academic">Academic History</TabsTrigger>
                <TabsTrigger value="behavioral">Behavioral Records</TabsTrigger>
                <TabsTrigger value="financial">Financial Status</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Date of Birth</h3>
                    <p>{selectedStudent.personalInfo.dateOfBirth}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Gender</h3>
                    <p>{selectedStudent.personalInfo.gender}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Address</h3>
                    <p>{selectedStudent.personalInfo.address}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Phone</h3>
                    <p>{selectedStudent.personalInfo.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Email</h3>
                    <p>{selectedStudent.personalInfo.email}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Parent/Guardian Name</h3>
                    <p>{selectedStudent.personalInfo.parentName}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Parent/Guardian Contact</h3>
                    <p>{selectedStudent.personalInfo.parentContact}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Academic Year</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent.academicHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.year}</TableCell>
                        <TableCell>{record.grade}</TableCell>
                        <TableCell>{record.performance}</TableCell>
                        <TableCell>{record.attendance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="behavioral" className="mt-4">
                {selectedStudent.behavioralRecords.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Incident</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Action Taken</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudent.behavioralRecords.map(
                        (record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.incident}</TableCell>
                            <TableCell>{record.description}</TableCell>
                            <TableCell>{record.action}</TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">
                    No behavioral records found.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="financial" className="mt-4 space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          $
                          {selectedStudent.financialStatus.tuitionFee.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total Tuition Fee
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          $
                          {selectedStudent.financialStatus.paid.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Amount Paid
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          $
                          {selectedStudent.financialStatus.due.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Amount Due
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedStudent.financialStatus.nextPaymentDate}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Next Payment Date
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-semibold mt-6">Payment History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent.financialStatus.paymentHistory.map(
                      (payment, index) => (
                        <TableRow key={index}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            ${payment.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment.status === "Completed"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Student Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Student" : "Add New Student"}
            </DialogTitle>
          </DialogHeader>
          <StudentForm
            student={isEditMode ? selectedStudent : undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
