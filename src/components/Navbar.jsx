import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <nav className="w-full mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          🍽 Recipe App
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link
            to="/"
            className={({ isActive }) =>
              isActive ? "font-medium underline" : "hover:underline"
            }
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "font-medium underline" : "hover:underline"
            }
          >
            <Link to="/favorites" className="px-3 py-2 hover:text-blue-500">
              Favorites
            </Link>
          </Link>
        </div>
      </nav>
    </header>
  );
}
