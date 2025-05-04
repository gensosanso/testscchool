"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ScheduleTable from "@/components/schedules/ScheduleTable";
import { getAllSchedules, deleteSchedule } from "@/services/scheduleService";
import { Schedule } from "@/types/schedule";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SchedulePage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getAllSchedules();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await deleteSchedule(id);
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Schedules</h1>
        <Button onClick={() => router.push("/dashboard/schedule/add")}>
          <Plus className="h-4 w-4 mr-2" /> Add Schedule
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading schedules...</p>
        </div>
      ) : (
        <ScheduleTable schedules={schedules} onDelete={handleDelete} />
      )}
    </div>
  );
}
