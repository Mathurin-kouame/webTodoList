
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
export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type Register = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};  
export type ErrorResponse = {
  message: string;
};    
export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type ProjetResponse = {
  projets: Projet[];
};

export type TaskResponse = {
  tasks: Task[];
};

export type NewProjet = {
  titre: string;
  description: string;
};

export type NewTask = {
  titre: string;
  description: string;
  statut: "A faire" | "En cours" | "Terminée";
  projetId?: number;
};

export type UpdateTask = {
  titre?: string;
  description?: string;
  statut?: "A faire" | "En cours" | "Terminée";
};

export type DeleteResponse = {
  message: string;
};
export type UpdateResponse = {
  message: string;
  task: Task;
};  
export type ProjetContextType = {
  projets: Projet[];
  addProjet: (titre: string, description: string) => void;
  selectProjet: (id: number | null) => void;
  selectedProjetId: number | null;
};

export type TaskContextType = {
  tasks: Task[];
  addTask: (titre: string, description: string, statut: "A faire" | "En cours" | "Terminée", projetId?: number) => void;
  updateTask: (id: number, updates: UpdateTask) => void;
  deleteTask: (id: number) => void;
  fetchTasks: (projetId?: number) => void;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export type SidebarProps = {
  projets: Projet[];
  onSelectProjet: (id: number | null) => void;
  onAddProjet: (titre: string, description: string) => void;
  onShowProjets?: () => void;
};

export type ProjectProps = {
  onAddProjet: (titre: string, description: string) => void;
  onClose?: () => void;
};

export type TaskProps = {
  projetId?: number;
};

export type DashboardProps = {
  projets: Projet[];
  tasks: Task[];
  onSelectProjet: (id: number | null) => void;
  selectedProjetId: number | null;
  onAddProjet: (titre: string, description: string) => void;
  onAddTask: (titre: string, description: string, statut: "A faire" | "En cours" | "Terminée", projetId?: number) => void;
  onUpdateTask: (id: number, updates: UpdateTask) => void;
  onDeleteTask: (id: number) => void;
  onShowProjets?: () => void;
};
