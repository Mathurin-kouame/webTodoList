import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

type Task = {
  id: number;
  titre: string;
  description: string;
  statut: 'A faire' | 'En cours' | 'Terminée';
};

type Projet = {
  id: number;
  titre: string;
  description: string;
  user: { id: number; nom: string; prenoms: string; email: string };
  tasks: Task[];
};

const Dashboard = () => {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [selectedProjet, setSelectedProjet] = useState<Projet | null>(null);
  const [loading, setLoading] = useState(true);

  const userName = "user1"; // remplacer par le nom réel

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("http://localhost:3000/projets", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setProjets(data);
      } catch (error) {
        console.error("Erreur de serveur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjets();
  }, []);

  const handleSelectProjet = (id: number | null) => {
    const projet = projets.find((p) => p.id === id) || null;
    setSelectedProjet(projet);
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="flex flex-col h-screen">
      <Navbar userName={userName} onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar projets={projets} onSelectProjet={handleSelectProjet} />
        <main className="flex-1 p-6 overflow-auto">
          {selectedProjet ? (
            <div>
              <h2 className="text-2xl font-bold">{selectedProjet.titre}</h2>
              <p className="mb-4">{selectedProjet.description}</p>
              <h3 className="font-semibold mb-3">Tâches</h3>
              <ul>
                {selectedProjet.tasks.map((task) => (
                  <li key={task.id} className="mb-2 border-b pb-2">
                    <h4 className="font-semibold">{task.titre}</h4>
                    <p>{task.description}</p>
                    <span className="text-sm text-gray-600">
                      Statut: {task.statut}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Créer un nouveau projet</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default Dashboard;