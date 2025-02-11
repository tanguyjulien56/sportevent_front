const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Connexion à la base de données MongoDB
mongoose.connect("process.env.MONGODB_URI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Définition du modèle User
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  profil_picture: String,
  role: String,
  created_at: Date,
  updated_at: Date,
  clubs: [String],
});

const User = mongoose.model("User", userSchema);

const users = [
  {
    _id: ObjectId("67963c79e7b7effd206dddc8"),
    firstname: "Diane",
    lastname: "Rousseau",
    email: "diane.rousseau@example.com",
    password: "$2b$10$securepassword",
    profil_picture: "https://example.com/profiles/diane.jpg",
    role: "user",
    created_at: ISODate("2025-01-15T18:00:00Z"),
    updated_at: ISODate("2025-01-15T18:00:00Z"),
    clubs: ["Club A", "Club B"],
  },
  {
    _id: ObjectId("67963c79e7b7effd206dddc9"),
    firstname: "Eric",
    lastname: "Durand",
    email: "eric.durand@example.com",
    password: "$2b$10$securepassword",
    profil_picture: "https://example.com/profiles/eric.jpg",
    role: "moderator",
    created_at: ISODate("2025-01-20T21:00:00Z"),
    updated_at: ISODate("2025-01-20T21:00:00Z"),
    clubs: ["Club C"],
  },
  {
    _id: ObjectId("67963c79e7b7effd206dddc7"),
    firstname: "Charlie",
    lastname: "Bernard",
    email: "charlie.bernard@example.com",
    password: "$2b$10$securepassword",
    profil_picture: "",
    role: "user",
    created_at: ISODate("2025-01-10T09:45:00Z"),
    updated_at: ISODate("2025-01-10T09:45:00Z"),
    clubs: ["Club D"],
  },
  {
    _id: ObjectId("67963c79e7b7effd206dddc5"),
    firstname: "Julien",
    lastname: "Tanguy",
    email: "tanguyjulien@hotmail.fr",
    password: "$2b$10$securepassword",
    profil_picture:
      "https://portfolio-julien-tanguy.vercel.app/profile-pic.png",
    role: "admin",
    created_at: ISODate("2025-01-01T12:00:00Z"),
    updated_at: ISODate("2025-01-01T12:00:00Z"),
    clubs: ["Club A"],
  },
  {
    _id: ObjectId("67963c79e7b7effd206dddc6"),
    firstname: "Bob",
    lastname: "Martin",
    email: "bob.martin@example.com",
    password: "$2b$10$securepassword",
    profil_picture: "https://example.com/profiles/bob.jpg",
    role: "user",
    created_at: ISODate("2025-01-05T15:30:00Z"),
    updated_at: ISODate("2025-01-05T15:30:00Z"),
    clubs: ["Club B"],
  },
  {
    _id: ObjectId("679645314d224847915e97f8"),
    firstname: "Julien",
    lastname: "Tanguy",
    email: "julien.tanguy@example.com",
    password: "$2b$10$securepassword",
    profil_picture:
      "https://portfolio-julien-tanguy.vercel.app/profile-pic.png",
    role: "user",
    createdAt: ISODate("2025-01-26T14:22:41.482+00:00"),
    updatedAt: ISODate("2025-01-26T14:22:41.482+00:00"),
    clubs: ["Club A", "Club C"],
  },
  {
    _id: ObjectId("67964841096da3e04a5739eb"),
    firstname: "Julien",
    lastname: "Tanguy",
    email: "julien@example.com",
    password: "$2b$10$securepassword",
    profil_picture:
      "https://portfolio-julien-tanguy.vercel.app/profile-pic.png",
    role: "user",
    createdAt: ISODate("2025-01-26T14:35:45.087+00:00"),
    updatedAt: ISODate("2025-01-26T14:35:45.087+00:00"),
    clubs: ["Club D"],
  },
  {
    _id: ObjectId("67964ef0cee0275d5b7bfd11"),
    firstname: "Default",
    lastname: "Name",
    email: "julien@examples.com",
    password: "$2b$10$securepassword",
    profil_picture: "",
    role: "user",
    createdAt: ISODate("2025-01-26T15:04:16.264+00:00"),
    updatedAt: ISODate("2025-01-26T15:04:16.264+00:00"),
    clubs: [],
  },
  {
    _id: ObjectId("67964f2a7e738a2d45974b25"),
    firstname: "Julien",
    lastname: "Tanguy",
    email: "julien@exampless.com",
    password: "$2b$10$securepassword",
    profil_picture: "",
    role: "user",
    createdAt: ISODate("2025-01-26T15:05:14.674+00:00"),
    updatedAt: ISODate("2025-01-26T15:05:14.674+00:00"),
    clubs: [],
  },
  {
    _id: ObjectId("679651f8acdc8be515715302"),
    firstname: "Julien",
    lastname: "Tanguy",
    email: "julien@examplesss.com",
    password: "$2b$10$securepassword",
    profil_picture: "",
    role: "user",
    createdAt: ISODate("2025-01-26T15:17:12.450+00:00"),
    updatedAt: ISODate("2025-01-26T15:17:12.450+00:00"),
    clubs: [],
  },
];

// Insertion des utilisateurs
User.insertMany(users)
  .then(() => {
    console.log("Utilisateurs insérés avec succès !");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Erreur lors de l'insertion des utilisateurs:", err);
    mongoose.connection.close();
  });
