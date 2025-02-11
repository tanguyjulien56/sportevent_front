// Exemple de fonction pour annuler la participation
export const cancelParticipation = async (eventId: string, userId: string) => {
  const response = await fetch(`/api/events/${eventId}/cancel-participation`, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Annulation de l'inscription échouée");
  }
  return await response.json();
};
