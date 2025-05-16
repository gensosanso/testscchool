"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getScheduleById,
  deleteSchedule,
} from "../../../../services/scheduleService";
import { Schedule } from "../../../../types/schedule";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../../components/ui/card";

export default function ScheduleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getScheduleById(params.id);
        if (data) {
          setSchedule(data);
        } else {
          setError("Schedule not found");
        }
      } catch (err) {
        setError("Failed to load schedule");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await deleteSchedule(params.id);
        router.push("/dashboard/schedule");
      } catch (err) {
        console.error("Failed to delete schedule:", err);
      }
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/schedule/edit/${params.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "cancelled":
        return "destructive";
      case "completed":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "class":
        return "default";
      case "exam":
        return "secondary";
      case "event":
        return "outline";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p>Please wait while we fetch the schedule details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">{error}</h2>
          <p>Unable to load the requested schedule.</p>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/schedule")}
            className="mt-4"
          >
            Back to Schedules
          </Button>
        </div>
      </div>
    );
  }

  if (!schedule) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Schedule Details</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/schedule")}
          >
            Back
          </Button>
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{schedule.title}</CardTitle>
              <CardDescription>
                {schedule.description || "No description provided"}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Badge variant={getTypeBadgeVariant(schedule.type)}>
                {capitalizeFirstLetter(schedule.type)}
              </Badge>
              <Badge variant={getStatusBadgeVariant(schedule.status)}>
                {capitalizeFirstLetter(schedule.status)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Schedule Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Day:</span>
                  <span className="font-medium">
                    {capitalizeFirstLetter(schedule.dayOfWeek)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">
                    {schedule.startTime} - {schedule.endTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Range:</span>
                  <span className="font-medium">
                    {formatDate(schedule.startDate)} -{" "}
                    {formatDate(schedule.endDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recurrence:</span>
                  <span className="font-medium">
                    {capitalizeFirstLetter(schedule.recurrence)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{schedule.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Related Information
              </h3>
              <div className="space-y-2">
                {schedule.className && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class:</span>
                    <span className="font-medium">{schedule.className}</span>
                  </div>
                )}
                {schedule.teacherName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teacher:</span>
                    <span className="font-medium">{schedule.teacherName}</span>
                  </div>
                )}
                {schedule.subjectName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subject:</span>
                    <span className="font-medium">{schedule.subjectName}</span>
                  </div>
                )}
                {schedule.studentNames && schedule.studentNames.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">
                      {schedule.studentNames.length} students
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Schedule ID: {schedule.id}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
