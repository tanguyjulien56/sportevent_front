import {
  AddressAutofill,
  config,
  useConfirmAddress,
} from "@mapbox/search-js-react";
import { useCallback, useEffect, useState } from "react";
import MapBoxAddEvent from "../../components/Mapbox/MapBox";

export default function AddressField() {
  const [feature, setFeature] = useState<GeoJSON.Feature<GeoJSON.Point> | null>(
    null
  );
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validatedAddress, setValidatedAddress] = useState<string | null>(null);
  const [eventType, setEventType] = useState(false);

  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoieWVzbGlmZTEwIiwiYSI6ImNsdnV5amx3czFrN20ya29kcnIybXp4YzUifQ.w4zlwaAcEw8H-k8KO7JWow";
    if (accessToken) {
      setToken(accessToken);
      config.accessToken = accessToken;
    }

    const storedDataString = localStorage.getItem("storedDataEvent");
    if (storedDataString) {
      const storedDataEvent = JSON.parse(storedDataString);
      setEventType(!!storedDataEvent.is_public);
    }
  }, []);

  const { formRef } = useConfirmAddress();

  const handleRetrieve = useCallback((res: any) => {
    if (res.features && res.features.length > 0) {
      const retrievedFeature = res
        .features[0] as GeoJSON.Feature<GeoJSON.Point>;
      setFeature(retrievedFeature);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("Aucune adresse valide trouvée.");
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (feature) {
      const { place_name, address_line1, place, postcode } =
        feature.properties || {};
      const coordinates = feature.geometry?.coordinates;

      if (Array.isArray(coordinates) && coordinates.length === 2) {
        const formattedAddress = {
          address: address_line1 || place || "Adresse inconnue",
          city: place || "Ville inconnue",
          zip_code: postcode || "Code postal inconnu",
          location: {
            type: "GEOLOC",
            long: coordinates[0],
            lat: coordinates[1],
          },
        };

        const storedDataString = localStorage.getItem("storedDataEvent");
        if (storedDataString) {
          const storedDataEvent = JSON.parse(storedDataString);
          const updatedStoredDataEvent = {
            ...storedDataEvent,
            ...formattedAddress,
          };
          localStorage.setItem(
            "storedDataEvent",
            JSON.stringify(updatedStoredDataEvent)
          );
        } else {
          localStorage.setItem(
            "storedDataEvent",
            JSON.stringify(formattedAddress)
          );
        }

        setValidatedAddress(place_name || "Adresse validée sans nom précis");
        setShowValidationText(true);
        setTimeout(() => setShowValidationText(false), 2500);
      } else {
        setErrorMessage("Les coordonnées de l'adresse sont invalides.");
      }
    } else {
      setErrorMessage(
        "Veuillez entrer une adresse complète ou sélectionner un résultat suggéré."
      );
    }
  }, [feature]);

  const resetForm = useCallback(() => {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    setFeature(null);
    setErrorMessage("");
    setValidatedAddress(null);

    const storedDataString = localStorage.getItem("storedDataEvent");
    if (storedDataString) {
      const storedDataEvent = JSON.parse(storedDataString);
      storedDataEvent.address_line1 = "";
      storedDataEvent.city = "";
      storedDataEvent.location = "";
      localStorage.setItem("storedDataEvent", JSON.stringify(storedDataEvent));
    }
  }, []);

  return (
    <>
      <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4 flex flex-col w-full">
          {!validatedAddress && (
            <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
              <input
                className="input input-bordered w-full"
                placeholder="Commencez à entrer une adresse"
                autoComplete="address-line1"
              />
            </AddressAutofill>
          )}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>

        <div className="flex text-sm gap-4">
          {!validatedAddress && (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn hover:opacity-80 px-5 py-2"
            >
              Valider adresse
            </button>
          )}
          {validatedAddress && (
            <button
              type="button"
              className="btn px-5 py-2 rounded-lg  hover:opacity-80"
              onClick={resetForm}
            >
              Effacer
            </button>
          )}
        </div>

        {showValidationText && (
          <div className="bg-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 dark:bg-dark">
            Adresse validée
          </div>
        )}
        {validatedAddress && <p className="text-sm my-4">{validatedAddress}</p>}

        {validatedAddress && <MapBoxAddEvent location={validatedAddress} />}
      </form>
    </>
  );
}
