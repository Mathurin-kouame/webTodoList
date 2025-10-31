import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";


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
  const [showListe, setShowListe] = useState(false);
  
 const navigate = useNavigate();
  
  //Récuperation des projets
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

  // selection d'un projet
  const handleSelectProjet = (id: number | null) => {
    const projet = projets.find((p) => p.id === id) || null;
    setSelectedProjet(projet);
    setShowListe(false); // ferme la liste des projets
  };

  // Création d'un nouveau projet
  const handleAddProjet = async (titre: string, description: string) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch('http://localhost:3000/projets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titre, description }),
      });


      if (!res.ok) throw new Error('Erreur lors de la création du projet');

      const newProjet = await res.json();
      setProjets([...projets, newProjet])
      
    } catch (error) {
      console.error(error);
    }
  };

  //Ajouter une tâches à un projet
  const handleAddTask = async (titre: string, description: string) => {
    if (!selectedProjet) return;
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`http://localhost:3000/projets/${selectedProjet.id}/tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titre, description, statut: 'A faire' }),
      });
      if (!res.ok) throw new Error('Erreur lors de la création de la tâche');

      const newTask = await res.json();
      setSelectedProjet({
        ...selectedProjet,
        tasks: [...selectedProjet.tasks, newTask],

      });
    }catch (error) {
    console.error(error);
  }; 
  }

  //Modification statut d'une tâche
  const handleUpdateTaskStatus = async (taskId: number, statut: Task['statut']) => {
    if (!selectedProjet) return;
    const token = localStorage.getItem('access_token');

    try {
      const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statut }),
      });

      if (!res.ok) throw new Error('Erreur lors de la mise à jour du statut');
      const updatedTask = await res.json();
      setSelectedProjet({
        ...selectedProjet,
        tasks: selectedProjet.tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("voulez-vous vraiment vous déconnecter ?");
    if (confirmLogout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navigate("/")
    }
  }

   // Affichage pendant le chargement
  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="flex flex-col h-screen">
      <Navbar onLogout={handleLogout} />

      <div className="flex flex-1">
        <Sidebar
          projets={projets}
          onSelectProjet={handleSelectProjet}
          onAddProjet={handleAddProjet}
          onShowProjets={() => setShowListe(true)}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {showListe ? (
            //affichage de la liste des projets
            <div>
              <h2 className="text-2xl font-bold mb-4">Liste des Projets</h2>
              {projets.length === 0 ? (
                <p>Aucun projet disponible.</p>
              ) : (
                   <ul>
                {projets.map((projet) => (
                  <li key={projet.id} className="mb-2 border-b pb-2">
                    <div>
                      <h4 className="font-semibold">{projet.titre}</h4>
                      <p>{projet.description}</p>
                      <span className="text-sm text-gray-600">
                        Propriétaire: {projet.user.prenoms} {projet.user.nom}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              )}
             
            </div>
          ) : selectedProjet ? (
            // Affichage des détails du projet sélectionné
            <div>
              <h2 className="text-2xl font-bold">{selectedProjet.titre}</h2>
              <p className="mb-4">{selectedProjet.description}</p>

              {/* formulaire d'ajout de tâche */}
              <form onSubmit={(e) => {
                e.preventDefault();
                const titre = (e.currentTarget.elements.namedItem('titre') as HTMLInputElement).value;
                const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
                handleAddTask(titre, description);
                e.currentTarget.reset();
              }} className="mb-6"
              >
                <input
                  type="text"
                  name="titre"
                  placeholder="Titre de la tâche"
                  className="border border-gray-300 rounded p-2 mr-2"
                  required
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description de la tâche"
                  className="border border-gray-300 rounded p-2 mr-2"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Ajouter Tâche
                </button>
              </form>

              <h3 className="font-semibold mb-3">Tâches</h3>
              <ul>
                {selectedProjet.tasks.map((task) => (
                  <li key={task.id} className="mb-2 border-b pb-2">
                    <div>
                      <h4 className="font-semibold">{task.titre}</h4>
                      <p>{task.description}</p>
                      <span className="text-sm text-gray-600">
                        Statut: {task.statut}
                      </span>
                    </div>
                  
                    <select
                      value={task.statut}
                      onChange={(e) =>
                        handleUpdateTaskStatus(task.id, e.target.value as Task['statut'])}
                      className="ml-4 border border-gray-300 rounded p-1"
                    >
                      <option value="A faire">A faire</option>
                      <option value="En cours">En cours</option>
                      <option value="Terminée">Terminée</option>
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Sélectionnez un projet</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default Dashboard;