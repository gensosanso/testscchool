"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import { studentService } from "@/services/studentService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Edit, Trash } from "lucide-react";

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

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

  const handleEditStudent = () => {
    // Navigate to edit page or open edit dialog
    router.push(`/dashboard/students/edit/${student?.id}`);
  };

  const handleBackToList = () => {
    router.push("/dashboard/students");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-muted-foreground">Loading student profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground mb-4">Student not found</p>
        <Button onClick={handleBackToList}>Back to Student List</Button>
      </div>
    );
  }

  return (
    <div className="bg-background p-6 w-full">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={handleBackToList} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold flex-1">Student Profile</h1>
        <Button onClick={handleEditStudent} className="mr-2">
          <Edit className="h-4 w-4 mr-2" /> Edit
        </Button>
      </div>

      <div className="flex items-start mb-6">
        <Avatar className="h-24 w-24 mr-6">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold">{student.name}</h2>
          <div className="flex items-center space-x-4 mt-2">
            <div className="text-muted-foreground">ID: {student.id}</div>
            <div className="text-muted-foreground">Class: {student.class}</div>
            <div className="text-muted-foreground">Grade: {student.grade}</div>
            <Badge
              variant={
                student.status === "active"
                  ? "default"
                  : student.status === "suspended"
                    ? "destructive"
                    : "outline"
              }
            >
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="personal"
        className="mt-6"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="academic">Academic History</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral Records</TabsTrigger>
          <TabsTrigger value="financial">Financial Status</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">
                    Date of Birth
                  </h3>
                  <p className="text-lg">{student.personalInfo.dateOfBirth}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">Gender</h3>
                  <p className="text-lg">{student.personalInfo.gender}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">Address</h3>
                  <p className="text-lg">{student.personalInfo.address}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">Phone</h3>
                  <p className="text-lg">{student.personalInfo.phone}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">Email</h3>
                  <p className="text-lg">{student.personalInfo.email}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">
                    Parent/Guardian Name
                  </h3>
                  <p className="text-lg">{student.personalInfo.parentName}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-muted-foreground">
                    Parent/Guardian Contact
                  </h3>
                  <p className="text-lg">
                    {student.personalInfo.parentContact}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic History</CardTitle>
            </CardHeader>
            <CardContent>
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
                  {student.academicHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.year}</TableCell>
                      <TableCell>{record.grade}</TableCell>
                      <TableCell>{record.performance}</TableCell>
                      <TableCell>{record.attendance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavioral" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Records</CardTitle>
            </CardHeader>
            <CardContent>
              {student.behavioralRecords.length > 0 ? (
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
                    {student.behavioralRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.incident}</TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>{record.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center py-4">No behavioral records found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        ${student.financialStatus.tuitionFee.toLocaleString()}
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
                        ${student.financialStatus.paid.toLocaleString()}
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
                        ${student.financialStatus.due.toLocaleString()}
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
                        {student.financialStatus.nextPaymentDate}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Next Payment Date
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-4">
                Payment History
              </h3>
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
                  {student.financialStatus.paymentHistory.map(
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
