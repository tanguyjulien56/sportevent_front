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
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false); // Pour afficher le modal
  const isAuthenticated = localStorage.getItem("isAdmin") === "true"; // Vérification si l'utilisateur est admin

  useEffect(() => {
    if (id) {
      const storedEvents = localStorage.getItem("events");
      const eventsFromStorage: Event[] = storedEvents
        ? JSON.parse(storedEvents)
        : [];
      const foundEvent = eventsFromStorage.find((event) => event.id === id);
      setEvent(foundEvent || null);
    }
  }, [id]);

  const handleDelete = () => {
    if (event) {
      const storedEvents = localStorage.getItem("events");
      const eventsFromStorage: Event[] = storedEvents
        ? JSON.parse(storedEvents)
        : [];

      // Filtrer l'événement à supprimer
      const updatedEvents = eventsFromStorage.filter((e) => e.id !== event.id);
      localStorage.setItem("events", JSON.stringify(updatedEvents)); // Sauvegarder les événements après suppression
      navigate("/events"); // Rediriger vers la page des événements après la suppression
    }
  };

  const handleModalClose = () => {
    setShowModal(false); // Fermer le modal
  };

  if (!event) {
    return <div>Événement non trouvé.</div>;
  }

  return (
    <div className="p-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate("/events")}
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

      {isAuthenticated && (
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setShowModal(true)} // Ouvrir le modal de confirmation
        >
          Supprimer l'événement
        </button>
      )}

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-md shadow-lg w-auto">
            <h3 className="text-xl font-semibold mb-4">
              Êtes-vous sûr de vouloir supprimer cet événement ?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={handleModalClose}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
