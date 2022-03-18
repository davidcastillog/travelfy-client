import "./MyPlaces.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneTrip, getAllPlacesFromTrip } from "../../services/tripsWs";
import { PlacesList, Map } from "../../components";
import { getUserWS } from "../../services/authWs";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function MyPlaces({ props }) {
  const [user, setUser] = useState(null);
  // Map
  const [coordinates, setCoordinates] = useState({});
  console.log("COORDINATES", coordinates);
  const [limits, setLimits] = useState();
  console.log("LIMITS", limits);

  // Places from trip
  const [places, setPlaces] = useState([]);
  console.log(places);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  // Trip Details
  const [trip, setTrip] = useState({});

  // Loading Control
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { id } = useParams();

  const verifyUser = async () => {
    const response = await getUserWS();
    if (response.status) {
      setUser(response.data.user);
    }
  };

  const getTripAndPlaces = async () => {
    setIsLoading(true);
    try {
      const trip = await getOneTrip(id); // For use it as title
      if (trip) {
        setTrip(trip.data.trip);
      }
      const placesInTrip = await getAllPlacesFromTrip(id); // For use it as places
      if (placesInTrip) {
        setPlaces(placesInTrip.data.places);
        setIsLoading(false);
        setIsSaved(true); // To display delete button in place card
      }
      setIsLoading(false);
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
            isSaved={isSaved}
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ maxHeight: "100%" }}>
          <Paper variant="outlined">
            {/* {!isLoading && (
              <Map
                coordinates={coordinates}
                setLimits={setLimits}
                setCoordinates={setCoordinates}
                places={places}
              />
            )} */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default MyPlaces;
