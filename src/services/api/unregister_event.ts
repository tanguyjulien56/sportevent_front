import { useApi as UseApi } from "../../hooks/useApi";

const api = UseApi();

export async function unregisterEvent(eventId: string, userId: string) {
  try {
    const { data } = await api.delete(`events/${eventId}/unregister`, {
      data: { userId }, // Passer l'userId dans le corps de la requête
    });
 
    return data;
  } catch (error) {
    console.error("Failed to unregister from event:", error);
    return { error };
  }
}
