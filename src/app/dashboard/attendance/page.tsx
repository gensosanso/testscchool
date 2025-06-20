"use client";

import React, { useState, useEffect } from "react";
import { AttendanceRecord, AttendanceStatistics } from "@/types/attendance";
import { attendanceService } from "@/services/attendanceService";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceStatisticsComponent from "@/components/attendance/AttendanceStatistics";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw, BarChart3, List } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AttendancePage() {
  const router = useRouter();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [statistics, setStatistics] = useState<AttendanceStatistics | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("records");

  const loadData = async () => {
    try {
      setRefreshing(true);
      const [recordsData, statsData] = await Promise.all([
        attendanceService.getAttendanceRecords(),
        attendanceService.getAttendanceStatistics(),
      ]);
      setRecords(recordsData);
      setStatistics(statsData);
    } catch (error) {
      console.error("Error loading attendance data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddRecord = () => {
    router.push("/dashboard/attendance/add");
  };

  const handleEditRecord = (record: AttendanceRecord) => {
    router.push(`/dashboard/attendance/${record.id}/edit`);
  };

  const handleViewRecord = (record: AttendanceRecord) => {
    router.push(`/dashboard/attendance/${record.id}`);
  };

  const handleDeleteRecord = async (id: string) => {
    if (confirm("Are you sure you want to delete this attendance record?")) {
      try {
        await attendanceService.deleteAttendanceRecord(id);
        setRecords(records.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Management
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage student attendance records
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button onClick={handleAddRecord}>
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {statistics && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Records</p>
                  <p className="text-2xl font-bold">{records.length}</p>
                </div>
                <List className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overall Attendance</p>
                  <p className="text-2xl font-bold">
                    {statistics.overallAttendanceRate}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {statistics.presentRate}%
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent Rate</p>
                  <p className="text-2xl font-bold text-red-600">
                    {statistics.absentRate}%
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="records" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Attendance Records
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics & Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <AttendanceTable
            records={records}
            loading={loading}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
            onView={handleViewRecord}
          />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          {statistics ? (
            <AttendanceStatisticsComponent
              statistics={statistics}
              loading={loading}
            />
          ) : (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Loading Statistics...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
