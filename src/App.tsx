import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import EventDetailPage from "./pages/EventDetailPage";
import EventPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SendEmailPage from "./pages/SendEmailPage";
import { UserProvider } from "./services/Context/UserContext";

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
    <UserProvider>
      <Router>
        <NavBar />

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
          <Route
            path="/send_email"
            element={
              <ProtectedRoute>
                <SendEmailPage />
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
      </Router>
    </UserProvider>
  );
};

export default App;
