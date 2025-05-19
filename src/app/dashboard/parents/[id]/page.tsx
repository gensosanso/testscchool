"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getParentById } from "@/services/parentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ParentDetailsPage() {
  const { id } = useParams();
  const [parent, setParent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        const data = await getParentById(id as string);
        setParent(data);
      } catch (error) {
        console.error("Error fetching parent details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchParent();
    }
  }, [id]);

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

  if (!parent) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-2">Parent non trouvé</h2>
        <p className="text-muted-foreground mb-4">
          Le parent demandé n'existe pas ou a été supprimé.
        </p>
        <Button asChild>
          <Link href="/dashboard/parents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste des parents
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/parents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{parent.name}</h1>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${parent.id}`}
                />
                <AvatarFallback>
                  {parent.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{parent.name}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{parent.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Téléphone</p>
                  <p className="text-sm">{parent.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Adresse</p>
                  <p className="text-sm">{parent.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Détails</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="children">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="children">Enfants</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>
              <TabsContent value="children" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {parent.children.map((child: any) => (
                    <Card key={child.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{child.name}</CardTitle>
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
                          <div className="flex justify-between pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Voir le profil
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="payments" className="pt-4">
                <div className="space-y-4">
                  {parent.paymentHistory.map((payment: any, index: number) => (
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
              </TabsContent>
              <TabsContent value="communication" className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Préférences de communication
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Notifications par email:
                            </span>
                            <span>
                              {parent.communicationPreferences
                                .emailNotifications
                                ? "Activées"
                                : "Désactivées"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Notifications par SMS:
                            </span>
                            <span>
                              {parent.communicationPreferences.smsNotifications
                                ? "Activées"
                                : "Désactivées"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Notifications dans l'application:
                            </span>
                            <span>
                              {parent.communicationPreferences.appNotifications
                                ? "Activées"
                                : "Désactivées"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Langue préférée:
                            </span>
                            <span>
                              {parent.communicationPreferences.language}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Historique des communications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="border-b pb-2">
                            <p className="font-medium">
                              Réunion parents-professeurs
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Email envoyé le 10 avril 2024
                            </p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="font-medium">Rappel de paiement</p>
                            <p className="text-sm text-muted-foreground">
                              SMS envoyé le 5 avril 2024
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Bulletin trimestriel</p>
                            <p className="text-sm text-muted-foreground">
                              Email envoyé le 20 mars 2024
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
