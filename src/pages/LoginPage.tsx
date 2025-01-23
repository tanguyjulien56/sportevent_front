import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Exemple d'authentification simulée (à remplacer par un vrai backend)
    if (username === "admin" && password === "admin123") {
      const user = {
        isAdmin: true,
        username: username,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDPIyqWfILYR2-i9tXjJxSA_SrgclY9z5Y1GSsQe5BIlOmHTGyqUegnK-8OrmKUCB-CCI&usqp=CAU", // Remplace cette URL par l'avatar réel
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAdmin", "true"); // L'utilisateur est administrateur
      navigate("/"); // Rediriger vers la page des événements après connexion
    } else if (username === "guest" && password === "guest123") {
      const user = {
        isAdmin: false,
        username: username,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp", // Remplace cette URL par l'avatar réel
      };
      localStorage.setItem("user", JSON.stringify(user)); // L'utilisateur est un invité
      navigate("/"); // Rediriger vers la page des événements
    } else {
      setErrorMessage("Identifiants incorrects. Essayez encore.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Nom d'utilisateur
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={handleLogin}
      >
        Se connecter
      </button>
      <p>admin: admin123</p>
      <p>guest: guest123</p>
    </div>
  );
};

export default LoginPage;
