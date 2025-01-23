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
      imageUrl:
        "https://cdn.futura-sciences.com/sources/images/actu/shutterstock_242738527.jpg",
    },
    {
      id: uuidv4(),
      name: "Championnat de Tennis de Roland-Garros",
      description:
        "Venez assister aux matchs du plus grand tournoi de tennis sur terre battue du monde. Des moments intenses vous attendent.",
      date: "2025-05-22T10:00:00Z",
      location: "Stade Roland-Garros, Paris",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQueipcf6O_BPwJThR_Bt0rZ-8jN0E0a0WY3g&s",
    },
    {
      id: uuidv4(),
      name: "Course à pied - Marathon de Paris",
      description:
        "Participez ou encouragez les coureurs lors de la célèbre course de 42 km à travers les rues de Paris.",
      date: "2025-04-05T08:00:00Z",
      location: "Paris, France",
      imageUrl:
        "https://www.runnek.fr/wp-content/uploads/2020/04/pratiquer-running-626x321.jpg",
    },
    {
      id: uuidv4(),
      name: "Rugby - France vs. Angleterre",
      description:
        "Assistez à un match de rugby palpitant entre deux grandes équipes européennes, un classique du Tournoi des Six Nations.",
      date: "2025-02-28T16:00:00Z",
      location: "Stade de France, Saint-Denis",
      imageUrl:
        "https://www.lequipe.fr/_medias/img-photo-jpg/pierre-louis-barassi-avec-le-ballon-a-l-entrainement-mercredi-a-marcoussis-p-lahalle-l-equipe/1500000002131677/7:15,1837:1235-828-552-75/a069d",
    },
    {
      id: uuidv4(),
      name: "Cyclisme - Tour de France",
      description:
        "Ne manquez pas les étapes spectaculaires du Tour de France, où les meilleurs cyclistes du monde s'affrontent dans des courses à couper le souffle.",
      date: "2025-07-01T09:00:00Z",
      location: "Départ à Nice, France",
      imageUrl:
        "https://www.francebleu.fr/s3/cruiser-production/2023/06/319dae5f-52a5-4eee-a5cf-2f062b74379e/1200x680_sc_000-32ez648.jpg",
    },
    {
      id: uuidv4(),
      name: "Natation - Championnats du Monde de Natation",
      description:
        "Les meilleurs nageurs du monde se retrouvent pour une compétition internationale où vitesse et technique seront au rendez-vous.",
      date: "2025-08-15T14:00:00Z",
      location: "Budapest, Hongrie",
      imageUrl:
        "https://img.passeportsante.net/1200x675/2021-05-06/i106189-natation-activite-physique-multiples-bienfaits.jpg",
    },
    {
      id: uuidv4(),
      name: "Boxe - Combat pour le titre mondial",
      description:
        "Un combat spectaculaire entre les deux meilleurs boxeurs mondiaux pour le titre de champion du monde des poids lourds.",
      date: "2025-06-20T20:00:00Z",
      location: "Las Vegas, Nevada, USA",
      imageUrl:
        "https://boxingcenter.fr/wp-content/uploads/2024/03/contact-boxing-center-club-de-boxe.webp",
    },
    {
      id: uuidv4(),
      name: "Escrime - Championnat européen d'escrime",
      description:
        "Les escrimeurs les plus talentueux d'Europe s'affrontent dans ce championnat prestigieux.",
      date: "2025-03-10T11:00:00Z",
      location: "Sofia, Bulgarie",
      imageUrl:
        "https://www.lejdd.fr/lmnr/var/jdd/public/media/image/2022/07/19/12/escrime-comment-les-francais-apprivoisent-leurs-armes.jpg?VersionId=Mw31AogdDUwVLuCaVdxMozm9kito7TTP",
    },
    {
      id: uuidv4(),
      name: "Volley-ball - Finales de la Ligue des Champions",
      description:
        "Les meilleures équipes de volley-ball d'Europe se battent pour décrocher le titre suprême de la Ligue des Champions.",
      date: "2025-04-18T19:30:00Z",
      location: "Berlin, Allemagne",
      imageUrl:
        "https://medias.lequipe.fr/img-photo-jpg/paola-egonu-a-atteint-un-total-incroyable-de-45-points-dans-un-match-f-faugere-l-equipe/1500000001033584/0:0,1996:1331-1200-800-75/6ee91.jpg",
    },
    {
      id: uuidv4(),
      name: "Basketball - NBA Playoffs",
      description:
        "Assistez aux matchs des playoffs NBA, où les meilleures équipes du basket mondial s'affrontent pour remporter le titre.",
      date: "2025-05-01T20:00:00Z",
      location: "Madison Square Garden, New York, USA",
      imageUrl:
        "https://i-sam.unimedias.fr/2024/05/15/bienfaits-du-basket.jpg?auto=format,compress&cs=tinysrgb&w=1200",
    },
  ];

  return events;
};
