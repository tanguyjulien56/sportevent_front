import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar";
import EventDetailPage from "./pages/EventDetailPage";
import EventPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Fonction de protection des routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  // Vérifie si l'utilisateur est authentifié (connecté)
  const isAuthenticated = parsedUser !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          {/* Route vers la page d'accueil */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Page de connexion */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route pour voir tous les événements, protégée */}
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventPage />
              </ProtectedRoute>
            }
          />

          {/* Route pour voir un événement spécifique avec un ID, protégée */}
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <EventDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
