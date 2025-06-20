"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAssignmentById,
  getAssignmentResults,
  getAssignmentStatistics,
} from "@/services/assignmentService";
import { Assignment, AssignmentResult } from "@/types/assignment";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Download, BarChart3 } from "lucide-react";
import Link from "next/link";
import ResultsTable from "@/components/assignments/ResultsTable";
import ResultsStatistics from "@/components/assignments/ResultsStatistics";
import { toast } from "@/components/ui/use-toast";

export default function AssignmentResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [results, setResults] = useState<AssignmentResult[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentData, resultsData, statsData] = await Promise.all([
          getAssignmentById(params.id),
          getAssignmentResults(params.id),
          getAssignmentStatistics(params.id),
        ]);

        if (!assignmentData) {
          toast({
            title: "Error",
            description: "Assignment not found",
            variant: "destructive",
          });
          router.push("/dashboard/assignments");
          return;
        }

        setAssignment(assignmentData);
        setResults(resultsData);
        setStatistics(statsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load assignment results",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleExportResults = () => {
    // This would implement CSV/Excel export functionality
    toast({
      title: "Export Started",
      description: "Results are being exported...",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!assignment) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/assignments/${params.id}`} passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Assignment Results</h1>
            <p className="text-muted-foreground">{assignment.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportResults}>
            <Download className="h-4 w-4 mr-2" /> Export Results
          </Button>
          <Link
            href={`/dashboard/assignments/${params.id}/results/analytics`}
            passHref
          >
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" /> Analytics
            </Button>
          </Link>
          <Link
            href={`/dashboard/assignments/${params.id}/results/add`}
            passHref
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Result
            </Button>
          </Link>
        </div>
      </div>

      {statistics && (
        <ResultsStatistics
          statistics={statistics}
          maxGrade={assignment.totalMarks}
        />
      )}

      <ResultsTable results={results} assignmentId={params.id} />
    </div>
  );
}
