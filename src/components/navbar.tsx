import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const isAuthenticated = parsedUser !== null;
  const username = parsedUser?.username || "Invité";
  const avatar = parsedUser?.avatar || "";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
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
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
      </div>
    </div>
  );
}
