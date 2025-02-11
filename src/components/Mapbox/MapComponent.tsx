// components/MapComponent.tsx
import bbox from "@turf/bbox";
import { FeatureCollection, Point } from "geojson";
import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { fitBounds } from "viewport-mercator-project";
import { FormattedEventCardInterface } from "../../services/interfaces/event";
import markerIconUrl from "/public/markerIcon.svg";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoieWVzbGlmZTEwIiwiYSI6ImNsdnV5amx3czFrN20ya29kcnIybXp4YzUifQ.w4zlwaAcEw8H-k8KO7JWow";

interface MapComponentProps {
  events: E[];
  selectedEvent: FormattedEventCardInterface | null;
  setSelectedEvent: (event: FormattedEventCardInterface | null) => void;
}

export default function MapComponent({
  events,
  selectedEvent,
  setSelectedEvent,
}: MapComponentProps) {
  const [viewport, setViewport] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 4,
  });

  useEffect(() => {
    adjustViewport(events);
  }, [events]);

  const adjustViewport = (events: FormattedEventCardInterface[]) => {
    if (events.length === 0) return;

    const features: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: events.map((event) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [event.longitude, event.latitude],
        },
        properties: {},
      })),
    };

    const [minLng, minLat, maxLng, maxLat] = bbox(features);
    const { longitude, latitude, zoom } = fitBounds({
      width: window.innerWidth,
      height: window.innerHeight,
      bounds: [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
    });

    setViewport({ longitude, latitude, zoom });
  };

  return (
    <Map
      initialViewState={viewport}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {events.map(
        (event, index) =>
          event.latitude &&
          event.longitude && (
            <Marker
              key={index}
              longitude={event.longitude}
              latitude={event.latitude}
              onClick={() => setSelectedEvent(event)}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundImage: `url(${markerIconUrl})`,
                  backgroundSize: "cover",
                  cursor: "pointer",
                }}
              />
            </Marker>
          )
      )}
      {selectedEvent && (
        <Popup
          longitude={selectedEvent.longitude}
          latitude={selectedEvent.latitude}
          onClose={() => setSelectedEvent(null)}
          closeOnClick={false}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <img
              src={selectedEvent.picture}
              alt={selectedEvent.title}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
            />
            <h3>{selectedEvent.title}</h3>
          </div>
        </Popup>
      )}
    </Map>
  );
}
