import { notFound } from "next/navigation";
import Link from "next/link";
import { classService } from "@/services/classService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, ArrowLeft, Users, BookOpen, Calendar } from "lucide-react";

interface ClassDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ClassDetailsPage({
  params,
}: ClassDetailsPageProps) {
  const classData = await classService.getClassById(params.id);

  if (!classData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/classes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{classData.name}</h1>
          <Badge
            variant={classData.status === "active" ? "default" : "secondary"}
            className="ml-2"
          >
            {classData.status.charAt(0).toUpperCase() +
              classData.status.slice(1)}
          </Badge>
        </div>
        <Link href={`/dashboard/classes/edit/${params.id}`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" /> Edit Class
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" /> Class Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Grade</p>
                <p className="font-medium">{classData.grade}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Section</p>
                <p className="font-medium">{classData.section}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Room</p>
                <p className="font-medium">{classData.room}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Academic Year</p>
                <p className="font-medium">{classData.academicYear}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium">
                  {classData.currentStrength}/{classData.capacity}
                </p>
              </div>
            </div>
            {classData.description && (
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{classData.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" /> Class Teacher
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{classData.classTeacher.name}</p>
              <Link href={`/dashboard/teachers/${classData.classTeacher.id}`}>
                <Button variant="outline" size="sm">
                  View Teacher Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Schedule Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {classData.schedule.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="font-medium">{item.day}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.startTime} - {item.endTime}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="subjects" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {classData.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Teacher: {subject.teacherName}
                      </p>
                    </div>
                    <Link href={`/dashboard/teachers/${subject.teacherId}`}>
                      <Button variant="ghost" size="sm">
                        View Teacher
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {classData.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex justify-between items-center border-b pb-2 last:border-0"
                  >
                    <p className="font-medium">{student.name}</p>
                    <Link href={`/dashboard/students/${student.id}`}>
                      <Button variant="ghost" size="sm">
                        View Student
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
