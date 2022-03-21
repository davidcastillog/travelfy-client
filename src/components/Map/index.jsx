import "./Map.css";
import GoogleMapReact from "google-map-react";
import PlaceMarker from "../PlaceMarker";

const Map = ({ places, coordinates, setCoordinates, setLimits, zoom }) => {
  return (
    <>
      <div className="map-wrapper">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY, libraries:['places','geometry','drawing'] }}
          // Map Style (Google Developers Plattaform)
          mapId={process.env.REACT_MAP_GOOGLE_MAP_ID}
          center={coordinates}
          defaultZoom={zoom}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setLimits({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
        >
          {places.map((place, i) => (
            <PlaceMarker
              lat={place.latitude ? place.latitude : place.lat}
              lng={place.longitude ? place.longitude : place.lng}
              key={i}
              place={place}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
