import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserParticipation } from "../services/api/check_particpation";
import { events } from "../services/api/get_all_events";
import Event from "../services/interfaces/Event";
import Card from "./Card";

const LatestEvents: React.FC = () => {
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
  }, []);

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
  // Filtrer, trier et limiter les événements à 4
  const upcomingEvents = eventsData
    .filter((event) => new Date(event.date) > new Date()) // Filtrer les événements futurs
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Trier par date
    .slice(0, 4); // Limiter à 4 événements

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-center mb-4">
        Prochains Événements
      </h3>
      {upcomingEvents.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Aucun événement prévu prochainement.
        </p>
      ) : (
        <ul className="flex flex-col gap-4 justify-center items-center">
          {upcomingEvents.map((event) => (
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
        </ul>
      )}
    </div>
  );
};

export default LatestEvents;
