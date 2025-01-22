import { useEffect, useState } from "react";
import Card from "../components/card";

// Définition de l'interface pour l'événement
interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Charger les événements depuis localStorage
    const storedEvents = localStorage.getItem("events");
    const eventsFromStorage = storedEvents ? JSON.parse(storedEvents) : [];
    setEvents(eventsFromStorage);
  }, []);

  if (events.length === 0) {
    return <div>Aucun événement disponible.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Événements disponibles</h1>
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card
              key={event.id}
              title={event.name}
              description={event.description}
              imageUrl={event.imageUrl}
              onClick={() => {
                // Rediriger vers la page des détails de l'événement
                window.location.href = `/events/${event.id}`;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
