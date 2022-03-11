import "./WhereTo.css";
import { useState, useEffect } from "react";
import { getPlaces } from "../../api/TravelAPI";
import { useNavigate } from "react-router-dom";
// TODO: import { getUserWS } from "../../services/authWs"; AUTHENTICATE USERS
import { geoLocationData } from "../../api/GeoLocationAPI";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { PlacesList, Map } from "../../components";

function WhereTo() {
  // User location from IP
  const [coordinates, setCoordinates] = useState({});
  // Map Limits
  const [limits, setLimits] = useState();
  // Places list
  const [places, setPlaces] = useState([]);
  // Type of Place
  const [type, setType] = useState('hotels')
  // Loading Control
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPlaces, setLoadingPlaces] = useState(true);

  // Get user coordinates from IP and set them as initial coordinates
  const userGeoLocation = async () => {
    try {
      const res = await geoLocationData();
      const { latitude: lat, longitude: lng } = res;
      setCoordinates({ lat, lng });
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  // Get places from API
  useEffect(() => {
    if(limits){
      setLoadingPlaces(true)
      getPlaces(type, limits.sw, limits.ne)
      .then((data) => {
        // Filter to only include places with names
        const places = data.filter((place) => place.name);
        setPlaces(places);
        setLoadingPlaces(false);
      });
    }
  }, [limits,type]);

  // Set initial coordinates and limits
  useEffect(() => {
    userGeoLocation();
  }, []);

  console.log('LIMITS', limits)
  console.log('PLACES', places)

  return (
    <>
      <CssBaseline />
      <Grid container spacing={0} style={{ width: "100%" }}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined">
            <PlacesList
            loadingPlaces={loadingPlaces}
            places={places} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined">
            {!isLoading && <Map
            coordinates={coordinates}
            setLimits={setLimits}
            setCoordinates={setCoordinates}
            />}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default WhereTo;
