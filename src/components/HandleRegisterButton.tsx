import { useState } from "react";
import { registerEvent } from "../services/api/register_event";
import { unregisterEvent } from "../services/api/unregister_event";

interface HandleRegisterButtonProps {
  eventIdProps: string | null;
  userId: string;
  isUserRegistered: boolean;
  onStatusChange: (status: boolean) => void;
}

const HandleRegisterButton: React.FC<HandleRegisterButtonProps> = ({
  eventIdProps,
  userId,
  isUserRegistered,
  onStatusChange,
}) => {
  const [loading, setLoading] = useState(false);

  // Gérer l'inscription
  const handleRegister = async () => {
    if (!eventIdProps || !userId) return; // Vérifie si les valeurs sont définies
    setLoading(true);
    try {
      await registerEvent(eventIdProps, userId); // eventIdProps et userId doivent être des chaînes de caractères valides
      onStatusChange(true); // L'utilisateur est inscrit
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async () => {
    if (!eventIdProps || !userId) return; // Vérifie si les valeurs sont définies
    setLoading(true);
    try {
      await unregisterEvent(eventIdProps, userId); // eventIdProps et userId doivent être des chaînes de caractères valides
      onStatusChange(false); // L'utilisateur est désinscrit
    } catch (error) {
      console.error("Erreur lors de la désinscription :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn w-full ${
        isUserRegistered
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      } text-white rounded`}
      onClick={isUserRegistered ? handleUnregister : handleRegister}
      disabled={loading}
    >
      {loading
        ? isUserRegistered
          ? "Annulation..."
          : "Inscription..."
        : isUserRegistered
        ? "Annuler mon inscription"
        : "S'inscrire"}
    </button>
  );
};

export default HandleRegisterButton;
