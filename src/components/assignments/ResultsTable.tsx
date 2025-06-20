"use client";

import { useState, useEffect } from "react";
import { AssignmentResult } from "@/types/assignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Eye, Award, Clock, UserX } from "lucide-react";
import Link from "next/link";

interface ResultsTableProps {
  results: AssignmentResult[];
  assignmentId: string;
  onEdit?: (resultId: string) => void;
}

export default function ResultsTable({
  results = [],
  assignmentId,
  onEdit,
}: ResultsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filteredResults, setFilteredResults] =
    useState<AssignmentResult[]>(results);

  useEffect(() => {
    const filtered = results.filter((result) => {
      const matchesSearch = result.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || result.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredResults(filtered);
  }, [results, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return (
          <Badge className="bg-green-500">
            <Award className="h-3 w-3 mr-1" />
            Graded
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-red-500">
            <UserX className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 font-semibold";
    if (percentage >= 80) return "text-blue-600 font-semibold";
    if (percentage >= 70) return "text-yellow-600 font-semibold";
    if (percentage >= 60) return "text-orange-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="graded">Graded</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Graded At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No results found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={result.studentAvatar} />
                        <AvatarFallback>
                          {result.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{result.studentName}</div>
                        {result.feedback && (
                          <div className="text-xs text-muted-foreground">
                            {result.feedback.length > 50
                              ? `${result.feedback.substring(0, 50)}...`
                              : result.feedback}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {result.status === "graded" || result.status === "absent"
                        ? `${result.grade}/${result.maxGrade}`
                        : "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`font-medium ${
                        result.status === "graded"
                          ? getGradeColor(result.percentage)
                          : "text-muted-foreground"
                      }`}
                    >
                      {result.status === "graded" || result.status === "absent"
                        ? `${result.percentage.toFixed(1)}%`
                        : "-"}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(result.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {result.gradedAt
                      ? new Date(result.gradedAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/assignments/${assignmentId}/results/${result.id}`}
                        passHref
                      >
                        <Button size="icon" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link
                        href={`/dashboard/assignments/${assignmentId}/results/${result.id}/edit`}
                        passHref
                      >
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
