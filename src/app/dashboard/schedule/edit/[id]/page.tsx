"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getScheduleById, updateSchedule } from "@/services/scheduleService";
import ScheduleForm from "@/components/schedules/ScheduleForm";
import { Schedule } from "@/types/schedule";

export default function EditSchedulePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [params.id]);

  const handleSubmit = async (data: Omit<Schedule, "id">) => {
    setIsSubmitting(true);
    try {
      await updateSchedule(params.id, data);
      router.push("/dashboard/schedule");
      router.refresh();
    } catch (err) {
      setError("Failed to update schedule");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Loading schedule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Schedule</h1>
        <p className="text-muted-foreground">
          Update the details of the schedule
        </p>
      </div>

      {schedule && (
        <ScheduleForm
          initialData={schedule}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
