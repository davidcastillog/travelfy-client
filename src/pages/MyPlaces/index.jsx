import "./MyPlaces.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneTrip, getAllPlacesFromTrip } from "../../services/tripsWs";
import { PlacesList, MapPlaces } from "../../components";
import { getUserWS } from "../../services/authWs";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MyPlaces({ props }) {
  const [user, setUser] = useState(null);
  // Map
  const [coordinates, setCoordinates] = useState({});
  // Places from trip
  const [places, setPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  // Trip Details
  const [trip, setTrip] = useState({});
  // Loading Control
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const verifyUser = async () => {
    const response = await getUserWS();
    if (response.status) {
      setUser(response.data.user);
    }
  };

  const getTripAndPlaces = async () => {
    setIsLoading(true);
    setLoadingPlaces(true);
    try {
      const trip = await getOneTrip(id); // For use it as title
      if (trip) {
        setTrip(trip.data.trip);
      }
      const placesInTrip = await getAllPlacesFromTrip(id); // For use it as places
      if (placesInTrip) {
        setPlaces(placesInTrip.data.places);
        setCoordinates({
          lat: placesInTrip.data.places[0].lat,
          lng: placesInTrip.data.places[0].lng,
        });
        setIsLoading(false);
        setIsSaved(true); // To display delete button in place card
      } else {
        navigate("/mytrips");
      }
      setIsLoading(false);
      setLoadingPlaces(false);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getTripAndPlaces();
    verifyUser();
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} className="myplaces-grid">
        <Grid item xs={12} md={12} className="search-box-grid">
          <Typography variant="h5" gutterBottom component="div">
            {trip.title}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          mt={1}
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <PlacesList
            loadingPlaces={loadingPlaces}
            places={places}
            user={user}
            isSaved={isSaved}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className="map-grid"
          style={{ maxHeight: "100%" }}
        >
          <Paper variant="outlined">
            {!isLoading && (
              <MapPlaces coordinates={coordinates} places={places} zoom={12} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default MyPlaces;
