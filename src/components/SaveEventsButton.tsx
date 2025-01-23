import React from "react";
import { generateRealisticEvents } from "../FakerData";

const SaveEventsButton: React.FC = () => {
  const saveEventsToLocalStorage = () => {
    const events = generateRealisticEvents();
    localStorage.setItem("events", JSON.stringify(events));
    alert("Les événements ont été sauvegardés dans le localStorage.");
  };

  return (
    <div>
      <button
        className="btn btn-secondary w-full mt-4"
        onClick={saveEventsToLocalStorage}
      >
        Ajout de données de test
      </button>
    </div>
  );
};

export default SaveEventsButton;
