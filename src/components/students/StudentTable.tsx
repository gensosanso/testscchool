import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (student: Student) => void;
}

const StudentTable = ({
  students,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
}: StudentTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "suspended":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.id}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>
                    {student.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span>{student.name}</span>
              </div>
            </TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.grade}</TableCell>
            <TableCell>
              <Badge className={`${getStatusColor(student.status)} text-white`}>
                {student.status.charAt(0).toUpperCase() +
                  student.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewStudent(student)}
                  title="View student details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {onEditStudent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditStudent(student)}
                    title="Edit student"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDeleteStudent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteStudent(student)}
                    title="Delete student"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
