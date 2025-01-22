import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  // Vérifie si l'utilisateur est authentifié et récupère ses informations
  const isAuthenticated = parsedUser !== null;
  const username = parsedUser?.username || "Invité"; // Par défaut "Invité" si pas de nom d'utilisateur
  const avatar = parsedUser?.avatar || ""; // Par défaut "" si pas d'avatar
  console.log(avatar);
  console.log(isAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    navigate("/login"); // Rediriger l'utilisateur vers la page de login après la déconnexion
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          SportEvent
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">View Events</Link>
          </li>
          {isAuthenticated && (
            <li className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="avatar w-10 rounded-full">
                  {/* Affichage d'un avatar avec une image */}
                  <img alt="User Avatar" src={avatar} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 w-52 rounded-box z-[1] mt-3 p-2 shadow"
              >
                <li>
                  {/* Affichage du nom de l'utilisateur */}
                  <span className="text-sm">Bonjour, {username}</span>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
