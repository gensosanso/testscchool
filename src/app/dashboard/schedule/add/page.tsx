"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScheduleForm from "@/components/schedules/ScheduleForm";
import { createSchedule } from "@/services/scheduleService";
import { Schedule } from "@/types/schedule";

export default function AddSchedulePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Omit<Schedule, "id">) => {
    setIsSubmitting(true);
    try {
      await createSchedule(data);
      router.push("/dashboard/schedule");
    } catch (error) {
      console.error("Error creating schedule:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add New Schedule</h1>
      <ScheduleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
