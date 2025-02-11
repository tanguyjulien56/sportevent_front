import { useApi as UseApi } from "../../hooks/useApi";

export const uploadImage = async (file: File) => {
  const api = UseApi();
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201) {
      throw new Error("Erreur lors du téléchargement de l’image");
    }

    return response.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};
