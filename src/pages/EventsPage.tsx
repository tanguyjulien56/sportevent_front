import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import { checkUserParticipation } from "../services/api/check_particpation";
import { events } from "../services/api/get_all_events";
import Event from "../services/interfaces/Event";

const EventsPage: React.FC = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]); // Type des événements
  const [error, setError] = useState<Error | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<
    Map<string, boolean>
  >(new Map()); // Map pour stocker l'état d'inscription
  const [isLoading, setIsLoading] = useState<boolean>(true); // Pour gérer l'état de chargement
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  // Appel API pour récupérer les événements
  useEffect(() => {
    async function fetchEvents() {
      try {
        const result = await events();
        if (result.error) {
          setError(result.error);
        } else {
          setEventsData(result.data);
        }
      } catch (err) {
        setError(new Error("Erreur de récupération des événements"));
      }
    }

    fetchEvents();
  }, []); // On lance cet effet une seule fois au premier rendu

  // Appeler l'API pour vérifier l'inscription de l'utilisateur
  useEffect(() => {
    if (user && eventsData.length > 0) {
      async function fetchUserRegistrations() {
        try {
          const participationPromises = eventsData.map((event) =>
            checkUserParticipation(event._id as string, user.id).then(
              (isRegistered) => ({
                eventId: event._id,
                isRegistered: isRegistered.isRegistered,
              })
            )
          );

          // Attendre que toutes les vérifications soient terminées avant de mettre à jour l'état
          const results = await Promise.all(participationPromises);

          // Créer une Map avec les résultats
          const updatedRegistrations = new Map<string, boolean>();
          results.forEach(({ eventId, isRegistered }) => {
            updatedRegistrations.set(eventId as string, isRegistered);
          });

          // Mettre à jour l'état une seule fois après avoir collecté tous les résultats
          setUserRegistrations(updatedRegistrations);
          setIsLoading(false); // Fin du chargement
        } catch (err) {
          setError(
            new Error("Erreur lors de la vérification des participations")
          );
        }
      }

      fetchUserRegistrations();
    }
  });

  // Gestion des erreurs
  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  // Chargement des événements
  if (isLoading) {
    return <div>Chargement des participations...</div>;
  }

  return (
    <>
      <div className=" bg-base-200 pt-24">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Événements disponibles
        </h1>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventsData.map((event) => (
              <Card
                location={event.location}
                key={event._id}
                title={event.name}
                description={event.description}
                imageUrl={event.imageUrl}
                onClick={() => navigate(`/events/${event._id}`)}
                eventId={event._id || null}
                userId={user?.id || ""}
                isUserRegistered={
                  userRegistrations.get(event._id as string) || false
                } // Vérifie que ça récupère correctement l'état
                onStatusChange={(status) => console.log(status)} //
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
