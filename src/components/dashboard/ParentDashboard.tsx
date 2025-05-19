"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, BookOpen, BarChart, DollarSign } from "lucide-react";
import {
  getChildrenByParentId,
  getPaymentHistoryByParentId,
} from "@/services/parentService";

interface ParentDashboardProps {
  parentId?: string;
}

export default function ParentDashboard({
  parentId = "p1",
}: ParentDashboardProps) {
  const [children, setChildren] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const childrenData = await getChildrenByParentId(parentId);
        const paymentsData = await getPaymentHistoryByParentId(parentId);
        setChildren(childrenData);
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error fetching parent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parentId]);

  const upcomingEvents = [
    {
      date: "2024-05-15",
      title: "Réunion parents-professeurs",
      description: "Rencontre individuelle avec les enseignants",
    },
    {
      date: "2024-05-20",
      title: "Sortie scolaire - Musée",
      description: "Classe de 6ème - Prévoir un pique-nique",
    },
    {
      date: "2024-06-05",
      title: "Spectacle de fin d'année",
      description: "Représentation des élèves à l'auditorium",
    },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enfants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children.length}</div>
            <p className="text-xs text-muted-foreground">
              {children.map((child) => child.name).join(", ")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Événements à venir
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              Prochain: {upcomingEvents[0]?.title}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.some((p) => p.status === "Non payé")
                ? "En retard"
                : "À jour"}
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.filter((p) => p.status === "Non payé").length} paiements
              en attente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matières</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Français, Mathématiques, Histoire...
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="children">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="children">Mes enfants</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
        </TabsList>
        <TabsContent value="children" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {children.map((child) => (
              <Card key={child.id}>
                <CardHeader>
                  <CardTitle>{child.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Classe:</span>
                      <span>{child.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Niveau:</span>
                      <span>{child.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Moyenne générale:
                      </span>
                      <span className="font-semibold">14.5/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Assiduité:</span>
                      <span className="text-green-600 font-semibold">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 border-b pb-4 last:border-0"
                  >
                    <div className="min-w-24 text-sm font-medium">
                      {formatDate(event.date)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Historique des paiements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between border-b pb-4 last:border-0"
                  >
                    <div>
                      <h4 className="font-semibold">{payment.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(payment.date)} - {payment.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{payment.amount} €</div>
                      <div
                        className={`text-sm ${payment.status === "Payé" ? "text-green-600" : payment.status === "En attente" ? "text-amber-600" : "text-red-600"}`}
                      >
                        {payment.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
