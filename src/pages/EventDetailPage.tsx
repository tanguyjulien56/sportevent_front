import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MapBoxComponent from "../components/Mapbox/Mapbox";

import HandleRegisterButton from "../components/handleRegisterButton";
import { checkUserParticipation } from "../services/api/check_particpation";
import { getEventById } from "../services/api/get_event_by_id";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  participations: Array<{
    fullName: string;
    status: "confirmed" | "pending" | "absent";
    joinedAt: string;
  }>;
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const eventId = id ?? "";
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);

  // 🔄 Chargement de l'événement et vérification de l'inscription
  useEffect(() => {
    if (!eventId || !user?.id) {
      setError("L'ID de l'événement ou de l'utilisateur est manquant.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Récupérer les détails de l'événement
        const eventResponse = await getEventById(eventId);
        setEvent(eventResponse.data.data);

        // Vérifier si l'utilisateur est inscrit
        const participationResponse = await checkUserParticipation(
          eventId,
          user.id
        );
        setIsUserRegistered(participationResponse.isRegistered);
      } catch (err) {
        setError("Impossible de charger l'événement ou la participation.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, user?.id, isUserRegistered]); // Ajout de `isUserRegistered` pour mettre à jour les participants après l'inscription/désinscription

  if (loading)
    return <div className="text-center text-gray-500">Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!event) return <div className="text-gray-500">Événement non trouvé.</div>;

  return (
    <div className="hero min-h-screen bg-base-200 pt-24">
      <div className="p-6 max-w-3xl mx-auto ">
        <button
          className="btn btn-secondary mb-4 px-4 py-2"
          onClick={() => navigate("/events")}
        >
          ← Retour
        </button>

        <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p>{event.description}</p>
        <p className="mt-2">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Lieu:</strong> {event.location}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <MapBoxComponent location={event.location} />

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Participants confirmés
            </h2>
            {event.participations.length > 0 ? (
              <ul className="list-disc pl-5">
                {event.participations
                  .filter((p) => p.status === "confirmed")
                  .map((p) => (
                    <li key={p.fullName}>{p.fullName}</li>
                  ))}
              </ul>
            ) : (
              <p>Aucun participant confirmé pour le moment.</p>
            )}

            {user && (
              <HandleRegisterButton
                eventIdProps={eventId}
                userId={user.id}
                isUserRegistered={isUserRegistered}
                onStatusChange={setIsUserRegistered}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
