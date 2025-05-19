"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, School, User, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("administrator");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login process
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to appropriate dashboard based on user type
      switch (userType) {
        case "administrator":
          router.push("/dashboard");
          break;
        case "teacher":
          router.push("/dashboard");
          break;
        case "student":
          router.push("/dashboard");
          break;
        case "parent":
          router.push("/dashboard");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <School className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            School Management System
          </CardTitle>
          <CardDescription className="text-center">
            Login to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs
            defaultValue="administrator"
            className="w-full"
            onValueChange={setUserType}
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger
                value="administrator"
                className="flex flex-col items-center py-2"
              >
                <User className="h-4 w-4 mb-1" />
                <span className="text-xs">Admin</span>
              </TabsTrigger>
              <TabsTrigger
                value="teacher"
                className="flex flex-col items-center py-2"
              >
                <User className="h-4 w-4 mb-1" />
                <span className="text-xs">Teacher</span>
              </TabsTrigger>
              <TabsTrigger
                value="student"
                className="flex flex-col items-center py-2"
              >
                <User className="h-4 w-4 mb-1" />
                <span className="text-xs">Student</span>
              </TabsTrigger>
              <TabsTrigger
                value="parent"
                className="flex flex-col items-center py-2"
              >
                <Users className="h-4 w-4 mb-1" />
                <span className="text-xs">Parent</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            © 2023 School Management System. All rights reserved.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
