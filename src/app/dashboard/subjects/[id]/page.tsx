"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Subject } from "@/types/subject";
import { subjectService } from "@/services/subjectService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SubjectDetailsPageProps {
  params: {
    id: string;
  };
}

export default function SubjectDetailsPage({
  params,
}: SubjectDetailsPageProps) {
  const router = useRouter();
  const { id } = params;

  const [subjectData, setSubjectData] = useState<Subject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await subjectService.getSubjectById(id);
        if (data) {
          setSubjectData(data);
        } else {
          setError("Subject not found");
        }
      } catch (err) {
        console.error("Failed to fetch subject:", err);
        setError("Failed to load subject data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  const handleBack = () => {
    router.push("/dashboard/subjects");
  };

  const handleEdit = () => {
    router.push(`/dashboard/subjects/edit/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading subject data...</p>
      </div>
    );
  }

  if (error || !subjectData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-lg text-destructive">
          {error || "Subject not found"}
        </p>
        <Button onClick={handleBack}>Back to Subjects</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">{subjectData.name}</h1>
          <Badge
            variant={subjectData.status === "active" ? "default" : "secondary"}
          >
            {subjectData.status.charAt(0).toUpperCase() +
              subjectData.status.slice(1)}
          </Badge>
        </div>
        <Button onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" /> Edit Subject
        </Button>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Subject Code
                  </h3>
                  <p>{subjectData.code}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Department
                  </h3>
                  <p>{subjectData.department}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Grade
                  </h3>
                  <p>{subjectData.grade}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Credits
                  </h3>
                  <p>{subjectData.credits}</p>
                </div>
              </div>
              {subjectData.description && (
                <div className="mt-4">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Description
                  </h3>
                  <p>{subjectData.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              {subjectData.teachers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectData.teachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.id}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">
                  No teachers assigned to this subject.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
            </CardHeader>
            <CardContent>
              {subjectData.classes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectData.classes.map((classItem) => (
                      <TableRow key={classItem.id}>
                        <TableCell>{classItem.id}</TableCell>
                        <TableCell>{classItem.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">
                  No classes assigned to this subject.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
