import "./Explore.css";
import { useState, useEffect } from "react";
import { getPlaces } from "../../api/TravelAPI";
import { PlacesList, Map, SearchBox, Filters } from "../../components";
import { getUserWS } from "../../services/authWs";
// Material UI
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function Explore({ props }) {

  const [user, setUser] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  // Map Limits (NorthEast and SouthWest)
  const [limits, setLimits] = useState();
  // Places list
  const [places, setPlaces] = useState([]);
  console.log('PLACES',places);
  // To use for filter places
  const [type, setType] = useState("attractions");
  const [rating, setRating] = useState(3);
  // Loading Control
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const verifyUser = async () => {
    const response = await getUserWS();
    if (response.status) {
      setUser(response.data.user);
    }
  };

  const defaultGeoLocation = async () => {
    setIsLoading(true);
    try {
      const defaultCoords = { lat: 48.856614, lng: 2.3522219 }; // "Paris, France" as default
      setCoordinates(defaultCoords);
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    defaultGeoLocation();
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
          <Grid item xs={12} md={6} className="search-box-grid">
            <SearchBox setCoordinates={setCoordinates} />
          </Grid>
          <Grid item xs={12} md={6} className="filter-explore-grid" sx={{ justifyContent: 'center' }}>
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
          <PlacesList
            loadingPlaces={loadingPlaces}
            places={places}
            user={user}
          />
        </Grid>
        <Grid item xs={12} md={6} className="map-grid" style={{ maxHeight: "100%" }}>
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

export default Explore;
