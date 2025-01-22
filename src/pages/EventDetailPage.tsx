import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Définition de l'interface pour l'événement
interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Utilisé pour la navigation
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      // Charger les événements depuis localStorage
      const storedEvents = localStorage.getItem("events");
      const eventsFromStorage: Event[] = storedEvents
        ? JSON.parse(storedEvents)
        : [];

      // Rechercher l'événement correspondant à l'ID
      const foundEvent = eventsFromStorage.find((event) => event.id === id);

      setEvent(foundEvent || null); // Mettre à jour l'état avec l'événement trouvé
    }
  }, [id]);

  if (!event) {
    return <div>Événement non trouvé.</div>; // Afficher un message si aucun événement n'est trouvé
  }

  return (
    <div className="p-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate("/events")} // Retourner à la page des événements
      >
        Retour
      </button>
      <h1 className="text-3xl font-semibold mb-4">{event.name}</h1>
      <img
        src={event.imageUrl}
        alt={event.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="mb-4">{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
    </div>
  );
};

export default EventDetailPage;
