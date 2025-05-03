import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Teacher } from "@/types/teacher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeacherDetailsProps {
  teacher: Teacher;
}

const TeacherDetails = ({ teacher }: TeacherDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "on leave":
        return "bg-amber-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-6 bg-white">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{teacher.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-muted-foreground">{teacher.subject}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {teacher.department}
                </span>
                <span className="text-muted-foreground">•</span>
                <Badge
                  className={`${getStatusColor(teacher.status)} text-white`}
                >
                  {teacher.status.charAt(0).toUpperCase() +
                    teacher.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional Info</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Date of Birth
                  </h4>
                  <p>{teacher.personalInfo.dateOfBirth}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Gender
                  </h4>
                  <p>{teacher.personalInfo.gender}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h4>
                  <p>{teacher.personalInfo.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Phone
                  </h4>
                  <p>{teacher.personalInfo.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Address
                  </h4>
                  <p>{teacher.personalInfo.address}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Emergency Contact
                  </h4>
                  <p>{teacher.personalInfo.emergencyContact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Emergency Phone
                  </h4>
                  <p>{teacher.personalInfo.emergencyPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Qualification
                  </h4>
                  <p>{teacher.professionalInfo.qualification}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Experience
                  </h4>
                  <p>{teacher.professionalInfo.experience}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Join Date
                  </h4>
                  <p>{teacher.professionalInfo.joinDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Specialization
                  </h4>
                  <p>{teacher.professionalInfo.specialization}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {teacher.professionalInfo.certifications.map(
                      (cert, index) => (
                        <Badge key={index} variant="outline">
                          {cert}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Classes Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.classesAssigned.map((cls, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Class Name
                          </h4>
                          <p className="font-medium">{cls.className}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Grade
                          </h4>
                          <p>{cls.grade}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Schedule
                          </h4>
                          <p>{cls.schedule}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Students
                          </h4>
                          <p>{cls.students}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Salary
                  </h4>
                  <p>${teacher.financialDetails.salary.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Last Payment Date
                  </h4>
                  <p>{teacher.financialDetails.lastPaymentDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Bank Details
                  </h4>
                  <p>{teacher.financialDetails.bankDetails}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Tax Info
                  </h4>
                  <p>{teacher.financialDetails.taxInfo}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Payment History
                </h4>
                <div className="space-y-2">
                  {teacher.financialDetails.paymentHistory.map(
                    (payment, index) => (
                      <Card key={index}>
                        <CardContent className="py-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{payment.date}</p>
                              <p className="text-sm text-muted-foreground">
                                {payment.type}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ${payment.amount.toLocaleString()}
                              </p>
                              <Badge variant="outline" className="mt-1">
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDetails;
