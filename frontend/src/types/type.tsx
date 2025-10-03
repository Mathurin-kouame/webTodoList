
export type Projet = {
  id: number;
  titre: string;
  description: string;
};

export type Task = {
  id: number;
  titre: string;
  description: string;
  statut: "A faire" | "En cours" | "Terminée";
  projetId?: number;
  created_at?: string;
};
