import { useApi as UseApi } from "../../hooks/useApi";

const api = UseApi();

export async function registerEvent(eventId: string, userId: string) {
  try {
    const { data } = await api.post(`events/${eventId}/register`, { userId });
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Failed to register for event:", error);
    return { error };
  }
}
