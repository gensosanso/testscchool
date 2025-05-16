import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-950">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Financial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>
                  Overall attendance rates for the current semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                  <p className="text-muted-foreground">
                    Attendance chart will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>
                  Average grades across all subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                  <p className="text-muted-foreground">
                    Performance chart will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>
                  Student enrollment over the past year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                  <p className="text-muted-foreground">
                    Enrollment chart will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Summary of important metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold">1,245</p>
                  <p className="text-xs text-green-500">
                    +5% from last semester
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Attendance
                  </p>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-xs text-green-500">+2% from last month</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Grade
                  </p>
                  <p className="text-2xl font-bold">B+</p>
                  <p className="text-xs text-yellow-500">
                    No change from last semester
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">
                    Fee Collection
                  </p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-red-500">-3% from target</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance Reports</CardTitle>
              <CardDescription>
                Detailed analysis of student performance by subject and class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                  <p className="text-muted-foreground">
                    Subject performance comparison chart will be displayed here
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Class 10A</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Class 11B</span>
                          <span className="font-medium">89%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Class 9C</span>
                          <span className="font-medium">87%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Subjects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Mathematics</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Science</span>
                          <span className="font-medium">86%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Literature</span>
                          <span className="font-medium">85%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Overview of financial status and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="h-[250px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                    <p className="text-muted-foreground">
                      Revenue breakdown chart will be displayed here
                    </p>
                  </div>
                  <div className="h-[250px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                    <p className="text-muted-foreground">
                      Expense breakdown chart will be displayed here
                    </p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Collection Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Fees Due</span>
                        <span className="font-medium">€1,245,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Collected</span>
                        <span className="font-medium">€1,083,150 (87%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Outstanding</span>
                        <span className="font-medium text-red-500">
                          €161,850 (13%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: "87%" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
