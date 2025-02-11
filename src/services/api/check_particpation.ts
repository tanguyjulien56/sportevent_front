import { useApi as UseApi } from "../../hooks/useApi";

const api = UseApi();

export async function checkUserParticipation(eventId: string, userId: string) {
  try {
    const { data } = await api.get(`events/${eventId}/participants/${userId}`);
    return data;
  } catch (error) {
    console.error("Failed to check participation:", error);
    return { error };
  }
}
