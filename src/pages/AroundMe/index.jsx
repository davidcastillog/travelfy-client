import "./AroundMe.css";
import { useState, useEffect } from "react";
import { getPlaces } from "../../api/TravelAPI";
import { PlacesList, Map, SearchBox, Filters } from "../../components";
// TODO: import { getUserWS } from "../../services/authWs"; AUTHENTICATE USERS
import { geoLocationData } from "../../api/GeoLocationAPI";
// Material UI
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function AroundMe(props) {
  // User location from IP
  const [coordinates, setCoordinates] = useState({});
  // Map Limits (NorthEast and SouthWest)
  const [limits, setLimits] = useState();
  // Places list
  const [places, setPlaces] = useState([]);
  console.log(places);
  // Type of Place
  const [type, setType] = useState("attractions");
  const [rating, setRating] = useState(3);
  // Loading Control
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  // Get user coordinates from IP and set them as initial coordinates
  const userGeoLocation = async () => {
    setIsLoading(true);
    try {
      const res = await geoLocationData();
      const { latitude: lat, longitude: lng } = res;
      setCoordinates({ lat, lng });
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  // Set initial coordinates and limits
  useEffect(() => {
    userGeoLocation();
  }, []);

  // Get places from API
  useEffect(() => {
    if (limits) {
      setLoadingPlaces(true);
      getPlaces(type, limits.sw, limits.ne).then((data) => {
        const places = data.filter(
          (place) => place.name && place.rating > rating
        );
        setPlaces(places);
        setLoadingPlaces(false);
      });
    }
  }, [limits, type, rating]);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid container className="search-filter-grid" spacing={2}>
          <Grid item xs={12} md={6} className="search-box-grid">
            <SearchBox
              setCoordinates={setCoordinates}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Filters
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <PlacesList loadingPlaces={loadingPlaces} places={places} />
        </Grid>
        <Grid item xs={12} md={6} style={{ maxHeight: "100%" }}>
          <Paper variant="outlined">
            {!isLoading && (
              <Map
                coordinates={coordinates}
                setLimits={setLimits}
                setCoordinates={setCoordinates}
                places={places}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default AroundMe;
