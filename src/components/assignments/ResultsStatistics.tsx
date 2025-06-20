"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Clock,
  UserX,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface ResultsStatisticsProps {
  statistics: {
    totalStudents: number;
    gradedCount: number;
    pendingCount: number;
    absentCount: number;
    averageGrade: number;
    averagePercentage: number;
    highestGrade: number;
    lowestGrade: number;
  };
  maxGrade: number;
}

export default function ResultsStatistics({
  statistics,
  maxGrade,
}: ResultsStatisticsProps) {
  const gradingProgress =
    statistics.totalStudents > 0
      ? (statistics.gradedCount / statistics.totalStudents) * 100
      : 0;

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalStudents}</div>
          <div className="text-xs text-muted-foreground mt-1">
            <Progress value={gradingProgress} className="h-2" />
            <span className="mt-1 block">
              {statistics.gradedCount} graded ({gradingProgress.toFixed(1)}%)
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Graded</CardTitle>
          <Award className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {statistics.gradedCount}
          </div>
          <div className="text-xs text-muted-foreground">
            {statistics.pendingCount} pending, {statistics.absentCount} absent
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statistics.gradedCount > 0
              ? `${statistics.averageGrade.toFixed(1)}/${maxGrade}`
              : "-"}
          </div>
          <div
            className={`text-xs font-medium ${
              statistics.gradedCount > 0
                ? getGradeColor(statistics.averagePercentage)
                : "text-muted-foreground"
            }`}
          >
            {statistics.gradedCount > 0
              ? `${statistics.averagePercentage.toFixed(1)}%`
              : "No grades yet"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Grade Range</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {statistics.gradedCount > 0 ? (
              <>
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">
                    High: {statistics.highestGrade}
                  </span>
                  <span className="text-red-600 font-medium">
                    Low: {statistics.lowestGrade}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Range: {statistics.highestGrade - statistics.lowestGrade}{" "}
                  points
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">No grades yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
