import "./AroundMe.css";
import { useState, useEffect } from "react";
import { getPlaces } from "../../api/TravelAPI";
import { PlacesList, Map, Filters } from "../../components";
import { getUserWS } from "../../services/authWs";
import { geoLocationData } from "../../api/GeoLocationAPI";
// Material UI
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function AroundMe(props) {
  const [user, setUser] = useState(null);
  // User location from IP
  const [coordinates, setCoordinates] = useState({});
  const [userLoc, setUserLoc] = useState({});
  // Map Limits (NorthEast and SouthWest)
  const [limits, setLimits] = useState();
  // Places list
  const [places, setPlaces] = useState([]);
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
      const { latitude: lat, longitude: lng, city, country_name } = res;
      setCoordinates({ lat, lng });
      setUserLoc({ city, country_name });
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  const verifyUser = async () => {
    const response = await getUserWS();
    if (response.status) {
      setUser(response.data.user);
    }
  };

  // Set initial coordinates and limits
  useEffect(() => {
    userGeoLocation();
    verifyUser();
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
          <Grid item xs={12} md={6} className="user-loc-wrapper">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              direction="column"
              className="user-loc-grid"
              item
              xs={12}
            >
              <Typography variant="subtitle1" component="div">
                Places Around
              </Typography>
              <Typography variant="button" component="div">
                {userLoc.city}, {userLoc.country_name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} className="filters-grid-around">
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
          <PlacesList loadingPlaces={loadingPlaces} places={places} user={user}/>
        </Grid>
        <Grid item xs={12} md={6} className="map-grid" style={{ maxHeight: "100%" }}>
          <Paper variant="outlined">
            {!isLoading && (
              <Map
                coordinates={coordinates}
                setLimits={setLimits}
                setCoordinates={setCoordinates}
                places={places}
                zoom={14}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default AroundMe;
