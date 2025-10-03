import { useState } from "react";
import Project from "../pages/Project";
import Modal from "./Modal";
import type { Projet } from "../types/type";



type SidebarProps = {
  projets: Projet[];
  onSelectProjet: (id: number | null) => void;
  onAddProjet: (titre: string, description: string) => void;
  onShowProjets?: () => void;
};

const Sidebar = ({ projets, onSelectProjet, onAddProjet, onShowProjets }: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
     <aside className="w-64 bg-gray-200 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Gestion de Projets</h2>

      <button
        className="w-full  py-2 px-4 text-black rounded hover: blue-600 border-0 text-sm"
        onClick={() => setOpen(true)}
      >
        + Nouveau Projet
      </button>

       <Modal open={open} onClose={() => setOpen(false)}>
        <Project onAddProjet={onAddProjet} onClose={() => setOpen(false)} />
      </Modal>

      <button
        className="w-full  text-black rounded hover: blue-600 border-0 text-sm"
        onClick={onShowProjets}
      >
        Liste des Projets
      </button>

      <h3>Accès Rapide</h3>
      <ul className="space-y-1">
        {projets.map((projet) => (
          <li
            key={projet.id}
            className="cursor-pointer p-2 hover:bg-gray-300 rounded"
            onClick={() => onSelectProjet(projet.id)}
          >
            {projet.titre}
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default Sidebar;