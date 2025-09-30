
type SidebarProps = {
  projets: { id: number; titre: string }[];
  onSelectProjet: (id: number | null) => void;
};

 const  Sidebar = ({ projets, onSelectProjet }: SidebarProps) =>{
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Gestion de Projets</h2>
      <button
        className="w-full mb-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        onClick={() => onSelectProjet(null)}
      >
        Créer un Projet
      </button>
      <h3 className="font-semibold mt-4 mb-2">Mes Projets</h3>
      <ul>
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