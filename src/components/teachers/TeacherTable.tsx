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
import { Teacher } from "@/types/teacher";

interface TeacherTableProps {
  teachers: Teacher[];
  onViewTeacher: (teacher: Teacher) => void;
  onEditTeacher?: (teacher: Teacher) => void;
  onDeleteTeacher?: (teacher: Teacher) => void;
}

const TeacherTable = ({
  teachers,
  onViewTeacher,
  onEditTeacher,
  onDeleteTeacher,
}: TeacherTableProps) => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell>{teacher.id}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>
                    {teacher.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span>{teacher.name}</span>
              </div>
            </TableCell>
            <TableCell>{teacher.subject}</TableCell>
            <TableCell>{teacher.department}</TableCell>
            <TableCell>
              <Badge className={`${getStatusColor(teacher.status)} text-white`}>
                {teacher.status.charAt(0).toUpperCase() +
                  teacher.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewTeacher(teacher)}
                  title="View teacher details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {onEditTeacher && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditTeacher(teacher)}
                    title="Edit teacher"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDeleteTeacher && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTeacher(teacher)}
                    title="Delete teacher"
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

export default TeacherTable;
