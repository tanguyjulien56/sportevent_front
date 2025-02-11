import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect } from "react";

// Définir un type pour la propriété location
type LocationType = string;

mapboxgl.accessToken =
  "pk.eyJ1IjoieWVzbGlmZTEwIiwiYSI6ImNsdnV5amx3czFrN20ya29kcnIybXp4YzUifQ.w4zlwaAcEw8H-k8KO7JWow"; // Remplacez par votre clé d'accès à Mapbox

const MapBoxComponent: React.FC<{ location: LocationType }> = ({
  location,
}) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // ID du conteneur de la carte
      style: "mapbox://styles/mapbox/streets-v11", // Utilisation d'un style de carte avec les routes et les villes
      center: [0, 0], // Initialisation du centre de la carte
      zoom: 1, // Niveau de zoom initial
    });

    // Ajouter la couche 3D des bâtiments
    map.on("load", () => {
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa", // Couleur des bâtiments
          "fill-extrusion-height": ["get", "height"], // Hauteur des bâtiments
          "fill-extrusion-base": ["get", "minheight"], // Base des bâtiments
          "fill-extrusion-opacity": 0.8, // Opacité des bâtiments
        },
      });
    });

    // Remplacer par les coordonnées de Malestroit
    const malestroitCoordinates = "2.5047,47.8134"; // Longitude, Latitude de Malestroit

    // Récupérer les coordonnées géographiques de l'adresse spécifiée avec Axios
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${
          mapboxgl.accessToken
        }&proximity=${malestroitCoordinates}`
      )
      .then((response) => {
        const data = response.data;
        const features = data.features;

        if (features.length > 0) {
          const coordinates = features[0].geometry.coordinates;
          const center: [number, number] = [coordinates[0], coordinates[1]];

          // Centrer la carte sur l'emplacement spécifié
          map.setCenter(center);
          map.setZoom(13); // Zoom sur l'emplacement spécifié

          // Ajouter un marqueur à l'emplacement spécifié
          new mapboxgl.Marker().setLngLat(center).addTo(map);
        } else {
          console.error("Aucune correspondance trouvée pour cette adresse.");
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des coordonnées :",
          error
        );
      });

    return () => {
      map.remove();
    };
  }, [location]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default MapBoxComponent;
