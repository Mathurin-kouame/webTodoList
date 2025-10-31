import { useEffect, useState } from 'react';

type NavbarProps = {
  userName?: string;
  userPrenom?: string;
 onLogout: () => void;
};

const Navbar = ({ userName: propUserName, userPrenom: propUserPrenom, onLogout }: NavbarProps) => {
  const [storedUserName, setStoredUserName] = useState<string>('');
  const [storedUserPrenom, setStoredUserPrenom] = useState<string>('');


  useEffect(() => {
    if (!propUserName && !propUserPrenom) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          if (userData.nom) setStoredUserName(userData.nom);
          if (userData.prenom) setStoredUserPrenom(userData.prenom);
        } catch (error) {
          console.error("Erreur lors du parsing du localStorage :", error);
        }
      }
    }
  }, [propUserName, propUserPrenom]);

	const displayName = propUserName || storedUserName || '';
	const displayPrenom = propUserPrenom || storedUserPrenom || '';


  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>Bonjour, {displayPrenom} {displayName}</span>
        <button
          onClick={onLogout}
          className="hover:bg-green-600 px-3 py-1 rounded"
        >
          Déconnexion 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;