import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../services/theme/ThemeToogle";

export default function NavBar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  console.log("🚀 ~ user:", user);
  const parsedUser = user ? JSON.parse(user) : null;
  console.log("🚀 ~ parsedUser:", parsedUser);
  const isAuthenticated = parsedUser !== null;
  const username = parsedUser?.user || "Invité";
  console.log("🚀 ~ username:", username);
  const avatar = parsedUser?.profil_picture || "";
  console.log("🚀 ~ avatar:", avatar);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="navbar fixed glass z-10">
      <div className="navbar-start">
        {/* Logo pour grand écran */}
        <Link to="/" className="btn btn-ghost text-xl">
          SportEvent
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* Menu horizontal pour écrans larges */}
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">View Events</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* Bouton burger pour le menu mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost rounded-full lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">View Events</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="avatar w-10 rounded-full">
                  <img alt="User Avatar" src={avatar} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 w-52 rounded-box z-[1] mt-3 p-2 shadow"
              >
                <span className="text-sm">Bonjour, {username}</span>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
