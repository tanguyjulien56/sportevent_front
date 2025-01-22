import { v4 as uuidv4 } from "uuid"; // Importer la fonction uuid

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string; // Image spécifique pour l'événement
}

export const generateRealisticEvents = (): Event[] => {
  const events: Event[] = [
    {
      id: uuidv4(),
      name: "Tournoi de Football - Ligue 1",
      description:
        "Rejoignez-nous pour un match épique entre les meilleurs clubs français de la Ligue 1. Un événement à ne pas manquer !",
      date: "2025-03-12T18:00:00Z", // Date précise de l'événement
      location: "Parc des Princes, Paris", // Lieu réel de l'événement
      imageUrl: "/public/football.jpeg",
    },
    {
      id: uuidv4(),
      name: "Championnat de Tennis de Roland-Garros",
      description:
        "Venez assister aux matchs du plus grand tournoi de tennis sur terre battue du monde. Des moments intenses vous attendent.",
      date: "2025-05-22T10:00:00Z",
      location: "Stade Roland-Garros, Paris",
      imageUrl: "public/tennis.jpeg",
    },
    {
      id: uuidv4(),
      name: "Course à pied - Marathon de Paris",
      description:
        "Participez ou encouragez les coureurs lors de la célèbre course de 42 km à travers les rues de Paris.",
      date: "2025-04-05T08:00:00Z",
      location: "Paris, France",
      imageUrl: "/public/running.jpeg",
    },
    {
      id: uuidv4(),
      name: "Rugby - France vs. Angleterre",
      description:
        "Assistez à un match de rugby palpitant entre deux grandes équipes européennes, un classique du Tournoi des Six Nations.",
      date: "2025-02-28T16:00:00Z",
      location: "Stade de France, Saint-Denis",
      imageUrl: "/public/rugby.jpeg",
    },
    {
      id: uuidv4(),
      name: "Cyclisme - Tour de France",
      description:
        "Ne manquez pas les étapes spectaculaires du Tour de France, où les meilleurs cyclistes du monde s'affrontent dans des courses à couper le souffle.",
      date: "2025-07-01T09:00:00Z",
      location: "Départ à Nice, France",
      imageUrl: "/public/cyclisme.jpeg",
    },
    {
      id: uuidv4(),
      name: "Natation - Championnats du Monde de Natation",
      description:
        "Les meilleurs nageurs du monde se retrouvent pour une compétition internationale où vitesse et technique seront au rendez-vous.",
      date: "2025-08-15T14:00:00Z",
      location: "Budapest, Hongrie",
      imageUrl: "/public/rugby.jpeg",
    },
    {
      id: uuidv4(),
      name: "Boxe - Combat pour le titre mondial",
      description:
        "Un combat spectaculaire entre les deux meilleurs boxeurs mondiaux pour le titre de champion du monde des poids lourds.",
      date: "2025-06-20T20:00:00Z",
      location: "Las Vegas, Nevada, USA",
      imageUrl: "/public/boxe.jpeg",
    },
    {
      id: uuidv4(),
      name: "Escrime - Championnat européen d'escrime",
      description:
        "Les escrimeurs les plus talentueux d'Europe s'affrontent dans ce championnat prestigieux.",
      date: "2025-03-10T11:00:00Z",
      location: "Sofia, Bulgarie",
      imageUrl: "/public/escrime.jpeg",
    },
    {
      id: uuidv4(),
      name: "Volley-ball - Finales de la Ligue des Champions",
      description:
        "Les meilleures équipes de volley-ball d'Europe se battent pour décrocher le titre suprême de la Ligue des Champions.",
      date: "2025-04-18T19:30:00Z",
      location: "Berlin, Allemagne",
      imageUrl: "/public/volley.jpeg",
    },
    {
      id: uuidv4(),
      name: "Basketball - NBA Playoffs",
      description:
        "Assistez aux matchs des playoffs NBA, où les meilleures équipes du basket mondial s'affrontent pour remporter le titre.",
      date: "2025-05-01T20:00:00Z",
      location: "Madison Square Garden, New York, USA",
      imageUrl: "/public/basket.jpeg",
    },
  ];

  return events;
};
