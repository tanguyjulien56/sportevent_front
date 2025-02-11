import { AxiosError } from "axios";
import { useApi as UseApi } from "../../hooks/useApi";
import { AddEventInterface } from "../interfaces/Event";

const api = UseApi();

export const createEvent = async (eventData: AddEventInterface) => {
  try {
    const response = await api.post(`events`, eventData, {
      headers: {
        "Content-Type": "application/json",
        // Inclure d'autres en-têtes si nécessaire, comme Authorization
      },
    });
    console.log("Event created successfully:", response.data);
    return response.data;
  } catch (error) {
    // Vérification du type d'erreur avant de la manipuler
    if (error instanceof AxiosError) {
      console.error(
        `Error creating event: ${error.response?.data} (Status: ${error.response?.status})`
      );
    } else if (error instanceof Error) {
      console.error(`An unexpected error occurred: ${error.message}`);
    } else {
      console.error(`An unknown error occurred: ${String(error)}`);
    }
    throw error;
  }
};
