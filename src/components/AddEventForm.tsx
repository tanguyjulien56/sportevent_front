import { AddressAutofill } from "@mapbox/search-js-react";
import { useState } from "react";
import { createEvent } from "../services/api/create_event";
import { uploadImage } from "../services/api/upload_image";
import { AddEventInterface } from "../services/interfaces/Event";

// Ton token Mapbox
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoieWVzbGlmZTEwIiwiYSI6ImNsdnV5amx3czFrN20ya29kcnIybXp4YzUifQ.w4zlwaAcEw8H-k8KO7JWow";

const AddEventForm = () => {
  const [address1, setAddress1] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventType, setEventType] = useState<string>("public");
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Type pour les erreurs
  type ErrorsType = {
    eventName: string | undefined;
    eventDescription: string | undefined;
    eventDate: string | undefined;
    address1: string | undefined;
    city: string | undefined;
    zip: string | undefined;
  };

  const [errors, setErrors] = useState<ErrorsType>({
    eventName: undefined,
    eventDescription: undefined,
    eventDate: undefined,
    address1: undefined,
    city: undefined,
    zip: undefined,
  });

  const validate = () => {
    let isValid = true;
    const newErrors: ErrorsType = {
      eventName: undefined,
      eventDescription: undefined,
      eventDate: undefined,
      address1: undefined,
      city: undefined,
      zip: undefined,
    };

    // Validation des champs
    if (!eventName) {
      newErrors.eventName = "Le titre de l'événement est requis.";
      isValid = false;
    }
    if (!eventDescription) {
      newErrors.eventDescription = "La description de l'événement est requise.";
      isValid = false;
    }
    if (!eventDate || isNaN(eventDate.getTime())) {
      newErrors.eventDate = "La date de l'événement est requise.";
      isValid = false;
    }
    if (!address1) {
      newErrors.address1 = "L'adresse est requise.";
      isValid = false;
    }
    if (!city) {
      newErrors.city = "La ville est requise.";
      isValid = false;
    }
    if (!zip) {
      newErrors.zip = "Le code postal est requis.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  type MapboxFeature = {
    properties: {
      address_line1?: string;
      place?: string;
      postcode?: string;
      context?: { id: string; text: string }[];
    };
  };
  const handleRetrieve = (res: { features: MapboxFeature[] }) => {
    if (res.features && res.features.length > 0) {
      const feature = res.features[0];
      const { address_line1, place, postcode, context } =
        feature.properties || {};

      setAddress1(address_line1 || "");
      setCity(place || "");
      setZip(postcode || "");

      if (context) {
        context.forEach((item: { id: string; text: string }) => {
          if (item.id.includes("region")) {
            setState(item.text || "");
          }
        });
      }
    }
  };

  // Fonction pour gérer l'upload de l'image
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadImage(file);
      const serverUrl = import.meta.env.VITE_API_BASE_URL;
      const imagePath = result.filePath.startsWith("/")
        ? result.filePath.slice(1)
        : result.filePath; // Supprime le slash initial si présent
      setImage(`${serverUrl}${imagePath}`);
      console.log(image);
      // Assurez-vous que `filePath` est le bon champ retourné par le serveur
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Fonction pour récupérer les derniers événements
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const defaultImageUrl =
      "https://media.istockphoto.com/id/637332860/fr/photo/collage-de-joueurs-fiers-multisports-sur-la-grande-ar%C3%A8ne.jpg?s=612x612&w=0&k=20&c=CqSWo9UwX7o5PS-jfYNZ68itTmPq_Tv7eUSlHzHYsDc=";

    if (!validate()) {
      return; // Si la validation échoue, on ne soumet pas le formulaire
    }

    const eventData: AddEventInterface = {
      name: eventName,
      description: eventDescription,
      date: eventDate,
      location: `${address1}, ${city}, ${zip}, ${state}`,
      imageUrl: image || defaultImageUrl, // Utilise l'URL de l'image téléchargée
      type: eventType,
    };

    try {
      await createEvent(eventData);
      setIsModalOpen(true);
      setAddress1("");
      setCity("");
      setZip("");
      setState("");
      setEventName("");
      setEventDescription("");
      setEventDate(new Date());
      setEventType("public");
      setImage(null); // Réinitialiser l'image après soumission
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
    }
  };

  return (
    <div className="card bg-base-100 max-w-xl p-4 ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Créer un Événement Sportif
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Titre
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Nom de l'événement"
            className="input input-bordered w-full"
          />
          {errors.eventName && (
            <p className="text-red-500 text-sm">{errors.eventName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Description de l'événement"
            className="input input-bordered w-full"
          />
          {errors.eventDescription && (
            <p className="text-red-500 text-sm">{errors.eventDescription}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block mb-2">
            Date de l'événement
          </label>
          <input
            type="datetime-local"
            value={eventDate.toISOString().slice(0, 16)} // Convertit la date au format attendu
            onChange={(e) => setEventDate(new Date(e.target.value))}
            className="input input-bordered w-full"
          />
          {errors.eventDate && (
            <p className="text-red-500 text-sm">{errors.eventDate}</p>
          )}
        </div>

        <AddressAutofill
          accessToken={MAPBOX_ACCESS_TOKEN}
          browserAutofillEnabled={true}
          popoverOptions={{ flip: true, offset: 0 }}
          onRetrieve={handleRetrieve}
          confirmOnBrowserAutofill={{ minimap: true }}
        >
          <div className="mb-4">
            <label htmlFor="address-1" className="block mb-2">
              Adresse
            </label>
            <input
              type="text"
              name="address-1"
              autoComplete="address-line1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Commencez par entrer une adresse"
              className="input input-bordered w-full"
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm">{errors.address1}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <input
                type="text"
                name="city"
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville"
                className="input input-bordered w-full"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="zip"
                autoComplete="postal-code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Code Postal"
                className="input input-bordered w-full"
              />
              {errors.zip && (
                <p className="text-red-500 text-sm">{errors.zip}</p>
              )}
            </div>
          </div>
        </AddressAutofill>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">
            Image de l'événement
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="eventType" className="block mb-2">
            Type d'événement
          </label>
          <select
            name="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="input input-bordered w-full"
          >
            <option value="public">Public</option>
            <option value="private">Privé</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Créer l'événement
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-base-100 bg-opacity-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg text-center">
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
    </div>
  );
};

export default AddEventForm;
