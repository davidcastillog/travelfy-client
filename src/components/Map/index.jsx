import "./Map.css";
import GoogleMapReact from "google-map-react";
// import Rating from "@mui/material/Rating";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";

const Map = (props) => {
  return (
    <>
      <div style={{ height: "92vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          mapId={process.env.REACT_MAP_GOOGLE_MAP_ID}
          center={props.coordinates}
          defaultZoom={15}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onChange={(e) => {
            props.setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            props.setLimits({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          // onChildClick={""}
        ></GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
