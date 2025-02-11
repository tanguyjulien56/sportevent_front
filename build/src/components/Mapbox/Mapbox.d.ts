import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
type LocationType = string;
declare const MapBoxComponent: React.FC<{
    location: LocationType;
}>;
export default MapBoxComponent;
