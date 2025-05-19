import { Parent } from "@/types/parent";

// Mock data for parents
const mockParents: Parent[] = [
  {
    id: "p1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    address: "15 Rue de Paris, 75001 Paris",
    children: [
      {
        id: "s1",
        name: "Marie Dupont",
        class: "6A",
        grade: "6ème",
      },
      {
        id: "s2",
        name: "Pierre Dupont",
        class: "4B",
        grade: "4ème",
      },
    ],
    paymentHistory: [
      {
        date: "2023-09-05",
        amount: 350,
        method: "Carte bancaire",
        status: "Payé",
        description: "Frais de scolarité - 1er trimestre",
      },
      {
        date: "2023-12-10",
        amount: 350,
        method: "Virement bancaire",
        status: "Payé",
        description: "Frais de scolarité - 2ème trimestre",
      },
      {
        date: "2024-03-15",
        amount: 350,
        method: "Prélèvement",
        status: "En attente",
        description: "Frais de scolarité - 3ème trimestre",
      },
    ],
    communicationPreferences: {
      emailNotifications: true,
      smsNotifications: true,
      appNotifications: false,
      language: "Français",
    },
  },
  {
    id: "p2",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "+33 6 98 76 54 32",
    address: "8 Avenue Victor Hugo, 69002 Lyon",
    children: [
      {
        id: "s3",
        name: "Lucas Martin",
        class: "5C",
        grade: "5ème",
      },
    ],
    paymentHistory: [
      {
        date: "2023-09-10",
        amount: 350,
        method: "Chèque",
        status: "Payé",
        description: "Frais de scolarité - 1er trimestre",
      },
      {
        date: "2023-12-15",
        amount: 350,
        method: "Chèque",
        status: "Payé",
        description: "Frais de scolarité - 2ème trimestre",
      },
      {
        date: "2024-03-20",
        amount: 350,
        method: "Chèque",
        status: "Non payé",
        description: "Frais de scolarité - 3ème trimestre",
      },
    ],
    communicationPreferences: {
      emailNotifications: true,
      smsNotifications: false,
      appNotifications: true,
      language: "Français",
    },
  },
  {
    id: "p3",
    name: "Ahmed Benali",
    email: "ahmed.benali@example.com",
    phone: "+33 6 45 67 89 01",
    address: "23 Rue de la République, 13001 Marseille",
    children: [
      {
        id: "s4",
        name: "Yasmine Benali",
        class: "3A",
        grade: "3ème",
      },
      {
        id: "s5",
        name: "Karim Benali",
        class: "6B",
        grade: "6ème",
      },
    ],
    paymentHistory: [
      {
        date: "2023-09-08",
        amount: 700,
        method: "Virement bancaire",
        status: "Payé",
        description: "Frais de scolarité - Année complète",
      },
      {
        date: "2023-10-15",
        amount: 150,
        method: "Espèces",
        status: "Payé",
        description: "Voyage scolaire - Yasmine",
      },
    ],
    communicationPreferences: {
      emailNotifications: true,
      smsNotifications: true,
      appNotifications: true,
      language: "Français",
    },
  },
];

export const getParents = async (): Promise<Parent[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockParents), 500);
  });
};

export const getParentById = async (
  id: string,
): Promise<Parent | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(mockParents.find((parent) => parent.id === id)),
      500,
    );
  });
};

export const getChildrenByParentId = async (parentId: string) => {
  const parent = await getParentById(parentId);
  return parent?.children || [];
};

export const getPaymentHistoryByParentId = async (parentId: string) => {
  const parent = await getParentById(parentId);
  return parent?.paymentHistory || [];
};
