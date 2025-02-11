import { useApi as UseApi } from "../../hooks/useApi";

const api = UseApi();
export const getEventById = async (id: string) => {
  try {
    const data = await api.get(`/events/${id}`);
    console.log("API response:", data);
    if (data.status !== 200) {
      throw new Error("Erreur lors de la récupération de l'événement.");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement:", error);
    throw error;
  }
};
