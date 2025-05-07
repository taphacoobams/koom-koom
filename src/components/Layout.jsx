import { NavLink, Outlet } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <NavLink to="/dashboard" className="text-gray-600 hover:text-blue-600">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
        </NavLink>
        <NavLink to="/profile" className="text-gray-600 hover:text-blue-600">
          <FiUser className="text-2xl" />
        </NavLink>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 p-4 pb-24">
        <Outlet />
      </main>

      {/* Navigation basse */}
      <nav className="bg-blue-600 border-t shadow-inner p-3 flex justify-around fixed bottom-0 left-0 w-full z-50">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-white"}>Accueil</NavLink>
        <NavLink to="/plan" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-white"}>Plan</NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-white"}>Transactions</NavLink>
        <NavLink to="/accounts" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-white"}>Comptes</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-white"}>Paramètres</NavLink>
      </nav>
    </div>
  );
}
