import { useState } from "react";


type ProjectProps = {
  onAddProjet: (titre: string, description: string) => void;
  onClose: () => void;
}

const Project: React.FC<ProjectProps> = ({ onAddProjet, onClose }) => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titre.trim() === "") return; 
    onAddProjet(titre, description);
    setTitre("");
    setDescription("");
    onClose(); 
  };

  return ( 
    <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">Créaction de projet</h2>

      <input type="text"
        placeholder="Titre du projet"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        placeholder="Description du projet"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      ></textarea>
      <div>
        <button
          type="submit"
           onClick={onClose}
          className="mr-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-green-300 text-white rounded hover:bg-gray-400"
         
        >
          Créer
        </button>
       </div>
    </form>
  )
    
      
}
export default Project; 