import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import SaveEventsButton from "./SaveEventsButton";
import Card from "./card";

// Schéma de validation avec Yup
const schema = yup.object().shape({
  name: yup.string().required("Le nom de l'événement est requis"),
  date: yup
    .date()
    .required("La date et l'heure sont requises")
    .min(new Date(), "La date ne peut pas être dans le passé"),
  location: yup.string().required("Le lieu est requis"),
  description: yup.string().required("La description est requise"),
  imageUrl: yup
    .string()
    .url("URL invalide")
    .required("L'URL de l'image est requise"),
});

interface FormData {
  name: string;
  date: Date; // Modifié pour correspondre à yup.date()
  location: string;
  description: string;
  imageUrl: string;
}

interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
}

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  // Charger les événements depuis localStorage
  const loadEventsFromLocalStorage = () => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  };

  const [events, setEvents] = useState<Event[]>(loadEventsFromLocalStorage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset, // Permet de réinitialiser le formulaire
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const newEvent: Event = {
      id: uuidv4(),
      ...data,
      date: new Date(data.date), // Conversion explicite en Date
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setIsModalOpen(true); // Ouvrir le modal

    reset(); // Réinitialiser le formulaire après soumission
  };

  // Mettre à jour localStorage chaque fois que les événements changent
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Obtenir les 4 prochains événements triés par date
  const upcomingEvents = [...events]
    .filter((event) => new Date(event.date) > new Date()) // Filtrer les événements futurs
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Trier par date croissante
    .slice(0, 4); // Limiter à 4 événements

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Créer un Événement Sportif
      </h2>

      {/* Formulaire d'événement */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nom de l'événement
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`input input-bordered w-full mt-2 ${
              errors.name ? "input-error" : ""
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date et Heure
          </label>
          <input
            id="date"
            type="datetime-local"
            {...register("date")}
            className={`input input-bordered w-full mt-2 ${
              errors.date ? "input-error" : ""
            }`}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Lieu
          </label>
          <input
            id="location"
            type="text"
            {...register("location")}
            className={`input input-bordered w-full mt-2 ${
              errors.location ? "input-error" : ""
            }`}
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className={`textarea textarea-bordered w-full mt-2 ${
              errors.description ? "textarea-error" : ""
            }`}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            URL de l'image
          </label>
          <input
            id="imageUrl"
            type="url"
            {...register("imageUrl")}
            className={`input input-bordered w-full mt-2 ${
              errors.imageUrl ? "input-error" : ""
            }`}
          />
          {errors.imageUrl && (
            <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="mb-4 text-center">
          <button type="submit" className="btn btn-primary w-full">
            Créer l'événement
          </button>
          <SaveEventsButton />
        </div>
      </form>

      {/* Modal de confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">
              Événement enregistré avec succès !
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-primary"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Les 4 prochains événements */}
      <div className="mt-6 ">
        <h3 className="text-xl font-semibold text-center mb-4 ">
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
                key={event.id}
                title={event.name}
                description={event.description}
                imageUrl={event.imageUrl}
                onClick={() => {
                  // Rediriger vers la page des détails de l'événement
                  navigate(`/events/${event.id}`);
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventForm;
