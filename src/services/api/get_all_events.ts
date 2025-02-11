import { useApi as UseApi } from "../../hooks/useApi";

const api = UseApi();

export async function events() {
  try {
    const { data } = await api.get(`events`)
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Failed to get events:", error);
    return {
      error: error,
    };
  }
}
