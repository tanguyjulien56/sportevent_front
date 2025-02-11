import { useApi as UseApi } from "../../hooks/useApi";

const api = UseApi();

interface EmailRequest {
  email: string;
}

export async function sendEmail(body: EmailRequest) {
  try {
    const { data } = await api.post(`users/request-password-reset`, body);
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      error: error,
    };
  }
}
