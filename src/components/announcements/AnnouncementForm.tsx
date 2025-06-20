"use client";

import React, { useState, useEffect } from "react";
import { Announcement, AnnouncementFormData } from "@/types/announcement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, AlertTriangle } from "lucide-react";

interface AnnouncementFormProps {
  announcement?: Announcement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AnnouncementFormData) => void;
  loading?: boolean;
}

const targetAudienceOptions = [
  { id: "admin", label: "Administrators" },
  { id: "teacher", label: "Teachers" },
  { id: "student", label: "Students" },
  { id: "parent", label: "Parents" },
];

export default function AnnouncementForm({
  announcement,
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}: AnnouncementFormProps) {
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    content: "",
    type: "general",
    priority: "medium",
    targetAudience: ["student"],
    status: "draft",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        content: announcement.content,
        type: announcement.type,
        priority: announcement.priority,
        targetAudience: announcement.targetAudience,
        publishedAt: announcement.publishedAt,
        expiresAt: announcement.expiresAt,
        status: announcement.status,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        type: "general",
        priority: "medium",
        targetAudience: ["student"],
        status: "draft",
      });
    }
    setErrors({});
  }, [announcement, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (formData.targetAudience.length === 0) {
      newErrors.targetAudience =
        "At least one target audience must be selected";
    }

    if (formData.expiresAt && formData.publishedAt) {
      const publishDate = new Date(formData.publishedAt);
      const expireDate = new Date(formData.expiresAt);
      if (expireDate <= publishDate) {
        newErrors.expiresAt = "Expiration date must be after publish date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleTargetAudienceChange = (audienceId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      targetAudience: checked
        ? [...prev.targetAudience, audienceId as any]
        : prev.targetAudience.filter((id) => id !== audienceId),
    }));
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <Calendar className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>
            {announcement ? "Edit Announcement" : "Create New Announcement"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter announcement title"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Enter announcement content"
                  rows={4}
                  className={errors.content ? "border-red-500" : ""}
                />
                {errors.content && (
                  <p className="text-sm text-red-500 mt-1">{errors.content}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-500" />
                          Low
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          High
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Target Audience *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {targetAudienceOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.targetAudience.includes(
                        option.id as any,
                      )}
                      onCheckedChange={(checked) =>
                        handleTargetAudienceChange(
                          option.id,
                          checked as boolean,
                        )
                      }
                    />
                    <Label htmlFor={option.id} className="text-sm font-medium">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.targetAudience && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.targetAudience}
                </p>
              )}
              <div className="mt-3">
                <p className="text-sm text-muted-foreground mb-2">
                  Selected audiences:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.targetAudience.map((audience) => (
                    <Badge key={audience} variant="secondary">
                      {
                        targetAudienceOptions.find((opt) => opt.id === audience)
                          ?.label
                      }
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scheduling (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publishedAt">Publish Date & Time</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={
                      formData.publishedAt
                        ? new Date(formData.publishedAt)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        publishedAt: e.target.value
                          ? new Date(e.target.value).toISOString()
                          : undefined,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="expiresAt">Expiration Date & Time</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={
                      formData.expiresAt
                        ? new Date(formData.expiresAt)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        expiresAt: e.target.value
                          ? new Date(e.target.value).toISOString()
                          : undefined,
                      }))
                    }
                    className={errors.expiresAt ? "border-red-500" : ""}
                  />
                  {errors.expiresAt && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.expiresAt}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : announcement ? "Update" : "Create"}{" "}
              Announcement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
