"use client";

import React, { useState } from "react";
import { Announcement, AnnouncementFormData } from "@/types/announcement";
import { announcementService } from "@/services/announcementService";
import AnnouncementTable from "@/components/announcements/AnnouncementTable";
import AnnouncementForm from "@/components/announcements/AnnouncementForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Megaphone,
  Calendar,
  Users,
  AlertTriangle,
  Clock,
  Eye,
  X,
} from "lucide-react";

export default function AnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreate = () => {
    setSelectedAnnouncement(null);
    setIsFormOpen(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsFormOpen(true);
  };

  const handleView = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsViewDialogOpen(true);
  };

  const handleFormSubmit = async (data: AnnouncementFormData) => {
    try {
      setFormLoading(true);

      if (selectedAnnouncement) {
        await announcementService.update(selectedAnnouncement.id, data);
      } else {
        await announcementService.create(data);
      }

      setIsFormOpen(false);
      setSelectedAnnouncement(null);
      setRefreshKey((prev) => prev + 1); // Trigger table refresh
    } catch (error) {
      console.error("Failed to save announcement:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "archived":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "event":
        return "bg-purple-100 text-purple-800";
      case "general":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Clock className="h-4 w-4" />;
      case "low":
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 bg-background min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Megaphone className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">
            Manage and distribute important announcements to your school
            community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <AnnouncementTable
        key={refreshKey}
        userRole="admin"
        onCreate={handleCreate}
        onEdit={handleEdit}
        onView={handleView}
      />

      {/* Create/Edit Form */}
      <AnnouncementForm
        announcement={selectedAnnouncement || undefined}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Announcement Details
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsViewDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedAnnouncement && (
            <div className="space-y-6">
              {/* Header Info */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {selectedAnnouncement.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>By {selectedAnnouncement.authorName}</span>
                        <span>•</span>
                        <span>
                          {formatDate(selectedAnnouncement.createdAt)}
                        </span>
                        {selectedAnnouncement.updatedAt !==
                          selectedAnnouncement.createdAt && (
                          <>
                            <span>•</span>
                            <span>
                              Updated{" "}
                              {formatDate(selectedAnnouncement.updatedAt)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        className={getTypeColor(selectedAnnouncement.type)}
                      >
                        {selectedAnnouncement.type}
                      </Badge>
                      <Badge
                        className={getPriorityColor(
                          selectedAnnouncement.priority,
                        )}
                      >
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(selectedAnnouncement.priority)}
                          {selectedAnnouncement.priority}
                        </div>
                      </Badge>
                      <Badge
                        className={getStatusColor(selectedAnnouncement.status)}
                      >
                        {selectedAnnouncement.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {selectedAnnouncement.content}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Target Audience */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Target Audience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnnouncement.targetAudience.map((audience) => (
                        <Badge key={audience} variant="outline">
                          {audience.charAt(0).toUpperCase() + audience.slice(1)}
                          s
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Scheduling */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Scheduling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedAnnouncement.publishedAt && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Published
                        </p>
                        <p className="text-sm">
                          {formatDate(selectedAnnouncement.publishedAt)}
                        </p>
                      </div>
                    )}
                    {selectedAnnouncement.expiresAt && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Expires
                        </p>
                        <p className="text-sm">
                          {formatDate(selectedAnnouncement.expiresAt)}
                        </p>
                      </div>
                    )}
                    {!selectedAnnouncement.publishedAt &&
                      !selectedAnnouncement.expiresAt && (
                        <p className="text-sm text-muted-foreground">
                          No scheduling set
                        </p>
                      )}
                  </CardContent>
                </Card>
              </div>

              {/* Engagement Stats */}
              {selectedAnnouncement.readBy &&
                selectedAnnouncement.readBy.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">
                            {selectedAnnouncement.readBy.length}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            People read
                          </p>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {selectedAnnouncement.notificationSent ? "✓" : "✗"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedAnnouncement.notificationSent
                              ? "Notifications sent"
                              : "No notifications"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
