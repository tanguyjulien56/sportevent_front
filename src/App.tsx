import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import EventDetailPage from "./pages/EventDetailPage";
import EventPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      {/* La navbar est toujours visible, placée à l'extérieur de Routes */}
      <Navbar />

      <div>
        <Routes>
          {/* Route vers la page d'accueil */}
          <Route path="/" element={<HomePage />} />

          {/* Route pour voir tous les événements */}
          <Route path="/events" element={<EventPage />} />

          {/* Route pour voir un événement spécifique avec un ID */}
          <Route path="/events/:id" element={<EventDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
