
type NavbarProps = {
  userName: string;
  onLogout: () => void;
};

 const Navbar = ({ userName, onLogout }: NavbarProps) =>{
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>Bonjour, {userName}</span>
        <button
          onClick={onLogout}
          className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
export default Navbar;